INSERT INTO departments (name)
VALUES
('Management'),
('Temp employee'),
('Full time employee');


INSERT INTO roles (title,salary,department_id)
VALUES
('Manager',5000.00,1),
('Temp laborer',1000.00,2),
('Full time laborer',2500.00,3);


INSERT INTO employee
(first_name,last_name,roles_id,manager_id)
VALUES
('Greg', 'Popivich',1,null),
('Larry','Brown',1,null),
('J.R','Smith',2,1),
('Eric','Snow',2,1),
('Louis','Williams',2,2),
('Jae', 'Crowder',2,2),
('Paul','Goerge',3,2),
('David','Robinson',3,1),
('Karl','Malone',3,2),
('Steve','Nash',3,1);