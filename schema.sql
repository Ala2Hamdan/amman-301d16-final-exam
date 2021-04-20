DROP TABLE IF EXISTS ;

CREATE TABLE
simpsons(
  id SERIAL PRIMARY KEY NOT NULL,
  namechar VARCHAR(256) ,
  qoute TEXT,
  imagechar TEXT
);