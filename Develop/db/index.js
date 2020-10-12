const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");
const connection = require("./connection");
require("console.table");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  allEmployees() {
    return this.connection.query(
      "SELECT employee.id FROM employees.employee ORDER BY id ASC;"
    );
  }
  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  findAllDepartments() {
    return this.connection.query("SELECT * FROM employees.department;");
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  findEmployeesByDepartment() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;"
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  findAllEmployeesByRole(roleId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE role.id = ?;",
      roleId
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Find all employees except the given employee id
  findAllPossibleManagers() {
    return this.connection.query(
      "SELECT CONCAT(e2.first_name, ' ', e2.last_name) AS manager, e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary FROM employee as e1 LEFT JOIN role on e1.role_id = role.id LEFT JOIN department on role.department_id = department.id INNER JOIN employee as e2 on e2.id = e1.manager_id ORDER BY manager DESC;"
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  findManagerByManagerId() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role_id, manager_id FROM employee LEFT JOIN employees.role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE manager_id is NULL;"
    );
  }
  ///////////////////////////////////////////////////////////////////////
  createNewEmployee() {
    return connection.query("SELECT * FROM role", function (err, result) {
      if (err) throw err;
      return connection.query("SELECT * FROM employee", function (
        err,
        response
      ) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?"
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?"
            },
            {
              name: "title",
              type: "list",
              messages: "What is the employee's role?",
              choices: function () {
                const roleArr = [];
                for (let i = 0; i < result.length; i++) {
                  roleArr.push(result[i].title + "_" + result[i].id);
                }
                return roleArr;
              }
            },
            {
              name: "manager",
              type: "list",
              message: "Who is the new employee's manager?",
              choices: function () {
                const managerArr = [];
                for (let i = 0; i < response.length; i++) {
                  managerArr.push(
                    response[i].first_name +
                      " " +
                      response[i].last_name +
                      "_" +
                      response[i].id
                  );
                }
                return managerArr;
              }
            }
          ])
          .then(answer => {
            const role = answer.title;
            const manager = answer.manager;
            const selectedManager = parseInt(manager.split("_").pop());
            const selectedRole = parseInt(role.split("_").pop());

            const add =
              "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
            connection.query(
              add,
              [
                answer.first_name,
                answer.last_name,
                selectedRole,
                selectedManager
              ],
              (err, res) => {
                if (err) throw err;
              }
            );
          });
      });
    });
  }

  deleteEmployee() {
    return this.connection.query("SELECT * FROM employee", function (
      err,
      result
    ) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select employee for removal",
            choices: function () {
              const selection = [];
              for (let i = 0; i < result.length; i++) {
                selection.push(
                  result[i].first_name + " " + result[i].last_name
                );
              }
              return selection;
            }
          }
        ])
        .then(answer => {
          let terminatedEmployeeId = [];
          for (let i = 0; i < result.length; i++) {
            if (
              result[i].first_name + " " + result[i].last_name ==
              answer.employee
            ) {
              terminatedEmployeeId = parseInt(result[i].id);
            }
          }
          const query = "DELETE FROM employee WHERE id = ?";
          connection.query(query, [terminatedEmployeeId]),
            err => {
              if (err) {
                throw err;
              } else {
                return;
              }
            };
        });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Update the given employee's role
  setEmployeeRole() {
    return this.connection.query();
  }

  // Update the given employee's manager
  setEmployeeManager() {
    return this.connection.query();
  }

  // Find all roles, join with departments to display the department name

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  createNewRole(role) {
    return this.connection.query("INSERT INTO employees.role SET ?", role);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  // viewEmployeesByDepartment()

  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // // Remove a department
  removeDepartment(department) {
    return this.connection.query(department);
  }
  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  //Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB(connection);
