from fastapi import FastAPI
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
import os
load_dotenv()  # Load environment variables from the .env file
app = FastAPI()

redis = get_redis_connection(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)

class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis

@app.get("/products")
def all():
    return Product.all_pks()
