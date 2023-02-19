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
    ('Joe', 'Smith', 1, 2),
    ('Jane', 'Lane', 2, NULL),
    ('Ann','Ghanon', 3, 4),
    ('John','Roatman', 4, NULL),
    ('Trisha','Mongomery', 5, 6),
    ('Daniel','Cooper', 6, NULL),
    ('Alexa','Williams', 7, 8),
    ('Bruce','Gonzales', 8, NULL);
    