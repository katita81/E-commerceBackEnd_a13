INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Information Technology'),
    ('Finance'),
    ('Marketing');

INSERT INTO role (title, salary, department)
VALUES
    ('Human Resources assistant',60000, 1), 
    ('Human Resources Manager', 90000, 1),
    ('Programmer', 100000, 2), 
    ('Programming Manager', 200000, 2),
    ('Accountant', 90000, 3), 
    ('Finance Manager', 100000, 3),
    ('Ilustrater', 80000, 4), 
    ('Marketing Manager', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Joe', 'Smith', 1, NULL),
    ('Jane', 'Lane', 1, 1),
    ('Ann','Ghanon', 2, NULL),
    ('John','Roatman', 2, 2),
    ('Trisha','Mongomery', 3, NULL),
    ('Daniel','Cooper', 3, 3),
    ('Alexa','Williams', 4, NULL),
    ('Bruce','Gonzales', 4, 4);