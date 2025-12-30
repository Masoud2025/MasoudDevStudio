import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row">
      <Link href={"#About"}>ABOUT</Link>
      <Link href={"#Blogs"}>BLOG</Link>
      <Link href={"#Projects"}>PROJECTS</Link>
      <Link href={"#Contact"}>CONTACT</Link>
    </div>
  );
}
