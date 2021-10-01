CREATE DATABASE `accounting`;

CREATE TABLE accounting.person (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

CREATE TABLE accounting.entry (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payment_date` date DEFAULT NULL,
  `due_date` date NOT NULL,
  `description` varchar(80) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `person_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_person_id` (`person_id`),
  CONSTRAINT `FK_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

USE accounting;