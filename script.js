document.getElementById("apply-coupon").addEventListener("click", function() {
    let totalPrice = parseFloat(document.getElementById("total-price").value);
    let couponCode = document.getElementById("coupon-code").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "apply_coupon.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText;
            if (response === "invalid") {
                document.getElementById('result-message').style.color = "red";
                document.getElementById("result-message").textContent = "Not a valid coupon.";
                document.getElementById("updated-price").textContent = "";
            } else {
                let responseData = JSON.parse(response);
                document.getElementById('result-message').style.color = "green";
                document.getElementById("result-message").textContent = "Coupon successfully applied! Discount: $" + responseData.discount;
                document.getElementById("updated-price").textContent = "Updated Price: $" + responseData.updatedPrice;
            }
        }
    };

    xhr.send("total_price=" + totalPrice + "&coupon_code=" + couponCode);
});
