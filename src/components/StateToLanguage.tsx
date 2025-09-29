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

const languageToCode: { [key: string]: string } = {
  Telugu: "te", 
  English: "en",
  Assamese: "as",
  Hindi: "hi",
  Gujarati: "gu",
  Kannada: "kn",
  Malayalam: "ml",
  Marathi: "mr",
  Odia: "or",
  Punjabi: "pa",
  Tamil: "ta",
  Bengali: "bn",
  Urdu: "ur",
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
    if (selectedState && languageToCode[selectedState]) {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = languageToCode[selectedState];
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
        className={`notranslate border px-3 py-2 rounded-3xl text-black ${
          isFullWidth ? "w-full" : ""
        }`}
        value={selectedState}
        onChange={handleStateChange}
        aria-label="Select Language"
      >
        <option value="">-- Select Language --</option>
        {Object.keys(languageToCode).map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </>
  );
};

export default StateToLanguage;