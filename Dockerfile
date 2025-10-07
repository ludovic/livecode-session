FROM python:3.9-slim

WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY backend/ .

# Expose port (Railway injects $PORT)
EXPOSE 8000

# Run the application with PORT from environment
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
