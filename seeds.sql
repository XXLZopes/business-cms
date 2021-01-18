INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO departments (department_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, 2),
('Mike', 'Chan', 2, 2),
('Ashley', 'Rodrigue', 3, 2),
('Keven', 'Tupik', 4, 2),
('Malia', 'Brown', 5, 2),
('Sarah', 'Lourd', 7, 2),
('Tom', 'Allen', 7, 2),
('Tammer', 'Doe', 6, 2);

