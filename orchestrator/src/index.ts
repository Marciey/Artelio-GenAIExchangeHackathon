const { PubSub } = require("@google-cloud/pubsub");
const { Firestore, FieldValue } = require("@google-cloud/firestore");

const pubsub = new PubSub();
const firestore = new Firestore();

// The artisanId is now optional since it might not be provided at this stage.
interface AgentMessage {
  sessionId: string;
  artisanId?: string;
  inputData: {
    voiceInput: string;
    imageUrl: string;
  };
  step: string;
  payload: any;
}

const orchestrateWorkflow = async (message: AgentMessage) => {
  const { sessionId, inputData } = message;
  // Use a hardcoded artisanId for the prototype since it's not yet in the database.
  const artisanId = message.artisanId || "artisan_default";

  // Log the start of the orchestration
  await logTrace(sessionId, "Orchestrator", "started", { artisanId, message: "Beginning multi-agent workflow" });

  try {
    // --- Step 1: Voice Agent (already done by frontend) ---
    const text = inputData.voiceInput;
    await logTrace(sessionId, "Voice Agent", "success", { text });

    // --- Step 2: Image Enhancer Agent ---
    // The Orchestrator sends the image URL to the Image Enhancer Agent
    const enhancedImageUrl = await callImageEnhancerAgent(sessionId, inputData.imageUrl);
    await logTrace(sessionId, "Image Enhancer Agent", "success", { enhancedImageUrl });

    // --- Step 3: Marketing Nudge Agent ---
    // The Orchestrator sends the enhanced image and text to the Marketing Agent
    const caption = await callMarketingNudgeAgent(sessionId, text, enhancedImageUrl);
    await logTrace(sessionId, "Marketing Nudge Agent", "success", { caption });

  // --- Final Step: Post the product (simulated) ---
  // This is where you would call the Inventory Agent and social media agents.
  await logTrace(sessionId, "Inventory Agent", "success", { message: "Product added to inventory" });

  await logTrace(sessionId, "Orchestrator", "completed", { final_output: { enhancedImageUrl, caption } });
  } catch (error) {
    console.error("Orchestration failed:", error);
    await logTrace(sessionId, "Orchestrator", "failure", { error: (error as Error).message });
  }
};

// --- Mock Agent Calls (to be replaced with real Cloud Run service calls) ---

const callImageEnhancerAgent = async (sessionId: string, imageUrl: string): Promise<string> => {
  // Simulate the call to the Image Enhancer Agent service
  await logTrace(sessionId, "Image Enhancer Agent", "in-progress", { imageUrl });
  await new Promise(resolve => setTimeout(resolve, 3000));
  return `enhanced_${imageUrl}`; // Return a mock enhanced URL
};

const callMarketingNudgeAgent = async (sessionId: string, voiceInput: string, imageUrl: string): Promise<string> => {
  // Simulate the call to the Marketing Nudge Agent service
  await logTrace(sessionId, "Marketing Nudge Agent", "in-progress", { voiceInput, imageUrl });
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Call Gemini to generate a caption based on voiceInput and enhancedImageUrl
  const product = voiceInput.split(" ")[voiceInput.split(" ").length - 2];
  return `Here is a beautiful new caption for your ${product}!`;
};

// --- Helper function to log trace to Firestore ---

const logTrace = async (sessionId: string, agentName: string, status: string, data: any) => {
  const traceRef = firestore.collection("sessions").doc(sessionId).collection("trace");
  await traceRef.add({
    agentName,
    status,
    ...data,
    timestamp: FieldValue.serverTimestamp(),
  });

  // Update session metrics
  const sessionRef = firestore.collection("sessions").doc(sessionId);
  const sessionDoc = await sessionRef.get();
  let metrics = sessionDoc.exists && sessionDoc.data().metrics ? sessionDoc.data().metrics : { totalAgents: 4, completedAgents: 0, errors: 0 };
  if (status === "success" || status === "done") {
    metrics.completedAgents = (metrics.completedAgents || 0) + 1;
  } else if (status === "error" || status === "failure") {
    metrics.errors = (metrics.errors || 0) + 1;
  }
  await sessionRef.set({ metrics }, { merge: true });
};

// --- Pub/Sub subscription for orchestration ---
const subscription = pubsub.topic("orchestrator-topic").subscription("orchestrator-subscription");
subscription.on("message", (message: any) => {
  const data = JSON.parse(message.data.toString()) as AgentMessage;
  orchestrateWorkflow(data).catch(console.error);
  message.ack();
});

console.log("Orchestrator service listening for messages...");
