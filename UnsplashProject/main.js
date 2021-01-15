// sorting the parameters for the search
const clientId = 'client_id= YOUR CLIENT ID';
const perPage = 'per_page=20';
const contentFilter = 'content_filter=high';
const form = document.getElementById('myForm');

form.addEventListener('submit',function(event){
    event.preventDefault();
    $("#images").empty();

    const search = document.getElementById('search').value;
    // dynamically adding the parameters in the url
    const url = `https://api.unsplash.com/search/photos?page=3&query=${search}&${clientId}&${perPage}&${contentFilter}`
    
    async function getPhotos(){
        // if the unsplash api goes down for any reason we return a error object
        try {
            const response = await fetch(url);
            // storing the response object 
            const data = await response.json();
            // returns a array
            loadImages(data.results);
        } catch (e) {
            throw new Error ('There was an issue getting the photos.', e)
        }  
    } // end of getPhotos()

    getPhotos();

    function loadImages(data){
        data.forEach(image => {
           let result = `
            <img src="${image.urls.regular}">
           `;
           
        $("#images").append(result)
    });

    } // end of loadImages
}); // end of the form event