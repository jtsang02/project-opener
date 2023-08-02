import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Project from "@/Models/Project";
import Link from "next/link";
import Select from "react-select";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { statuses } from "@/Data/Status";
import Staff from "@/Data/Staff";
import { formatDate, compareDates } from "@/Utils/dates";
import sortProjects from "@/Utils/sortProjects";
import emailRecipients from "@/Utils/emailRecipients";
import Modal from "@/Components/Modal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  // If the user is not authenticated, redirect them to the login page
  if (!session?.user) {
    // You can use the Next.js router to redirect
    // Here's an example using Next.js's useRouter hook
    // Replace '/login' with the actual path to your login page
    // This example assumes you have a login page at /login
    // Make sure to import { useRouter } from 'next/router' at the top of your file
    const router = useRouter();
    router.push("/login");

    // Alternatively, you can display a message indicating the page is protected
    return <div>This page is protected. Please log in to view it.</div>;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectModalStates, setProjectModalStates] = useState<{
    [id: string]: boolean;
  }>({}); // state to track showModal for each project
  const [projectDeleteModalStates, setProjectDeleteModalStates] = useState<{
    [id: string]: boolean;
  }>({}); // state to track delete showModal for each project

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((projects) => setProjects(projects));
  }, []);

  // // use the useEffect hook to trigger a re-render when the projects array changes
  useEffect(() => {
    let sorted = sortProjects(projects);
    setProjects(sorted);
  }, [projects]);

  // If the user is authenticated, show the protected content

  // Function to toggle the showModal state for a specific project
  const toggleModal = (projectId: string) => {
    setProjectModalStates((prevStates) => ({
      ...prevStates,
      [projectId]: !prevStates[projectId],
    }));
  };

  // Function to toggle the showModal state for a specific project but for the delete modal
  const toggleDeleteModal = (projectId: string) => {
    setProjectDeleteModalStates((prevStates) => ({
      ...prevStates,
      [projectId]: !prevStates[projectId],
    }));
  };

  //create a function to delete a project
  const deleteProject = (id: string) => {
    fetch(`/api/project/${"?id=" + id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((project) => {
        if (project) {
          setProjects(projects.filter((project) => project._id !== id));
        }
      });
  };

  //create a function to update a project based on the id and the new project details
  const updateProject = (id: string, details: object) => {
    fetch(`/api/project/${"?id=" + id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((project) => {
        if (project) {
          //if the project is updated, update the projects array
          setProjects(
            projects.map((project) =>
              project._id === id ? { ...project, ...details } : project
            )
          );
        }
      });
  };

  // function to handle sending email
  const handleSendEmail = (e: any, project: Project) => {
    e.preventDefault();
    // join the project internalcontacts into an array of strings
    const projectContactInitials = [];
    projectContactInitials.push(project.internalContact.principal);
    projectContactInitials.push(project.internalContact.projectManager);
    projectContactInitials.push(project.internalContact.techSupport1);

    fetch("/api/sendEmail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: emailRecipients(projectContactInitials),
        project: project,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Email sent!");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
      <Header
        props={{
          heading: "Admin View",
          paragraph: "",
          linkurl: "/", // TODO: change this to sign out function
          linkName: "Back to Form",
        }}
      />

      <h1 className="mx-1 text-xl font-bold mb-2 content">
        Project Opening Requests ({projects.length})
      </h1>

      <div className="mx-1 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 max-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prj #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project Address
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      PIC/PM
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Requested Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Send Email
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.name}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 text-center">
                          {project.prjNumber ? project.prjNumber : "-"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-700">
                          <Link href={`/projects/${project._id}`}>
                            <a>{project.name}</a>
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-left">
                        <div className="text-sm text-gray-900">
                          {project.address}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div
                          className={`text-sm font-medium ${
                            !compareDates(project.dueDate, new Date())
                              ? " text-red-600"
                              : "text-gray-900"
                          } `}
                        >
                          {project.dueDate
                            ? formatDate(project.dueDate)
                            : "No Due Date"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-left">
                        <div className="text-sm text-gray-900">
                          {project.client.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-sm text-gray-900">
                          {project.internalContact.principal +
                            " / " +
                            project.internalContact.projectManager}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div
                          className={`text-sm font-medium text-gray-900"
                                                    } `}
                        >
                          {project.createdDate
                            ? formatDate(project.createdDate)
                            : " - "}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex text-sm font-medium leading-5 rounded-xl py-1 px-2
                                                    ${
                                                      project.status === "Open"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : project.status ===
                                                          "Pending"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-red-200 text-red-800"
                                                    }
                                                    `}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button
                          className={`text-sm font-medium bg-green-300 rounded-xl py-1 px-3 text-green-800 hover:text-black-900 hover:bg-green-400 
                                                    ${
                                                      project.prjNumber === ""
                                                        ? "cursor-not-allowed opacity-50 hover:bg-green-300"
                                                        : ""
                                                    }`}
                          disabled={project.prjNumber === ""}
                          onClick={(e) => {
                            handleSendEmail(e, project);
                          }}
                        >
                          Send
                        </button>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="text-base">
                          <button
                            className="mr-1 text-blue-600 hover:text-blue-900"
                            onClick={() => toggleModal(project._id)}
                          >
                            <FaEdit />
                          </button>
                          {projectModalStates[project._id] && (
                            <Modal onClose={() => toggleModal(project._id)}>
                              <div>
                                <h1 className="text-xl font-bold mb-2 pb-1 border-b-2">
                                  Update Project Info
                                </h1>
                                <h2 className="text-xl mb-2 font-medium">
                                  {project.name}
                                </h2>
                                <div className="flex items-center mb-2">
                                  <h3 className="font-semibold mr-4 w-48">
                                    Project Status
                                  </h3>
                                  <Select
                                    className="basic-single ml-4 w-full"
                                    classNamePrefix="select"
                                    defaultValue={{
                                      label: project.status,
                                      value: project.status,
                                    }}
                                    isSearchable={false}
                                    name="color"
                                    options={statuses}
                                    onChange={(e) =>
                                      updateProject(project._id, {
                                        status: e?.value,
                                      })
                                    }
                                    styles={{
                                      control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: "white",
                                        borderColor: state.isFocused
                                          ? "#2563EB"
                                          : "#E5E7EB",
                                        boxShadow: state.isFocused
                                          ? "0 0 0 1px #2563EB"
                                          : "none",
                                        "&:hover": {
                                          borderColor: state.isFocused
                                            ? "#2563EB"
                                            : "#E5E7EB",
                                        },
                                      }),
                                      singleValue: (base) => ({
                                        ...base,
                                        color: statuses.filter(
                                          (status) =>
                                            status.value === project.status
                                        )[0].textColor,
                                        backgroundColor: statuses.filter(
                                          (status) =>
                                            status.value === project.status
                                        )[0].color,
                                        borderRadius: "9999px",
                                        padding: "0.25rem 0.75rem",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        fontWeight: "500",
                                        maxWidth: "100%",
                                      }),
                                    }}
                                  />
                                </div>
                                <div className="flex items-center mb-2">
                                  <h3 className="font-semibold mr-4 w-48">
                                    Admin Assigned
                                  </h3>
                                  <Select
                                    className="basic-single ml-4 w-full"
                                    classNamePrefix="select"
                                    defaultValue={{
                                      label: project.adminAssigned,
                                      value: project.adminAssigned,
                                    }}
                                    isSearchable={true}
                                    name="color"
                                    options={Staff.filter(
                                      (staff) => staff.role === "admin"
                                    ).map((staff) => ({
                                      label: staff.name,
                                      value: staff.name,
                                    }))}
                                    onChange={(e) =>
                                      updateProject(project._id, {
                                        adminAssigned: e?.value,
                                      })
                                    }
                                    styles={{
                                      control: (provided, state) => ({
                                        ...provided,
                                        color: "black",
                                        backgroundColor: "white",
                                        borderColor: state.isFocused
                                          ? "#2563EB"
                                          : "#E5E7EB",
                                        boxShadow: state.isFocused
                                          ? "0 0 0 1px #2563EB"
                                          : "none",
                                        "&:hover": {
                                          borderColor: state.isFocused
                                            ? "#2563EB"
                                            : "#E5E7EB",
                                        },
                                      }),
                                      singleValue: (base) => ({
                                        ...base,
                                        borderRadius: "9999px",
                                        padding: "0.25rem 0.75rem",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        fontWeight: "500",
                                        maxWidth: "100%",
                                      }),
                                    }}
                                  />
                                </div>
                                <div className="flex items-center mb-2">
                                  <h3 className="font-semibold mr-4 w-48">
                                    Project Number
                                  </h3>
                                  <input
                                    className="w-full border border-gray-300 rounded-md ml-5 py-2 pl-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="number"
                                    placeholder="Project Number"
                                    value={project.prjNumber}
                                    onChange={(e) =>
                                      updateProject(project._id, {
                                        prjNumber: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </Modal>
                          )}
                          <button
                            className="ml-1 text-red-600 hover:text-red-900"
                            onClick={() => toggleDeleteModal(project._id)}
                          >
                            <BsFillTrashFill />
                          </button>
                          {projectDeleteModalStates[project._id] && (
                            <Modal
                              onClose={() => toggleDeleteModal(project._id)}
                            >
                              <h1 className="text-xl font-bold mb-2 pb-1">{`Delete ${project.name}`}</h1>
                              <p className="text-sm text-gray-500 mb-4">
                                {`Are you sure you want to delete ${project.name}`}
                                ? <p>This action cannot be undone.</p>
                              </p>
                              <div className="flex flex-wrap justify-center place-items-center mt-11">
                                <button
                                  className="bg-gray-200 text-gray-500 hover:bg-gray-300 px-4 py-2 rounded-md mr-2"
                                  onClick={() => toggleDeleteModal(project._id)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                                  onClick={() => deleteProject(project._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </Modal>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
