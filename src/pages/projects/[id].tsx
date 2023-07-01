import { useRouter } from 'next/router';
import Header from '@/Components/Header';
import { useEffect, useState } from 'react';
import Project from '@/Models/Project';

export default function ProjectPage() {

    const router = useRouter();
    const { id } = router.query;
    const [project, setProject]  = useState<Project>();

    useEffect(() => {
        fetch(`/api/project/${"?id="+id}`)
            .then(res => res.json())
            .then(project => {
                if (project) {
                    setProject(project);
                }
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: project?.name || "Project",
                paragraph: project?.address || "Project address",
                linkurl: "/admin",
                linkName: "Return to Admin"
            }} />

            {/* display the project details here in a format */}
            <div>
                <h1>Project Details</h1>
                <p>Project Name: {project?.name}</p>
                <p>Project Address: {project?.address}</p>
                <p>Project Principal: {project?.internalContact.principal}</p>
            </div>
        </div>
    )
}
