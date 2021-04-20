const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"Coding123!",
    database:"employeeTracker_db"
});

let departments = [];
let departmentChoices = [];
let roles = [];
let roleChoices = []
let employees = [];
let employeeChoices = [];





const initialize = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      departments = res;
      departmentChoices = res.map((element) => element.name);
    });
  
    connection.query('SELECT * FROM roles', (err, res) => {
      if(err) throw err;
      roles = res;
      roleChoices = res.map((element) => element.title);
    });
  
    connection.query('SELECT * FROM employees', (err, res) => {
      if(err) throw err;
      employees = res;
      employeeChoices = res.map((element) => element.first_name + ' ' + element.last_name);
    });
  }






const start = () => {

    initialize();

    inquirer.prompt ({
        name:'choiceOne',
        type:'list',
        message:'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles',
                    'Add employee', 'Add department', 'Add role','Update employee role', 'Exit']
    })
        .then(answer => {
            switch (answer.choiceOne) {
                case 'View all employees':
                 viewData(employees);
                 break;
            
                case 'View all departments':
                    viewData(departments);
                 break;

                case 'View all roles':
                    viewData(roles);
                  break;

                case 'Add employee':
                    addEmployee();
                  break;

                  case 'Add department':
                    addDepartment();
                  break;

                  case 'Add role':
                  addRole();
                  break;

                case 'Update employee role':
                  updateEmployeeRole();
                  break;

                case 'Exit':
                    return;
            
                default:
                break;
              }
        })
}

const viewData = (data) => {
    console.table(data);
    start();
}


// const viewAllEmployees= ()  => {
//     const query = 'SELECT * FROM employees';
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//     console.table(res);
//     start();
//     });

// }

// const viewAllDepartments= ()  => {
//     const query = 'SELECT * FROM departments';
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//     console.table(res);
//     start();
//     });
// }

// const viewAllRoles= ()  => {
//     const query = 'SELECT * FROM roles';
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//     console.table(res);
//     start();
//     });

// }



const addEmployee= () => {
    inquirer.prompt ([{
        name:'firstName',
        type:'input',
        message:'What is the employees first name?',
    },
    {
        name:'lastName',
        type:'input',
        message:'What is the employees last name?'
    },
    {
        name:'role',
        type:'rawlist',
        message:'What is the employees role?',
        choices: roleChoices

    },
    {
        name: 'manager',
        type: 'rawlist',
        message: 'Who is the employees manager?',
        choices: employeeChoices
    }
])

.then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: roleChoices.indexOf(answer.role) + 1,
        manager_id: employeeChoices.indexOf(answer.manager) +1
        
      },
      (err) => {
        if (err) throw err;
        console.log('Your employee was created successfully!');
        // re-prompt the user for if they want to add another employee
        start();
      }
    );
  
});

}


const addDepartment= () => {
    inquirer.prompt ([{
        name:'name',
        type:'input',
        message:'What is the department name?',
    }
])

.then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      'INSERT INTO departments SET ?',
      {
        name: answer.name,
      },
      (err) => {
        if (err) throw err;
        console.log('Your department was created successfully!');
        start();
      }
    );
  
});

}


const addRole= () => {
    inquirer.prompt ([{
        name:'title',
        type:'input',
        message:'What is the role title?',
    },
    {
        name:'salary',
        type:'input',
        message:'What is the role salary?'
    },
    {
        name:'departmentId',
        type:'input',
        message:'What is the role department id?',
        choices: departmentChoices

    }
])

.then((answer) => {
    
    connection.query(
      'INSERT INTO roles SET ?',
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId 
        
      },
      (err) => {
        if (err) throw err;
        console.log('Your role was created successfully!');
        start();
      }
    );
});
}



const updateEmployeeRole= ()  => {
    
    inquirer.prompt([{
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employeeChoices
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the new role?',
        choices: roleChoices
    }
    ])
        .then((answer) => {
            // after prompt, insert new row into database with info
            connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [
                    roleChoices.indexOf(answer.role) + 1,
                    employeeChoices.indexOf(answer.employee) + 1
                ],
                (err) => {
                    if (err) throw err;
                    console.log('Your employee was updated successfully!');
                    start();
                }
            );
        });

};
start();