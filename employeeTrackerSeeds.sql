DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT default 0,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT default 0,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
  
);

INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO departments (name)
VALUES ("Engineering");

INSERT INTO departments (name)
VALUES ("Finance");

INSERT INTO departments (name)
VALUES ("Legal");





INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Person", 80000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 150000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);



