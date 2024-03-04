// randomly generates a number between the range of low and high
// arguments :
// low : number - the lowest number in the range
// high : number - the highest number in the range
export function getRandom(low=1, high=10) {
    let randomNumber;
    // calculate random number
    randomNumber = Math.round(Math.random() * (high - low)) + low;
    // returning value
    return randomNumber;
}

// adds key event listener to any key and runs a function when that key is pressed
// arguments :
// functionToCall : function - the function to call when the key is pressed
// keyToDetect : string - the key to detect
export function addKey(functionToCall, keyToDetect = "Enter") {
    document.addEventListener("keydown", (e) => {
        // is the key released the specified key?
        if (e.code === keyToDetect) {
            // pressing the enter key will force some browsers to refresh
            // this command stops the event from going further
            e.preventDefault();
            // call provided callback to do everything else that needs to be done
            functionToCall();
            // this also helps the event from propagating in some older browsers
            return false;
        }
    });
}

// caches all images in the browser and runs a function when complete
// arguments :
// imageFilenames : array - the array of image filenames to load
// path : string - the path to the images in the project folder
// callback : function - the function to call when all images are loaded (optional)
let loadedCount, images;
export function cacheImages(imageFilenames, path, callback) {
    // initialization
    loadedCount = 0;
    images = [];

    // loop through array of image filenames
    for (let filename of imageFilenames) {
        // construct Image object and listen for when loaded
        let image = new Image();
        image.addEventListener("load", (e) => {
            loadedCount++;
            if (loadedCount >= imageFilenames.length) {
                if (callback) callback();
            }
        });
        image.src = path + filename;
        // save image in array so browser "caches" the image
        images.push(image);
    }
}

// retrieves JSON data from a URL and runs a function when the data is retrieved, passing along the JSON data as an argument
// arguments :
// retrieveURL : string - the URL to retrieve the JSON data from
// success : function - the function to call when the data is retrieved
// failure : function - the function to call when the data is not retrieved and an error occurs
// debug : boolean - whether to throw an error if one occurs (default is set to true)
export function getJSONData(retrieveURL, success, failure, debug = true) {
    fetch(retrieveURL)
        .then(response => response.json())
        .then(data => success(data))
        .catch(error => {
            failure(error);
            if (debug) throw error;
        });
}

// sends JSON data to a URL and runs a function when a response is received
// arguments :
// sendURL : string - the URL to send the JSON data to
// sendJSON : object - the JSON data to send
// success : function - the function to call when a response is received
// failure : function - the function to call when the response is not received and an error occurs
// debug : boolean - whether to throw an error if one occurs (default is set to true)
export function sendJSONData(sendURL, sendJSON, success, failure, debug = true) {
    fetch(sendURL,
        {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(sendJSON)
        })
        .then(response => response.text())
        .then(responseText => success(responseText))
        .catch(error => {
            failure(error);
            if (debug) throw error;
        });
}