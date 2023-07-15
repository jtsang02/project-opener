import { useRouter } from 'next/router';
import Header from '@/Components/Header';
import { useEffect, useState } from 'react';
import Project from '@/Models/Project';
import { formatDate } from "@/Utils/dates";


export default function ProjectPage() {

    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        fetch(`/api/project/${"?id=" + id}`)
            .then(res => res.json())
            .then(project => {
                if (project) {
                    setProject(project);
                }
            });
    }, [id]);


    // function to update a project based on the id and the new project details
    // const updateProject = (id: string, details: object) => {
    //     fetch(`/api/project/${"?id=" + id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(details)
    //     }).then(res => res.json())
    //         .then(project => {
    //             if (project) {
    //                 setProject(project);
    //             }
    //         }
    //         );
    // }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: project?.name || "Project",
                paragraph: project?.address || "Project address",
                linkurl: "/admin",
                linkName: "Return to Admin"
            }} />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-1">{project?.name}</h1>
                <h2 className='text-lg text-gray-600 mb-2'>{project?.address}</h2>

                <div className="flex flex-wrap -mx-4 mb-8">
                    <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2 text-red-800">Client Information</h2>
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
                        <h2 className="text-lg font-bold mb-2 text-red-800">Accounting Information</h2>
                        <p>
                            <strong>Formal Contract:</strong>{' '}
                            {project?.accounting.formalContract ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong>Fee Category:</strong> {project?.accounting.feeCategory}
                        </p>
                        <p>
                            <strong>Retainer:</strong> {project?.accounting.retainer ? 'Yes' : 'No'}
                        </p>
                        {project?.accounting.retainer && (
                            <p>
                                <strong>Retainer Amount:</strong> ${project?.accounting.retainerAmount}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4 mb-8">
                    <div className="w-full md:w-1/2 bg-white rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2 text-red-800">Project Team</h2>
                        <p>
                            <strong>Principal:</strong> {project?.internalContact.principal}
                        </p>
                        <p>
                            <strong>Project Manager:</strong> {project?.internalContact.projectManager}
                        </p>
                        <p>
                            <strong>Tech Support 1:</strong> {project?.internalContact.techSupport1}
                        </p>
                        {project?.internalContact.techSupport2 && (
                            <p>
                                <strong>Tech Support 2:</strong> {project?.internalContact.techSupport2}
                            </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-4 bg-white rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2 text-red-800">Other Information</h2>
                        <p>
                            <strong>Due Date:</strong> {formatDate(project?.dueDate || new Date())}
                        </p>
                        <p>
                            <strong>Requested On:</strong> {formatDate(project?.createdDate || new Date())}
                        </p>
                        <p>
                            <strong>Notes:</strong> {project?.notes}
                        </p>
                        <p>
                            <strong>Status:</strong> {project?.status}
                            {/* <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={{ label: project?.status, value: project?.status }}
                                isSearchable={false}
                                name="color"
                                options={statuses}
                                onChange={
                                    (e) => updateProject(id as string, { status: e?.value })
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
                                        // color: statuses.filter(status => status.value === project?.status)[0].textColor,
                                        // backgroundColor: statuses.filter(status => status.value === project?.status)[0].color,
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
                            /> */}
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
    )
}
