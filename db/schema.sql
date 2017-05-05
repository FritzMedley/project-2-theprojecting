create database project_2; 

use project_2; 

create table events( 
	id int not null auto_increment, 
	name varchar(60) not null, 
	location varchar(75) not null, 
	categories varchar(30) not null, 
	time_date timestamp not null default now(), 
	primary key (id)
)

	category varchar(30) not null, 
	time_date timestamp not null default now(), 
	primary key (id)
);
