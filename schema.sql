DROP TABLE IF EXISTS simpsons;

CREATE TABLE
simpsons(
  id SERIAL PRIMARY KEY NOT NULL,
  namechar VARCHAR(256) ,
  qoute TEXT,
  imagechar TEXT
);