import Link from "next/link"

export default function Submitted () {

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
                <div className="flex justify-center mx-auto px-4 py-8 ">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4 text-green-600">Submitted!</h1>
                        <p className="text-xl font-bold ">Thank you for submitting your project request.</p>
                        <p className="text-m font-md mt-5">Admin will contact you soon with a project number.</p>
                    </div>
                </div>
                <div className="flex justify-center mx-auto px-4">
                    <div className="mt-1 text-m font-medium bg-gray-300 rounded-lg py-1 px-2 text-red-800 hover:text-red-900 hover:bg-gray-400">
                        <Link href="/">
                            <a>Return to Form</a>
                        </Link>
                        </div>
                    </div>
            </div>
        </>
    )
}