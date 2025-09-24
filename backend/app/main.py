from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from app.db import init_db, get_session
from app.models import Product, BlockchainRecord
from app.web3_client import add_record_to_chain, get_record_from_chain
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Konfigurasi CORS supaya React bisa request
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # alamat React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

class ProductIn(BaseModel):
    farmer_id: int
    batch_code: str
    metadata: str = ""

@app.post("/add-record")
def create_product(payload: ProductIn, session: Session = Depends(get_session)):
    try:
        # Simpan ke database
        prod = Product(farmer_id=payload.farmer_id, batch_code=payload.batch_code)
        session.add(prod)
        session.commit()
        session.refresh(prod)

        # Simpan ke blockchain (dua parameter)
        tx_hash = add_record_to_chain(payload.batch_code, payload.metadata)

        # Simpan hasil tx hash ke database
        br = BlockchainRecord(product_id=prod.id, tx_hash=tx_hash)
        session.add(br)
        session.commit()

        return {
            "product": {
                "id": prod.id,
                "farmer_id": prod.farmer_id,
                "batch_code": prod.batch_code
            },
            "tx_hash": tx_hash
        }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/records")
def get_records(session: Session = Depends(get_session)):
    return session.exec(select(BlockchainRecord)).all()

@app.get("/record/{id}")
def get_record(id: int):
    return get_record_from_chain(id)
