USE employeeDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

/* Sales Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 800000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 50000, 1);
/* Engineering Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);
/* Accounting Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 3);
/* Legal Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 100000, 4);

/* Employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Snow", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robb", "Stark", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bran", "Stark", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ned", "Stark", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Khal", "Drogo", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jorah", "Mormont", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ramsey", "Bolton", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arya", "Stark", 7, null);