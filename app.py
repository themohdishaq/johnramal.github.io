from flask import Flask, request, redirect, url_for, render_template_string, flash
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
app.secret_key = '7c9d8a0f6b4e7a8fcd2e6a90b1d2e6a8'  # Set your secret key here

# Replace these with your email server settings
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USER = 'johnailia51@gmail.com'
SMTP_PASSWORD = 'emjz xreh fshx euyj'  # Use the app-specific password here

def load_template(filename):
    with open(filename, 'r') as file:
        return file.read()

@app.route('/')
def index():
    return render_template_string(load_template('index.html'))

@app.route('/elements')
def elements():
    return render_template_string(load_template('elements.html'))

@app.route('/generic')
def generic():
    return render_template_string(load_template('generic.html'))

@app.route('/send', methods=['POST'])
def send_email():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    redirect_url = request.form['redirect_url']

    msg = MIMEText(f"Name: {name}\nEmail: {email}\nMessage: {message}")
    msg['Subject'] = 'Contact Form Submission'
    msg['From'] = SMTP_USER
    msg['To'] = SMTP_USER

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, [SMTP_USER], msg.as_string())
        flash('Message sent successfully!')
    except smtplib.SMTPAuthenticationError:
        flash('Authentication error. Check your email and password.')
        print('SMTP Authentication Error')
    except smtplib.SMTPConnectError:
        flash('Unable to connect to the SMTP server. Check your server settings.')
        print('SMTP Connect Error')
    except Exception as e:
        flash(f"Error: {e}")
        print(f"Error: {e}")

    return redirect(redirect_url)

if __name__ == '__main__':
    app.run(debug=True)
