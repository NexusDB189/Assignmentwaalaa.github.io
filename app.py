from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'your_email_password'  # Replace with your email password
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Order summary endpoint
@app.route('/order', methods=['GET'])
def order():
    # Get data from query parameters
    data = {
        "college": request.args.get("college"),
        "type": request.args.get("type"),
        "urgency": request.args.get("urgency"),
        "length": request.args.get("length"),
        "pages": request.args.get("pages"),
        "details": request.args.get("details"),
        "email": request.args.get("email"),
        "phone": request.args.get("phone"),
        "totalPrice": request.args.get("totalPrice"),
        "file": request.args.get("file"),  # Include file name
    }
    return render_template('order.html', data=data)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "nexusdb189@gmail.com"  # Use your Gmail account to authenticate
app.config["MAIL_PASSWORD"] = "kxgyhptfuoilxvaq"
app.config["MAIL_DEFAULT_SENDER"] = "nex@gmail.com"  # Default sender if needed


mail = Mail(app)

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.json  # Parse the incoming JSON data
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        # Get the sender email from the order summary data
        sender_email = data.get("email")
        if not sender_email:
            return jsonify({"error": "Sender email is missing in the order summary."}), 400

        # Construct the email message
        msg = Message(
            subject="New Order Summary",
            sender=sender_email,  # Use the email from the order summary as the sender
            recipients=["nexusdb189@gmail.com"],  # Receiver email
            body=f"""
            New Order Summary:
            ---------------------------
            College: {data['college']}
            Type: {data['type']}
            Urgency: {data['urgency']}
            Word/Page Count: {data['length']}
            Number of Pages: {data['pages']}
            Details: {data['details']}
            Uploaded File: {data['file']}
            Email: {sender_email}
            Phone: {data['phone']}
            Total Price: {data['totalPrice']}
            """
        )
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        print(f"Error: {e}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5600)
