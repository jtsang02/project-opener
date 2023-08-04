import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Logout() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleStayLoggedIn = () => {
    router.push("/admin");
  };

  useEffect(() => {
    if (!showModal) {
      handleStayLoggedIn(); // If the modal is closed without choosing an option, stay logged in
    }
  }, [showModal]);

  return (
    <div className="flex justify-center items-center h-screen">
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Are you sure you want to sign out?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
