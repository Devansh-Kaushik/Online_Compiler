<?php
$servername = "remotemysql.com";
$username = "lO01dRyKJ0";
$password = "ptMFxHu9do";
$dbname = "lO01dRyKJ0";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$name = uniqid();
$sql = "INSERT INTO detail (`Name`) VALUES ($name)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>