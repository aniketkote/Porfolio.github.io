
<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['msg'];
    $subject = $_POST['subject'];
    $formcontent="From: $name \n Message: $message";
    $recipient = "aniketkolte18@gmail.com";
    $mailheader = "From: $email \r\n";
    mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
    echo "Thank You!";
?>