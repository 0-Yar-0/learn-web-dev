from pydantic import BaseModel, Field


class CategoryRead(BaseModel):
    id: int
    name: str
    # Название поля соответствует заданному JSON-контракту.
    servicesCount: int = Field(ge=0)
