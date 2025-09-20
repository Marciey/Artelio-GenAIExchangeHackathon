def preprocess_metrics(metrics: dict) -> dict:
    impressions = metrics.get("impressions", 0)
    clicks = metrics.get("clicks", 0)
    likes = metrics.get("likes", 0)
    comments = metrics.get("comments", 0)
    shares = metrics.get("shares", 0)
    conversions = metrics.get("conversions", 0)

    ctr = clicks / impressions if impressions else 0
    engagement = (likes + comments + shares) / impressions if impressions else 0
    conv_rate = conversions / clicks if clicks else 0

    return {
        "CTR": round(ctr, 3),
        "EngagementRate": round(engagement, 3),
        "ConversionRate": round(conv_rate, 3),
    }
