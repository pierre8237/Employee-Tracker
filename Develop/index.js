const inquirer = require("inquirer");
const connection = require("./db");
const db = require("./db");
const mysql = require("mysql");
require("console.table");

//Run the program
loadMainPrompts();

async function loadMainPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all Employees",
            value: "SELECT_ALL_EMPLOYEES"
          },
          {
            name: "View all Employees by Department",
            value: "SELECT_ALL_EMPLOYEES_BY_DEPARTMENT"
          },
          {
            name: "View all Employees by Manager",
            value: "SELECT_ALL_EMPLOYEES_BY_MANAGER"
          },
          {
            name: "View All Employess by Role",
            value: "SELECT_ALL_EMPLOYEES_BY_ROLE"
          },
          {
            name: "Add Employee",
            value: "INSERT_EMPLOYEE"
          },
          {
            name: "Remove Employee",
            value: "DELETE_EMPLOYEE"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ])
    .then(answers => {
      switch (answers.choice) {
        case "SELECT_ALL_EMPLOYEES":
          return viewEmployees();

        case "SELECT_ALL_EMPLOYEES_BY_DEPARTMENT":
          return viewEmployeesByDepartment();

        case "SELECT_ALL_EMPLOYEES_BY_MANAGER":
          return viewEmployeesByManager();

        case "SELECT_ALL_EMPLOYEES_BY_ROLE":
          return viewEmployeesByRole();

        case "INSERT_EMPLOYEE":
          return addNewEmployee();

        case "DELETE_EMPLOYEE":
          return removeEmployee();

        case "QUIT":
          return quit();
      }
    });
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();
  ///find all employees runs the query to SELECT all employees
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
/////////////////////////////////////////////////////////////////////////////////////

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();
  ///find all departments runs the query to SELECT all departments
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const { departmentId } = await inquirer.prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);
  console.log(departmentId + "department ID");
  const employeesByDept = await db.findAllEmployeesByDepartment(departmentId);
  ///find all employees by department runs the query to SELECT all employees filtered by department
  console.log("\n");
  console.table(employeesByDept);
  console.log(departmentId);
  loadMainPrompts();
}
//////////////////////////////////////////////////////////////////////////
async function viewEmployeesByManager() {
  const managers = await db.findAllPossibleManagers();
  // const employeesByManager = await db.findAllEmployeesByManager();

  console.log("\n");
  console.table(managers);
  loadMainPrompts();
}
///////////////////////////////////////////////////////////////

async function viewEmployeesByRole() {
  const roles = await db.findAllRoles();
  ///find all roles runs the query to SELECT all Roles
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to see employees for?",
      choices: roleChoices
    }
  ]);
  const employees = await db.findAllEmployeesByRole(roleId);
  ///find all employees by role runs the query to SELECT all employees filtered by role
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}

/////////////////////////////////////////////////////////////////////////////
// async function addNewRole() {
//   console.log("\n");
//   console.log(createNewDepartment);

//   loadMainPrompts();
// }
////////////////////////////////////////////////////////////////////////////////
// async function addNewDepartment() {
//   const createNewDepartment = await db.createNewDepartment();
//   console.log("\n");
//   console.log(createNewDepartment);

//   loadMainPrompts();
// }
////////////////////////////////////////////////////////////////////

// const createNewRole = await db.createNewRole();
// console.log("\n");
// console.log(createNewRole);

// loadMainPrompts();
/////////////////////////////////////

async function addNewEmployee(add) {
  add = await db.createNewEmployee();

  console.log("\n");
  console.table();
  loadMainPrompts();
}
////////////////////////////////////////////////////////////////
async function removeEmployee(terminated) {
  terminated = await db.deleteEmployee();

  console.log("\n");
  console.table();
  loadMainPrompts();
}
////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
function quit() {
  console.log("Goodbye!");
  process.exit();
}
