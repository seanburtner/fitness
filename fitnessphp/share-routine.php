<?php
// SHARE-ROUTINE.PHP IS CALLED WHEN USERS SHARE A ROUTINE ON THE ROUTINES PAGE; RECEIVES
// A POST REQUEST CONTAINING A ROUTINE TITLE TO SHARE, THE USER SENDING THE REQUEST,
// AND THE USER TO SHARE WITH (RECIPIENT)

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');

function doesUserExist($username, $db) {
    // Create and prepare query
    $query = "SELECT * FROM users WHERE email = :username";
    $statement = $db->prepare($query);

    // Fill placeholder and execute query
    $statement->bindValue(':username', $username);
    $statement->execute();
    $result = $statement->fetch();
    $statement->closeCursor();

    // If there is no result, return false; else true
    if ($result == false) {
        return false;
    } else {
        return true;
    }
}

// Extract the POST request data
$title = $_POST["routineToShare"];
$recipient = trim($_POST["recipient"]);
$user = $_POST["user"]; //TODO: get from $_SESSION

// First check to see that a valid username was entered.
$found = doesUserExist($recipient, $db);

// If this user doesn't exist, return error
if ($found == false) {
    echo json_encode(['content'=>'User not found']);
} else {
    // Get the routine that the user is trying to share.
    $query = "SELECT * FROM routines WHERE title = :title and user = :user LIMIT 1";
    $statement = $db->prepare($query);

    // Fill placeholder and execute query
    $statement->bindValue(':title', $title);
    $statement->bindValue(':user', $user);
    $statement->execute();
    $result = $statement->fetch();
    $statement->closeCursor();

    // If somehow this routine couldn't be found, return an error
    if ($result == false) {
        echo json_encode(['content'=>'Error']);
    } else { // Otherwise insert the routine into the shared routines table

        // Extract the routine data
        $new_title = $result['title'];
        $new_exercises = $result['exercises'];

        // The user field of the new routine should be the recipient
        $new_user = $recipient;

        // Create query, with placeholders for the required data
        $query = "INSERT INTO sharedRoutines (title, exercises, user) VALUES (:title, :exercises, :user)";
        $statement = $db->prepare($query);

        // Fill placeholders and execute query
        $statement->bindValue(':title', $new_title);
        $statement->bindValue(':exercises', $new_exercises);
        $statement->bindValue(':user', $new_user);
        $statement->execute();
        $statement->closeCursor();

        echo json_encode(['content'=>'Success']);
    }
}

?>