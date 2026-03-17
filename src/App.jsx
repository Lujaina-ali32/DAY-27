import React, { useEffect, useRef, useState } from "react";
import './App.css'

const COLORS = [
  { name: "Emerald", hex: "#10B981" },
  { name: "Ruby", hex: "#E11D48" },
  { name: "Midnight", hex: "#0F172A" },
  { name: "Ivory", hex: "#F9FAFB" },
  { name: "Royal Blue", hex: "#1D4ED8" },
  { name: "Pastel Pink", hex: "#FBCFE8" },
  { name: "Lavender", hex: "#C4B5FD" },
  { name: "Mustard", hex: "#EAB308" },
  { name: "Peach", hex: "#FDBA74" },
  { name: "Teal", hex: "#14B8A6" },
  { name: "Maroon", hex: "#7F1D1D" },
  { name: "Gold", hex: "#F59E0B" }
];

const JEWELRY_IMAGES = {
  jhumka: "https://via.placeholder.com/80?text=Jhumka",
  churiyan: "https://via.placeholder.com/80?text=Churi",
  sandals: "https://via.placeholder.com/80?text=Heels",
  dupatta: "https://via.placeholder.com/80?text=Dupatta"
};

export default function App() {
  const [selected, setSelected] = useState([]);
  const [look, setLook] = useState(null);
  const [saved, setSaved] = useState([]);
  const previewRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("eidLooks")) || [];
    setSaved(data);
  }, []);

  const toggleColor = (color) => {
    setSelected((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const generateLook = (custom = null) => {
    const colors = custom || selected;
    if (colors.length === 0) return;

    let styleName = "Trendy Eid Style";
    if (colors.includes("Gold") || colors.includes("Ruby")) {
      styleName = "Royal Festive Look";
    } else if (colors.includes("Midnight")) {
      styleName = "Elegant Night Look";
    } else if (colors.includes("Pastel Pink") || colors.includes("Ivory")) {
      styleName = "Soft Eid Vibes";
    }

    setLook({
      name: styleName,
      colors,
      ...JEWELRY_IMAGES
    });
  };

  const surpriseMe = () => {
    const randomColors = COLORS.sort(() => 0.5 - Math.random()).slice(0, 2);
    const names = randomColors.map((c) => c.name);
    setSelected(names);
    generateLook(names);
  };

  const saveLook = () => {
    if (!look) return;
    const updated = [...saved, look];
    setSaved(updated);
    localStorage.setItem("eidLooks", JSON.stringify(updated));
  };

  const downloadImage = () => {
    // Simple alternative بدون library
    window.print();
  };

  const gradientStyle = {
    background: `linear-gradient(90deg, ${selected
      .map((c) => COLORS.find((x) => x.name === c)?.hex)
      .join(",")})`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🌙 Eid Color Styler PRO+
      </h1>

      {/* Color Picker */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
        {COLORS.map((color) => (
          <div
            key={color.name}
            onClick={() => toggleColor(color.name)}
            className={`cursor-pointer p-4 rounded-2xl text-center transition transform hover:scale-105 ${
              selected.includes(color.name)
                ? "ring-4 ring-yellow-400"
                : ""
            }`}
            style={{ backgroundColor: color.hex }}
          >
            <span className="text-sm font-semibold text-black">
              {color.name}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient Preview */}
      {selected.length > 1 && (
        <div className="h-16 rounded-xl mb-6 shadow-lg" style={gradientStyle} />
      )}

      {/* Buttons */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button onClick={() => generateLook()} className="bg-yellow-500 text-black px-5 py-2 rounded-full">Generate ✨</button>
        <button onClick={surpriseMe} className="bg-purple-500 px-5 py-2 rounded-full">Surprise Me 🎲</button>
        <button onClick={saveLook} className="bg-green-500 px-5 py-2 rounded-full">Save 💾</button>
        <button onClick={downloadImage} className="bg-blue-500 px-5 py-2 rounded-full">Download 📸</button>
        <button onClick={() => { setSelected([]); setLook(null); }} className="bg-red-500 px-5 py-2 rounded-full">Reset</button>
      </div>

      {/* Preview Card */}
      {look && (
        <div ref={previewRef} className="bg-white text-black rounded-2xl p-6 max-w-md mx-auto shadow-2xl mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">{look.name}</h2>
          <p className="mb-3">{look.colors.join(", ")}</p>

          <div className="flex justify-center gap-4">
            <img src={look.jhumka} alt="" />
            <img src={look.churiyan} alt="" />
            <img src={look.sandals} alt="" />
            <img src={look.dupatta} alt="" />
          </div>
        </div>
      )}

      {/* Saved Looks */}
      {saved.length > 0 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-3">Saved Looks 💖</h2>
          {saved.map((item, i) => (
            <div key={i} className="bg-gray-700 p-3 rounded-lg mb-2 text-sm">
              {item.name} — {item.colors.join(", ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
