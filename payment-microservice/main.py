from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
from starlette.requests import Request
import requests, time
import os

load_dotenv()  # Load environment variables from the .env file
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# This SHOULD be a different database than the one used by the inventory microservice
# But in this test, I am using the same database as the inventory microservice
redis = get_redis_connection(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)

class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str # pending, completed, refunded

    class Meta:
        database = redis
    
@app.get('/orders/{pk}')
def get(pk: str):
    # redis.xadd('order_refund', Order.get(pk).dict(), '*' )
    return Order.get(pk)

@app.post('/orders')
async def create(request: Request, background_tasks: BackgroundTasks): # id, quantity
    body = await request.json()

    req = requests.get(f'http://localhost:8000/products/%s' % body['id'])
    # converted: %s to % body['id']
    product = req.json()
    order = Order(
        product_id=body['id'],
        price=product['price'],
        fee=product['price'] * 0.2,
        total=product['price'] * 1.2,
        quantity=body['quantity'],
        status='pending'
    )

    order.save()
    background_tasks.add_task(order_completed, order)

    return order
    
def order_completed(order: Order):
        time.sleep(5)
        order.status = 'completed'
        order.save()
        redis.xadd('order_completed', order.dict(), '*')

##BUGFIX:redis server is not running
