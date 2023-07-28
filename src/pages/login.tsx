import { useState } from "react";
import Link from "next/link";

export default function Login () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here, e.g., submit data to the server for authentication
    console.log("Submitting login with username:", username, "and password:", password);
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-gray-100 shadow rounded-2xl w-5/6 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <label className="mb-2 flex flex-col">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
        </label>
        <label className="mb-4 flex flex-col">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
        </label>
        <div className="flex justify-center space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
          <button type="button" onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
            Clear
          </button>
        </div>
        <div className="flex justify-between">
            <button className="mt-1 text-m font-medium py-1 px-2 text-blue-800 hover:text-blue-600">
                <Link href="/">Form</Link>
            </button>
            <button className="mt-1 text-m font-medium py-1 px-2 text-blue-800 hover:text-blue-600">
                <Link href="/register">Register</Link>
            </button>
        </div>
      </form>
    </div>
  );
};
