from app.services.vertex_ai import generate_text

def extract_insight(data: dict):
    fact = data.get("fact", "")

    prompt = f"""
    You are a learning manager AI. 
    Categorize the following fact and provide structured insights.

    Fact: "{fact}"

    Respond in JSON with keys:
    - category (broad domain, e.g. 'Science', 'History', 'Culture')
    - insight (short useful interpretation of the fact)
    """

    ai_response = generate_text(prompt)

    return ai_response or {
        "category": "Unknown",
        "insight": "No insight generated"
    }
