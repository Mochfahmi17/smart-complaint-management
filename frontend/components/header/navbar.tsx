import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-violet-500 py-6 px-[3%]">
      <h1 className="text-2xl font-bold text-white">
        <Link href="/">Keluhan Warga</Link>
      </h1>
    </nav>
  );
};

export default Navbar;
