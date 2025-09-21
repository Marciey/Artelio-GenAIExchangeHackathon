from app.agents.utils import preprocess_metrics
from app.services.vertex_ai import generate_text
from app.schemas import EngagementData, StrategyResponse

def generate_strategy(data: EngagementData) -> StrategyResponse:
    metrics = data.metrics
    preprocessed = preprocess_metrics(metrics)

    prompt = f"""
    You are a marketing strategist AI. Analyze the following campaign metrics
    and suggest improvements.

    Engagement Data:
    {metrics}

    Derived Metrics:
    {preprocessed}

    Please suggest:
    1. What is working well?
    2. What should be improved?
    3. Next-step campaign strategies.
    4. Best channel & content type to focus on.

    Respond in JSON with keys:
    analysis, recommendations, next_best_channel, suggested_content_type.
    """

    ai_response = generate_text(prompt)

    # Fallback if AI response fails
    if not ai_response:
        return StrategyResponse(
            analysis="Could not generate AI analysis.",
            recommendations=["Retry later"],
            next_best_channel=data.channel,
            suggested_content_type=data.content_type,
        )

    return StrategyResponse(**ai_response)
