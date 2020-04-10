<?php

require('connect-db.php');

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// retrieve data from the request
$postdata = file_get_contents("php://input"); // retrieves whatever stream of data is coming in (whole chunk)
// $getdata = $_GET['str'];

// change json format to PHP array
$request = json_decode($postdata);

$data = [];
$i = 0;
foreach ($request as $key => $value) {
    $data[$i][$key] = $value;
    $i++;
}

// // send response in json format; frontend is just looking for a string (so echo is viable)
// echo json_encode(['content'=>$data]);

$title = $data[0]['title'];
$exercises = $data[1]['exercise'];
$user = $data[2]['user'];

$query = "INSERT INTO routines (title, exercises, user) VALUES (:title, :exercises, :user)";
$statement = $db->prepare($query);
$statement->bindValue(':title', $title);
$statement->bindValue(':exercises', $exercises);
$statement->bindValue(':user', $user);
$statement->execute();
$statement->closeCursor();

echo json_encode(['content'=>$data]);

?>