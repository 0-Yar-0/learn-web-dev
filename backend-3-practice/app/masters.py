from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import get_session
from .models import Master
from .schemas import MasterRead

router = APIRouter(prefix='/masters', tags=['Мастера'])
SessionDependency = Annotated[Session, Depends(get_session)]


@router.get('', response_model=list[MasterRead], summary='Список мастеров')
def list_masters(
    session: SessionDependency,
    specialization: str | None = Query(default=None, description='Точное название специализации'),
):
    statement = select(Master).order_by(Master.id)
    if specialization is not None:
        statement = statement.where(Master.specialization == specialization)
    return session.scalars(statement).all()


@router.get(
    '/{master_id}', response_model=MasterRead,
    summary='Информация о мастере', responses={404: {'description': 'Мастер не найден'}},
)
def get_master(master_id: int, session: SessionDependency):
    master = session.get(Master, master_id)
    if master is None:
        raise HTTPException(status_code=404, detail='Master not found')
    return master
