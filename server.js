const WebSocket = require('ws')


const { requestToTerminal } = require("./request")
const path = require('path')
const fs = require('fs')
console.log('adasd');

let arr = []

function runner() {
    try {
        const countBody = {
            "AcsEventTotalNumCond":{
                "major": 5,
                "minor": 75,
                "startTime": "2023-10-01T00:00:01+05:00",
                "endTime": "2023-11-01T01:59:59+05:00",
            }
        }
        requestToTerminal('/ISAPI/AccessControl/AcsEventTotalNum?format=json', 'POST', countBody).then(async data => {
            console.log(data.AcsEventTotalNum.totalNum);
            for (let i = 1; i <= data.AcsEventTotalNum.totalNum; i+=30) {
                const body = {
                    "AcsEventCond": {
                        "searchID": "1",
                        "searchResultPosition": i,
                        "maxResults": 30,
                        "major": 5,
                        "minor": 75,
                        "startTime": "2023-10-01T00:00:01+05:00",
                        "endTime": "2023-11-01T01:59:59+05:00",
                    }
                }
                const data = await requestToTerminal('/ISAPI/AccessControl/AcsEvent?format=json', 'POST', body)
                if (data.AcsEvent.numOfMatches > 0) {
                    for (const time of data.AcsEvent.InfoList) {
                        arr.push(time)
                        // console.log(time);
                    }
                }
            }
            fs.writeFileSync(path.join(__dirname, '/qavat3.json'), JSON.stringify(arr, null, 4))
            
            console.log('junadi');
        })
    } catch (error) {
        console.log(error);
    }
}

runner()