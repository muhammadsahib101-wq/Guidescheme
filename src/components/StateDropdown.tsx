"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getAllStates } from "@/services/stateService";
import { State } from "@/types/type";
import defaultImg from "../app/assets/default-state-image.png";

type Props = {
	selectedState: { name: string; image: string } | null;
	setSelectedState: (state: { name: string; image: string }) => void;
	isFullWidth?: boolean; // for mobile
};

const StateDropdown = ({
	selectedState,
	setSelectedState,
	isFullWidth = false,
}: Props) => {
	const router = useRouter();
	const [states, setStates] = useState<State[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStates = async () => {
			try {
				setLoading(true);
				const statesData = await getAllStates();
				setStates(statesData);
				setError(null);
			} catch (err) {
				setError("Failed to load states");
				console.error("Error fetching states:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchStates();
	}, []);

	return (
		<Menu as="div" className="relative inline-block text-left w-full">
			<Menu.Button
				className={`flex items-center border rounded-full px-4 py-1 space-x-2 text-black ${
					isFullWidth ? "w-full" : ""
				}`}
			>
				<Image
					src={selectedState?.image || defaultImg}
					alt={selectedState?.name || "Select State"}
					width={20}
					height={20}
					className="w-5 h-5"
				/>
				<span>{selectedState?.name ?? "Select State"}</span>
				<ChevronDown className="w-4 h-4 ml-auto" />
			</Menu.Button>
			<Menu.Items
				className={`absolute ${
					isFullWidth ? "left-0 w-full" : "right-0 w-64"
				} mt-2 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 flex flex-col`}
			>
				{states.map((state) => (
					<Menu.Item key={state.name}>
						{({ active }) => (
							<button
								onClick={() => {
									setSelectedState({ name: state.name, image: state.image });
									router.push(
										`/schemes?stateId=${
											state._id
										}&stateName=${encodeURIComponent(state.name)}`
									);
								}}
								className={`${
									active ? "bg-gray-100" : ""
								} w-full px-4 py-2 text-sm text-black flex items-center gap-2`}
							>
								<Image
									src={state.image || defaultImg}
									alt={state.name}
									width={20}
									height={20}
									className="w-5 h-5 rounded-full object-cover"
								/>
								{state.name}
							</button>
						)}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
};

export default StateDropdown;
