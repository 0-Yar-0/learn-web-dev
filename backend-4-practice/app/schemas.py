from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, StringConstraints


class CategoryRead(BaseModel):
    id: int
    name: str
    # Название поля соответствует заданному JSON-контракту.
    servicesCount: int = Field(ge=0)


class MasterRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    specialization: str


ServiceText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]


class ServiceCreate(BaseModel):
    categoryId: int
    title: ServiceText
    desc: ServiceText
    duration: int = Field(ge=30, le=180, description='Продолжительность в минутах')
    price: float = Field(gt=0, allow_inf_nan=False)


class ServiceRead(ServiceCreate):
    id: int
