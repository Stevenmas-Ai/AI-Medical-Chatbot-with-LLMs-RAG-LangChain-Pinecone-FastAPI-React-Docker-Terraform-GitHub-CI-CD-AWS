FROM python:3.10-slim-buster

WORKDIR /app

# Copy your requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["python3", "app.py"]