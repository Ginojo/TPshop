const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors({
  origin: ['http://localhost:8000', 'https://tpshop.be', 'https://www.tpshop.be'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/contact', limiter);

// Email transporter configuration
// For AWS SES (recommended for AWS):
const transporter = nodemailer.createTransport({
  host: 'email-smtp.eu-west-1.amazonaws.com', // Change region as needed
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD
  }
});

// Alternative: Using Gmail (for testing):
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_APP_PASSWORD
//   }
// });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Extract form data
    const {
      name,
      naam,
      email,
      phone,
      telefoon,
      subject,
      onderwerp,
      message,
      bericht
    } = req.body;

    // Use Dutch or English field names
    const finalName = name || naam;
    const finalEmail = email;
    const finalPhone = phone || telefoon;
    const finalSubject = subject || onderwerp || 'Contact Form Submission from TPshop';
    const finalMessage = message || bericht;

    // Validate required fields
    if (!finalName || !finalEmail || !finalMessage) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@tpshop.be',
      to: process.env.TO_EMAIL || 'ginoludik@gmail.com',
      subject: finalSubject,
      text: `New contact form submission from TPshop website:

Name: ${finalName}
Email: ${finalEmail}
${finalPhone ? `Phone: ${finalPhone}` : ''}
Subject: ${finalSubject}

Message:
${finalMessage}

---
This email was sent from the TPshop contact form.`,
      html: `
        <h2>New contact form submission from TPshop</h2>
        <p><strong>Name:</strong> ${finalName}</p>
        <p><strong>Email:</strong> ${finalEmail}</p>
        ${finalPhone ? `<p><strong>Phone:</strong> ${finalPhone}</p>` : ''}
        <p><strong>Subject:</strong> ${finalSubject}</p>
        <h3>Message:</h3>
        <p>${finalMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from the TPshop contact form.</p>
      `,
      replyTo: finalEmail
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});