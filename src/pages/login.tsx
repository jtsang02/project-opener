import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // each time the page loads, check if the user is logged in
  // if they are logged in, log them out
  // this is to prevent the user from being logged in on multiple devices

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here, e.g., submit data to the server for authentication

    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      console.log(res);
      if (res.ok) {
        router.push("/admin");
        alert("Login successful");
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 bg-gray-100 shadow rounded-2xl w-5/6 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <label className="mb-2 flex flex-col">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
        <div className="flex justify-between">
          <button className="mt-1 text-m font-medium py-1 px-2 text-blue-800 hover:text-blue-600">
            <Link href="/">Back</Link>
          </button>
          <button className="mt-1 text-m font-medium py-1 px-2 text-blue-800 hover:text-blue-600">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
