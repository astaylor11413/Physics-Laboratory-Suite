# Use an official Python runtime
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definitions and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the Flask port
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]