interface EmailTemplateProps {
  name: string;
  message: string;
}

const OpenEmailTemplate: React.FC<EmailTemplateProps> = ({ name, message }) => {
  return (
    <div>
      <p>Dear {name},</p>
      <p>Thank you for your message: {message}</p>
      <p>Best regards,</p>
      <p>Your Company</p>
    </div>
  );
};

export default OpenEmailTemplate;
