use taxi_service;

insert into roles (role) values ('client'),
								('driver'),
                                ('organization'),
                                ('dispatcher');
                                
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
