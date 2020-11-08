FROM postgres:11.5-alpine

COPY ./brands.csv  ./fixtures/brands.csv
COPY ./devices.csv  ./fixtures/devices.csv
COPY ./dump.sql /docker-entrypoint-initdb.d/dump.sql

ENV PGDATA=/data
