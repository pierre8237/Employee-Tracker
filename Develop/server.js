const prompt = require("inquirer");
const db = require("./db");
const consoleTable = require("console.table");

//Run the program
loadMainPrompts();

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View all Employees by Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employess by Role",
          value: "VIEW_EMPLOYEES_BY_ROLE"
        },
        {
          name: "Add Employee",
          value: "CREATE_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_BY_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);
  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();

    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    //..other functions

    case "VIEW_EMPLOYEES_BY_ROLE":
      return viewEmployeesByRole();

    case "CREATE_EMPLOYEE":
      return createNewEmployee();

    case "REMOVE_EMPLOYEE":
      return removeEmployee();

    case "UPDATE_EMPLOYEE_BY_ROLE":
      return updateEmployeeRole();

    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();

    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);
  console.log(departmentId + "department ID");

  const employees = await db.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

//

async function viewEmployeesByRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to see employees for?",
      choices: roleChoices
    }
  ]);

  const employees = await db.findAllEmployeesByRole(roleId);

  console.log("\n");
  console.log(employees);

  loadMainPrompts();
}

//
function quit() {
  console.log("Goodbye!");
  process.exit();
}
