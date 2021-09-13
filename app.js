
const db = require("./db/connection")
const inquirer = require('inquirer');
const table = require("console.table");


const promptMsg = {
  viewEmployees: "View All Employees",
  viewDept: "View Departments",
  viewRoles: "View Roles",
  filterBudgetByDept: "View budget by Department",
  addEmployee: "Add Employee",
  addDept: "Add Department",
  addRole: "Add Role",
  updateEmployeeRole: "Update Employee Role",
  exit: "Exit"

}

console.log(`
============================
          EMPLOYEE
          MANAGER
============================`)

promptUser()

// Prompt User
function promptUser() {
  inquirer.prompt({
    name: 'task',
    type: 'list',
    message: "What would you like to do?",
    choices: [
        promptMsg.viewEmployees,
        promptMsg.viewDept,
        promptMsg.viewRoles,
        promptMsg.addEmployee,
        promptMsg.addDept,
        promptMsg.addRole,
        promptMsg.updateEmployeeRole,
        promptMsg.exit
    ]
  })
  .then(response => {
    switch(response.task) {
      case promptMsg.viewEmployees:
        viewEmployees();
        break;

      case promptMsg.viewDept:
        viewDept();
        break;

      case promptMsg.viewRoles:
        viewRoles();
        break;

      case promptMsg.addEmployee:
				addEmployee();
				break;

      case promptMsg.addDept:
        addDept();
        break; 

      case promptMsg.addRole:
        addRole();
        break; 

      case promptMsg.updateEmployeeRole:
        updateEmployeeRole();
        break;

      case "Exit":
        console.log("Bye");
        db.end();
        break;
    }
  });
}

const viewEmployees = () => {
  let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  db.query(query, function (err, res) {
    if(res) {
      console.table(res);
    } else {
    return err;
    }

    // Return to Menu
    promptUser();
  })
};

const viewDept = () => {
  let query = "SELECT * FROM DEPARTMENT";
  db.query(query, function (err, res) {
    if(res) {
      console.table(res);
    } else {
    return err;
    }

    // Return to Menu
    promptUser();
  })
};

const viewRoles = () => {
  let query = "SELECT * FROM ROLE";
  db.query(query, function (err, res) {
    if(res) {
      console.table(res);
    } else {
    return err;
    }

    // Return to Menu
    promptUser();
  })
};

const addEmployee = () => {
  inquirer.prompt([
    {
    type: "input",
    message: "enter employees first name",
    name: "firstname"
    },
    {
      type: "input",
      message: "enter employees last name",
      name: "lastname"
    },

  ]).then(response => {
    db.query(
    "INSERT INTO employee SET ?",
    {
      first_name: response.firstname,
      last_name: response.lastname,
      role_id: null,
      manager_id: null
    },
    function (err, res) {
      if(res) {
        console.log('Employee Added!');
      } else {
      return err;
      }
    })
  // Return to Menu
  promptUser();
  });
};

const addDept = () => {
  inquirer.prompt({
    type: "input",
    message: "What is the name of the department you want to add?",
    name: "dept"
  }).then(res => {
    const dept = res.dept;
    const query = `INSERT INTO DEPARTMENT (name) VALUES("${dept}")`;
    db.query(query, (err, res) => {
      if(res) {
        console.log("Your new department has been added!");
      } else {
      return err;
      }
    })
  // Return to Menu
  promptUser();
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the role title you want to add?",
      name: "role"
    },

    {
      type: "input",
      message: "What is the salary for this position?",
      name: "salary"
    },
    
    {
      type: "input",
      message: "What is the department ID for this position?",
      name: "departmentID"
    }

  ]).then(res => {
      const role = res.role;
      const salary = res.salary;
      const departmentID = res.departmentID;
      const query = `INSERT INTO ROLE (title, salary, department_id) VALUE("${role}", "${salary}", "${departmentID}")`;
      db.query(query, (err, res) => {
        if(res) {
          console.log('Your new role has been added!');
        } else {
        return err;
        }
      })
    // Return to Menu
    promptUser();
    });
};

const updateEmployeeRole = () => {
  let query = "SELECT first_name, last_name, id FROM employee";
  db.query(query, function (err, res) {
    if(res) {
      let employees = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}));
      inquirer.prompt([
        {
          type: "list",
          name: "employeeName",
          message: "Which employee's role would you like to update?", 
          choices: employees
        },
        {
          type: "input",
          name: "role",
          message: "What is your new role? (ENTER THE ROLE ID NUMBER)"
        }
      ]).then (res => {
        db.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
        function (err, res){
        if (res) {
        console.log("Role Updated!");

        // Return to Menu
        promptUser();
      
        } else {
        return err;
        }
      });
    })
    } else {
      return err;
    };
})};