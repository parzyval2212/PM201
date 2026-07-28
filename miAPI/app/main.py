from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import usuarios
from app.data.db import engine
from app.data import usuarioDB

usuarioDB.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API usuarios",
    description="Ivan Isay Guerra",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)