from fastapi import FastAPI
from app.schemas import EngagementData, StrategyResponse
from app.agents.marketing_agent import generate_strategy
from app.agents.learning_manager import extract_insight

app = FastAPI(title="Marketing & Learning Agents")

@app.get("/")
def root():
    return {"message": "AI Agents are running 🚀"}

@app.post("/marketing-agent/strategy", response_model=StrategyResponse)
def marketing_strategy(data: EngagementData):
    """Generate marketing strategy from engagement data"""
    return generate_strategy(data)

@app.post("/learning-manager/insight")
def learning_manager(data: dict):
    """Extract structured insights from facts"""
    return extract_insight(data)
