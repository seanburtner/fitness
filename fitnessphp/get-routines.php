<!-- Sean Burtner -->
<?php session_start(); ?>
<?php
// GET-ROUTINES.PHP IS CALLED AS THE ROUTINES PAGE IS LOADED TO FETCH THE CURRENT USER'S ROUTINES

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Retrieve user from the request URL (TODO: SHOULD GET IT FROM A SESSION-MAINTENANCE FEATURE)
$user = $_POST['user'];
$_SESSION['user'] = $user;

// Construct and prepare query
$query = "SELECT * FROM routines WHERE user = :user";
$statement = $db->prepare($query);

// Execute query and fetch results
$statement->bindValue(':user', $_SESSION['user']);
$statement->execute();
$results = $statement->fetchAll();
$statement->closeCursor();

// Send data back to routines.component.ts
echo json_encode(['content'=>$results]);

?>