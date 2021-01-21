INSERT INTO users(driver, full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password)
VALUES 
  (false, 'John Smith', 'jsmith@mail.com', current_timestamp - interval '1 month', 4161234567, 411111111111, '01/25', '123', NULL, '40 Bay St', NULL, 'Toronto', 'M5J 2X2', 'ON', 'Canada', 43.643970, -79.378929, 'password'),
  (true, 'Jane Doe', 'jdoe@mail.com', current_timestamp - interval '5 day', 4162345678, 411111111111, '02/24', '345', 'S04206969696969', '598 Bay St', NULL, 'Toronto', 'M5G 1M5', 'ON', 'Canada', 43.655850, -79.384070, 'password'),
  (false, 'Douglas Falcon', 'captain@falcon.com', current_timestamp - interval '5 day', 4162344323, 411111111111, '11/27', '420', NULL, '18 Duncan St', NULL, 'Toronto', 'M5H 3G8', 'ON', 'Canada', 43.647869, -79.388687, 'password'),
  (true, 'Tony Stark', 'iron@man.com', current_timestamp - interval '4 day', 4166438943, 411111111111, '10/22', '089', 'S04216969696969', '225 Richmond St W', 'Suite 100', 'Toronto', 'M5V 1W2', 'ON', 'Canada', 43.641788, -79.386429, 'password'),
  (true, 'Hayley Williams', 'para@more.com', current_timestamp - interval '4 day', 4161234567, 411111111111, '08/23', '547', 'S04206969696970', '144 Front St W', NULL, 'Toronto', 'M5J 2L7', 'ON', 'Canada', 43.645630, 43.645630, 'password');

INSERT INTO messages(customer_id, driver_id, message, created_at)
VALUES
  (1, 2, 'here', current_timestamp),
  (3, 4, 'outside', current_timestamp),
  (4, 5, 'please come outside', current_timestamp),
  (5, 2, 'I have arrived', current_timestamp),
  (2, 5, 'Hello', current_timestamp);

INSERT INTO trips(customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon, accepted, payment_amount, payment_status, created_at, ended_at)
VALUES
  (1, 2, '255 Bremner Blvd, Toronto, ON M5V 3M9', '40 Bay St, Toronto, ON M5J 2X2', 43.641788, -79.386429, 43.643970, -79.378929, false, 20, true, current_timestamp, NULL),
  (1, 4, '328 Spadina Ave, Toronto, ON M5T 2E7', '40 Bay St, Toronto, ON M5J 2X2', 43.653790, -79.398697, 43.643970, -79.378929, true, 25, true, current_timestamp - interval '1 day', current_timestamp - interval '1 day' + interval '1 hour'),
  (3, 4, '225 Richmond St W Suite 100, Toronto, ON M5V 1W2', '18 Duncan St, Toronto, ON M5H 3G8', 43.649110, -79.389560, 43.647869, -79.388687, true, 10, true, current_timestamp, current_timestamp + interval '1 hour'),
  (3, 5, '909 Lake Shore Blvd W, Toronto, ON M6K 3L3', '18 Duncan St, Toronto, ON M5H 3G8', 43.629330, -79.415123, 43.647869, -79.388687, true, 15, true, current_timestamp - interval '2 day', current_timestamp - interval '2 day' + interval '1 hour'),
  (4, NULL, '225 Richmond St W Suite 100, Toronto, ON M5V 1W2', '144 Front St W, Toronto, ON M5J 2L7', 43.649110, -79.389560, 43.645433, -79.383896, false, 10, false, current_timestamp, NULL),
  (4, 5, '144 Front St W, Toronto, ON M5J 2L7', '225 Richmond St W Suite 100, Toronto, ON M5V 1W2', 43.645630, 43.645630, 43.641788, -79.386429, true, 10, true, current_timestamp - interval '3 day', current_timestamp - interval '3 day' + interval '1 hour'),
  (2, 4, '225 Richmond St W Suite 100, Toronto, ON M5V 1W2', '132 Dundas St W, Toronto, ON M5G 1C3', 43.649110, -79.389560, 43.6556486, -79.3847106, true, 10, false, current_timestamp - interval '1 day', current_timestamp - interval '1 day' + interval '1 hour'),
  (2, NULL, '255 Bremner Blvd, Toronto, ON M5V 3M9', '598 Bay St Toronto, ON M5G 1C3', 43.641788, -79.386429, 43.655850, -79.384070, false, 10, false, current_timestamp, NULL);
