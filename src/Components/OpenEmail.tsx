export default function OpenEmail ({ props } : {
  props: {
    message: string;
    adminAssigned: string;
    prjNumber: string;
  };
}) {

  return (
    `<div>
      <p>The following project is open: ${props.prjNumber}</p>
      <p>${props.message}</p>
      <p>Best regards,</p>
      <p>${props.adminAssigned}</p>
    </div>`
  );
};
