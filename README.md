# Unit 12 MySQL Homework: Employee Tracker
## The Employee Tracker is a CLI app using Node.js, Inquirer, and mysql to interface with a mySQL database which contains the employee data from a fiction company organized into three tables: employee, role, department. Fields include: employee name; first and last, employee role, and role id, manager id, department name and id. Tables can be added to and removed. Some of the functions include, viewing all departments, viewing all roles, viewing all employees, viewing emplyoees based on role, viewing employees based on department, viewing managers, viewing employees based on manager. Employees can also be added and removed. 

#The current version has bugs! 
##The add and remove employee functions work, however the app needs to be restarted to view the changes. Selecting the view all employees function from the menu of inquirer prompts will show the changes.          

## Instructions

Design the following database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
