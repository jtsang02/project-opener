import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Project from "@/Models/Project";
import Link from "next/link";
import Select from "react-select";
import { BsFillTrashFill } from "react-icons/bs";

export default function AdminPage() {

    //call the api
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(projects => setProjects(projects));
    }, []);

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
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: "Admin View",
                paragraph: "",
                linkurl: "/",
                linkName: "Return to Form"
            }} />

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Project Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Project Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Principal
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.map((project) => (
                                        <tr key={project.name}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            <Link href={`/projects/${project._id}`}>
                                                                <a>{project.name}</a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">

                                                <div className="text-sm text-gray-900">{project.address}</div>

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {project.internalContact.principal}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="">                                                
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    defaultValue={{ label: project.status, value: project.status }}
                                                    isSearchable={false}
                                                    name="color"
                                                    options={[
                                                        { label: "Open", value: "Open" },
                                                        { label: "Pending", value: "Pending" },
                                                        { label: "Closed", value: "Closed" }
                                                    ]}
                                                    onChange={(e) => {
                                                        updateProject(project._id, { status: e?.value });
                                                    }}
                                                />
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
