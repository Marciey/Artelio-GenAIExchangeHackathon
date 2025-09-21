"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const { Firestore } = require("@google-cloud/firestore");
const { PubSub } = require("@google-cloud/pubsub");
const app = express();
app.use(bodyParser.json());
const firestore = new Firestore();
const pubsub = new PubSub();
// --- Endpoints ---
// Start a new session
// Start a new session and trigger the orchestration
app.post("/api/session/start", async (req, res) => {
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
    }
    catch (err) {
        console.error("Error starting session:", err);
        res.status(500).json({ error: err.message });
    }
});
// Fetch progress trace
// Fetch progress trace
app.get("/api/session/:id/progress", async (req, res) => {
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
        const traceSnapshot = await traceRef.orderBy('timestamp').get();
        const steps = [];
        traceSnapshot.forEach((doc) => steps.push({ id: doc.id, ...doc.data() }));
        res.json({ sessionId, steps });
    }
    catch (err) {
        console.error("Error fetching progress:", err);
        res.status(500).json({ error: err.message });
    }
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map