use taxi_service;

insert into roles (role) values ('client'),
								('driver'),
                                ('organization');
                              
insert into cars_brands (name) values ('Mercedes'),
									  ('Volkswagen');


insert into cars_models (name, cars_brands_id) values ('Sprinter', 1),
													  ('Vito', 1),
                                                      ('Citan', 1),
                                                      ('Transporter', 2),
                                                      ('Crafter', 2);

insert into payment_types (type) values ('non-cash'),
										('cash');

insert into ratings (rating) values ('very good'),
									('good'),
									('normally'),
                                    ('bad');

insert into statuses (status) values ('registration is opended'),
									 ('registration is closed'),
									 ('on the road'),
                                     ('ride is finished');

insert into points (name, address) values ('Grorodecheno', ' Grorodechno village, Oktyabrskaya street'),
										  ('Minsk', 'L. Bedy street 4'), 
										  ('Novogrudok', 'Lenina square 5'), 
										  ('Grodno', 'Bogdanovicha street 5'); 

