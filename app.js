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


const start = () => {
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
                 viewAllEmployees();
                 break;
            
                case 'View all departments':
                 viewAllDepartments();
                 break;

                case 'View all roles':
                  viewAllRoles();
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
                    break;
            
                default:
                break;
              }
        })
}


const viewAllEmployees= ()  => {
    const query = 'SELECT * FROM employees';
    connection.query(query, (err, res) => {
      if (err) throw err;
    console.table(res);
    start();
    });

}

const viewAllDepartments= ()  => {
    
}

const viewAllRoles= ()  => {
    

}

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
        // choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
        choices: ['1', '2', '3', '4', '5', '6', '7']

    }
])

.then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      'INSERT INTO employees SET ?',
      // QUESTION: What does the || 0 do?
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role || 0
        
      },
      (err) => {
        if (err) throw err;
        console.log('Your employee was created successfully!');
        // re-prompt the user for if they want to add another employee
        start();
      }
    );
console.log(answer.firstName);
console.log(answer.lastName);
console.log(answer.role);  
});
  
    console.log('addEmployee');

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
      // QUESTION: What does the || 0 do?
      {
        name: answer.name,
        
        
      },
      (err) => {
        if (err) throw err;
        console.log('Your department was created successfully!');
        // re-prompt the user for if they want to add another employee
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

    }
])

.then((answer) => {
    // when finished prompting, insert a new item into the db with that info
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
    console.log('updateEmployeeRole');

};
start();