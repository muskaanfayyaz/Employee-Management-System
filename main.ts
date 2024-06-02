import inquirer from "inquirer";

interface Employee {
    id: number;
    name: string;
    salary: number;
}

let listofEmployees: Employee[] = [
    { id: 1, name: "John", salary: 50000 },
    { id: 2, name: "Hira", salary: 20000 },
    { id: 3, name: "Ali", salary: 45000 }
];

let filteredEmployees: Employee[]; // Declaring filteredEmployees here

async function addEmployee () {
    let number = await inquirer.prompt({
        name : "number",
        type : "number",
        message : "Enter number of employees"
    })

    for (let i = 0; i < number.number; i++) {
        let name = await inquirer.prompt({
            name : "name",
            type : "input",
            message : "Enter name of employee"
        })
        let salary = await inquirer.prompt({
            name : "salary",
            type : "number",
            message : "Enter salary of employee"
        })
        listofEmployees.push({id : listofEmployees.length + 1, name : name.name, salary : salary.salary});
    }   
}

async function deleteEmployeeById(){
     let id = await inquirer.prompt({
        name : "id",
        type : "number",
        message : "Enter id of employee"
    })

    listofEmployees = listofEmployees.filter((employee) => employee.id != id.id);
}

async function filterBySalary(){
    let salary = await inquirer.prompt({
        name : "salary",
        type : "number",
        message : "Enter salary of employee"
    })

    filteredEmployees = listofEmployees.filter((employee) => employee.salary >= salary.salary);

    if (filteredEmployees.length === 0) {
        console.log("No employees found ");
    } else {
        console.table(filteredEmployees);
    }
}

async function filterByName(){
    let name = await inquirer.prompt({
        name : "name",  
        type : "input",
        message : "Enter name of employee"
    })

    filteredEmployees = listofEmployees.filter((employee) => employee.name == name.name);

    if (filteredEmployees.length === 0) {
        console.log("No employees found with that name.");
    } else {
        console.table(filteredEmployees);
    }
}

async function displayEmployeeList(){
    console.table(listofEmployees);
}

let condition : boolean = true;

while(condition){
    let action = await inquirer.prompt({
        name : "action",
        type : "list",
        message : "What do you want to do?",
        choices : ["Add Employee", "Delete Employee", "Filter By Name", "Filter By Salary", "Display Employee List", "Exit"]
    });

    switch(action.action){
        case "Add Employee":
            await addEmployee();
            console.log("Employee added successfully");
            break;
        case "Delete Employee":
            await deleteEmployeeById();
            console.log("Employee deleted successfully");
            break;
        case "Filter By Name":
            await filterByName();
            break;
        case "Filter By Salary":
            await filterBySalary();
            break;
        case "Display Employee List":
            await displayEmployeeList();
            break;
        case "Exit":
            condition = false;
            break;
    }
}
