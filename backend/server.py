from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="SELAH – Skupienie i Modlitwa")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    lang: Optional[str] = Field(default="pl", max_length=4)


class NewsletterEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    lang: str = "pl"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactMessageCreate(BaseModel):
    name: Optional[str] = Field(default=None, max_length=120)
    email: EmailStr
    message: str = Field(min_length=5, max_length=5000)
    lang: Optional[str] = Field(default="pl", max_length=4)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: Optional[str] = None
    email: EmailStr
    message: str
    lang: str = "pl"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "SELAH API", "app": "SELAH – Skupienie i Modlitwa"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get('timestamp'), str):
            d['timestamp'] = datetime.fromisoformat(d['timestamp'])
    return docs


@api_router.post("/newsletter/subscribe")
async def newsletter_subscribe(payload: NewsletterSubscribe):
    email = payload.email.lower().strip()
    lang = (payload.lang or "pl").lower()
    if lang not in ("pl", "en"):
        lang = "pl"

    existing = await db.newsletter.find_one({"email": email}, {"_id": 0})
    if existing:
        return {"status": "ok", "already_subscribed": True}

    entry = NewsletterEntry(email=email, lang=lang)
    await db.newsletter.insert_one(entry.model_dump())
    logger.info(f"Newsletter subscription: {email} ({lang})")
    return {"status": "ok", "already_subscribed": False}


@api_router.post("/contact")
async def contact_submit(payload: ContactMessageCreate):
    lang = (payload.lang or "pl").lower()
    if lang not in ("pl", "en"):
        lang = "pl"
    msg = ContactMessage(
        name=(payload.name or None),
        email=payload.email.lower().strip(),
        message=payload.message.strip(),
        lang=lang,
    )
    await db.contact_messages.insert_one(msg.model_dump())
    logger.info(f"Contact message from {msg.email} ({lang})")
    return {"status": "ok", "id": msg.id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
