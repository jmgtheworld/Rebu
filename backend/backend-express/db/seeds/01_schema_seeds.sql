INSERT INTO users (driver, full_name, email, created_at, phone_number, credit_card, license, street_address, appartment_number, city, postal_code, province, country, password)
VALUES 
  (false, "John Smith", "jsmith@mail.com", NOW(), 4161234567, 411111111111, NULL, "40 Bay St", NULL, "Toronto", "M5J 2X2", "ON", "Canada", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  (true, "Jane Doe", "jdoe@mail.com", NOW(), 4162345678, 411111111111, "S04206969696969", "598 Bay St", NULL, "Toronto", "M5G 1M5", "ON", "Canada", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  (false, "Douglas Falcon", "captain@falcon.com", NOW(), 4162344323, 411111111111, NULL, "18 Duncan St", NULL, "Toronto", "M5H 3G8", "ON", "Canada", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  (true, "Tony Stark", "iron@man.com", NOW(), 4166438943, 411111111111, "S04216969696969", "225 Richmond St W", "Suite 100", "Toronto", "M5V 1W2", "ON", "Canada", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  (true, "Hayley Williams", "para@more.com", NOW(), 4161234567, 411111111111, "S04206969696970", "144 Front St W", NULL, "Toronto", "M5J 2L7", "ON", "Canada", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.");

INSERT INTO messages (customer_id, driver_id, message, created_at)
VALUES
  (1, 2, [{"driver_id": "Here"}, {"customer_id": "Coming"}], NOW()),
  (3, 4, [{"driver_id": "Outside"}, {"customer_id": "On my way"}], NOW()),
  (4, 5, [{"driver_id": "Please come outside"}, {"customer_id": "Ok"}], NOW()),
  (5, 2, [{"driver_id": "I have arrived"}, {"customer_id": "kk"}], NOW()),
  (2, 5, [{"driver_id": "Hello"}, {"customer_id": "heyyyy"}], NOW())

INSERT INTO trips (user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon, payment_amount, payment_status, created_at, ended_at)
VALUES
  (1, "255 Bremner Blvd, Toronto, ON M5V 3M9", "40 Bay St, Toronto, ON M5J 2X2", 43.641788, -79.386429, 43.643970, -79.378929, 20, true, NOW() - 1, NOW()),
  (3, "225 Richmond St W Suite 100, Toronto, ON M5V 1W2", "18 Duncan St, Toronto, ON M5H 3G8", 43.649110, -79.389560, 43.647869, -79.388687, 10, true, NOW() - 3, NOW() - 2.5),
  (4, "225 Richmond St W Suite 100, Toronto, ON M5V 1W2", "144 Front St W, Toronto, ON M5J 2L7", 43.649110, -79.389560, 43.645433, -79.383896, 10, false, NOW() - 5, NOW() - 4.5),
  (2, "225 Richmond St W Suite 100, Toronto, ON M5V 1W2", "132 Dundas St W, Toronto, ON M5G 1C3", 43.649110, -79.389560, 43.6556486, -79.3847106, 10, false, NOW() - 6, NOW() - 5.5),
