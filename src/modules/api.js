require('dotenv').config()
const API = require('call-of-duty-api')();

async function login() {
    try {
        await API.login(process.env.API_USERNAME, process.env.API_PASSWORD);
        console.log('login succesfull');
    } catch (Error) {
        console.log('login error is: ' + Error);
    }
}
async function getDetailsWZ(username, platform) {
    const data = API.MWwz(username, platform).then(data => {
        return data;
    }).catch(err => {
        return false
    });
    return data;

}

exports.login = login;
exports.getDetailsWZ = getDetailsWZ;
