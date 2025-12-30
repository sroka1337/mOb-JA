// List of all required field IDs
var requiredFields = ["name", "surname", "sex", "nationality", "birthday", "pesel", "familyName", 
                      "fathersFamilyName", "mothersFamilyName", "birthPlace", "adress1", "adress2", 
                      "city", "checkInDate"];

// Check if all required data is saved in localStorage
function isConfigurationComplete() {
    // First check if configurationComplete flag exists
    if (localStorage.getItem("configurationComplete") === "true") {
        // Double-check that all required data still exists
        if (!localStorage.getItem("photo")) {
            return false;
        }
        
        for (var i = 0; i < requiredFields.length; i++) {
            var value = localStorage.getItem(requiredFields[i]);
            if (!value || value.trim() === "") {
                return false;
            }
        }
        
        return true;
    }
    
    return false;
}

// Load saved data into form fields
function loadSavedData() {
    // Load photo if it exists
    var savedPhoto = localStorage.getItem("photo");
    if (savedPhoto) {
        var upload = document.querySelector(".upload");
        upload.setAttribute("selected", savedPhoto);
        upload.classList.add("upload_loaded");
        upload.querySelector(".upload_uploaded").src = savedPhoto;
    }
    
    // Load all input fields
    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (input && input.id) {
            var savedValue = localStorage.getItem(input.id);
            if (savedValue) {
                input.value = savedValue;
            }
        }
    });
}

// Check on page load if configuration is complete
if (isConfigurationComplete()) {
    // Redirect to main app if configuration is complete
    location.href = "index2.html";
}

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

// Load saved data into form (in case user wants to edit)
loadSavedData();

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
        // Mark configuration as complete
        localStorage.setItem("configurationComplete", "true");
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
