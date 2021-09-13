
const db = require("./db/connection")
const inquirer = require('inquirer');
const table = require("console.table");

const promptMsg = {
  viewEmployees: "View All Employees",
  filterByManager: "Filter Employees by Manager",
  filterByDept: "Filter Employees by Department",
  viewDept: "View Departments",
  viewRoles: "View Roles",
  filterBudgetByDept: "View budget by Department",
  addEmployee: "Add Employee",
  updateEmployeeRole: "Update Employee Role",
  updateEmployeeManager: "Update Employee Manager",
  deleteEmployee: "Remove An Employee",
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
        promptMsg.filterByManager,
        promptMsg.filterByDept,
        promptMsg.viewDept,
        promptMsg.viewRoles,
        promptMsg.filterBudgetByDept,
        promptMsg.addEmployee,
        promptMsg.updateEmployeeRole,
        promptMsg.updateEmployeeManager,
        promptMsg.deleteEmployee,
        promptMsg.exit
    ]
  })
  .then(response => {
    switch(response.task) {
      case promptMsg.viewEmployees:
        viewEmployees();
        break;
      case promptMsg.filterByManager:
        filterByManager();
        break;

      case promptMsg.filterByDept:
        filterByDept();
        break;

      case promptMsg.viewDept:
        viewDept();
        break;

      case promptMsg.viewRoles:
        viewRoles();
        break;

      case filterBudgetByDept:
        console.log('This is the combined salary of all employees in the department')
        filterBudgetByDept();
        break;

      case addEmployee:
				addEmployee();
				break; 

      case updateEmployeeRole:
        updateEmployeeRole();
        break;

      case updateEmployeeManager:
        updateEmployeeManager();
        break;

      case deleteEmployee:
        deleteEmployee();
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

// const filterByManager = () => {
//   let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
//   db.query(query, function (err, res) {
//     if(res) {
//       console.table(res);
//     } else {
//     return err;
//     }

//     // Return to Menu
//     promptUser();
//   })
// };

// const filterByDept = () => {
//   let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
//   db.query(query, function (err, res) {
//     if(res) {
//       console.table(res);
//     } else {
//     return err;
//     }

//     // Return to Menu
//     promptUser();
//   })
// };

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

// const filterBudgetByDept = () => {
//   let query = "SELECT FROM * DEPARTMENT";
//   db.query(query, function (err, res) {
//     if(res) {
//       console.table(res);
//     } else {
//     return err;
//     }

//     // Return to Menu
//     promptUser();
//   })
// };

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
        console.table(res);
      } else {
      return err;
      }
    })
  // Return to Menu
  promptUser();
  });
};