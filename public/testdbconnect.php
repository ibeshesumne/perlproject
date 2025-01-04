<?php
require '../db.php'; // Adjust the path as needed

$stmt = $pdo->query("SHOW TABLES");
while ($row = $stmt->fetch()) {
    echo $row[0] . "<br>";
}
?>
