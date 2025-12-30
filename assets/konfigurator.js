// Check if configuration is already complete and redirect if so
function checkExistingConfiguration() {
    // List of all required input field IDs
    const requiredFields = [
        "name", "surname", "sex", "nationality", "birthday", "pesel",
        "familyName", "fathersFamilyName", "mothersFamilyName", "birthPlace",
        "adress1", "adress2", "city", "checkInDate"
    ];
    
    // Check if photo exists
    const photo = localStorage.getItem("photo");
    if (!photo) {
        return false;
    }
    
    // Check if all required fields exist and are not empty
    for (let fieldId of requiredFields) {
        const value = localStorage.getItem(fieldId);
        if (!value || value.trim() === "") {
            return false;
        }
    }
    
    // All data exists, redirect to main app
    return true;
}

// Wait for DOM to be ready before accessing elements
function initConfigurator() {
    // Check if configuration is already complete and redirect if so
    // This check happens after DOM is ready to ensure smooth redirect
    if (checkExistingConfiguration()) {
        window.location.href = "index2.html";
        return; // Exit early - don't execute rest of code
    }

    var upload = document.querySelector(".upload");

    var imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = ".jpeg,.png,.gif";

// Restore saved photo if it exists
const savedPhoto = localStorage.getItem("photo");
if (savedPhoto) {
    upload.setAttribute("selected", savedPhoto);
    upload.classList.add("upload_loaded");
    upload.querySelector(".upload_uploaded").src = savedPhoto;
}

    // Restore saved input values
    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        const savedValue = localStorage.getItem(input.id);
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
}

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(){

   location.href = "index2.html";

}

// Initialize configurator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfigurator);
} else {
    // DOM is already ready
    initConfigurator();
}
