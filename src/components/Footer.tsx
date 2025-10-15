"use client";
import Image from "next/image";
import Logo from "../app/assets/logo.png";

import {
	FaFacebookF,
	FaInstagram,
	FaYoutube,
	FaXTwitter,
} from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
	return (
		<footer aria-label="Footer" className="bg-[#2F2B45] text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
				{/* Column 1: About */}
				<section
					aria-labelledby="footer-about"
					className="lg:col-span-4 col-span-1"
				>
                <Link
					href="/"
					className="flex items-center space-x-2"
					aria-label="Go to homepage"
				>
					<Image
						src={Logo}
						alt="Govt Schemes Guide logo"
						width={240}
						height={64}
						className="mb-4"
					/>
               </Link>
					<p className="text-sm font-figtree text-white leading-relaxed">
						Govt Schemeguide simplifies access to verified government schemes,
						offering clear eligibility details, benefits, and easy step-by-step
						application guidance.
					</p>
					<nav aria-label="Social Media" className="flex gap-3 mt-6 flex-wrap">
						<ul className="flex gap-3">
							<li>
								<a
									href="#"
									aria-label="Twitter"
									className="p-2 rounded-full border border-white hover:bg-white hover:text-[#332F4B] transition flex items-center justify-center"
									tabIndex={0}
								>
									<FaXTwitter className="w-5 h-5" />
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-label="YouTube"
									className="p-2 rounded-full border border-white hover:bg-white hover:text-[#332F4B] transition flex items-center justify-center"
									tabIndex={0}
								>
									<FaYoutube className="w-5 h-5" />
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-label="Facebook"
									className="p-2 rounded-full border border-white hover:bg-white hover:text-[#332F4B] transition flex items-center justify-center"
									tabIndex={0}
								>
									<FaFacebookF className="w-5 h-5" />
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-label="Instagram"
									className="p-2 rounded-full border border-white hover:bg-white hover:text-[#332F4B] transition flex items-center justify-center"
									tabIndex={0}
								>
									<FaInstagram className="w-5 h-5" />
								</a>
							</li>
						</ul>
					</nav>
				</section>

				{/* Column 2: Quick Links */}
				<nav
					aria-labelledby="footer-links"
					className="lg:col-span-2 col-span-1"
					role="navigation"
				>
					<h2 id="footer-links" className="font-semibold text-lg mb-4">
						Quick Links
					</h2>
					<ul className="space-y-2 text-sm text-white font-figtree">
						{[
							{ name: "All category", href: "/category" },
							{ name: "Centre schemes", href: "/schemes" },
							{ name: "State schemes", href: "/schemes" },
							{ name: "About", href: "/about" },
							{ name: "Contact Us", href: "/contact" },
						].map(({ name, href }) => (
							<li key={name}>
								<a href={href} className="hover:underline" tabIndex={0}>
									{name}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{/* Column 3: Contact */}
				<section
					aria-labelledby="footer-contact"
					className="lg:col-span-2 col-span-1"
				>
					<h2 id="footer-contact" className="font-semibold text-lg mb-4">
						Get in touch
					</h2>
					<address className="not-italic">
						<ul className="space-y-3 text-sm text-white font-figtree">
							<li className="flex items-center gap-2">
								<MdEmail aria-hidden="true" />{" "}
								<a href="mailto:care@govtschemeguide.com" tabIndex={0}>
									care@govtschemeguide.com
								</a>
							</li>
							<li className="flex items-center gap-2">
								<MdPhone aria-hidden="true" />{" "}
								<a href="tel:+91 8273040400" tabIndex={0}>
									+91 8273040400
								</a>
							</li>
							<li className="flex items-start gap-2">
								<MdLocationOn className="mt-1" aria-hidden="true" />
								<span>
									97, Van Vihar, Mehuwala, Dehradun,
									<br />
									Uttarakhand, India - 248171
								</span>
							</li>
						</ul>
					</address>
				</section>

				{/* Column 4: Disclaimer */}
				<section
					aria-labelledby="footer-disclaimer"
					className="lg:col-span-4 col-span-1"
				>
					<h2 id="footer-disclaimer" className="font-semibold text-lg mb-4">
						Disclaimer:
					</h2>
					<p className="text-sm text-white font-figtree leading-relaxed">
						We are an independent informational resource. Always verify details
						on official websites before applying.
					</p>
				</section>
			</div>

			{/* Bottom Footer */}
			<div className="bg-green-700 py-4 px-4 sm:px-6">
				<div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-white text-center sm:text-left">
					<p>© 2025 Govt Schemes Guide. All rights reserved.</p>
					<nav aria-label="Legal links">
						<ul className="flex flex-wrap gap-4 justify-center sm:justify-end">
							<li>
								<a
									href="/privacy"
									className="hover:underline"
									tabIndex={0}
								>
									Privacy Policy
								</a>
							</li>
							
							{/* <li>
								<a href="/disclaimer" className="hover:underline" tabIndex={0}>
									Disclaimer
								</a>
							</li> */}
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
}
