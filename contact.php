<?php
error_reporting(0);

//Correct server connection test
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	exit;
}

require "php/libraries/mail/class.phpmailer.php";

//data
$to = trim($_POST["to"]);
$from = trim($_POST["from"]);
$body = trim($_POST["body"]);
$user_email = trim($_POST["user-email"]);
$target_email = trim($_POST["target-email"]);
$img = trim($_POST["image"]);

//Empty fields check (only if bypassed client-side validation)
if ( empty($to) || empty($from) || empty($user_email) || empty($target_email) ) {
	$response = array(
		"status" => "error",
		"message" => "You left some required fields blank."
	);
	echo json_encode($response);
	exit;
}

//upload image
$uploadDir = "img/uploads/";
$img = str_replace("data:image/png;base64,", "", $img);
$img = str_replace(" ", "+", $img);
$data = base64_decode($img);
$file = $uploadDir . uniqid() . ".png";
$success = file_put_contents($file, $data);

//set mail info
$mail = new PHPMailer(true);

$mail->AddAddress($target_email);
$mail->SetFrom("noreply@thegreetingsworld.com");

$mail->Subject = "You've Recieved a Special Greeting from {$from} | Greetings, World!";

$mail->IsHTML(true);

//attach uploaded image
$mail->AddAttachment($file);

$message = "
<html>
	<head>
		<title>Greetings, World!</title>
	</head>
	<body>
		<p>{$body}</p>
	</body>
</html>
";

$mail->Body = $message;

//send mail
$mail->Send();

$response = array(
	"status" => "success",
	"message" => "Sent!"
);

echo json_encode($response);