INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Information Technology');
    ('Finance'),
    ('Marketing');

INSERT INTO role (title, salary, department, role_id,manager_id)
VALUES
    ('Human Resources assistant',60000, 1, NULL),--role_id 
    ('Human Resources Manager', 90000, 1, 1),--manager_id
    ('Programmer', 100000, 2, NULL),--role_id 
    ('Programming Manager', 200000, 2, 2),--manager_id
    ('Accountant', 90000, 3, NULL),--role_id 
    ('Finance Manager', 100000, 3, 3),--manager_id
    ('Ilustrater', 80000, 4, NULL),--role_id 
    ('Marketing Manager', 100000, 4, 4);--manager_id

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