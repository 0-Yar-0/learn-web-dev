from fastapi import FastAPI
from .categories import router

app = FastAPI(title='Контур — категории услуг', version='1.0.0')
app.include_router(router)
