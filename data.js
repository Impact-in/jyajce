// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDn2xzwu3OOqk7ipJDuI5KzWVdvFDU8a0",
    authDomain: "jyfriend-5180e.firebaseapp.com",
    projectId: "jyfriend-5180e",
    storageBucket: "jyfriend-5180e.appspot.com",
    messagingSenderId: "1091977228918",
    appId: "1:1091977228918:web:deb25ede0b42f02b29a557",
    measurementId: "G-1C4SXGV823"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

var frient_get = "";



// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    adno = document.getElementById('adno').value
    year = document.getElementById('year').value
    whatsapp = document.getElementById('wapp').value


    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }


    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                Admission_no: adno,
                year: year,
                whatsapp_no: whatsapp,
                last_login: Date.now(),
                friend_name: "waiting to update the list"
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            friendName = "friend_name"
            const dbRef = database_ref.child('users/' + user.uid + '/' + friendName);

            // Fetch data once from that location
            dbRef.once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        //alert(snapshot.val());
                        //console.log(snapshot.val());
                        document.getElementById("showdata").innerHTML =snapshot.val() ;
                        document.getElementById("content_container").style.display = "none";
                        document.getElementById("friend").style.display = "flex";
                        
                        console.log('User data retrieved successfully!');
                    } else {
                        console.log('No data available for this friend name.');
                    }
                })

            




        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
