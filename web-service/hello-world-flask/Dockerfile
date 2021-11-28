FROM alpine:3.14.2

RUN apk add py3-pip

COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt

WORKDIR /app
COPY . .

ENTRYPOINT [ "sh", "/app/run.sh" ]