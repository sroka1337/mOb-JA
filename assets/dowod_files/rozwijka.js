console.log('rozwijka.js');
const lo = document.querySelector('#lo');
const content = document.querySelector('#rogo');
const arrow = document.querySelector('#rotation');

// Store the original content
var contentinner = content.innerHTML; 
// Initially hide the content
content.style.display = 'none'; 
arrow.style.transform = "rotate(0deg)";


lo.addEventListener('click', function () {
    if (lo.style.borderRadius == "12px 12px 0px 0px") {
        lo.style = "border-radius: 12px;";
        content.style.display = 'none'; // Hide the content
        arrow.style.transform = "rotate(0deg)";
    }
    else {
        lo.style = "border-radius: 12px 12px 0 0;";
        content.style.display = 'block'; // Show the content
        arrow.style.transform = "rotate(-90deg)";
    }
});
