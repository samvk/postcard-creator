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

//Upload image for easy email attachment
$uploadDir = "../img/uploads/";
$img = str_replace("data:image/png;base64,", "", $img);
$img = str_replace(" ", "+", $img);
$data = base64_decode($img);
$file = $uploadDir . uniqid() . ".png";
$success = file_put_contents($file, $data);

//Set email message
$body = htmlspecialchars($body, ENT_NOQUOTES);
$body = nl2br($body); //preserve line breaks

$message = "
<html>
	<head>
		<title>Greetings, World!</title>
	</head>
	<body>
		<p>{$body}</p>
		<hr>
		<p>Want to respond with style? Visit <a href='http://postcard.samvk.com'>GreetingsWorld.com<a> to send your own custom greeting card to {$from} at {$user_email}.</p>
	</body>
</html>
";

//SEND EMAIL TO RECIPIENT
$mail = new PHPMailer(true);

try {
	$mail->AddAddress($target_email);
	$mail->AddReplyTo($user_email, $from);
	$mail->SetFrom("noreply@greetingsworld.com", "Greetings, World!");
	$mail->Subject = "You've Recieved a Special Greeting from {$from}!";
	$mail->IsHTML(true);
	$mail->AddAttachment($file); //Attach uploaded image
	$mail->Body = $message;
	$mail->Send();

//SEND COPY OF EMAIL TO USER
	$mail->ClearAddresses();
	$mail->AddAddress($user_email);
	$mail->Subject = "Here's a Copy of Your Special Greeting to {$to}!";
	$mail->Send();

	//SUCCESS
	$response = array(
		"status" => "success",
		"message" => "Sent!"
	);
	echo json_encode($response);

	//ERROR
} catch (phpmailerException $e) {
	$response = array(
		"status" => "error",
		"message" =>  "Error: " . $e->errorMessage() //PHPMailer error
	);
	echo json_encode($response);
} catch (Exception $e) {
	$response = array(
		"status" => "error",
		"message" => "Error: " . $e->getMessage()
	);
	echo json_encode($response);
} finally {
	unlink($file); //Delete image after upload
}