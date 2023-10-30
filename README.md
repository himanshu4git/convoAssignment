# convosoAsssignment
This repository contains end-to-end tests for DNC functionality. The project demonstrates automation of GUI using Page Object Model. 
1. All Page elements are placed inside pageObjects folder and are called via object of page class
2. Common elements are placed in commonElements class 
2. Utilites are mostly implemented in suppport/commands.js but not limited to. API utilities are in APICommands.js
3. Test Numbers are kept in numbers.txt file inside fixtures 
4. Test cases are inside integration folder 

## Getting Started

1. Clone this repository to your local machine
2. add credentials.json inside fixtures
3. change dummy values to their actual values
        {
            "username": "DUMMY_USER_NAME",
            "password": "DUMMY_PASSWORD"
        }
2. npm install
3. npm run cypress:open
4. run in headless mode using npm run cypress:run

