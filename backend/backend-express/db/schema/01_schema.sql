DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "driver" boolean NOT NULL DEFAULT FALSE,
  "full_name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "created_at" timestamp NOT NULL,
  "phone_number" int(255) NOT NULL,
  "credit_card" int(255),
  "license" varchar(255),
  "street_address" varchar(255) NOT NULL,
  "appartment_number" varchar(255),
  "city" varchar(255) NOT NULL,
  "postal_code" varchar(255) NOT NULL,
  "province" varchar(255) NOT NULL,
  "country" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "driver_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "message" varchar(255),
  "created_at" timestamp
);

CREATE TABLE "trips" (
  "id" int PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "start_address" varchar(255) NOT NULL,
  "end_address" varchar(255) NOT NULL,
  "start_location_lat" int NOT NULL,
  "start_location_lon" int NOT NULL,
  "end_location_lat" int NOT NULL,
  "end_location_lon" int NOT NULL,
  "payment_amount" int NOT NULL,
  "payment_status" boolean NOT NULL DEFAULT FALSE,
  "created_at" timestamp,
  "ended_at" timestamp
);

-- ALTER TABLE "messages" ADD FOREIGN KEY ("customer_id") REFERENCES "users" ("id");

-- ALTER TABLE "messages" ADD FOREIGN KEY ("driver_id") REFERENCES "users" ("id");

-- ALTER TABLE "trips" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
