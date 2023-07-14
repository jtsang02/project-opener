import Project from "@/Models/Project";

export default function OpenEmail ({ props } : {
  props: {
    project: Project;
  };
}) {

  return (
    `<div>
      <p>The following project is open: ${props.project.prjNumber}</p>
      <p>Project Name: ${props.project.name}<br>
      Project Address: ${props.project.address}<br>
      Classification: ${props.project.classification.join(", ")}<br></p>
      <p>Principal: ${props.project.internalContact.principal}<br>
      Project Manager: ${props.project.internalContact.projectManager}<br>
      Tech Suppport: ${props.project.internalContact.techSupport1}<br></p>
      <p>Best regards,</p>
      <p>${props.project.adminAssigned}</p>
    </div>`
  );
};
