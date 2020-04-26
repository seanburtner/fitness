<?php session_start(); ?>
<?php
// Colton Demetriou
// DELETE-ROUTINE.PHP IS CALLED WHEN USERS DELETES A ROUTINE ON THE ROUTINES PAGE; RECEIVES
// A POST REQUEST CONTAINING A ROUTINE TITLE TO DELETE AND THE USER SENDING THE REQUEST

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Extract the POST request data
$title = $_POST["routineToDelete"];
$user = $_POST["user"];
$_SESSION['user'] = $user;

// Delete the routine that the user is trying to delete.
$query = "DELETE FROM routines WHERE title = :title and user = :user LIMIT 1";
$statement = $db->prepare($query);

// Fill placeholder and execute query
$statement->bindValue(':title', $title);
$statement->bindValue(':user', $_SESSION['user']);
$statement->execute();
$result = $statement->fetch();
$statement->closeCursor();

// Echo success message
echo json_encode(['content'=>'Success']);

?>