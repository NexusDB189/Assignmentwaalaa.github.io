document.addEventListener("DOMContentLoaded", function () {
    const proceedButton = document.getElementById("proceed-button");
    const pricingFormContainer = document.getElementById("pricing-form-container");
    const confirmButton = document.getElementById("Confirm");
    const submitDetails = document.getElementById("submit-details");
    const finalSubmitButton = document.getElementById("final-submit-button");

    // Show the pricing form when Proceed button is clicked
    proceedButton.addEventListener("click", function () {
        const selectedCollege = document.getElementById("college").value;

        if (selectedCollege) {
            pricingFormContainer.style.display = "block";
        } else {
            alert("Please select a college to proceed.");
        }
    });

    // Calculate the price and show the pricing breakdown
    document.getElementById("pricing-calculator").addEventListener("submit", function (event) {
        event.preventDefault();
        
        const type = document.getElementById("type").value;
        const urgency = document.getElementById("urgency").value;
        const length = parseInt(document.getElementById("length").value);
        const pages = parseInt(document.getElementById("pages").value);
        const details = document.getElementById("details").value;

        let price = 5;

        // Calculate based on urgency
        if (urgency === "urgent") {
            price += 50;
        } else if (urgency === "express") {
            price += 30;
        } else {
            price += 10;
        }

        // Calculate based on word count
        if (length <= 150) {
            price += 40;
        } else if (length > 150 && length <= 300) {
            price += 50;
        } else {
            price += 100;
        }

        // Calculate based on pages
        if (pages <= 3) {
            price += 100;
        } else if (pages > 3 && pages <= 10) {
            price += 150 + pages * 2;
        } else {
            price += 200 + pages * 1.5;
        }

        // Additional fees for extra details
        let additionalFees = 0;
        if (details) {
            additionalFees = 20;
            price += additionalFees;
        }

        // Show the price breakdown in the table
        document.getElementById("college-result").innerText = document.getElementById("college").value;
        document.getElementById("type-result").innerText = type;
        document.getElementById("urgency-result").innerText = urgency;
        document.getElementById("length-result").innerText = length + " words";
        document.getElementById("pages-result").innerText = pages + " pages";
        document.getElementById("detail-result").innerText = details;
        document.getElementById("additional-fees").innerText = "₹" + additionalFees;
        document.getElementById("total-price").innerText = "₹" + price;

        document.getElementById("price-table").style.display = "block";
    });

    // Show the email and phone number form when Confirm button is clicked
    confirmButton.addEventListener("click", function () {
        submitDetails.style.display = "block";
    });

    // Handle final submission
    finalSubmitButton.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Check if email and phone number are filled
        if (!email || !phone) {
            alert("Please enter both email and phone number.");
            return;
        }

        // Get pricing details to send in the email
        const message = `
            College: ${document.getElementById("college-result").innerText}
            Type of Work: ${document.getElementById("type-result").innerText}
            Urgency: ${document.getElementById("urgency-result").innerText}
            Word Count: ${document.getElementById("length-result").innerText}
            Number of Pages: ${document.getElementById("pages-result").innerText}
            Details: ${document.getElementById("detail-result").innerText}
            Additional Fees: ${document.getElementById("additional-fees").innerText}
            Total Price: ${document.getElementById("total-price").innerText}
            
            Email: ${email}
            Phone: ${phone}
        `;

        // Send the email using mailto
        const mailtoLink = `mailto:nexusdb189@gmail.com?subject=Assignment/Project Pricing&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink; // This will open the default email client

        // Optionally, reset the form and hide the submit details section
        submitDetails.style.display = "none";
        alert("Your details have been sent. Thank you!");
    });
});
