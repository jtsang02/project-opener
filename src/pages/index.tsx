import { useEffect, useState } from "react";
import Project from "@/Models/Project";
import Header from "@/Components/Header";
import InputForm from "@/Components/InputForm";

export default function Form(Project: Project) {

  //call the api
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

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
                <InputForm props={{
                  label: "Project Name",
                  name: "projectName",
                  id: "projectName",
                  type: "search",
                  placeholder: "enter a project name",
                  required: true
                }} />
                {/* Project Address */}
                <InputForm props={{
                  label: "Project Address",
                  name: "projectAddress",
                  id: "projectAddress",
                  type: "search",
                  placeholder: "enter a project address",
                  required: true
                }} />

                {/* Project Classification
                  // to be implemented with a dropdown menu or radio buttons
                */}

                <label className="text-xl font-bold text-gray-900">Client Information</label>

                {/* Client Name */}
                <InputForm props={{
                  label: "Client Name",
                  name: "clientName",
                  id: "clientName",
                  type: "search",
                  placeholder: "enter a client name",
                  required: true
                }} />
                {/* Client Address */}
                <InputForm props={{
                  label: "Client Address",
                  name: "clientAddress",
                  id: "clientAddress",
                  type: "search",
                  placeholder: "enter a client address",
                  required: true
                }} />
                {/* Client Phone */}
                <InputForm props={{
                  label: "Client Phone",
                  name: "clientPhone",
                  id: "clientPhone",
                  type: "search",
                  placeholder: "enter a client phone number",
                  required: true
                }} />
                {/* Client Email */}
                <InputForm props={{
                  label: "Client Email",
                  name: "clientEmail",
                  id: "clientEmail",
                  type: "search",
                  placeholder: "enter a client email",
                  required: true
                }} />

                <label className="text-xl font-bold text-gray-900">Accounting</label>

                <label className="block">
                  <span className="text-gray-700 font-bold px-1">Special Notes</span>
                  <textarea
                    name="specialNotes"
                    id="specialNotes"
                    rows={3}
                    className="mt-1 block w-full rounded-md p-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Project Description"
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
