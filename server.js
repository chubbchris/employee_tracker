const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'chubb1',
        database: 'employees'
    },
    console.log('connected to employees database'));


const promptDatabase = () => {
return inquirer.prompt([
    {
        type: 'list',
        name: 'databaseInput',
        message: 'Which database would you like to open',
        choices: ['departments','roles','employees']
    },
    
])
};

const promptAddition = () => {
    
    return inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'addition',
            message: 'Would you like to add on to the employees database?',
        },
        {
            type:'list',
            name:'table',
            message:'Which would you like to add',
            choices:['Department','Role','Employee'],
            when:({addition}) => addition
        },  
    ])

    .then(promptDepartmentTable)
    .then(promptRolesTable)   
    .then(promptEmployeeTable)
};
const promptDepartmentTable= answers =>{

    if(answers.table === 'Department'){
        return inquirer
        .prompt([ 
            {
                type: 'input',
                name: 'id',
                message: 'what is the id for your department ?',
                
            }, 
            {
                type: 'input',
                name: 'name',
                message: 'what is the name of your department ?',
                
            },
            {
                type: 'confirm',
                name: 'confirmAddToDatabase',
                message: 'Would you like to add anything else to the database',
                default: false
            },
            {
                type:'confirm',
                name:'addDepartmentToDatabase',
                message:'Do you want to add this department to database'
            }

        ])
        .then(answers => {
            if(answers.confirmAddToDatabase){
                return promptAddition ()
            }else{
                return answers
            }
        })
        .then(answers=>{
            if (answers.addDepartmentToDatabase){
                const  myTable = db.get_table('departments')
                myTable.insert(['id','name']).values(answers.id,answers.name).execute(); 
        }
            }) 
}else{
    return answers
}
};
const promptRolesTable = answers =>{
    if(answers.table==='Role'){
    return inquirer.prompt([
            {
                type:'imput',
                name:'id',
                message:'what is the id for this role?'

            },
            {
                type: 'input',
                name: 'title', 
                message: 'What is the name of the employee role?',
                
            },
            {
                type:'input',
                name: 'salary',
                message: 'What is the salary for that role',
            },
            {
                type:'input',
                name: 'department_id',
                message: 'What is the department id  for that role',
            },
            {
                type: 'confirm',
                name: 'confirmAddToDatabase',
                message: 'Would you like to add anything else to the database',
                default: false
            },
            {
                type:'confirm',
                name:'addRoleToDatabase',
                message:'Do you want to add this role to database'
            } 
        ])
        .then(answers => {
            if(answers.confirmAddToDatabase){
                return promptAddition ()
        }else{
            return answers
        }
        })
        .then(answers=>{
            if(answers.addRoleToDatabase){
            const  myTable = db.get_table('roles')
                myTable.insert(['id','title','salary','department_id']).values(answers.id,answers.title,answers.salary,answers.department_id).execute();
} 
            }) 
    } 
    else{
        return answers
    }
};
const promptEmployeeTable = answers =>{
    if(answers.table=== 'Employee'){
    return inquirer.prompt([
            {
                type:'input',
                name:'id',
                message:'What is this employees id?'
            },
            {
                type: 'input',
                name: 'first_name',
                message:'What is employees first name',
            },
            {
                type: 'input',
                name: 'last_name',
                message:'What is employees last name',
            },
            {
                type: 'input',
                name: 'roles_id',
                message:'What is employees role id?',
            },
            {
                type: 'input',
                name: 'manager_id',
                message:'What is the employees manager id? if not manager enter null',
            },
            {
                type: 'confirm',
                name: 'confirmAddToDatabase',
                message: 'Would you like to add anything else to the database',
                default: false
            },
            {
                type:'confirm',
                name:'addEmployeeToDatabase',
                message:'Do you want to add this employee to database'
            } 
        ])
        .then(answers => {
            if(answers.confirmAddToDatabase){
                return promptAddition ()
        }else{
            return answers
        }
        })
        .then(answers=>{
            if(answers.addEmployeeToDatabase){
                const  myTable = db.get_table('roles')
                myTable.insert(['id','title','salary','department_id']).values(answers.id,answers.first_name,answers.last_name,answers.roles_id,answers.manager_id).execute();
        }
            }) 
    }
    else{
        return answers
    }
};   
const promptUpdateEmployeeRole = ()=>{
    inquirer.prompt([
        {
            type:'confirm',
            name: 'update',
            message: 'would you like to update employee role?',
        },
        {
            type:'input',
            name: 'employee_id',
            message: 'which employee would you like to update? Enter employye id.',
            when: ({update}) => update
        },
        {
            type:'input',
            name:'role_id',
            message: 'Which role would you like to change to? Enter role id ',
            when: ({update})=> update
        }
    ])
}

promptDatabase()
.then(answers => {
        if(answers.databaseInput === 'departments'){   
            db.query(`SELECT * FROM departments`, (err,results, rows) => {
                console.log(results)
        })
        }
        if(answers.databaseInput === 'roles'){   
                db.query(`SELECT * FROM roles`, (err,results, rows) => {
                    console.log(results) 
        })
        }
        if(answers.databaseInput === 'employees'){
            db.query(`SELECT * FROM employee`, (err,results, rows) => {
                console.log(results)
        })
    }
})
.then(promptAddition)
.then(promptUpdateEmployeeRole)
.then(answers=>{
    const role_id = answers.employee_id;
    const newRoleId = answers.role_id
    db.employee.modify(`role_id =${role_id}`).set('role-id',{'role_id':newRoleId})
})
.catch(err => {
    console.log(err);
});
