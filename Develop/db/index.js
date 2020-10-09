const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  viewEmployeesByDepartment() {
    return this.connection.query();
  }
  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query();
    //TODO: complete the function

    // Create a new employee
  }
  createNewEmployee() {
    return this.connection.query();
  }

  // Remove an employee with the given id
  removeEmployee() {
    return this.connection.query();
  }
  // Update the given employee's role
  updateEmployee() {
    return this.connection.query();
  }
  // Update the given employee's manager
  updateManager() {
    return this.connection.query();
  }
  // Find all roles, join with departments to display the department name
  findAllRoles(role) {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",
      role
    );
  }

  // Create a new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  // viewEmployeesByDepartment()
  // Create a new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  // Remove a department
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
  findAllEmployeesByRole(roleId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN role role.role_id = WHERE department.id = ?;",
      roleId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB(connection);
