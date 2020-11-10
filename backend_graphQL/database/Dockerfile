FROM postgres:11.5-alpine

COPY ./brands.csv  ./fixtures/brands.csv
COPY ./phones.csv  ./fixtures/phones.csv
COPY ./dump.sql /docker-entrypoint-initdb.d/dump.sql

ENV PGDATA=/data
