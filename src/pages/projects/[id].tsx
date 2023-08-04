import { useRouter } from "next/router";
import Header from "@/Components/Header";
import { useEffect, useState } from "react";
import Project from "@/Models/Project";
import { formatDate } from "@/Utils/dates";
import Navbar from "@/Components/Navbar";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    fetch(`/api/project/${"?id=" + id}`)
      .then((res) => res.json())
      .then((project) => {
        if (project) {
          setProject(project);
        }
      });
  }, [id]);

  return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
        <Header
          props={{
            heading: project?.name || "Project",
            paragraph: project?.address || "Project address",
            linkurl: "/admin",
            linkName: "Return to Dashboard",
          }}
        />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-1">{project?.name}</h1>
          <h2 className="text-lg text-gray-600 mb-2">{project?.address}</h2>

          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2 text-red-800">
                Client Information
              </h2>
              <p>
                <strong>Name:</strong> {project?.client.name}
              </p>
              <p>
                <strong>Address:</strong> {project?.client.address}
              </p>
              <p>
                <strong>Phone:</strong> {project?.client.phone}
              </p>
              <p>
                <strong>Email:</strong> {project?.client.email}
              </p>
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2 text-red-800">
                Accounting Information
              </h2>
              <p>
                <strong>Formal Contract:</strong>{" "}
                {project?.accounting.formalContract ? "Yes" : "No"}
              </p>
              <p>
                <strong>Fee Category:</strong> {project?.accounting.feeCategory}
              </p>
              <p>
                <strong>Retainer:</strong>{" "}
                {project?.accounting.retainer ? "Yes" : "No"}
              </p>
              {project?.accounting.retainer && (
                <p>
                  <strong>Retainer Amount:</strong> $
                  {project?.accounting.retainerAmount}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2 text-red-800">
                Project Team
              </h2>
              <p>
                <strong>Principal:</strong> {project?.internalContact.principal}
              </p>
              <p>
                <strong>Project Manager:</strong>{" "}
                {project?.internalContact.projectManager}
              </p>
              <p>
                <strong>Tech Support 1:</strong>{" "}
                {project?.internalContact.techSupport1}
              </p>
              {project?.internalContact.techSupport2 && (
                <p>
                  <strong>Tech Support 2:</strong>{" "}
                  {project?.internalContact.techSupport2}
                </p>
              )}
            </div>

            <div className="w-full md:w-1/2 px-4 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2 text-red-800">
                Other Information
              </h2>
              <p>
                <strong>Due Date:</strong>{" "}
                {formatDate(project?.dueDate || new Date())}
              </p>
              <p>
                <strong>Requested On:</strong>{" "}
                {formatDate(project?.createdDate || new Date())}
              </p>
              <p>
                <strong>Notes:</strong> {project?.notes}
              </p>
              <p>
                <strong>Status:</strong> {project?.status}
              </p>
              <p>
                <strong>Admin Assigned:</strong> {project?.adminAssigned}
              </p>
              <p>
                <strong>Project Number:</strong> {project?.prjNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
