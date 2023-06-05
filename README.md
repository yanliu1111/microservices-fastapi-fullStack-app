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
