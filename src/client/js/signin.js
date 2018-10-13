import { initializeTestBracketz } from './view';


// Wait for DOM to finish loading before attaching listeners.
window.onload = () => {

    // Listen for clicks on the sign in button in the navbar
    if (document.getElementById("signinbutton") != null) {
        document.getElementById("signinbutton").onclick = function() {
            // Show the modal in the LOGIN format
            document.getElementById("signincontainer").style.display = "block"
        };
    }

    // Listen for clicks on the modal close button
    document.getElementById("loginclosebutton").onclick = function() {
        // Close the modal
        document.getElementById("signincontainer").style.display = "none"
    };

    // Listen for clicks on the Register Title at the top of the modal
    document.getElementById("registertitle").onclick = function() {
        // Hide the Login options
        document.getElementById("logintitle").style.opacity = .25;
        document.getElementById("loginform").style.display = "none";

        // Display the Register Options
        document.getElementById("registertitle").style.opacity = 1;
        document.getElementById("registerform").style.display = "block";
    };

    // Listen for clicks on the Login Title at the top of the modal
    document.getElementById("logintitle").onclick = function() {
        // Hide the Login options
        document.getElementById("registertitle").style.opacity = .25;
        document.getElementById("registerform").style.display = "none";

        // Display the Register Options
        document.getElementById("logintitle").style.opacity = 1;
        document.getElementById("loginform").style.display = "block";
    };

    // Password fields must match
    var password = document.getElementById("regpassword"), confirm_password = document.getElementById("confirmpassword");

    function validatePassword() {
        // if the text value of first password field is not equal to the text value of the confirm password field, set validation text
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }
    // everytime the password is updated this function will re-run
    password.onchange = validatePassword;
    // will validate as soon as password is typed in rather than waiting for user to click register
    confirm_password.onkeyup = validatePassword;

    // Test Brackets variables
    initializeTestBracketz();

}
