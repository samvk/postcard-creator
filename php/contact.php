<?php
error_reporting(0);

//Correct server connection test
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	exit;
}

$to = trim($_POST["to"]);
$from = trim($_POST["from"]);
$body = trim($_POST["body"]);
$target_email = trim($_POST["target-email"]);
$image = trim($_POST["image"]);

$body = htmlspecialchars($body);

//Empty fields check (only if bypassed client-side validation)
if ( empty($to) || empty($from) || empty($target_email) ) {
	$response = array(
		"status" => "error",
		"message" => "You left some required fields blank."
	);
	echo json_encode($response);
	exit;
}

// Send message to email address
$subject = "You've Recieved a Special Greeting from {$from} | Greetings, World!";

$message = "
<html>
	<head>
		<title>Greetings, World!</title>
	</head>
	<body>
		<p>{$body}</p>
		<img src='$image'>
	</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: noreply@thegreetingsworld.com\n";

mail($target_email, $subject, $message, $headers);

$response = array(
	"status" => "success",
	"message" => "Sent!"
);

echo json_encode($response);