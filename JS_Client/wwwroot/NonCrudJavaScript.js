

let allGamesWithRequirements = [];
let allGamesWithStudiosAndRequirements = [];
let allGamesWithStudios = [];
let allGamesWithThisStudio = [];
let allGamesWithThisYear = [];
let allGamesWithThisCPU = [];
let schgame;
var schstudio;
var schminreq;











async function getallGamesWithThisCPU(cpu) {

    await fetch('http://localhost:60949/Stat/GamesWithThisCPU/' + cpu)
        .then(x => x.json())
        .then(y => {
            allGamesWithThisCPU = y;
            console.log(allGamesWithThisCPU);

        });

}
async function getallGamesWithRequirements() {
    await fetch('http://localhost:60949/Stat/GamesWithRequirements')
        .then(x => x.json())
        .then(y => {
            allGamesWithRequirements = y;
            console.log(allGamesWithRequirements);

        });
}
async function getallGameWithStudios() {
    await fetch('http://localhost:60949/Stat/GamesWithStudios')
        .then(x => x.json())
        .then(y => {
            allGamesWithStudios = y;
            console.log(allGamesWithStudios);

        });

}
async function getallGamesWithStudiosAndRequirements() {
    await fetch('http://localhost:60949/Stat/GamesWithStudiosAndRequirements')
        .then(x => x.json())
        .then(y => {
            allGamesWithStudiosAndRequirements = y;
            console.log(allGamesWithStudiosAndRequirements);

        });
}
async function getallGamesWithThisStudio(studio) {
    await fetch('http://localhost:60949/Stat/GamesWithThisStudio/' + studio)
        .then(x => x.json())
        .then(y => {
            allGamesWithThisStudio = y;
            console.log(allGamesWithThisStudio);

        });
}
async function getallGamesWithThisYear(year) {
    await fetch('http://localhost:60949/Stat/ReleaseYearSearch/' + year)
        .then(x => x.json())
        .then(y => {
            allGamesWithThisYear = y;
            console.log(allGamesWithThisYear);

        });
}


async function getgamebyid(id) {


    await fetch('http://localhost:60949/game/' + id)
        .then(x => x.json())
        .then(y => {
            schgame = y;
            console.log(schgame);
            
        });



}
async function getstudiobyid(id) {


    await fetch('http://localhost:60949/studio/' + id)
        .then(x => x.json())
        .then(y => {
            schstudio = y;
            console.log(schstudio);
           
        });


}
async function getminreqbyid(id) {

    await fetch('http://localhost:60949/MinRequirements/' + id)
        .then(x => x.json())
        .then(y => {
            schminreq = y;
            console.log(schminreq);
            
        });


}









function displayallGamesWithRequirements() {

    
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with Requirements'
    getallGamesWithRequirements();
    allGamesWithRequirements.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g}</td>

       
        </tr>`;



    })
}
function displayallallGamesWithStudiosAndRequirements() {
    getallGamesWithStudiosAndRequirements();
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games With Studios And Requirements'
    allGamesWithStudiosAndRequirements.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g}</td>

       
        </tr>`;



    })
}
function displayallallGamesWithStudios() {
    getallGameWithStudios();

    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with studios'
    allGamesWithStudios.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g}</td>

       
        </tr>`;



    })

}
function displayallGamesWithThisStudio() {

    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with this studio'
    let stud = document.getElementById('cstudio').value;

    getallGamesWithThisStudio(stud);

    allGamesWithThisStudio.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g.name}</td>
        
        </tr>`;



    })
}
function displayallGamesWithThisYear() {

    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with this year'
    let year = document.getElementById('cyear').value;

    getallGamesWithThisYear(year);

    allGamesWithThisYear.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g.name}</td>
        
        </tr>`;



    })


}
function displayallGamesWithThisCPU() {

    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with this CPU'
    let cpu = document.getElementById('ccpu').value;

    getallGamesWithThisCPU(cpu);

    allGamesWithThisCPU.forEach(g => {

        document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${g.name}</td>
        
        </tr>`;



    })


}
function displaygamebyid() {
    
    id = document.getElementById('sgame').value;
    getgamebyid(id);
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with this ID: ' + id;
    document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${schgame.name}</td>
        
        </tr>`;
}
function displaystudioyid() {

    id = document.getElementById('sstudio').value;
    getstudiobyid(id);
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Studio with this ID: ' + id;
    document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${schstudio.name}</td>
        
        </tr>`;
}
function displayminreqbyid() {

    id = document.getElementById('sminreq').value;
    getminreqbyid(id);
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'MinimalRequirements with this ID: ' + id;
    document.getElementById('noncrudshow').innerHTML += `<tr>
        <td>${schminreq.cpu} ${schminreq.gpu}</td>
        
        </tr>`;
}
