import { useState, Fragment } from "react";
import { Alert } from "@material-tailwind/react";
 
export default function SubmittedAlert() {
  const [open, setOpen] = useState(true);
  
  return (
    <Fragment>      
      <Alert color="green" open={open} onClose={() => setOpen(false)}>
        A dismissible alert for showing message.
      </Alert>
    </Fragment>
    );
}