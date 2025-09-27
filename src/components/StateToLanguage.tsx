"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const stateToLanguage: { [key: string]: string } = {
"Andhra Pradesh": "te", // Telugu
  "Arunachal Pradesh": "en", // English (multiple languages, English as default)
  Assam: "as", // Assamese
  Bihar: "hi", // Hindi
  Chhattisgarh: "hi", // Hindi
  Goa: "en", // English (Konkani and Marathi, English as default)
  Gujarat: "gu", // Gujarati
  Haryana: "hi", // Hindi
  "Himachal Pradesh": "hi", // Hindi
  Jharkhand: "hi", // Hindi
  Karnataka: "kn", // Kannada
  Kerala: "ml", // Malayalam
  "Madhya Pradesh": "hi", // Hindi
  Maharashtra: "mr", // Marathi
  Manipur: "en", // English (Meitei/Manipuri and others, English as default)
  Meghalaya: "en", // English (Khasi and Garo, English as default)
  Mizoram: "en", // English (Mizo and others, English as default)
  Nagaland: "en", // English (multiple tribal languages, English as default)
  Odisha: "or", // Odia
  Punjab: "pa", // Punjabi
  Rajasthan: "hi", // Hindi
  Sikkim: "en", // English (Nepali and others, English as default)
  "Tamil Nadu": "ta", // Tamil
  Telangana: "te", // Telugu
  Tripura: "bn", // Bengali
  "Uttar Pradesh": "hi", // Hindi
  Uttarakhand: "hi", // Hindi
  "West Bengal": "bn", // Bengali
  Delhi: "hi", // Hindi
  "Jammu and Kashmir": "ur", // Urdu
  Ladakh: "en", // English (Ladakhi and others, English as default)
};

interface StateDropdownProps {
  isFullWidth?: boolean;
}

const StateToLanguage = ({ isFullWidth = false }: StateDropdownProps) => {
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const googleTranslateElementInit = () => {
      if (
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === "function"
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      if (document.body.contains(addScript)) {
        document.body.removeChild(addScript);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedState && stateToLanguage[selectedState]) {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = stateToLanguage[selectedState];
        select.dispatchEvent(new Event("change"));
      }
    }
  }, [selectedState]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <select
        className={`notranslate border px-3 py-2 rounded text-black ${
          isFullWidth ? "w-full" : ""
        }`}
        value={selectedState}
        onChange={handleStateChange}
        aria-label="Select State"
      >
        <option value="">-- Select State --</option>
        {Object.keys(stateToLanguage).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </>
  );
};

export default StateToLanguage;