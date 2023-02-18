const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db =    mysql.createConnection({
    host:   'localhost',
    user:   'florEchaiz',
    password:   'tjBaKUs6.',
    database:   'employees_db'
});

const all_employees_query = `
SELECT
    t1.id,
    t1.first_name,
    t1.last_name,
    t1.title,
    t1.department,
    t1.salary,
    CONCAT(t2.first_name, ' ', t2.last_name) AS manager
FROM
    (SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        employee.manager_id
    FROM 
        employee, 
        role, 
        department
    WHERE 
        employee.role_id = role.id
        AND role.department = department.id) AS t1
    LEFT JOIN employee AS t2
    ON t1.manager_id = t2.id
ORDER BY 1 ASC
;`;

const all_roles_query = `
SELECT
    role.id,
    role.title,
    department.name as department,
    role.salary
FROM
    role,
    department
WHERE
    role.department = department.id
ORDER BY 1 ASC
;`;


// GIVEN a command-line application that accepts user input


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Select one of the following options',
        name: 'userSelection',
        choices: ['view all departments', 
                'view all roles', 
                'view all employees', 
                'add a department', 
                'add a role', 
                'add an employee', 
                'update an employee role']


    }).then(answer => {
        // find out which they chose

        // WHEN I choose to view all departments
        if (answer.userSelection === 'view all departments') {
            db.query("select * from department", (err, result) => {
                // THEN I am presented with a formatted table showing department
                //names and department ids
                console.table(result);
                promptUser();
            });
        }

        // WHEN I choose to view all roles
        if (answer.userSelection === 'view all roles') {
            db.query(all_roles_query, (err, result) => {
                // THEN I am presented with the job title, role id, the department
                // that role belongs to, and the salary for that role
                console.table(result);///* ? deparment should be name not number */
                promptUser();
            });
        }

        // WHEN I choose to view all employees
        
        if (answer.userSelection === 'view all employees') {
            // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles,
            // departments,salaries, and managers that the employees report to
            db.query(all_employees_query, (err, result) => {
                console.table(result);
                promptUser();
            });
        }

        // WHEN I choose to add a department
        if (answer.userSelection === 'add a department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deparment',
                    message: 'Enter department name: ',
                }
            ])
                // THEN I am prompted to enter the name of the department and that department is added to the database
                .then(input => {
                    var department = input.deparment;
                    db.query(`INSERT INTO department (name) values ('${department}')`)
                    console.log('Added '+ department +' to the database')
                    promptUser();
                })
        }

        // WHEN I choose to add a role
        
        if (answer.userSelection === 'add a role') {
            // THEN I am prompted to enter the name, salary, and department for the role and 
            inquirer.prompt([
            {
                    type: 'input',
                    name: 'title',
                    message: 'Enter role name: ',
                },

            {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary: ',
                },

            {
                    type: 'input',
                    name: 'department',
                    message: 'Enter department: ',
                } 
                
            ])
                //that role is added to the database
                .then(input => {
                    var title = input.title;
                    var salary = input.salary;
                    var department = input.department;

                    db.query(`INSERT INTO role (title, salary) VALUES ('${title}', '${salary}');
                    INSERT INTO department (name) VALUES ('${department}')`);
                    console.log('Added ' + title + ' ' + salary + ' '+department+  ' to the database')
                    promptUser();
                })
        }
        // WHEN I choose to add an employee
        if (answer.userSelection === 'add an employee') {
            // THEN I am prompted to enter the employee’s first name, last name, role, and manager,
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter employees first name: ',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter employees last name: ',
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter employees role: ',
                },
                {
                    type: 'input',
                    name: 'employeeManager',
                    message: 'Enter employees manager: ',
                }
            ])
                //and that employee is added to the database
                .then(input => {
                    var firstName = input.firstName;
                    var lastName = input.lastName;
                    var role_id = input.title;
                    var manager_id = input.employeeManager;

                    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) values ('${firstName}','${lastName}',${role_id}, ${manager_id})`)
                    console.log('Added employee to the database')
                    promptUser()
                })
        }
        // WHEN I choose to update an employee role 
        if (answer.userSelection === 'update an employee role') {
            db.query("select CONCAT(first_name, ' ', last_name) as full_name from employee", (err, result) => {
                var options = [];
                for (var i = 0; i < result.length; i++) {
                    options.push(result[i].full_name)
                }
                // THEN I am prompted to select an employee to update
                inquirer.prompt({
                type: 'list',
                message: 'Which employees role do you want to update?',
                name: 'full_name',
                choices: options
                })
                 //and their new role 
                .then(({full_name}) => {
                    console.log(full_name);
                    db.query("select title from role", (err, result) => {
                        var options = [];
                        for (var i = 0; i < result.length; i++) {
                            options.push(result[i].title)
                        }
                        inquirer.prompt({
                            type: 'list',
                            message: 'Which role do you want to assign?',
                            name: 'role',
                            choices: options
                        })
                        .then(({role}) => {
                            db.query(`select id from role where title = '${role}'`, (err, result) => {
                                var role_id = result[0].id;
                                db.query(`select id from employee where CONCAT(first_name, ' ', last_name) = '${full_name}'`, (err, result) => {
                                    var employee_id = result[0].id;
                                    //and this information is updated in the database
                                    db.query(`update employee set role_id = ${role_id} where id = ${employee_id}`, (err, result) => {
                                        promptUser();
                                    });
                                });
                            });
                        });
                    })
                });
            })
            
        }
    })
}
const init = () => {
    promptUser()
}
init();


