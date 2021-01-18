// const fetch = require("node-fetch");
//   const fs = require("fs");
//   const inquirer = require("inquirer");
//   const usersRequests = [];
  
  
//   //inquirer inputs
//   //Prompt user
//   const promptUser = (userRequests) => {
//       return inquirer.prompt([
//           {
//               type: 'list',
//               name: 'action',
//               message: 'What would you like to do?',
//               choices: ['View All Employees', 'View All Employees By Department', 
//               'View All Employees By Manager', 'Add Employee', 'Remove Employee', 
//               'Update Employee Role', 'Update Employee Manager', 'View All Departments', 
//               'Add Department', 'Remove Department', 'View All Roles', 'Add Role',  'Remove Role']
//           }
//       ])
//       .then((userInput) => {
//           console.log(userInput)
//           if(userInput.action === 'View All Employees'){
//               employees();
//           }
//           else if(userInput.action === 'Add Employee'){
              
//               //get new employee info to be used to create new employee
//               const addNewEmployee = (employee) => {
//                   return inquirer.prompt([
//                       {
//                           type: 'input',
//                           name: 'firstName',
//                           message: "Enter the new employee's first name.",
//                           validate: (firstNameInput) => {
//                               if (firstNameInput) {
//                                 return true;
//                               } else {
//                                 console.log("Please enter the employee's first name.");
//                                 return false;
//                               }
//                             },
//                       },
//                       {
//                           type: 'input',
//                           name: 'lastName',
//                           message: "Enter the new employee's last name.",
//                           validate: (lastNameInput) => {
//                               if (lastNameInput) {
//                                 return true;
//                               } else {
//                                 console.log("Please enter the employee's last name.");
//                                 return false;
//                               }
//                             },
//                       },
//                       {
//                           type: 'input',
//                           name: 'roleId',
//                           message: "Enter the new employee's role ID.",
//                           validate: (roleIdInput) => {
//                               if (roleIdInput) {
//                                 return true;
//                               } else {
//                                 console.log("Please enter the employee's role ID.");
//                                 return false;
//                               }
//                             },
//                       },
//                       {
//                           type: 'input',
//                           name: 'managerId',
//                           message: "Enter the new employee's manager's ID.",
//                           validate: (managerIdInput) => {
//                               if (managerIdInput) {
//                                 return true;
//                               } else {
//                                 console.log("Please enter the employee's manager's ID.");
//                                 return false;
//                               }
//                             },
//                       }
//                   ])
//                   //take all the prompt results and turn them into an object to be inserted into employee table
//                   .then(addEmployee = (userInput) => {
//                       const query = connection.query(
//                           'INSERT INTO employees SET ?',
//                           {
//                               first_name: userInput.firstName,
//                               last_name: userInput.lastName,
//                               role_id: userInput.roleId,
//                               manager_id: userInput.managerId
//                           }
//                       )
//                       employees();
//                     });
//               }
//               addNewEmployee();
//           }
//           else if(userRequests.action === 'Remove Employee'){
//               removeEmployee();
//           }
//           else if(userRequests.action === 'Update Employee Role'){
//               updateEmployeeRole();
//           }
//           else if(userRequests.action === 'View All Employees By Department'){
//               viewAllEmployeesByDepartment();
//           }
//           else if(userRequests.action === 'View All Employee By Manager'){
//               viewAllEmployeesByManager();
//           }
//           else if(userRequests.action === 'Update Employee Manager'){
//               updateEmployeeManager();
//           }
//           else if(userInput.action === 'View All Departments'){
//               departments();
//           }
//           else if(userInput.action === 'Add Department'){
//               addDepartment();
//           }
//           else if(userInput.action === 'Remove Department'){
//               removeDepartment();
//           }
//           else if(userInput.action === 'View All Roles'){
//               roles();
//           }
//           else if(userInput.action === 'Add Role'){
//               addRole();
//           }
//           else if(userInput.action === 'Remove Role'){
//               removeRole();
//           }
//       })
//   }
  