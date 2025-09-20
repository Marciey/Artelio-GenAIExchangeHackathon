import os
from dotenv import load_dotenv

# Load from .env file
load_dotenv()

VERTEX_PROJECT_ID = os.getenv("VERTEX_PROJECT_ID", "your-project-id")
VERTEX_LOCATION = os.getenv("VERTEX_LOCATION", "us-central1")
VERTEX_MODEL = os.getenv("VERTEX_MODEL", "gemini-1.0-pro")