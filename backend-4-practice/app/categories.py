from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from sqlalchemy import func, select
from .data import Category, categories, services
from .database import SessionDependency
from .models import Service
from .schemas import CategoryRead

router = APIRouter(prefix='/categories', tags=['Категории'])


def serialize_category(category: Category, saved_count: int) -> CategoryRead:
    count = sum(service.category_id == category.id for service in services)
    return CategoryRead(id=category.id, name=category.name, servicesCount=count + saved_count)


@router.get('', response_model=list[CategoryRead], summary='Список категорий')
def list_categories(session: SessionDependency) -> list[CategoryRead]:
    statement = select(Service.category_id, func.count()).group_by(Service.category_id)
    counts = {category_id: count for category_id, count in session.execute(statement)}
    return [serialize_category(category, counts.get(category.id, 0)) for category in categories]


@router.get(
    '/{category_id}', response_model=CategoryRead,
    summary='Информация о категории',
    responses={404: {'description': 'Категория не найдена', 'content': {'text/plain': {'example': 'Category not found'}}}},
)
def get_category(category_id: int, session: SessionDependency):
    category = next((item for item in categories if item.id == category_id), None)
    if category is None:
        return PlainTextResponse('Category not found', status_code=404)
    statement = select(func.count()).select_from(Service).where(Service.category_id == category_id)
    return serialize_category(category, session.execute(statement).scalar_one())
