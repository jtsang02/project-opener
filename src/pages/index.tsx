import Link from "next/link";
import { useEffect, useState } from "react";
import Project from "@/Models/Project";
import Header from "@/Components/Header";

export default function Form() {

    //call the api
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/hello')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: "Project Opening Form",
                paragraph: "Fill out the form below to request a new project number.",
                linkurl: "/admin",
                linkName: "Login as Admin"
            }} />
        </div>
    );
}
