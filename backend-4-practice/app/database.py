from collections.abc import Generator
from pathlib import Path
from typing import Annotated
from fastapi import Depends, Request
from sqlalchemy import Engine, URL, create_engine, select
from sqlalchemy.orm import Session
from .models import Base, Master

DEFAULT_DATABASE = Path(__file__).resolve().parents[1] / 'data' / 'salon.sqlite3'


def make_engine(path: Path) -> Engine:
    url = URL.create('sqlite', database=str(path.resolve()))
    return create_engine(url, connect_args={'check_same_thread': False})


def initialize_database(engine: Engine, *, seed: bool = True) -> None:
    Base.metadata.create_all(engine)
    if not seed:
        return
    with Session(engine) as session:
        # Данные создаются только в пустой таблице; существующие не изменяются.
        if session.scalar(select(Master.id).limit(1)) is None:
            session.add_all([
                Master(id=1, name='Анна', specialization='Парикмахер'),
                Master(id=2, name='Мария', specialization='Визажист'),
            ])
            session.commit()


def get_session(request: Request) -> Generator[Session, None, None]:
    with Session(request.app.state.engine) as session:
        yield session


SessionDependency = Annotated[Session, Depends(get_session)]
