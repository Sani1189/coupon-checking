<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coupon_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['total_price']) && isset($_POST['coupon_code'])) {
    $totalPrice = $_POST['total_price'];
    $couponCode = $_POST['coupon_code'];

    $sql = "SELECT * FROM coupons WHERE coupon_code = '$couponCode'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $discount = $row['discount'];
        $discountAmount = $totalPrice * $discount;
        $updatedPrice = $totalPrice - $discountAmount;

        $response = array(
            "discount" => number_format($discountAmount, 2),
            "updatedPrice" => number_format($updatedPrice, 2)
        );
        
        echo json_encode($response);
    } else {
        echo "invalid";
    }
}

$conn->close();
?>
