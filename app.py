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
    }
    return render_template('order.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5600)
