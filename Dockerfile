FROM python:3.11-slim

WORKDIR /app

# Install Node.js more efficiently
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Build React frontend
RUN cd frontend && npm install && npm run build && \
    mkdir -p ../build && cp -r build/* ../build/ && \
    rm -rf node_modules

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]