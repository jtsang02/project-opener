import Project from "@/Models/Project";

export default function OpenEmail({ props }: {
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
      <div class="max-w-lg mx-auto py-3">
        <h3 class="text-base text-bold">GHL CONSULTANTS LTD</h3>
          <p class="text-xs">Building Codes & Fire Science
          <br>700 W Pender Street, Suite 800, Vancouver, BC V6C 1G8</p>
          <p class="text-xs">P 604 689 4449 Ext 127 | W <a href="http://www.ghl.ca">www.ghl.ca</a></p>
      </div>
    </div>`
  );
};
