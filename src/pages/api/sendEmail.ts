import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import OpenEmail from '@/Components/OpenEmail';
import Project from '@/Models/Project';

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { recipients, project } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Set up email service provider configuration here
      service: 'Outlook',
      auth: {
        user: 'jtsang13@hotmail.com', // change to GHL Admin
        pass: 'grad13Jo',             // change to GHL Admin password
      }
    });

    const props: {
      project: Project;
    } = {
      project: project
    };

    // Define the email options
    const mailOptions = {
      from: 'jtsang13@hotmail.com', // change to GHL Admin
      to: recipients,
      subject: `New Project Opened: ${props.project.name} (Project #:${props.project.prjNumber})`,
      html: OpenEmail({ props })
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