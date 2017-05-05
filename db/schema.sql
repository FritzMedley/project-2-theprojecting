create database veni_vidi_db; 

use veni_vidi_db; 

create table events( 
	id int not null auto_increment, 
	name varchar(60) not null, 
	location varchar(75) not null, 
	category varchar(30) not null, 
	time_date timestamp not null default now(), 
	primary key (id)
);