let allgames = [];
let allstudios = [];
let allminreq = [];

let connection = null;
let gameIdtoUpdate = -1;
let studioIdtoUpdate = -1;
let minreqIdtoUpdate = -1;
getallgames();
getallstudios();
getallminreq();






setupSingalR();


    

async function getallminreq() {
    await fetch('http://localhost:60949/MinRequirements')
        .then(x => x.json())
        .then(y => {
            allminreq = y;
            console.log(allminreq);
            displayallallminreq();
        });
}
async function getallstudios() {
    await fetch('http://localhost:60949/studio')
        .then(x => x.json())
        .then(y => {
            allstudios = y;
            console.log(allstudios);
            displayallallstudios();
        });
}
async function getallgames(){
     await fetch('http://localhost:60949/game')
         .then(x => x.json())
         .then(y => {
             allgames = y;
             console.log(allgames);
             displayallgames();
         });
}


function setupSingalR() {

     connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:60949/hub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
        //games signalR
    connection.on("GameCreated", (user, message) => {
        getallgames();
        });
    connection.on("GameDeleted", (user, message) => {
        getallgames();
    });
    connection.on("GameUpdated", (user, message) => {
        getallgames();
    });
    //studio signalR
    connection.on("StudioCreated", (user, message) => {
        getallstudios();
    });
    connection.on("StudioDeleted", (user, message) => {
        getallstudios();
    });
    connection.on("StudioUpdated", (user, message) => {
        getallstudios();
    });
    //minreq signalr
    connection.on("MinRequirementsCreated", (user, message) => {
        getallminreq();
    });
    connection.on("MinRequirementsDeleted", (user, message) => {
        getallminreq();
    });
    connection.on("MinRequirementsUpdated", (user, message) => {
        getallminreq();
    });

    connection.onclose
        (async () => {
            await start();
        });
    start();








}
async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};


//games
function displayallgames() {
   
    document.getElementById('allgamesarea').innerHTML = "";
    allgames.forEach(g => {
       
        document.getElementById('allgamesarea').innerHTML += `<tr>
        <td>${g.name}</td>
        <td>${g.gameID}</td>
        <td>${g.pyear}</td>
        <td>${g.studioId}</td>
        <td>${g.reqId}</td>
        <td> <button type="button" onclick="deletegame(${g.gameID})">Delete</button> </td>
        <td> <button type="button" onclick="showupdategame(${g.gameID})">Update</button> </td>
        </tr>`;
        


    })
}
function creategame() {
    let name = document.getElementById('creategamename').value;
    let max = 0;
    let maxindex = 0;
    for (let i = 0; i < allgames.length; i++) {
        if (Number(allgames[i].gameID) > max) {
            maxindex = Number(i);
            max = Number(allgames[i].gameID);
        }
    }
    let gameid = Number(allgames[maxindex].gameID + 1);
    
    
    let realiseyear = document.getElementById('creategameyear').value;
    let studioid = document.getElementById('creategamestudioid').value;
    let requid = document.getElementById('creategamereqid').value;

    fetch('http://localhost:60949/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                
                name: name,
                pyear: realiseyear,
                reqId: requid,
                studioId: studioid

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallgames();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

  
    
    
}
function deletegame(id) {
    fetch('http://localhost:60949/game/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',},
        body:null})
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallgames();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    



}
function showupdategame(id) {
    document.getElementById('updategamename').value = allgames.find(t => t['gameID'] == id)['name'];
    document.getElementById('updategameyear').value = allgames.find(t => t['gameID'] == id)['pyear'];
    document.getElementById('updategamestudioid').value = allgames.find(t => t['gameID'] == id)['studioId'];
    document.getElementById('updategamereqid').value = allgames.find(t => t['gameID'] == id)['reqId'];
    document.getElementById('updategameform').style.display = 'inline';
    gameIdtoUpdate = id;

}
function updategame() {

    document.getElementById('updategameform').style.display = 'none';
    let name = document.getElementById('updategamename').value;
    let gameid = gameIdtoUpdate;
    let realiseyear = document.getElementById('updategameyear').value;
    let studioid = document.getElementById('updategamestudioid').value;
    let requid = document.getElementById('updategamereqid').value;

    fetch('http://localhost:60949/game', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                gameID: gameid,
                name: name,
                pyear: realiseyear,
                reqId: requid,
                studioId: studioid

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallgames();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//studios
function displayallallstudios() {
    document.getElementById('allstudiosarea').innerHTML = "";
    allstudios.forEach(g => {

        document.getElementById('allstudiosarea').innerHTML += `<tr>
        <td>${g.name}</td>
        <td>${g.studioID}</td>
        <td>${g.ceoName}</td>

        <td> <button type="button" onclick="deletestudio(${g.studioID})">Delete</button> </td>
        <td> <button type="button" onclick="showupdatestudio(${g.studioID})">Update</button> </td>
        </tr>`;



    })
}
function createstudio() {
    let studiosname = document.getElementById('createstudioname').value;
    let studiosceo = document.getElementById('createstudioceoname').value;
    fetch('http://localhost:60949/studio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {

                name: studiosname,
                ceoName: studiosceo

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallstudios();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function deletestudio(id) {

    fetch('http://localhost:60949/studio/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallstudios();
        })
        .catch((error) => {
            console.error('Error:', error);
        });



}
function showupdatestudio(id) {
    document.getElementById('updatestudioname').value = allstudios.find(t => t['studioID'] == id)['name'];
    document.getElementById('updatestudioceoname').value = allstudios.find(t => t['studioID'] == id)['ceoName'];

    document.getElementById('updatestudioform').style.display = 'inline';
    studioIdtoUpdate = id;

}
function updatestudio() {

    document.getElementById('updatestudioform').style.display = 'none';
    let name = document.getElementById('updatestudioname').value;
    let ceoname = document.getElementById('updatestudioceoname').value;

    fetch('http://localhost:60949/studio', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                studioID: studioIdtoUpdate,
                name: name,
                ceoName: ceoname

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallstudios();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}
//minreq
function displayallallminreq() {
    document.getElementById('allminreqarea').innerHTML = "";
    allminreq.forEach(g => {

        document.getElementById('allminreqarea').innerHTML += `<tr>
        <td>${g.cpu}</td>
        <td>${g.gpu}</td>
        <td>${g.reqId}</td>

        <td> <button type="button" onclick="deleteminreq(${g.reqId})">Delete</button> </td>
        <td> <button type="button" onclick="showupdateminreq(${g.reqId})">Update</button> </td>
        </tr>`;



    })
}
function createminreq() {
    let minreqcpu = document.getElementById('createminreqcpu').value;
    let minreqgpu = document.getElementById('createminreqgpu').value;
    fetch('http://localhost:60949/MinRequirements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {

                cpu: minreqcpu,
                gpu: minreqgpu

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallminreq();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function deleteminreq(id) {
    fetch('http://localhost:60949/MinRequirements/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallminreq();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function showupdateminreq(id) {
    document.getElementById('updateminreqcpu').value = allminreq.find(t => t['reqId'] == id)['cpu'];
    document.getElementById('updateminreqgpu').value = allminreq.find(t => t['reqId'] == id)['gpu'];

    document.getElementById('minrequpdateform').style.display = 'inline';
    minreqIdtoUpdate = id;
}
function updateminreq() {

    document.getElementById('minrequpdateform').style.display = 'none';
    let cpu= document.getElementById('updateminreqcpu').value;
    let gpu = document.getElementById('updateminreqgpu').value;

    fetch('http://localhost:60949/MinRequirements', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                reqId: minreqIdtoUpdate,
                cpu: cpu,
                gpu: gpu

            }),
    })
        .then(response => response)
        .then(data => {
            console.log('Success:', data);
            getallminreq();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

