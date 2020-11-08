FROM postgres:11.5-alpine

COPY ./all_brands_export.csv  ./fixtures/all_brands_export.csv
COPY ./dump.sql /docker-entrypoint-initdb.d/dump.sql

ENV PGDATA=/data
