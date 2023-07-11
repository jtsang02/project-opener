export default function OpenEmail ({ props } : {
  props: {
    message: string;
    adminAssigned: string;
  };
}) {

  const {message, adminAssigned } = props;

  return (
    `<div>
      <p>Dear John,</p>
      <p>Thank you for your message: ${message}</p>
      <p>Best regards,</p>
      <p>Admin Personel</p>
    </div>`
  );
};
