from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Master(Base):
    __tablename__ = 'masters'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    specialization: Mapped[str] = mapped_column(String(100), nullable=False, index=True)


class Service(Base):
    __tablename__ = 'services'

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(index=True)
    title: Mapped[str] = mapped_column(String(100))
    desc: Mapped[str] = mapped_column(String(100))
    duration: Mapped[int]
    price: Mapped[float]
