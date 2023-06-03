import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import Logout from "../../assets/icons/logout.svg";
import { useAuthContext } from "../../lib/auth_client";

export default function Header() {
  const { signOut, user } = useAuthContext();
  return (
    <div className="sticky z-50 inset-x-0 top-0 flex h-24 items-center bg-sky-600 px-[8vw] py-2">
      <Link href="/">
        <div className="flex items-center">
          <Image
            className="pr-2"
            src={logo}
            alt="Logo"
            width={70}
            height={70}
          />
          <h1 className="font-bold text-white">Learning Management System</h1>
        </div>
      </Link>
      <div className="ml-auto flex items-center justify-center gap-2 text-white md:gap-8">
        <Link href="/">Home</Link>
        <Link href="/my-classes">My Classes</Link>
        <Link href="/personal-information">Personal Information</Link>
      </div>
      <nav className="ml-auto">
        <ul className="m-0 flex list-none justify-center p-0">
          <li className="ml-8">
            <div className="flex">
              <p className="mr-8 text-white">
                <b>
                  {user?.first_name}&nbsp;{user?.last_name}
                </b>
                <br />
                {user?.studentID}
              </p>
              <Link
                className="flex items-center rounded bg-white p-2 font-bold text-red-600"
                href="/"
                onClick={signOut}
              >
                <Image src={Logout} height={15} width={15} alt={"logout"} />
                <p className="ml-2">Log out</p>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
