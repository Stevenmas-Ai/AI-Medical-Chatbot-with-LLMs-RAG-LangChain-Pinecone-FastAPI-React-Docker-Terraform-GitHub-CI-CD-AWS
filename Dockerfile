FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y nodejs npm

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN cd frontend && npm install && npm run build && mkdir -p ../build && cp -r build/* ../build/ || true

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]