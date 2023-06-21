import { useEffect, useState, useRef } from "react";
import Project from "@/Models/Project";
import { classification } from "@/Data/Classification";
import { feeCategories } from "@/Data/FeeCategories";
import { contractTypes } from "@/Data/ContractTypes";
import { staff } from "@/Data/Staff";
import Header from "@/Components/Header";
import InputField from "@/Components/InputField";
import { Checkbox, Radio, Button } from "@material-tailwind/react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

export default function ({}: { project: Project }) {

  const formRef = useRef<HTMLFormElement>(null);

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
  const [principal, setPrincipal] = useState<string>("");
  const [projectManager, setProjectManager] = useState<string>("");
  const [techSupport1, setTechSupport1] = useState<string>("");
  const [techSupport2, setTechSupport2] = useState<string>("");
  // Deadline
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  // Form Validation
  const [formValid, setFormValid] = useState<boolean>(false);

  const formIsValid = () => {
    return (
      projectName !== "" &&
      projectAddress !== "" &&
      projectClassifications.length > 0 &&
      clientName !== "" &&
      clientAddress !== "" &&
      clientPhone !== "" &&
      clientEmail !== "" &&
      (careOf === false ||
        (careOfClientName !== "" &&

          careOfClientAddress !== "" &&
          careOfClientPhone !== "" &&
          careOfClientEmail !== "")) &&
      feeCategory !== "" &&
      principal !== "" &&
      projectManager !== "" &&
      techSupport1 !== "" &&
      techSupport2 !== ""
    );
  };

  // if any of the field changes, check if the form is valid
  useEffect(() => {
    setFormValid(formIsValid());
  }, [
    projectName,
    projectAddress,
    projectClassifications,
    clientName,
    clientAddress,
    clientPhone,
    clientEmail,
    careOf,
    careOfClientName,
    careOfClientAddress,
    careOfClientPhone,
    careOfClientEmail,
    feeCategory,
    principal,
    projectManager,
    techSupport1,
    techSupport2,
  ]);

  // reset the form
  const handleReset = (e:any) => {
    e.preventDefault();
    setProjectName("");
    setProjectAddress("");
    setProjectClassifications([]);
    setClientName("");
    setClientAddress("");
    setClientPhone("");
    setClientEmail("");
    setCareOf(false);
    setCareOfClientName("");
    setCareOfClientAddress("");
    setCareOfClientPhone("");
    setCareOfClientEmail("");
    setFormalContract(true);
    setFeeCategory("");
    setRetainer(false);
    setRetainerAmount(0);
    setPrincipal("");
    setProjectManager("");
    setTechSupport1("");
    setTechSupport2("");
    setDueDate(new Date());
    setNotes("");
    formRef.current?.reset();
    console.log("reset");
  }

  // submit the form if it is valid
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formValid)
      return;

    const newProject: Project = {
      name: projectName,
      address: projectAddress,
      classification: projectClassifications,
      client: {
        name: clientName,
        address: clientAddress,
        phone: clientPhone,
        email: clientEmail
      },
      careOfClient: {
        name: careOfClientName,
        address: careOfClientAddress,
        phone: careOfClientPhone,
        email: careOfClientEmail
      },
      accounting: {
        formalContract: formalContract,
        feeCategory: feeCategory,
        retainer: retainer,
        retainerAmount: retainerAmount
      },
      internalContact: {
        principal: principal,
        projectManager: projectManager,
        techSupport1: techSupport1,
        techSupport2: techSupport2
      },
      dueDate: dueDate,
      notes: notes
    };

    // RESET FORM
    handleReset(e);
    formRef.current?.reset();
    // SEND DATA TO DATABASE HERE
    console.log(newProject);    
  }

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
            <form ref={formRef}>
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
                {classification.map((item) => (
                  <Checkbox
                    key={item}
                    label={<span className="text-gray-700"><span>&nbsp;</span>{item}</span>}
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
                    <span>Is Client Care Of?&nbsp;&nbsp;</span>
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
                {contractTypes.map((item) => (
                  <Radio
                    key={item.option}
                    label={<span className="text-gray-700"><span>&nbsp;</span>{item.label}</span>}
                    id={item.option}
                    name="feeCategory"
                    value={item.option}
                    onChange={(e) => setFormalContract(e.target.value === "formal")}
                  />
                ))}

                {/* Fee Category */}
                <span className="text-gray-700 font-medium px-1">Fee Category
                  <span className="text-red-500">*</span>
                </span>
                {feeCategories.map((item) => (
                  <Radio
                    key={item.option}
                    label={<span className="text-gray-700"><span>&nbsp;</span>{item.label}</span>}
                    id={item.option}
                    name="contractType"
                    value={item.option}
                    onChange={(e) => setFeeCategory(e.target.value)}
                  />
                ))}

                {/* Retainer - make the label in same row as checkbox*/}
                <div className="inline-flex items-baseline">
                  <span className="text-gray-700 font-medium px-1">
                    <span>Retainer&nbsp;&nbsp;</span>
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

                {/* Principal */}
                <label className="text-xl font-bold text-gray-900">GHL Contact</label>
                <span className="text-gray-700 font-medium px-1">Principal
                  <span className="text-red-500">*</span>
                </span>
                <div className="w-72 gap-6">
                  <Select
                    isClearable
                    isSearchable
                    name="principal"
                    options={
                      staff.filter((item) => item.role === "principal").map((item) => ({
                        value: item.initials,
                        label: item.name
                      }))
                    }
                    onChange={(e) => setPrincipal(e?.value || "")}
                  />
                </div>

                {/* Project Manager */}
                <span className="text-gray-700 font-medium px-1">Project Manager
                  <span className="text-red-500">*</span>
                </span>
                <div className="w-72 gap-6">
                  <Select
                    isClearable
                    isSearchable
                    name="associate"
                    options={
                      staff.filter((item) => item.role !== "admin").map((item) => ({
                        value: item.initials,
                        label: item.name
                      }))
                    }
                    onChange={(e) => setProjectManager(e?.value || "")}
                  />
                </div>

                {/* Tech Support 1 */}
                <span className="text-gray-700 font-medium px-1">Tech Support 1
                  <span className="text-red-500">*</span>
                </span>
                <div className="w-72 gap-6">
                  <Select
                    isClearable
                    isSearchable
                    name="techSupport1"
                    options={
                      staff.filter((item) => item.role !== "admin").map((item) => ({
                        value: item.initials,
                        label: item.name
                      }))
                    }
                    onChange={(e) => setTechSupport1(e?.value || "")}
                  />
                </div>

                {/* Tech Support 2 */}
                <span className="text-gray-700 font-medium px-1">Tech Support 2</span>
                <div className="w-72 gap-6">
                  <Select
                    isClearable
                    isSearchable
                    name="techSupport2"
                    options={
                      staff.filter((item) => item.role !== "admin").map((item) => ({
                        value: item.initials,
                        label: item.name
                      }))
                    }
                    onChange={(e) => setTechSupport2(e?.value || "")}
                  />
                </div>

                <label className="text-xl font-bold text-gray-900">Deadline</label>

                {/* Due date */}
                <span className="text-gray-700 font-medium px-1">Due Date
                  <span className="text-red-500">*</span>
                </span>
                <DatePicker
                  className="w-72 border-2 border-gray-200 rounded-md p-2"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date as Date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />

                {/* Notes */}
                <label className="block">
                  <span className="text-gray-700 font-bold px-1">Special Notes</span>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    className="mt-1 block w-full rounded-md p-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="add any special notes here like if this is a point job"
                    onChange={(e) => setNotes(e.target.value || "")}
                  ></textarea>
                </label>

                <div className="flex-col-2">
                  <Button
                    ripple={true}
                    className={`mt-1 text-lg font-medium bg-gray-300 rounded-lg py-1 px-2 text-red-800 w-1/2 ${!formValid && "opacity-50 cursor-not-allowed"}`}
                    disabled={!formValid}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    ripple={true}
                    className="mt-1 text-lg font-medium bg-gray-300 rounded-lg py-1 px-2 text-red-800 w-1/2"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};