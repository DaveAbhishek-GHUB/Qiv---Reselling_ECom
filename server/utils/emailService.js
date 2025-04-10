const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Gmail transporter with settings to improve deliverability
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email server connection error:', error);
  } else {
    console.log('Email server connection verified, server is ready to send messages');
  }
});

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  try {
    console.log('Preparing to send email to:', email);

    // Enhanced HTML email template with black and white theme
    const mailOptions = {
      from: `"Qiv" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            .animated-fade {
              animation: fadeIn 1s ease-in;
            }
            .animated-slide {
              animation: slideIn 0.7s ease-out;
            }
            .animated-pulse {
              animation: pulse 2s infinite;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" class="animated-fade">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #000000; margin: 0; font-size: 28px; letter-spacing: 2px;" class="animated-slide">QIV</h1>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 6px;" class="animated-slide">
              <p style="margin-top: 0; font-size: 16px;">Hello,</p>
              <p style="font-size: 16px;">Thank you for choosing Qiv. Please use the verification code below to complete your request:</p>
              <div style="background-color: #000000; color: white; font-size: 28px; font-weight: bold; text-align: center; padding: 15px; margin: 20px 0; border-radius: 6px; letter-spacing: 5px;" class="animated-pulse">
                ${otp}
              </div>
              <p style="font-size: 14px; color: #555;">This code will expire in <span style="font-weight: bold;">15 minutes</span>.</p>
              <p style="font-size: 14px; color: #555;">If you did not request this code, please disregard this email.</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 14px; color: #555;" class="animated-slide">
              <p>Thank you,<br><strong>The Qiv Team</strong></p>
              <div style="margin-top: 15px; font-size: 12px; color: #777;">
                <p>© ${new Date().getFullYear()} Qiv. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text alternative improves deliverability
      text: `Hello,\n\nYour verification code is: ${otp}\n\nThis code will expire in 15 minutes.\n\nIf you did not request this code, please disregard this email.\n\nThank you,\nThe Qiv Team`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Additional tips to improve email deliverability:
// 1. Set up SPF, DKIM, and DMARC records for your domain
// 2. Use a dedicated IP address for sending emails
// 3. Warm up your email sending gradually
// 4. Maintain a good sender reputation by avoiding spam triggers
// 5. Regularly clean your email list to remove bounces and complaints

module.exports = {
  sendOTPEmail
}; 