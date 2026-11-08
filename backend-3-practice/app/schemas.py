from pydantic import BaseModel, ConfigDict, Field


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
