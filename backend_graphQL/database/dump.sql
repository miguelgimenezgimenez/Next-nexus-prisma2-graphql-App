CREATE TABLE IF NOT EXISTS "public"."Brand" (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS "public"."Phone" (
   id SERIAL PRIMARY KEY NOT NULL,
   link VARCHAR(255),
   image VARCHAR(255),
   name VARCHAR(255) NOT NULL,
   dimensions VARCHAR(255),
   os VARCHAR(255),
   storage VARCHAR(255),
   "brand_id" INTEGER NOT NULL,
   CONSTRAINT BRAND FOREIGN KEY ("brand_id") REFERENCES "public"."Brand"(id) on delete SET NULL
);

copy "public"."Brand" (id, name)
from '/fixtures/brands.csv' DELIMITER ';' CSV HEADER;


copy "public"."Phone" (
   brand_id,
   link,
   image,
   name,
   dimensions,
   os,
   storage
)
from '/fixtures/phones.csv' DELIMITER ';' CSV HEADER;