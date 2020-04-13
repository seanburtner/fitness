<?php session_start(); ?>
<?php
// SAVE-ROUTINE.PHP IS CALLED WHEN USERS FINISHING CREATING A NEW ROUTINE - RECEIVES A POST REQUEST
// CONTAINING ROUTINE TITLE, LIST OF EXERCISES, AND USERNAME/ID

// Connect to db (also makes table(s) if necessary)
require('connect-db.php');

// Handle CORS (MUST UPDATE ON DEPLOYMENT)
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');

// OLD METHOD
// Retrieve data from the request
// $postdata = file_get_contents("php://input");
// // $getdata = $_GET['str'];

// // Convert json format to PHP array
// $request = json_decode($postdata);

// // Iterate through to move data to accessible array
// $data = [];
// $i = 0;
// foreach ($request as $key => $value) {
//     $data[$i][$key] = $value;
//     $i++;
// }

// // Move data into variables to prepare for insertion query
// $title = $data[0]['title'];
// $exercises = $data[1]['exercise'];
// $user = $data[2]['user'];

// Extract the POST request data
$title = $_POST["title"];
$exercises = $_POST["exercise"];
$user = $_POST["user"];
$_SESSION['user'] = $user;

// Check to see if this user already has a routine with this name; if so, return error
// Construct and prepare query
$query = "SELECT * FROM routines WHERE title=:title and user=:user"; // TODO: where user = $_SESSION['user']...
$statement = $db->prepare($query);

// Execute query and fetch results
$statement->bindValue(':title', $title);
$statement->bindValue(':user', $_SESSION['user']);
$statement->execute();
$result = $statement->fetch();
$statement->closeCursor();

// If the user does have a routine with this name, return an error
if ($result != false) {
    echo json_encode(['content'=>'Duplicate']);
} 
// Otherwise, add the routine and return success
else {
    // Create query, with placeholders for the required data
    $query = "INSERT INTO routines (title, exercises, user) VALUES (:title, :exercises, :user)";
    $statement = $db->prepare($query);

    // Fill placeholders and execute query
    $statement->bindValue(':title', $title);
    $statement->bindValue(':exercises', $exercises);
    $statement->bindValue(':user', $_SESSION['user']);
    $statement->execute();
    $statement->closeCursor();

    // routine-editor.component.ts is expecting a response; echo the data for confirmation
    echo json_encode(['content'=>'Success']);
}
?>