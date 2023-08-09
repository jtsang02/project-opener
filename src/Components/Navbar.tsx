import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import GHL from "../public/GHL.png";

export default function Navbar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <div>
        <Link href="https://ghl.ca/">
          <a>
            <Image
              src="/GHL.png"
              alt="logo"
              className="rounded-md"
              width={35}
              height={35}
            />
          </a>
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div>
          <Link href="/">
            <a className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-blue-900 ">
              Form
            </a>
          </Link>
          {status === "authenticated" && session?.user ? (
            <Link href="/admin">
              <a className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-blue-900">
                Dashboard
              </a>
            </Link>
          ) : null}
        </div>
        {status === "authenticated" && session?.user ? (
          <>
            <span className="text-gray-600">Hello, {session.user.name}!</span>
            {/* <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-2xl hover:bg-red-600"
              onClick={handleSignOut}
            >
              Sign Out
            </button> */}
            <Link href="/logout">
              <a className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-2xl hover:bg-red-600">
                Sign Out
              </a>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <a className="px-4 py-2 text-sm font-medium text-red-800 bg-gray-300 rounded-2xl hover:text-red-900 hover:bg-gray-400">
              Login
            </a>
          </Link>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button className="mobile-menu-button">
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}
