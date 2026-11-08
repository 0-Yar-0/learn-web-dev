from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from .database import DEFAULT_DATABASE, make_engine, initialize_database
from .categories import router as categories_router
from .masters import router as masters_router


def create_app(database_path: str | Path | None = None, *, seed: bool = True) -> FastAPI:
    path = Path(database_path) if database_path is not None else DEFAULT_DATABASE
    engine = make_engine(path)

    @asynccontextmanager
    async def lifespan(application: FastAPI):
        path.resolve().parent.mkdir(parents=True, exist_ok=True)
        try:
            initialize_database(engine, seed=seed)
            yield
        finally:
            engine.dispose()

    application = FastAPI(
        title='Контур — категории и мастера', version='1.0.0', lifespan=lifespan,
    )
    application.state.engine = engine
    application.include_router(categories_router)
    application.include_router(masters_router)
    return application


app = create_app()
