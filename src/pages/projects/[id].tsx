import { useRouter } from 'next/router';
import Header from '@/Components/Header';
import { useEffect, useState } from 'react';
import Project from '@/Models/Project';

export default function ProjectPage() {

    const router = useRouter();
    const { id } = router.query;
    const [project, setProject]  = useState<Project>();

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(project => setProject(project));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: "Project View",
                paragraph: "",
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
