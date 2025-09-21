from app.config import VERTEX_PROJECT_ID, VERTEX_LOCATION, VERTEX_MODEL

# Placeholder for Google Vertex AI SDK
# Replace with actual implementation once Vertex AI is enabled

def generate_text(prompt: str) -> dict:
    """
    Mock function for Vertex AI call.
    Replace this with actual Vertex AI integration using google-cloud-aiplatform.
    """
    print(f"[DEBUG] Prompt sent to Vertex AI:\n{prompt}\n")

    # Fake structured response for testing
    if "marketing strategist" in prompt.lower():
        return {
            "analysis": "Strong CTR but weak conversion rate.",
            "recommendations": [
                "Optimize landing page content.",
                "Use A/B testing for ad creatives.",
                "Focus on Instagram video posts."
            ],
            "next_best_channel": "Instagram",
            "suggested_content_type": "Short Video Reels"
        }

    if "learning manager" in prompt.lower():
        return {
            "category": "History & Culture",
            "insight": "This fact can inspire heritage-themed marketing campaigns."
        }

    return {}