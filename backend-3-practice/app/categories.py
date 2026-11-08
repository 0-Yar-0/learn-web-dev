from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from .data import Category, categories, services
from .schemas import CategoryRead

router = APIRouter(prefix='/categories', tags=['Категории'])


def serialize_category(category: Category) -> CategoryRead:
    count = sum(service.category_id == category.id for service in services)
    return CategoryRead(id=category.id, name=category.name, servicesCount=count)


@router.get('', response_model=list[CategoryRead], summary='Список категорий')
def list_categories() -> list[CategoryRead]:
    return [serialize_category(category) for category in categories]


@router.get(
    '/{category_id}', response_model=CategoryRead,
    summary='Информация о категории',
    responses={404: {'description': 'Категория не найдена', 'content': {'text/plain': {'example': 'Category not found'}}}},
)
def get_category(category_id: int):
    category = next((item for item in categories if item.id == category_id), None)
    if category is None:
        return PlainTextResponse('Category not found', status_code=404)
    return serialize_category(category)
