const mysql = require("mysql2");
const cTable = require('console.table');
var figlet = require('figlet');
 
figlet(`Employee \n Manager`, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "businessDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id: " + connection.threadId);
promptUser();

});




departments = () => {
    connection.query(
      `SELECT * FROM departments`,
      function (err, results, fields) {
        console.table(results);
        promptUser();
      }
    );
  };
  
  roles = () => {
    connection.query(`SELECT * FROM roles`, 
    function (err, results, fields) {
      console.table(results);
      promptUser();
    });
  };
  employees = () => {
    connection.query(`SELECT E.id, E.first_name, E.last_name,
    R.title AS role,
    CONCAT(EM.first_name, " ", EM.last_name) 
    AS manager FROM employees AS E
    LEFT JOIN roles AS R ON E.role_id = R.id
    JOIN employees AS EM
    ON E.manager_id = EM.id;`, 
    function (err, results, fields) {
      console.table(results);
      promptUser();
    });
  };
  
  const fetch = require("node-fetch");
  const fs = require("fs");
  const inquirer = require("inquirer");
const { stringify } = require("querystring");
const { format } = require("mysql2");
const { connect } = require("http2");
  const usersRequests = [];
  
  
  //inquirer inputs
  //Prompt user
  const promptUser = () => {
      return inquirer.prompt([
          {
              type: 'list',
              name: 'action',
              message: 'What would you like to do?',
              choices: ['View All Employees', 'View All Employees By Department', 
              'View All Employees By Manager', 'Add Employee', 'Remove Employee', 
              'View All Departments', 
              'Add Department', 'Remove Department', 'View All Roles', 'Add Role',  'Remove Role']
          }
      ])
      .then((userInput) => {
          if(userInput.action === 'View All Employees'){
              employees();
          }
          //Start Add Employee
          else if(userInput.action === 'Add Employee'){
              
              //get new employee info to be used to create new employee
              const addNewEmployee = (employee) => {
                  return inquirer.prompt([
                      {
                          type: 'input',
                          name: 'firstName',
                          message: "Enter the new employee's first name.",
                          validate: (firstNameInput) => {
                              if (firstNameInput) {
                                return true;
                              } else {
                                console.log("Please enter the employee's first name.");
                                return false;
                              }
                            },
                      },
                      {
                          type: 'input',
                          name: 'lastName',
                          message: "Enter the new employee's last name.",
                          validate: (lastNameInput) => {
                              if (lastNameInput) {
                                return true;
                              } else {
                                console.log("Please enter the employee's last name.");
                                return false;
                              }
                            },
                      },
                      {
                          type: 'input',
                          name: 'roleId',
                          message: "Enter the new employee's role ID.",
                          validate: (roleIdInput) => {
                              if (roleIdInput) {
                                return true;
                              } else {
                                console.log("Please enter the employee's role ID.");
                                return false;
                              }
                            },
                      },
                      {
                          type: 'input',
                          name: 'managerId',
                          message: "Enter the new employee's manager's ID.",
                          validate: (managerIdInput) => {
                              if (managerIdInput) {
                                return true;
                              } else {
                                console.log("Please enter the employee's manager's ID.");
                                return false;
                              }
                            },
                      }
                  ])
                  //take all the prompt results and plug them into the INSERT INTO sql statement
                  .then(addEmployee = (userInput) => {
                      connection.query(
                          'INSERT INTO employees SET ?',
                          {
                              first_name: userInput.firstName,
                              last_name: userInput.lastName,
                              role_id: userInput.roleId,
                              manager_id: userInput.managerId
                          }
                      )
                      employees();
                    });
              }
              addNewEmployee();
          }
          //End Add Employee

          //Start Remove Employee
          else if(userInput.action === 'Remove Employee'){
              //Ask user to enter an id to remove
              removeEmployee();
          }
          //End Remove Employee

          //Start update employee
          else if(userInput.action === 'Update Employee Role'){
              updateEmployeeRole();
          }
          //End update employee


          else if(userInput.action === 'View All Employees By Department'){
              viewAllEmployeesByDepartment();
          }
          else if(userInput.action === 'View All Employees By Manager'){
              viewAllEmployeesByManager();
          }
          else if(userInput.action === 'View All Departments'){
              departments();
          }
          else if(userInput.action === 'Add Department'){
              addDepartment();
          }
          else if(userInput.action === 'Remove Department'){
              removeDepartment();
          }
          else if(userInput.action === 'View All Roles'){
              roles();
          }
          else if(userInput.action === 'Add Role'){
              addRole();
          }
          else if(userInput.action === 'Remove Role'){
              removeRole();
          }
      })
  }
  



  //Start of delete employee function
  const removeEmployee = () => {
    connection.query(
      `SELECT CONCAT (first_name, " ", last_name) AS full_name
      FROM employees`,
      function (err, results) {

          results = JSON.stringify(results);
          let fullNameObject = JSON.parse(results);

          fullNameObject = fullNameObject.map(obj => {
              return obj.full_name;
          })

          return inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee would you like to remove?",
                choices: fullNameObject
            }
          ])
          //convert full name into an object with first_name key and last_name key
          .then(convertSelection = (selection) =>{
              let deletedEmployeeName = selection.employee;
              let newArray = deletedEmployeeName.split(' ');
              return newArray;
          })
          //take user input and plug it into delete sql function
          .then(deleteEmployee = (name) => {
            connection.query(
                `DELETE FROM employees WHERE first_name = '${name[0]}' AND last_name = '${name[1]}'`,
            )
            employees()
          });
      });
  }
//End of delete employee function

//Start of view employee by department function
const viewAllEmployeesByDepartment = () => {
    connection.query(
        `SELECT department_name FROM departments`,
    function(err, selection){
        //turn into string
        selection = JSON.stringify(selection);
        //parse string into array
        let parsedSelection = JSON.parse(selection);
 

        let formattedSelection = parsedSelection.map(obj => {
          
            return obj.department_name;
        })


        return inquirer.prompt([
            {
                type: 'list',
                name: 'employeeByDepartment',
                message: "Select a department to list employees",
                choices: formattedSelection
            }
          ])
          .then(finedEmployees = (department) =>{
            connection.query(
                `SELECT id FROM departments WHERE department_name = '${department.employeeByDepartment}'`,
                function (err, results) {
                results = JSON.stringify(results);
                let convertedObject = JSON.parse(results);
                let department_id = convertedObject[0].id;
                connection.query(
                `SELECT id FROM roles WHERE department_id = ${department_id}`,
                //now get all employees based off of the multiple department ids
                function (err, results, fields) {
                    if(err) console.log(err);
                    results = results.map(obj => obj.id);
                    results = results.join(' || role_id = ')
                    
                      connection.query(
                        `SELECT * FROM employees WHERE role_id = ${results} \n`,
                        function(err, results){
                          if (err) throw err;
                          console.table(results);
                          promptUser();
                        }
                        
                      )
                        }
                );
                }
            )
          })
          
    }
    );
  };
//End of view employee by department function


//Start of view employee by manager id
const viewAllEmployeesByManager = () => {
return inquirer.prompt([
    {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager id to view all employees under corresponding manager',
        validate: (managerId) => {
            if (managerId) {
              return true;
            } else {
              console.log("Please enter a manager id.");
              return false;
            }
          },
    }
])
.then((managerId) => {
    connection.query(
        'SELECT * FROM employees WHERE ?',
        {
            manager_id: managerId.managerId
        },
        function (err, results, fields) {
            if(err) console.log(err);
            console.table(results);
            promptUser();
                }
    )
})


};
//end of view employee by manager


//start of update employee role
let updateEmployeeRole = () => {
      connection.query(
        `SELECT CONCAT (first_name, " ", last_name) AS full_name
        FROM employees
        UNION
        SELECT title AS title
        FROM roles`,
        function (err, results) {
          
          console.log(results, 'results')
            results = JSON.stringify(results);
            let fullNameObject = JSON.parse(results);
            console.log(fullNameObject, 'full name object')
  
            fullNameObject = fullNameObject.map(obj => {
              console.log(obj.full_name)
                return obj.full_name;
            })
  
            return inquirer.prompt([
              {
                  type: 'list',
                  name: 'employee',
                  message: "Which employee would you like to update the role of?",
                  choices: fullNameObject
              },
              {
                type: 'list',
                name: 'newRole',
                message: 'Select their new role.',
                choices: ['Sales_Lead 1', 'Salesperson 2', 'Lead_Engineer 3', 'Software_Engineer 4', 'Accountant 5', 'Lawyer 7', 'Legal_Team_Lead 6']
              }
            ])
            //convert full name into an object with first_name key and last_name key
            .then(convertSelection = (selection) =>{
                console.log(selection, 'selection line 353')
                let chosenEmployee = selection.employee;
                let chosenRole = selection.newRole;
                chosenEmployee = chosenEmployee.split(' ')
                chosenRole = chosenRole.split(' ')
                console.log(chosenEmployee, 'employee')
                console.log(chosenRole, 'role');
                connection.query(
                  `UPDATE employees SET role_id = ${parseInt(parseInt(chosenRole[1]))} WHERE first_name = '${chosenEmployee[0]}' AND last_name = '${chosenEmployee[1]}'`,
                  function (err, results, fields) {
                    if(err) console.log(err);
                    employees();
                        }
              )
          
            })
        });
}

//end of update employee role

//Start of add department
//get new employee info to be used to create new employee
const addDepartment = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: "Enter the new department name.",
          validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter the department name.");
                return false;
              }
            },
      }
  ])
  //take all the prompt results and plug them into the INSERT INTO sql statement
  .then(updateDepartments = (userInput) => {
      connection.query(
          'INSERT INTO departments SET ?',
          {
              department_name: userInput.name
          }
      )
      departments();
    });
}
//End of add department

//Start of delete department
const removeDepartment = () => {
  connection.query(
    `SELECT department_name FROM departments`,
    function (err, results) {
        results = JSON.stringify(results);
        let departmentToBeDeleted = JSON.parse(results);
        departmentToBeDeleted = departmentToBeDeleted.map(obj => {
            return obj.department_name;
        })
        return inquirer.prompt([
          {
              type: 'list',
              name: 'department',
              message: "Which department would you like to remove?",
              choices: departmentToBeDeleted
          }
        ])
        //convert full name into an object with first_name key and last_name key
        .then(convertSelection = (selection) =>{
            let deletedDepartment = selection.department;
            return deletedDepartment;
        })
        //take user input and plug it into delete sql function
        .then(deleteEmployee = (department) => {
          connection.query(
              `DELETE FROM departments WHERE department_name = '${department}'`,
          )
          departments()
        });
    });
}
//End of delete department

//Start of add Role
// title, salary, department_id
const addRole = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: "Enter the new role title.",
          validate: (titleInput) => {
              if (titleInput) {
                return true;
              } else {
                console.log("Please enter the new role title.");
                return false;
              }
            },
      },
      {
        type: 'input',
        name: 'salary',
        message: "Enter the new salary for this role.",
        validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log("Please enter the new salary.");
              return false;
            }
          },
    },
    {
      type: 'input',
      name: 'department',
      message: "Enter the associated department id.",
      validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter the associated department id.");
            return false;
          }
        },
  }
  ])
  //take all the prompt results and plug them into the INSERT INTO sql statement
  .then(updateRole = (userInput) => {
      connection.query(
          'INSERT INTO roles SET ?',
          {
              title: userInput.title,
              salary: userInput.salary,
              department_id: userInput.department
          }
      )
      roles();
    });
}
//End of add Role

//Start of delete role
const removeRole = () => {
  connection.query(
    `SELECT title FROM roles`,
    function (err, results) {
        results = JSON.stringify(results);
        let roleToBeDeleted = JSON.parse(results);
        roleToBeDeleted = roleToBeDeleted.map(obj => {
            return obj.title;
        })
        return inquirer.prompt([
          {
              type: 'list',
              name: 'role',
              message: "Which role would you like to remove?",
              choices: roleToBeDeleted
          }
        ])
        //convert full name into an object with first_name key and last_name key
        .then(convertSelection = (selection) =>{
            let newArray = selection.role;
            // let newArray = deletedRole.split(' ');
            return newArray;
        })
        //take user input and plug it into delete sql function
        .then(deleteEmployee = (title) => {
          connection.query(
              `DELETE FROM roles WHERE title = '${title}'`,
          )
          roles()
        });
    });
}
//End of delete role