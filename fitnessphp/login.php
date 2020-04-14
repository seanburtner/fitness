<?php session_start(); ?>
<?php 
// Sean Burtner
// LOGIN.PHP IS CALLED AS THE ROUTINES PAGE IS LOADED TO FETCH THE CURRENT USER'S ROUTINES

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Extract the POST request data, trimming spaces at beginning or end
$email = trim($_POST['email']);
$password = $_POST['password'];

// Check to see if this email and password match a user in the database.

// Construct and prepare query
$query = "SELECT password FROM users WHERE email = :email";
$statement = $db->prepare($query);

// Fill email placeholder
$statement->bindValue(':email', $email);

// Execute query and fetch results
$statement->execute();
$result = $statement->fetch();
$statement->closeCursor();

// Check that the given password and storedPassword match
$storedPassword = $result['password'];
$match = password_verify($password, $storedPassword);

// If there was a match...
// TODO: Get the $_SESSION variables to work
if ($match) {
    $_SESSION['user'] = $email;
    $_SESSION['loggedIn'] = true;

    // Send success message
    echo json_encode(['content'=>'Success']);
} else {
    // If there was no match, return an error message
    echo json_encode(['content'=>'Error']);
}

?>