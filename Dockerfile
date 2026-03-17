FROM python:3.10-slim-buster

WORKDIR /app

# Copy all files from your local folder to the container
COPY . /app

# Install the exact versions from your requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# FastAPI needs port 8080 (or whichever port you prefer)
EXPOSE 8080

# The command to start your FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]