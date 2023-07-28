import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";

export default function RegistrationPage() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const [passwordValid, setPasswordValid] = useState(false);

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    useEffect(() => {
        if (password === "") {
            setPassword("");
        }
        setPasswordValid(PASSWORD_REGEX.test(password));
    }, [password]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform registration logic here, e.g., submit data to the server for registration
        console.log("Submitting registration with username:", name, "email:", email, "password:", password, "role:", selectedRole.value);
    };

    const handleClear = () => {
        setName("");
        setEmail("");
        setPassword("");
        setSelectedRole(null);
    };

    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "tech", label: "Tech" },
        { value: "associate", label: "Associate" },
        { value: "principal", label: "Principal" },
    ];

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-gray-100 rounded-2xl shadow w-5/6 max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
                <label className="mb-2 flex flex-col">
                    <span className="mb-1">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                </label>
                <div className="mb-4 flex flex-col">
                    <span className="mb-1">Role:</span>
                    <Select
                        options={roleOptions as any}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <label className="mb-2 flex flex-col">
                    <span className="mb-1">Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                </label>
                <label className="mb-4 flex flex-col">
                    <span className="mb-1">Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                </label>
                <p
                    id="pwdnote"
                    className={password && !passwordValid ? "instructions" : "offscreen"}
                >
                    <FcInfo />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number, and a special
                    character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                </p>

                <div className="flex justify-center mt-2 space-x-4">
                    <button
                        type="submit"
                        disabled={!passwordValid}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 ${!passwordValid && "opacity-50 cursor-not-allowed hover:bg-blue-500"}`}
                    >
                        Register
                    </button>
                    <button type="button" onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-gray-700">
                        Clear
                    </button>
                </div>
                <button className="mt-1 text-m font-medium py-1 px-2 text-blue-800 hover:text-blue-600">
                    <Link href="/login">Login</Link>
                </button>
            </form>
        </div>
    );
}
