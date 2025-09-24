import os
import json
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

PROVIDER = os.getenv("PROVIDER_URL", "http://127.0.0.1:7545")  
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT = os.getenv("ACCOUNT_ADDRESS")
CONTRACT_ADDR = os.getenv("CONTRACT_ADDRESS")
ABI_PATH = os.getenv("ABI_PATH", "contracts/build/AgroTrace.json")

# Connect ke blockchain
w3 = Web3(Web3.HTTPProvider(PROVIDER))

if not w3.is_connected():
    raise Exception(f"Failed to connect to Web3 provider: {PROVIDER}")

# Load ABI
try:
    with open(ABI_PATH) as f:
        abi = json.load(f)
except Exception as e:
    raise Exception(f"Failed to load ABI from {ABI_PATH}: {e}")

# Pastikan alamat kontrak valid
contract = w3.eth.contract(address=w3.to_checksum_address(CONTRACT_ADDR), abi=abi)

def add_record_to_chain(batch_code: str, metadata: str) -> str:
    nonce = w3.eth.get_transaction_count(ACCOUNT)
    tx = contract.functions.addRecord(batch_code, metadata).build_transaction({
        "chainId": w3.eth.chain_id,
        "gas": 300000,
        "gasPrice": Web3.to_wei(20, "gwei"),
        "nonce": nonce,
    })
    signed = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction).hex()
    return tx_hash


def get_record_from_chain(record_id: int):
    try:
        return contract.functions.getRecord(record_id).call()
    except Exception as e:
        return {"error": str(e)}
