<?php
error_reporting(0);

//Correct server connection test
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	exit;
}

require "libraries/mail/class.phpmailer.php";

//data
$to = trim($_POST["to"]);
$from = trim($_POST["from"]);
$body = trim($_POST["body"]);
$user_email = trim($_POST["user-email"]);
$target_email = trim($_POST["target-email"]);
$image = trim($_POST["image"]);

//Empty fields check (only if bypassed client-side validation)
if ( empty($to) || empty($from) || empty($user_email) || empty($target_email) ) {
	$response = array(
		"status" => "error",
		"message" => "You left some required fields blank."
	);
	echo json_encode($response);
	exit;
}

//set mail info
$mail = new PHPMailer(true);

$mail->AddAddress($target_email);
$mail->SetFrom("noreply@thegreetingsworld.com");

$mail->Subject = "You've Recieved a Special Greeting from {$from} | Greetings, World!";

$mail->IsHTML(true);

$mail->AddEmbeddedImage($image, "imageSrc");

$message = "
<html>
	<head>
		<title>Greetings, World!</title>
	</head>
	<body>
		<p>{$body}</p>
		<img src='cid:imageSrc' alt='Your greeting card'>
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

/*
$imageFile = base64_decode($image);
$imageFile2 = str_replace(' ', '+', $imageFile);
$image2 = str_replace(' ', '+', $image);
*/
//no//$mail->AddStringAttachment($imageFile, "greetings.png", "base64", "image/png");
//no//$mail->AddStringAttachment($imageFile2, "greetings.png", "base64", "image/png");
//no//$mail->AddStringAttachment($image, "greetings.png", "base64", "image/png");
//no//$mail->AddStringAttachment($image2, "greetings.png", "base64", "image/png");