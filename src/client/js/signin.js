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

    // Check if #username has been entered
    if ( document.getElementById("username").value == "" ) {
        // Alert user
        document.getElementById("usernamelabel").style.color = "red"
    } else {
        document.getElementById("usernamelabel").style.color = ""
    }
    // Check if #password has been entered
    if ( document.getElementById("password").value == "" ) {
        // Alert user
        document.getElementById("passwordlabel").style.color = "red"
    } else {
        document.getElementById("passwordlabel").style.color = ""
    }

});
