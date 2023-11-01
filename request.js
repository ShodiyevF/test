const digestRequest = require('request-digest')('admin', '$8976!208');

async function requestToTerminal(route, method, body) {
    let options = {
        host: 'http://192.168.11.245',
        path: route,
        method: method,
        port: 80,
    };  
    
    if (method == 'POST') {
        options.json = true
        options.body = body
        options.headers = {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const response = await digestRequest.requestAsync(options)
        return response.body
    } catch (error) {
        console.log(error);
        return {
            status: 400
        }
    }
}

module.exports = {
    requestToTerminal
}