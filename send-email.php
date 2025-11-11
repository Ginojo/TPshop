<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(403);
    die("Forbidden");
}

// Configure email settings
$to = "ginoludik@gmail.com"; // Change this to your email
$from = "noreply@tpshop.be"; // Change this to your domain

// Sanitize form inputs
$name = filter_var($_POST['name'] ?? $_POST['naam'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($_POST['phone'] ?? $_POST['telefoon'] ?? '', FILTER_SANITIZE_STRING);
$subject = filter_var($_POST['subject'] ?? $_POST['onderwerp'] ?? 'Contact Form Submission', FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'] ?? $_POST['bericht'] ?? '', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    die("Please fill in all required fields");
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die("Invalid email address");
}

// Build email headers
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Build email body
$email_body = "New contact form submission from TPshop website:\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
if ($phone) {
    $email_body .= "Phone: $phone\n";
}
$email_body .= "Subject: $subject\n\n";
$email_body .= "Message:\n$message\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo "Success! Your message has been sent.";
} else {
    http_response_code(500);
    echo "Error: Unable to send email. Please try again later.";
}
?>