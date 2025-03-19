import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-10 text-gray-600 border bg-slate-600">
      <nav className="flex space-x-6 text-white">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/profile">Dashboard</Link>
      </nav>
      <div className="flex space-x-4 my-4 text-indigo-100">
        <Link href="https://github.com/alamin-cse44" target="_blank">
          <FaGithub size={20} />
        </Link>
        <Link
          href="https://www.facebook.com/rehan.mohammed.al.amin/"
          target="_blank"
        >
          <FaFacebook size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/al-amin-1b4587216/"
          target="_blank"
        >
          <FaLinkedin size={20} />
        </Link>
        <Link href="https://twitter.com" target="_blank">
          <FaTwitter size={20} />
        </Link>

        <Link href="https://youtube.com" target="_blank">
          <FaYoutube size={20} />
        </Link>
      </div>
      <p className="text-sm text-white">
        &copy; 2024 alamin23712@gmail.com. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
