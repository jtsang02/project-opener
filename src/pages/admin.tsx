import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Project from "@/Models/Project";
import Link from "next/link";
import Select from "react-select";
import { BsFillTrashFill } from "react-icons/bs";
import { statuses } from "@/Data/Status";
import { formatDate, compareDates } from "@/Utils/dates";
import sortProjects from "@/Utils/sortProjects";
import emailRecipients from "@/Utils/emailRecipients";

export default function AdminPage() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(projects => setProjects(projects));
    }, []);

    // // use the useEffect hook to trigger a re-render when the projects array changes
    useEffect(() => {
        let sorted = sortProjects(projects);
        setProjects(sorted);
    }, [projects]);

    //create a function to delete a project
    const deleteProject = (id: string) => {
        fetch(`/api/project/${"?id=" + id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(project => {
                if (project) {
                    setProjects(projects.filter(project => project._id !== id));
                }
            });
    }

    //create a function to update a project based on the id and the new project details
    const updateProject = (id: string, details: object) => {
        fetch(`/api/project/${"?id=" + id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }).then(res => res.json())
            .then(project => {
                if (project) {  //if the project is updated, update the projects array
                    setProjects(projects.map(project => project._id === id ? { ...project, ...details } : project));
                }
            }
            );
    }

    // function to handle sending email
    const handleSendEmail = (e: any, project: Project) => {
        e.preventDefault();
        // join the project internalcontacts into an array of strings
        const projectContactInitials = [];
        projectContactInitials.push(project.internalContact.principal);
        projectContactInitials.push(project.internalContact.projectManager);
        projectContactInitials.push(project.internalContact.techSupport1);

        fetch('/api/sendEmail/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipients: emailRecipients(projectContactInitials),
                project: project
            })
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Email sent!");
                }
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: "Admin View",
                paragraph: "",
                linkurl: "/",
                linkName: "Return to Form"
            }} />

            <h1 className="text-xl font-bold mb-2 content">
                Project Opening Requests ({projects.length}) 
            </h1>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 max-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Prj #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Project Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Project Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deadline
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Client
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            PIC/PM
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Requested Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Send Email
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.map((project) => (
                                        <tr key={project.name}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{project.prjNumber}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 hover:text-blue-700">
                                                    <Link href={`/projects/${project._id}`}>
                                                        <a>{project.name}</a>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                                <div className='text-sm text-gray-900'>{
                                                    project.address
                                                }</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className={`text-sm font-medium ${!compareDates(project.dueDate, new Date()) ? " text-red-600" : "text-gray-900"
                                                    } `}>{
                                                        project.dueDate ? formatDate(project.dueDate) : "No Due Date"
                                                    }</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                                <div className='text-sm text-gray-900'>{
                                                    project.client.name
                                                }</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className='text-sm font-medium text-gray-900'>{
                                                    project.internalContact.principal + " / " + project.internalContact.projectManager
                                                }</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className={`text-sm font-medium text-gray-900"
                                                    } `}>{
                                                        project.createdDate ? formatDate(project.createdDate) : " - "
                                                    }</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="">
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        defaultValue={{ label: project.status, value: project.status }}
                                                        isSearchable={false}
                                                        name="color"
                                                        options={statuses}
                                                        onChange={
                                                            (e) => updateProject(project._id, { status: e?.value })
                                                        }
                                                        styles={{
                                                            control: (provided, state) => ({
                                                                ...provided,
                                                                backgroundColor: 'white',
                                                                borderColor: state.isFocused ? '#2563EB' : '#E5E7EB',
                                                                boxShadow: state.isFocused ? '0 0 0 1px #2563EB' : 'none',
                                                                '&:hover': {
                                                                    borderColor: state.isFocused ? '#2563EB' : '#E5E7EB'
                                                                }
                                                            }),
                                                            singleValue: (base) => ({
                                                                ...base,
                                                                color: statuses.filter(status => status.value === project.status)[0].textColor,
                                                                backgroundColor: statuses.filter(status => status.value === project.status)[0].color,
                                                                borderRadius: '9999px',
                                                                padding: '0.25rem 0.75rem',
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.25rem',
                                                                fontWeight: '500',
                                                                maxWidth: '100%',
                                                            }),
                                                        }}
                                                    />
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    className={`mt-1 text-sm font-medium bg-green-300 rounded-xl py-1 px-3 text-green-800 hover:text-black-900 hover:bg-green-400 
                                                    ${project.prjNumber === "-" ? "cursor-not-allowed opacity-50" : ""}`}
                                                    disabled={project.prjNumber === "-"}
                                                    onClick={(e) => { handleSendEmail(e, project) }}
                                                >
                                                    Send
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <div className="text-red-600 hover:text-red-900">
                                                    <button onClick={() => deleteProject(project._id)}>
                                                        <BsFillTrashFill />
                                                    </button>
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
    )
}
