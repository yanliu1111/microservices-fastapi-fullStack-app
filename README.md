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
