let allgames = [];
getallgames();

 async function getallgames(){
     await fetch('http://localhost:60949/game')
         .then(x => x.json())
         .then(y => {
             allgames = y;
             console.log(allgames);
             displayallgames();
         });
}




function displayallgames() {
   
    document.getElementById('allgamesarea').innerHTML = "";
    allgames.forEach(g => {
       
        document.getElementById('allgamesarea').innerHTML += `<tr>
        <td>${g.name}</td>
        <td>${g.gameID}</td>
        <td>${g.pyear}</td>
        <td>${g.studioId}</td>
        <td>${g.reqId}</td>
        <td> <button type="button" onclick="deletegame(${g.gameID})">Delete</button></td>
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