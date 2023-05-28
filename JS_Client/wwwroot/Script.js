let allgames = [];



fetch('http://localhost:60949/game')
    .then(x => x.json())
    .then(y => {
        allgames = y;
        console.log(allgames);
        display();
    })


function display() {
    allgames.forEach(g => {
       
        document.getElementById('allgamesarea').innerHTML += `<tr>
        <td>${g.name}</td>
        <td>${g.gameID}</td>
        <td>${g.pyear}</td>
        <td>${g.studioId}</td>
        <td>${g.reqId}</td>
        </tr>`;
        console.log(g.name);


    })



}