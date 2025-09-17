"use client";

import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import Logo from "../app/assets/logo.png";
import StateDropdown from "./StateDropdown";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [selectedState, setSelectedState] = useState<{
		name: string;
		image: string;
	} | null>(null);

	return (
		<nav
			className="w-full bg-white shadow-sm z-50 relative"
			role="navigation"
			aria-label="Main navigation"
		>
			<div className="max-w-7xl px-5 mx-auto sm:px-6 lg:px-8 flex items-center justify-between py-3">
				<Link
					href="/"
					className="flex items-center space-x-2"
					aria-label="Go to homepage"
				>
					<Image
						src={Logo}
						alt="Govt Schemes Guide logo"
						width={207}
						height={50}
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-8 whitespace-nowrap">
					<Link href="/schemes" className="text-black hover:underline">
						All schemes
					</Link>
					<Link href="/about" className="text-black hover:underline">
						About
					</Link>
					<Link href="/category" className="text-black hover:underline">
						Category
					</Link>
					<Link href="/contact" className="text-black hover:underline">
						Contact Us
					</Link>

					{/* Select State Dropdown */}
					<StateDropdown
						selectedState={selectedState}
						setSelectedState={setSelectedState}
					/>
				</div>

				{/* Mobile Hamburger */}
				<button
					className="md:hidden text-black focus:outline-none"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle Menu"
				>
					{menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-white shadow-md">
					<Link href="/schemes" className="block text-black hover:underline">
						All schemes
					</Link>
					<Link href="/about" className="block text-black hover:underline">
						About
					</Link>
					<Link href="/category" className="block text-black hover:underline">
						Category
					</Link>
					<Link href="/contact" className="block text-black hover:underline">
						Contact Us
					</Link>

					{/* Select State Dropdown Mobile */}
					<StateDropdown
						selectedState={selectedState}
						setSelectedState={setSelectedState}
						isFullWidth
					/>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
