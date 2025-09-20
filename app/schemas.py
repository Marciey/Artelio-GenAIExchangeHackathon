from pydantic import BaseModel
from typing import Dict, List

class EngagementData(BaseModel):
    campaign_id: str
    metrics: Dict[str, int]
    content_type: str
    channel: str
    date_range: str

class StrategyResponse(BaseModel):
    analysis: str
    recommendations: List[str]
    next_best_channel: str
    suggested_content_type: str
