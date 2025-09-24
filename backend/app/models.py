from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Farmer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    phone: str

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    farmer_id: int
    batch_code: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BlockchainRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int
    tx_hash: str

class ScanResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: Optional[int] = None
    label: str
    confidence: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)
