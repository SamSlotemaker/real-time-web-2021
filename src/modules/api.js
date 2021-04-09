require('dotenv').config()
const API = require('call-of-duty-api')();

async function login() {
    try {
        await API.login(process.env.API_USERNAME, process.env.API_PASSWORD);
        console.log('login succesfull');
    } catch (Error) {
        console.log(Error);
    }
}

exports.login = login;
