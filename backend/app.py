from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# MongoDB
MONGO_URI = "mongodb+srv://newuser:chhelu123@cluster0.qztqu6v.mongodb.net/?appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["sylithe"]
users_collection = db["users"]

# SendGrid
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
FROM_EMAIL = "info@sylithe.com"


def send_welcome_email(to_email, full_name):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#F1F1F1;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F1F1F1;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="background-color:#08292F;padding:40px 40px 30px 40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px 0;letter-spacing:1px;">Sylithe</h1>
                  <p style="color:#A3E635;font-size:14px;margin:0;letter-spacing:2px;text-transform:uppercase;">Carbon Intelligence Platform</p>
                </td>
              </tr>

              <!-- Welcome -->
              <tr>
                <td style="padding:40px 40px 20px 40px;">
                  <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px 0;">Welcome aboard, {full_name}!</h2>
                  <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 24px 0;">
                    Thank you for signing up with Sylithe. We've received your request and we're excited to have you join us on the journey toward confident, science-backed climate action.
                  </p>
                </td>
              </tr>

              <!-- What happens next -->
              <tr>
                <td style="padding:0 40px 20px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;border-radius:12px;border:1px solid #E2E8F0;">
                    <tr>
                      <td style="padding:24px;">
                        <h3 style="color:#0F172A;font-size:18px;margin:0 0 16px 0;">What happens next?</h3>

                        <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                          <tr>
                            <td style="vertical-align:top;padding-right:12px;">
                              <div style="width:24px;height:24px;background-color:#16a34a;border-radius:50%;color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:24px;">1</div>
                            </td>
                            <td style="color:#475569;font-size:14px;line-height:1.6;padding-bottom:8px;">
                              <strong style="color:#0F172A;">Account review</strong><br>
                              Our team will review your details and verify your account within 24–48 hours.
                            </td>
                          </tr>
                        </table>

                        <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                          <tr>
                            <td style="vertical-align:top;padding-right:12px;">
                              <div style="width:24px;height:24px;background-color:#16a34a;border-radius:50%;color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:24px;">2</div>
                            </td>
                            <td style="color:#475569;font-size:14px;line-height:1.6;padding-bottom:8px;">
                              <strong style="color:#0F172A;">Personalized walkthrough</strong><br>
                              A member of our team will reach out to schedule a demo tailored to your needs.
                            </td>
                          </tr>
                        </table>

                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:top;padding-right:12px;">
                              <div style="width:24px;height:24px;background-color:#16a34a;border-radius:50%;color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:24px;">3</div>
                            </td>
                            <td style="color:#475569;font-size:14px;line-height:1.6;">
                              <strong style="color:#0F172A;">Platform access</strong><br>
                              Once verified, you'll get full access to Sylithe's carbon intelligence tools — CHM verification, LULC analysis, dynamic baselines, and more.
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td style="padding:10px 40px 30px 40px;text-align:center;">
                  <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px 0;">
                    In the meantime, explore how our methodology works:
                  </p>
                  <a href="https://sylithe.com" style="display:inline-block;background-color:#08292F;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:bold;letter-spacing:0.5px;">
                    Visit Sylithe
                  </a>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:0 40px;">
                  <div style="border-top:1px solid #E2E8F0;"></div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:24px 40px 32px 40px;text-align:center;">
                  <p style="color:#94A3B8;font-size:13px;line-height:1.6;margin:0 0 8px 0;">
                    Questions? Reply to this email or reach us at <a href="mailto:info@sylithe.com" style="color:#16a34a;text-decoration:none;">info@sylithe.com</a>
                  </p>
                  <p style="color:#CBD5E1;font-size:12px;margin:0;">
                    &copy; {datetime.now().year} Sylithe. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """

    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to_email,
        subject=f"Welcome to Sylithe, {full_name}!",
        html_content=html,
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        logger.info(f"Email sent to {to_email} — status {response.status_code}")
    except Exception as e:
        logger.error(f"Email failed for {to_email}: {str(e)}")


@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400

        required = ['fullName', 'email', 'mobile']
        missing = [f for f in required if not data.get(f)]
        if missing:
            return jsonify({"status": "error", "message": f"Missing fields: {', '.join(missing)}"}), 400

        if users_collection.find_one({"email": data["email"]}):
            return jsonify({"status": "error", "message": "Email already registered"}), 409

        user_doc = {
            "fullName": data.get("fullName"),
            "email": data.get("email"),
            "mobile": data.get("mobile"),
            "companyName": data.get("companyName", ""),
            "designation": data.get("designation", ""),
            "primaryActivity": data.get("primaryActivity", ""),
            "companySize": data.get("companySize", ""),
            "interestArea": data.get("interestArea", ""),
            "hearAbout": data.get("hearAbout", ""),
            "createdAt": datetime.now(timezone.utc),
        }

        users_collection.insert_one(user_doc)
        logger.info(f"New signup: {data['email']}")

        # Send welcome email
        send_welcome_email(data["email"], data["fullName"])

        return jsonify({"status": "success", "message": "Account created successfully"}), 201

    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
