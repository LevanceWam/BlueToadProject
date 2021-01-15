let timer;
let deletePhotoDelay;

async function start () {
    try {
        // this fetch function returns a promise
        // this promise is holding the data from ANN
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        breedList(data.message)
    } catch (e) {
        throw new Error('There was a problem fetching the breeds', e);
    }
}

start();

function breedList(breeds){
    // returning a object of that empty div
    // we are going to dynamically add the list of dogs into this select as options 
    // the object.keys is taking the breeds data.message which is object and making it into a array
    // now that it is an array we can loop over the items in the breed data and map them to a object
    document.getElementById('breed')
        .innerHTML = `
        <select onchange='loadByBreed(this.value)' class="form-select" aria-label="Default select example">
            <option>Choose breed</option>
            ${Object.keys(breeds).map(function(breed){
                return `<option>${breed}</option>`
            }).join('')}
        </select>
        `
}

async function loadByBreed(breed){
    // if the first option id selected we don't do anything
    if (breed != 'Choose breed'){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json(); // this is an object that is retuned when we get the gog we want 
        createSlideShow(data.message);
    }
}

function createSlideShow(images){
    let current = 0;
    clearInterval(timer);
    clearTimeout(deletePhotoDelay)

    if(images.length > 1) {

    document.getElementById('slideshow')
    .innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `

    current += 2;
    // if the array lenght is only 2 set it back it to zero
    if (images.length == 2) current = 0;
    timer = setInterval(nextSlide, 3000)
    } else {
        // if the array length is not greater than one we aren't going to do anything 
        document.getElementById('slideshow')
        .innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML('beforeend', 
        ` <div class="slide" style="background-image: url('${images[current]}')"></div>`);
        deletePhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        },1000)

        if (current + 1 >= images.length) current = 0;

        current++;
    }
}