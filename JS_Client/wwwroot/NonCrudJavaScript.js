

let allGamesWithRequirements = [];
let allGamesWithStudiosAndRequirements = [];
let allGamesWithStudios = [];
let allGamesWithThisStudio = [];
let allGamesWithThisYear = [];
let allGamesWithThisCPU = [];












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










function displayallGamesWithRequirements() {

    getallGamesWithRequirements();
    document.getElementById('noncrudshow').innerHTML = "";
    document.getElementById('nameofnoncrud').innerHTML = 'Games with Requirements'
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
