const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const listOfProjectEmployees = [];

function managerSetup(){

    return inquirer.prompt([
        {
            type: "input",
            message: "What is the managers name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employees ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the managers office number?",
            name: "officeNumber"
        }
    ]).then((data) => {

        const newManager = new Manager ( data.name, data.id, data.email, data.officeNumber);

        listOfProjectEmployees.push(newManager);

        addMoreEmployees();

    })
}

function addMoreEmployees(){
    return inquirer.prompt([
        {
        type:'list',
        message: "Do you wish to add more members?",
        choices: [
            "Add Manager",
            "Add Engineer",
            "Add Intern",
            "Done",
        ],
        name: "addType",
        }

     ]).then ((data) => {

        switch(data.addType){
            case "Add Manager":
            managerSetup();
            break;

            // if the selected a new engineer
            case "Add Engineer":
            engineerSetup();
            break;

            // else if the user 
            case "Add Intern":
            internSetup();
            break;
    
            // exit app else
            case "Done":
            renderFile();

        }

    })
}

function engineerSetup(){

    return inquirer.prompt([
        {
            type: "input",
            message: "What is the engineers name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employees ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineers github?",
            name: "github"
        }
    ]).then((data) => {

        const newEngineer = new Engineer ( data.name, data.id, data.email, data.github);

        listOfProjectEmployees.push(newEngineer);

        addMoreEmployees();

    })
}

function internSetup(){

    return inquirer.prompt([
        {
            type: "input",
            message: "What is the interns name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employees ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the interns school?",
            name: "school"
        }
    ]).then((data) => {

        const newIntern = new Intern ( data.name, data.id, data.email, data.school);

        listOfProjectEmployees.push(newIntern);

        addMoreEmployees();

    })
}

function renderFile(){

    const newFile = render ( listOfProjectEmployees );
    fs.writeFile(outputPath, newFile, (err) => {
        if (err) throw err;
        console.log(`Your new file has been saved to ${OUTPUT_DIR}.`)
    })

}

function init(){
    managerSetup()
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
