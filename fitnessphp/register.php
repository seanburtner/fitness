<?php
// REGISTER.PHP IS CALLED IF A NEW USER IS TRYING TO REGISTER

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');

// Extract the POST request data, trimming spaces at beginning or end
$email = trim($_POST['email']);
$password = $_POST['password'];

// Check to see that a user with this email doesn't already exist.
$query = "SELECT * FROM users WHERE email = :email";
$statement = $db->prepare($query);

// Fill placeholder and execute query
$statement->bindValue(':email', $email);
$statement->execute();
$result = $statement->fetch();
$statement->closeCursor();

// If there is no match, continue and create a new user, and return a success message
if ($result == false) {
    // Hash the password.
    $hash_password = password_hash($password, PASSWORD_DEFAULT);
        
    $query = "INSERT INTO users (email, password) VALUES (:email, :pwd)";
    $statement = $db->prepare($query);

    // Fill placeholders and execute query
    $statement->bindValue(':email', $email);
    $statement->bindValue(':pwd', $hash_password);
    $statement->execute();
    $statement->closeCursor();

    // Return success
    echo json_encode(['content'=>'Success']);

} // Else, return an error
else {
    echo json_encode(['content'=>'Error']);
}

?>