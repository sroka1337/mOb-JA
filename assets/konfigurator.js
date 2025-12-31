// Check if configuration is already complete on page load
function checkIfConfigured() {
    // Check photo separately (it's a base64 string)
    const photo = localStorage.getItem('photo');
    if (!photo || photo.trim() === '') {
        return false;
    }
    
    // List of all required text fields
    const requiredFields = [
        'name',
        'surname',
        'sex',
        'nationality',
        'birthday',
        'pesel',
        'familyName',
        'fathersFamilyName',
        'mothersFamilyName',
        'birthPlace',
        'adress1',
        'adress2',
        'city',
        'checkInDate'
    ];
    
    // Check if all required fields exist in localStorage
    const allFieldsPresent = requiredFields.every(field => {
        const value = localStorage.getItem(field);
        return value !== null && value.trim() !== '';
    });
    
    // If all fields are present, redirect to index2.html
    if (allFieldsPresent) {
        location.href = "index2.html";
        return true;
    }
    
    return false;
}

// Run check on page load
if (checkIfConfigured()) {
    // Exit early if redirecting
    // The rest of the code won't run
}

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

// Restore saved photo if it exists
var savedPhoto = localStorage.getItem("photo");
if (savedPhoto) {
    upload.setAttribute("selected", savedPhoto);
    upload.classList.add("upload_loaded");
    upload.querySelector(".upload_uploaded").src = savedPhoto;
}

// Restore saved input values
document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    var savedValue = localStorage.getItem(input.id);
    if (savedValue) {
        input.value = savedValue;
    }
});

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    
    // Create a FileReader to read the file
    var reader = new FileReader();
    
    // Once the file is read, convert it to a Base64 string and save to Local Storage
    reader.onload = function(e) {
        var base64Image = e.target.result; // This is the Base64 string of the image

        // Save the Base64 string to Local Storage
        localStorage.setItem("photo", base64Image);

        // Update the UI
        upload.classList.remove("error_shown");
        upload.setAttribute("selected", base64Image);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = base64Image;
    };

    // Read the image file as a Data URL (Base64)
    reader.readAsDataURL(file);
});


document.querySelector(".go").addEventListener('click', () => {

    var empty = [];


    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }
    

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            // console.log("SET " + input.id + " to " + input.value)
            localStorage.setItem(input.id, input.value);
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{
        forwardToId();
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(){

   location.href = "index2.html";

}
