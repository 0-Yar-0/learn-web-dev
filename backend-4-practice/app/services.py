from fastapi import APIRouter, HTTPException, status

from .data import categories
from .database import SessionDependency
from .models import Service
from .schemas import ServiceCreate, ServiceRead

router = APIRouter(prefix='/services', tags=['Услуги'])


@router.post(
    '',
    response_model=ServiceRead,
    status_code=status.HTTP_201_CREATED,
    summary='Создать услугу',
    responses={404: {'description': 'Категория не найдена'}},
)
def create_service(payload: ServiceCreate, session: SessionDependency) -> ServiceRead:
    if not any(category.id == payload.categoryId for category in categories):
        raise HTTPException(status_code=404, detail='Category not found')

    service = Service(
        category_id=payload.categoryId,
        **payload.model_dump(exclude={'categoryId'}),
    )
    session.add(service)
    session.flush()
    created = ServiceRead(id=service.id, **payload.model_dump())
    session.commit()
    return created
