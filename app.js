const mysql = require('mysql');
const inquirer = require('inquirer');


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
        choices: ['View all employees', 'View all employees by department', 'View all employees by manager',
                    'Add employee', 'Update employee role']
    })
        .then(answer => {
            switch (answer.choiceOne) {
                case 'View all employees':
                 viewAllEmployees();
                 break;
            
                case 'View all employees by department':
                 viewAllEmployeesByDepartment();
                 break;

                case 'View all employees by manager':
                  viewAllEmployeesByManager();
                  break;

                case 'Add employee':
                  addEmployee();
                  break;

                case 'Update employee role':
                  updateEmployeeRole();
                  break;
            
                default:
                break;
              }
        })
}


const viewAllEmployees= ()  => {
    console.log('viewAllEmployees');

}

const viewAllEmployeesByDepartment= ()  => {
    console.log('viewAllEmployeesByDepartment');

}

const viewAllEmployeesByManager= ()  => {
    console.log('viewAllEmployeesByManager');

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
        type:'list',
        message:'What is the employees role?',
        choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']

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

const updateEmployeeRole= ()  => {
    console.log('updateEmployeeRole');

};
start();