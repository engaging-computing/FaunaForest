//this function will load animals, called from the html, you can obtain the list of data by the getters and setters
function loadAnimals() {
    const csvPath = 'http://127.0.0.1:8000/static/animals.csv';
    const animals = [];

    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split(',');

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const animal = {};

                animal.classification = values[0].trim();
                animal.canFly = values[1].trim() === '1';
                animal.canSwim = values[2].trim() === '1';
                animal.hasFur = values[3].trim() === '1';
                animal.hasScales = values[4].trim() === '1';
                animal.numLimbs = parseInt(values[5].trim());
                animal.weight = parseInt(values[6].trim());

                animals.push(animal);
            }

            console.log(animals);
        })
        .catch(error => {
            console.error('Error loadin/g CSV file:', error);
        });
}
function getAnimals() { //getter is still not properly functional, same with setter
    return animals;
}

function setAnimals(newAnimals) {
    animals = newAnimals;
}

