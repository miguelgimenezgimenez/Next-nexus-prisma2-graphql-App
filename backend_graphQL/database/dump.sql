create table  Device(
   id  SERIAL PRIMARY KEY,
   brand  VARCHAR(100)    NOT NULL,
   link  VARCHAR(100),
   image  VARCHAR(100),
   name      VARCHAR(100)    NOT NULL,
   dimensions  VARCHAR(100),
   os        VARCHAR(100),
   storage        VARCHAR(100)
);


copy Device (brand,link,image,name,dimensions,os,storage
) from '/fixtures/all_brands_export.csv'  DELIMITER ';' CSV HEADER; 
