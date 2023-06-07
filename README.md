# Microservices-FASTAPI-REDIS-project

## Description

This project is building ecommerce full application includes client side using ReactJS and server side using Microservices architecture with FastAPI and Redis as a database. There are two microservices, one for products and the other for orders. I used Redis Stream as message broker among microservices and Redis database.

## Teck Stack

- FastAPI
- Microservices
- Redis-om
- Redis-Stream

## Start the project

In invertory-microservice directory run the following command:

```bash
uvicorn main:app --reload
```

In payment-microservice directory run the following command:

```bash
uvicorn main:app --reload --port=8001
```

(Redis Stream) Turn on Redis server in inventory-microservice and payment-microservice directories:

```bash
python consumer.py
```

## Learning Notes

1. FASTAPI.**BACKGROUND TASKS** is used to run a function in the background. It is useful for tasks that need to run after a request, but that the client doesn't really have to be waiting for the result. **What is different between Background task and message queue**, is that background task is not persistent, it will be lost if the server is restarted. So, it is not suitable for long running tasks. For long running tasks, we need to use message queue.
2. Some workflows for MVC.
   - **POST** and **GET** a new product `http://localhost:8000/products/`

```
{
  "id": "01H28HATR7JG2YBH22ABPJWW33",
  "name": "product",
  "price": 20.0,
  "quantity": 100
}
```

Order this product id in `http://localhost:8001/orders/`

```
{
  "id": "01H28HATR7JG2YBH22ABPJWW33",
  "quantity": 10
}
```

```
{
  "pk": "01H28HDT0QXZKAE3F49HPJNN99",
  "product_id": "01H28HATR7JG2YBH22ABPJWW33",
  "price": 20.0,
  "fee": 4.0,
  "total": 24.0,
  "quantity": 10,
  "status": "pending"
}
```

- In 5 second, the product was delete in inventory **DELETE** `localhost:8000/products/01H28HATR7JG2YBH22ABPJWW33`
- Copy `pk`from order response and **GET** `http://localhost:8001/orders/01H28HDT0QXZKAE3F49HPJNN99`

```
{
  "pk": "01H28HDT0QXZKAE3F49HPJNN99",
  "product_id": "01H28HATR7JG2YBH22ABPJWW33",
  "price": 20.0,
  "fee": 4.0,
  "total": 24.0,
  "quantity": 10,
  "status": "refunded"
}
```

Status changed to refunded because the product was deleted in inventory, there is time limit setting for this case.

3. Initial setup for ReactTS (frontend).
   Change the following in tsconfig.json, and remove `"allowImportingTsExtensions": true,`

```json
   /* Bundler mode */
  "moduleResolution": "node",
  "allowSyntheticDefaultImports": true,
```

And tsconfig.node.json file, changed the following:

```json
"moduleResolution": "node16",
```
