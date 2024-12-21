// Function to handle tab switching
function showTab(tabName) {
    // Hide all sections
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach((section) => {
        section.style.display = 'none';
    });

    // Show the selected tab
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';

    // Update active button style
    const buttons = document.querySelectorAll('.tabs button');
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    const activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === tabName);
    activeButton.classList.add('active');
}

// Handle the pricing process after selecting a college and location
document.addEventListener("DOMContentLoaded", () => {
    const proceedButton = document.getElementById("proceed-button");
    const collegeSelect = document.getElementById("college");
    const pricingFormContainer = document.getElementById("pricing-form-container");
    const priceTable = document.getElementById("price-table");

    // Event listener for the proceed button
    proceedButton.addEventListener("click", () => {
        const selectedCollege = collegeSelect.value;

        if (selectedCollege) {
            pricingFormContainer.style.display = "block";
        } else {
            alert("Please select a college to proceed.");
        }
    });

    // Handle pricing calculation when the form is submitted
    document.getElementById("pricing-calculator").addEventListener("submit", function(event) {
        event.preventDefault();

        // Gather form data
        const type = document.getElementById("type").value;
        const urgency = document.getElementById("urgency").value;
        const length = parseInt(document.getElementById("length").value);
        const pages = parseInt(document.getElementById("pages").value);
        const details = document.getElementById("details").value;
        const file = document.getElementById("pdf-upload").files[0];
        const selectedCollege = collegeSelect.value; // Get the selected college

        // Calculate the base price (starting value)
        let price = 5;

        // Price adjustment based on urgency
        if (urgency === "urgent") {
            price += 50;
        } else if (urgency === "express") {
            price += 30;
        } else {
            price += 10;
        }

        // Add price based on word count/length
        if (length <= 150) {
            price += 40;
        } else if (length > 150 && length <= 300) {
            price += 50;
        } else {
            price += 100;
        }

        // Add price based on number of pages
        if (pages <= 3) {
            price += 100;
        } else if (pages > 3 && pages <= 10) {
            price = price + (150 + pages * 2);
        } else {
            price += 200 + pages * 1.5;
        }

        // Optional: Additional fee for extra details or PDF upload
        let additionalFees = 0;
        if (details || file) {
            additionalFees = 20;
            price += additionalFees;
        }

        // Display pricing results in the table
        document.getElementById("college-result").innerText = selectedCollege;  // Show selected college
        document.getElementById("type-result").innerText = type.charAt(0).toUpperCase() + type.slice(1);
        document.getElementById("urgency-result").innerText = urgency.charAt(0).toUpperCase() + urgency.slice(1);
        document.getElementById("length-result").innerText = length + " words";
        document.getElementById("pages-result").innerText = pages + " pages";
        document.getElementById("additional-fees").innerText = "₹" + additionalFees;
        document.getElementById("total-price").innerText = "₹" + price;

        // Show the result table
        priceTable.style.display = "block";
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
       
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Mock contact form submission (this should be replaced with real form submission logic)
        alert(`Thank you for your message, ${name}! We will get back to you at ${email}.`);

        // Optionally, reset the form
        document.getElementById('contact-form').reset();
    });
});
const loginText = document.querySelector(".title-text .login");
         const loginForm = document.querySelector("form.login");
         const loginBtn = document.querySelector("label.login");
         const signupBtn = document.querySelector("label.signup");
         const signupLink = document.querySelector("form .signup-link a");
         signupBtn.onclick = (()=>{
           loginForm.style.marginLeft = "-50%";
           loginText.style.marginLeft = "-50%";
         });
         loginBtn.onclick = (()=>{
           loginForm.style.marginLeft = "0%";
           loginText.style.marginLeft = "0%";
         });
         signupLink.onclick = (()=>{
           signupBtn.click();
           return false;
         });