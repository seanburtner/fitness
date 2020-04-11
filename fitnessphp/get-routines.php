<?php
// GET-ROUTINES.PHP IS CALLED AS THE ROUTINES PAGE IS LOADED TO FETCH THE CURRENT USER'S ROUTINES

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Retrieve user from the request URL (LATER SHOULD GET IT FROM A SESSION-MAINTENANCE FEATURE)
$user = $_GET['user'];

// // send response in json format; frontend is just looking for a string (so echo is viable)
// echo json_encode(['content'=>$user]);

// Construct and prepare query
$query = "SELECT * FROM routines";
$statement = $db->prepare($query);

// Execute query and fetch results
$statement->execute();
$results = $statement->fetchAll();
$statement->closeCursor();

// Send data back to routines.component.ts
echo json_encode(['content'=>$results]);

?>