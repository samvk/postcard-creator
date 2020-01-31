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
$img = $_POST["image"];
$theme = $_POST["theme"];

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

		<style>
			a.home {
				color: #F43329;
				text-decoration: none;
			}
			a.home:hover { text-decoration: underline; }
			div.redline {
				border-left: 4px solid transparent;
				border-right: 4px solid transparent;
				border-top: 4px solid #F43329;
				width: 280px;
				height: 0;
			}
		</style>
	</head>
	<body>
		<p>{$body}</p>
		<div class='redline'></div>
		<p><strong>Want to respond with style? Visit <a class='home' href='https://greetingsworld.us'>GreetingsWorld.us</a> to send your own custom greeting card to {$from} at {$user_email}.</strong></p>
	</body>
</html>
";

//set theme
$themeList = array(
	"halloween" => "🎃",
	"thanksgiving" => "🍁"
);
$themeIcon = $theme ? $themeList[$theme] : "💗"; //default subject symbol icon

//SEND EMAIL TO RECIPIENT
$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";

try {
	$mail->AddAddress($target_email);
	$mail->AddReplyTo($user_email, $from);
	$mail->SetFrom("greetingsworld@samvk.com", "💕 Greetings, World!");
	$mail->Subject = "You've Received a Special Greeting from {$from}! {$themeIcon}";
	$mail->IsHTML(true);
	$mail->AddAttachment($file); //Attach uploaded image
	$mail->Body = $message;
	$mail->Send();

//SEND COPY OF EMAIL TO USER
	$mail->ClearAddresses();
	$mail->ClearReplyTos();
	$mail->AddAddress($user_email);
	$mail->AddReplyTo("noreply@samvk.com");
	$mail->Subject = "Here's a Copy of Your Special Greeting to {$to}! {$themeIcon}";
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
		"message" =>  "PHPMailer error: " . $e->errorMessage() //PHPMailer error
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
