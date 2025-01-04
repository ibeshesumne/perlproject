<?php
require '../db.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

// Handle different actions
if ($action === 'create') {
    // Create a new letter
    $title = $_POST['title'];
    $sender = $_POST['sender'];
    $recipient = $_POST['recipient'];
    $date = $_POST['date'];
    $content = $_POST['content'];

    $stmt = $pdo->prepare("INSERT INTO letters (title, sender, recipient, date, content) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$title, $sender, $recipient, $date, $content]);

    echo json_encode(['message' => 'Letter added successfully']);
} elseif ($action === 'read') {
    // Read all letters
    $stmt = $pdo->query("SELECT * FROM letters ORDER BY date DESC");
    $letters = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($letters);
} elseif ($action === 'delete') {
    // Delete a letter
    $id = $_GET['id'] ?? 0;

    $stmt = $pdo->prepare("DELETE FROM letters WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['message' => 'Letter deleted successfully']);
} else {
    // Invalid action
    http_response_code(400);
    echo json_encode(['message' => 'Invalid action']);
}
?>
