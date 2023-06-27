import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/Components/Header";

export default function Form() {

    //call the api
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <Header props={{
                heading: "Admin View",
                paragraph: "",
                linkurl: "/",
                linkName: "Return to Form"
            }} />
            admin page ...            
            <p>{data?.name}</p>

        </div>
    );
}
