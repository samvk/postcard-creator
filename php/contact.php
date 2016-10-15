<?php

error_reporting(0);

//Correct serve connection test
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	exit;
}

$to = trim($_POST["to"]);
$from = trim($_POST["from"]);
$body = trim($_POST["body"]);
$target_email = trim($_POST["target-email"]);

//Empty fields check (only if surpassed client-side validation)
if ( empty($to) || empty($from) || empty($target_email) ) {
	echo "<p class='loud'>You left some required fields blank.</p>";
	exit;
}

//Valid email check (only if surpassed client-side validation)
if (!filter_var($target_email, FILTER_VALIDATE_EMAIL)) {
	echo "<p class='loud'>Please enter a valid email address.</p>";
	exit;
}

// Send message to email address
$subject = "You've Recieved a Special Greeting from {$from} | \"Greetings, World!\"";
$body = "You have received a new message:\n\n{$body}";
$headers = "From: noreply@thegreetingsworld.com\n";

mail($target_email, $subject, $body, $headers);

echo "<p class='loud'>Submitted!</p>";