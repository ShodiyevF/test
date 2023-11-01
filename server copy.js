const WebSocket = require('ws')


const express = require('express')()
const fs = require('fs')
const path = require('path')
const { requestToTerminal } = require("./request")
// const ws = new WebSocket('ws://16.16.26.175:6351');
console.log('adasd');

// ws.on('open', function open() {
    const countBody = {
        "AcsEventTotalNumCond":{
            "major": 5,
            "minor": 75,
            "startTime": "2023-10-01T00:00:01+05:00",
            "endTime": "2023-11-01T01:59:59+05:00",
        }
    }


    requestToTerminal('/ISAPI/AccessControl/AcsEventTotalNum?format=json', 'POST', countBody).then(async data => {
        let arr = []
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
        
        // ws.send(JSON.stringify(arr))
        console.log('junadi');
    })
// });


// express.listen(1000)