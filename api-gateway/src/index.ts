// --- Imports ---
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Firestore } from "@google-cloud/firestore";
import { PubSub } from "@google-cloud/pubsub";

// --- App Setup ---
const app = express();
app.use(bodyParser.json());

// --- Google Cloud Clients ---
const firestore = new Firestore();
const pubsub = new PubSub();

// --- Types ---
interface StartSessionRequest {
  inputData?: {
    voiceInput: string;
    imageUrl: string;
  };
}

interface UpdateSessionParams {
  id: string;
}

interface UpdateSessionBody {
  agent: string;
  stepId: string;
  status: "done" | "error" | "in-progress";
  output?: any;
}

// --- Routes ---

// ✅ Get all products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const productsRef = firestore.collection("products");
    const snapshot = await productsRef.get();
    const products: any[] = [];
    snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

    res.json({ products });
  } catch (err: any) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get today's fact
app.get("/api/fact/today", async (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const factRef = firestore.collection("facts").doc(today);
    const factDoc = await factRef.get();

    if (!factDoc.exists) {
      res.status(404).json({ error: "No fact for today" });
      return;
    }

    res.json({ id: factDoc.id, ...factDoc.data() });
  } catch (err: any) {
    console.error("Error fetching today's fact:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get dashboard metrics (single dashboard doc)
app.get("/api/dashboard", async (req: Request, res: Response) => {
  try {
    const metricsRef = firestore.collection("metrics").doc("dashboard");
    const metricsDoc = await metricsRef.get();

    if (!metricsDoc.exists) {
      res.status(404).json({ error: "No dashboard metrics" });
      return;
    }

    res.json({ id: metricsDoc.id, ...metricsDoc.data() });
  } catch (err: any) {
    console.error("Error fetching dashboard metrics:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update trace and metrics
app.post(
  "/api/session/:id/update",
  async (
    req: Request<UpdateSessionParams, any, UpdateSessionBody, any>,
    res: Response
  ) => {
    try {
      const sessionId = req.params.id;
      const { agent, stepId, status, output } = req.body;

      if (!sessionId || !agent || !stepId || !status) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Update trace document
      const traceRef = firestore
        .collection("sessions")
        .doc(sessionId)
        .collection("trace")
        .doc(stepId);

      await traceRef.set(
        {
          agent,
          status,
          output,
          timestamp: new Date(),
        },
        { merge: true }
      );

      // Update session metrics
      const sessionRef = firestore.collection("sessions").doc(sessionId);
      const sessionDoc = await sessionRef.get();

      let metrics =
        sessionDoc.exists && sessionDoc.data()?.metrics
          ? sessionDoc.data()?.metrics
          : { totalAgents: 0, completedAgents: 0, errors: 0 };

      if (status === "done") {
        metrics.completedAgents = (metrics.completedAgents || 0) + 1;
      } else if (status === "error") {
        metrics.errors = (metrics.errors || 0) + 1;
      }

      await sessionRef.set({ metrics }, { merge: true });

      res.json({ message: "Trace and metrics updated" });
    } catch (err: any) {
      console.error("Error updating trace/metrics:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ Start a new session and trigger orchestration
app.post(
  "/api/session/start",
  async (req: Request<{}, any, StartSessionRequest, any>, res: Response) => {
    try {
      const { inputData } = req.body;

      const sessionRef = firestore.collection("sessions").doc();
      await sessionRef.set({
        inputData,
        status: "started",
        createdAt: new Date(),
      });

      // Publish to Pub/Sub → triggers orchestrator
      const message = {
        sessionId: sessionRef.id,
        inputData,
      };

      await pubsub.topic("orchestrator-topic").publishMessage({ json: message });

      res.json({
        sessionId: sessionRef.id,
        message: "Session started, orchestration triggered",
      });
    } catch (err: any) {
      console.error("Error starting session:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ Fetch progress trace
app.get(
  "/api/session/:id/progress",
  async (req: Request<UpdateSessionParams>, res: Response) => {
    try {
      const sessionId = req.params.id;

      if (!sessionId) {
        res.status(400).json({ error: "sessionId required" });
        return;
      }

      const traceRef = firestore
        .collection("sessions")
        .doc(sessionId)
        .collection("trace");

      const traceSnapshot = await traceRef.orderBy("timestamp").get();
      const steps: any[] = [];
      traceSnapshot.forEach((doc) => steps.push({ id: doc.id, ...doc.data() }));

      res.json({ sessionId, steps });
    } catch (err: any) {
      console.error("Error fetching progress:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// --- Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
