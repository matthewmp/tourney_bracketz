// Wait for DOM to finish loading before attaching listeners.
window.onload = () => {

    // Listen for clicks on the sign in button in the navbar
    document.getElementById("signinbutton").onclick = function() {
        // Show the modal in the LOGIN format
        document.getElementById("signincontainer").style.display = "block"
    };

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

    // Listen for clicks on the log in button in the sign in modal
    document.getElementById("loginbutton").onclick = function() {
        console.log('log in button clicked');
    };

    // Listen for clicks on the Register button in the sign in modal
    document.getElementById("registerbutton").onclick = function() {
        console.log('Register button clicked');
    };
}