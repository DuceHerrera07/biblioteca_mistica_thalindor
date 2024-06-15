FROM python:3.9

WORKDIR /api

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
COPY .env .env

CMD ["flask", "run", "--host=0.0.0.0"]
