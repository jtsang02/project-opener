import { useEffect, useState } from "react";
import Project from "@/Models/Project";
import { classification } from "@/Data/Classification";
import Header from "@/Components/Header";
import InputField from "@/Components/InputField";
import RadioBtnGroup from "@/Components/RadioBtnGroup";
import { Checkbox } from "@material-tailwind/react";

export default function Form(Project: Project) {

  // delete this later
  const [data, setData] = useState<any>(null);

  // Project Details
  const [projectName, setProjectName] = useState<string>("");
  const [projectAddress, setProjectAddress] = useState<string>("");
  const [projectClassifications, setProjectClassifications] = useState<string[]>([]);
  // Client Information
  const [clientName, setClientName] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  // Care of Client Information
  const [careOf, setCareOf] = useState<boolean>(false);
  const [careOfClientName, setCareOfClientName] = useState<string>("");
  const [careOfClientAddress, setCareOfClientAddress] = useState<string>("");
  const [careOfClientPhone, setCareOfClientPhone] = useState<string>("");
  const [careOfClientEmail, setCareOfClientEmail] = useState<string>("");
  // Accounting
  const [formalContract, setFormalContract] = useState<boolean>(true);
  const [feeCategory, setFeeCategory] = useState<string>("");
  const [retainer, setRetainer] = useState<boolean>(false);
  const [retainerAmount, setRetainerAmount] = useState<number>(0);
  // Internal Contact


  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
      <Header props={{
        heading: "Project Opening Form",
        paragraph: "Fill out the form below to request a new project number.",
        linkurl: "/admin",
        linkName: "Login as Admin"
      }} />

      <section>
        <div className="mx-auto px-4 sm:px-8 py-8 max-w-screen-lg">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <form action="#" method="POST">
              <div className="grid grid-cols-1 gap-6">

                <label className="text-xl font-bold text-gray-900">Project Details</label>
                {/* Project Name */}
                <InputField props={{
                  label: "Project Name",
                  name: "projectName",
                  id: "projectName",
                  type: "search",
                  placeholder: "enter a project name",
                  required: true,
                  onChange: (e) => setProjectName(e.target.value)
                }} />
                {/* Project Address */}
                <InputField props={{
                  label: "Project Address",
                  name: "projectAddress",
                  id: "projectAddress",
                  type: "search",
                  placeholder: "enter a project address",
                  required: true,
                  onChange: (e) => setProjectAddress(e.target.value)
                }} />
                {/* Project Classification*/}
                <span className="text-gray-700 font-medium px-1">Project Classification
                  <span className="text-red-500">*</span>
                </span>
                {// map through classifications using checkbox component
                  classification.map((item) => (
                    <Checkbox
                      key={item}
                      color="blue"
                      label={item}
                      id={item}
                      name={item}
                      value={item}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProjectClassifications([...projectClassifications, e.target.value])
                        } else {
                          setProjectClassifications(projectClassifications.filter((item) => item !== e.target.value))
                        }
                      }}
                    />
                  ))
                }

                <label className="text-xl font-bold text-gray-900">Client Information</label>
                {/* Client Name */}
                <InputField props={{
                  label: "Client Name",
                  name: "clientName",
                  id: "clientName",
                  type: "search",
                  placeholder: "enter a client name",
                  required: true,
                  onChange: (e) => setClientName(e.target.value)
                }} />
                {/* Client Address */}
                <InputField props={{
                  label: "Client Address",
                  name: "clientAddress",
                  id: "clientAddress",
                  type: "search",
                  placeholder: "enter a client address",
                  required: true,
                  onChange: (e) => setClientAddress(e.target.value)
                }} />
                {/* Client Phone */}
                <InputField props={{
                  label: "Client Phone",
                  name: "clientPhone",
                  id: "clientPhone",
                  type: "search",
                  placeholder: "enter a client phone number",
                  required: true,
                  onChange: (e) => setClientPhone(e.target.value)
                }} />
                {/* Client Email */}
                <InputField props={{
                  label: "Client Email",
                  name: "clientEmail",
                  id: "clientEmail",
                  type: "search",
                  placeholder: "enter a client email",
                  required: true,
                  onChange: (e) => setClientEmail(e.target.value)
                }} />
                {/* care of*/}
                <div className="inline-flex items-baseline">
                  <span className="text-gray-700 font-medium px-1">
                    Is Client Care Of?
                    <Checkbox
                      color="blue"
                      id="retainer"
                      name="retainer"
                      type="checkbox"
                      checked={careOf}
                      onChange={(e) => setCareOf(e.target.checked)}
                    />
                  </span>
                </div>

                {careOf && (<>
                  <label className="text-xl font-bold text-gray-900">Client Care Of Information</label>
                  {/* Care Of Client Name */}
                  <InputField props={{
                    label: "Care Of Client Name",
                    name: "careOfClientName",
                    id: "careOfClientName",
                    type: "search",
                    placeholder: "enter a care of client name",
                    required: false,
                    onChange: (e) => setCareOfClientName(e.target.value)
                  }} />
                  {/* Care Of Client Address */}
                  <InputField props={{
                    label: "Care Of Client Address",
                    name: "careOfClientAddress",
                    id: "careOfClientAddress",
                    type: "search",
                    placeholder: "enter a care of client address",
                    required: false,
                    onChange: (e) => setCareOfClientAddress(e.target.value)
                  }} />
                  {/* Care Of Client Phone */}
                  <InputField props={{
                    label: "Care Of Client Phone",
                    name: "careOfClientPhone",
                    id: "careOfClientPhone",
                    type: "search",
                    placeholder: "enter a care of client phone number",
                    required: false,
                    onChange: (e) => setCareOfClientPhone(e.target.value)
                  }} />
                  {/* Care Of Client Email */}
                  <InputField props={{
                    label: "Care Of Client Email",
                    name: "careOfClientEmail",
                    id: "careOfClientEmail",
                    type: "search",
                    placeholder: "enter a care of client email",
                    required: false,
                    onChange: (e) => setCareOfClientEmail(e.target.value)
                  }} />
                </>
                )}

                <label className="text-xl font-bold text-gray-900">Accounting</label>
                {/* Contract type */}
                <span className="text-gray-700 font-medium px-1">Contract Type
                  <span className="text-red-500">*</span>
                </span>
                <RadioBtnGroup props={{
                  options: [
                    { label: "Formal", option: "formal" },
                    { label: "Email", option: "email" }
                  ],
                  onchange(e) {
                    setFormalContract(e.target.value === "formal");
                  },
                }} />
                {/* Fee Category */}
                <span className="text-gray-700 font-medium px-1">Fee Category
                  <span className="text-red-500">*</span>
                </span>
                <RadioBtnGroup props={{
                  options: [
                    { label: "Fixed Fee", option: "fixedFee" },
                    { label: "Budget Estimate", option: "budgetEstimate" },
                    { label: "Time & Expense", option: "TnE" },
                  ],
                  onchange(e) {setFeeCategory(e.target.value);},
                }} />

                {/* Retainer - make the label in same row as checkbox*/}
                <div className="inline-flex items-baseline">
                  <span className="text-gray-700 font-medium px-1">
                    Retainer
                    <Checkbox
                      color="blue"
                      id="retainer"
                      name="retainer"
                      type="checkbox"
                      checked={retainer}
                      onChange={(e) => setRetainer(e.target.checked)}
                    />
                  </span>
                </div>

                {/* Retainer Amount */}
                {retainer && (
                  <InputField props={{
                    label: "Retainer Amount",
                    name: "retainerAmount",
                    id: "retainerAmount",
                    type: "number",
                    placeholder: "enter a retainer amount (in CAD, not crypto)",
                    required: false,
                    onChange: (e) => setRetainerAmount(parseInt(e.target.value))
                  }} />
                )}

                <label className="text-xl font-bold text-gray-900">GHL Contact</label>


                <label className="block">
                  <span className="text-gray-700 font-bold px-1">Special Notes</span>
                  <textarea
                    name="specialNotes"
                    id="specialNotes"
                    rows={3}
                    className="mt-1 block w-full rounded-md p-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="add any special notes here like if this is a point job"
                  ></textarea>
                </label>

              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
