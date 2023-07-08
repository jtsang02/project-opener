import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Set up your email service provider configuration here
      service: 'Gmail',
      auth: {
        user: 'jtstripes95@gmail.com',
        pass: 'grad13Josiah',
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'jtstripes95@gmail.com',
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for your message: ${message}\n\nBest regards,\nYour Company`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission