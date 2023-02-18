INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Information Technology');

INSERT INTO role (title, salary, department)
VALUES
    ('Programmer', 100000,2),
    ('Programming Manager', 200000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Joe', 'Smith', 2, NULL),
    ('Jane', 'Lane', 1, 1);