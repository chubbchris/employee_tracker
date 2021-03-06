DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE departments(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(6,2) NOT NULL,
department_id INTEGER ,
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
roles_id INTEGER,
manager_id INTEGER NULL,
CONSTRAINT fk_role FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL,
CONSTRAINT fk_manager  FOREIGN KEY (manager_id) REFERENCES employee(id)  ON DELETE SET NULL
);
    
