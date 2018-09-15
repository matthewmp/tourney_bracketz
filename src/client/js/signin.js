window.onload = () => {

    // Listen for clicks on the sign in button in the navbar
    document.getElementById("signinbutton").addEventListener("click", function() {
        //show the modal
        document.getElementById("signincontainer").style.display = "block"
    });

    // Listen for clicks on the log in close button in the sign in modal
    document.getElementById("loginclosebutton").addEventListener("click", function() {
        // Close the modal
        document.getElementById("signincontainer").style.display = "none"
    });

    // Listen for clicks on the log in button in the sign in modal
    document.getElementById("loginbutton").addEventListener("click", function() {
        console.log('log in button clicked');
    });
}