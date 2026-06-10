from app.database.database import engine, Base

# Import all models here
from app.models.user import User
from app.models.portfolio import Portfolio

# Create all tables
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")