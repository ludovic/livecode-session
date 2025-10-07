FROM python:3.9-slim

WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY backend/ .

# Railway will use the startCommand from railway.json instead of this CMD
# This CMD is here as a fallback for local Docker runs
CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:8000"]