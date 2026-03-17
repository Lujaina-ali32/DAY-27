import React, { useState, useEffect } from "react";
import './App.css'

const COLORS = [
  { name: "Emerald", hex: "#10B981", type: "Jewel" },
  { name: "Ruby", hex: "#E11D48", type: "Jewel" },
  { name: "Midnight", hex: "#0F172A", type: "Jewel" },
  { name: "Ivory", hex: "#F9FAFB", type: "Pastel" },
  { name: "Royal Blue", hex: "#1D4ED8", type: "Jewel" },
  { name: "Pastel Pink", hex: "#FBCFE8", type: "Pastel" },
  { name: "Lavender", hex: "#C4B5FD", type: "Pastel" },
  { name: "Mustard", hex: "#EAB308", type: "Metallic" },
  { name: "Peach", hex: "#FDBA74", type: "Pastel" },
  { name: "Teal", hex: "#14B8A6", type: "Pastel" },
  { name: "Maroon", hex: "#7F1D1D", type: "Jewel" },
  { name: "Gold", hex: "#F59E0B", type: "Metallic" }
];

const COLOR_MATCH = {
  Emerald: { jhumka: "https://i.pinimg.com/736x/36/d8/a2/36d8a25755f7b52033c8546968ad461b.jpg", churiyan: "https://i.pinimg.com/736x/a6/5f/46/a65f461a2bfa0f8a7034edde50c74015.jpg", earrings: "https://i.pinimg.com/736x/44/9d/33/449d331072eb49c9e06a287caa9c0ec4.jpg" },
  Ruby: { jhumka: "https://i.pinimg.com/736x/0a/4d/38/0a4d384dd76f43e17c615678228e9358.jpg", churiyan: "https://i.pinimg.com/736x/81/10/c9/8110c9eb0f9b509e2c38f7aca6e99456.jpg", earrings: "https://i.pinimg.com/1200x/a9/f8/3b/a9f83b0d8d2cf89dcf0c95bbe79a3d03.jpg" },
  Midnight: { jhumka: "https://i.pinimg.com/736x/29/b8/36/29b836159bcdef2f7e2928e7139fd0c3.jpg", churiyan: "https://i.pinimg.com/control1/736x/66/ca/5c/66ca5c5e3dd671d1763108810f0a24ee.jpg", earrings: "https://i.pinimg.com/736x/21/8a/cf/218acf3a05d8480eeb286e09c4327e61.jpg" },
  Ivory: { jhumka: "https://i.pinimg.com/736x/b9/d5/7e/b9d57e08493010735e651df3a87bc869.jpg", churiyan: "https://i.pinimg.com/736x/2d/c9/4b/2dc94bef1ed4c121c2ff317ff46dcc9a.jpg", earrings: "https://i.pinimg.com/736x/52/65/d4/5265d46ff1e3febc28a2566706e8d3a0.jpg" },
  "Royal Blue": { jhumka: "https://i.pinimg.com/1200x/e7/86/04/e78604e8b14a5a7745e71a707abde374.jpg", churiyan: "https://i.pinimg.com/736x/16/5b/ce/165bce743497630c4d5c331d1acec12f.jpg", earrings: "https://i.pinimg.com/1200x/b9/0e/ba/b90eba0c05a5f17a15eb2cd8509163fd.jpg" },
  "Pastel Pink": { jhumka: "https://i.pinimg.com/1200x/de/38/65/de386540bd9b6d746fab492a2c8e3397.jpg", churiyan: "https://i.pinimg.com/736x/d5/35/01/d535018b17ac0bfaceb3d523ecf9b95a.jpg", earrings: "https://i.pinimg.com/736x/de/5c/c4/de5cc43e93f8879f7e936aaf39e0045b.jpg" },
  Lavender: { jhumka: "https://i.pinimg.com/736x/1e/65/f0/1e65f0be22b632380019fa8e46fdbb51.jpg", churiyan: "https://i.pinimg.com/736x/60/c7/75/60c7757949941ccf465c68838424311f.jpg", earrings: "https://i.pinimg.com/1200x/55/5a/f9/555af9031877b2cf42d27a8458c09176.jpg" },
  Mustard: { jhumka: "https://i.pinimg.com/736x/a1/86/ba/a186ba9cc8ebf51bde332c5895840bf2.jpg", churiyan: "https://i.pinimg.com/control1/1200x/36/dd/bc/36ddbc3f1b5b9824e2dc772971599257.jpg", earrings: "https://i.pinimg.com/control1/1200x/a4/9a/a8/a49aa8f5f44e8d0fe491a0b528d3d4fa.jpg" },
  Peach: { jhumka: "https://i.pinimg.com/1200x/00/be/3e/00be3eb12f6ed28fa19ae3a2c2471584.jpg", churiyan: "https://i.pinimg.com/736x/f8/59/a0/f859a094e43cd92c46957492b68039c7.jpg", earrings: "https://i.pinimg.com/1200x/cf/2e/28/cf2e284aca8ec4289da0112b5be3c452.jpg" },
  Teal: { jhumka: "https://i.pinimg.com/1200x/1e/2c/ee/1e2ceea131d11a00fcce6ca6a10a5609.jpg", churiyan: "https://i.pinimg.com/736x/73/cc/db/73ccdbddd0d07eca59e2592a428c28d8.jpg", earrings: "https://i.pinimg.com/1200x/1e/82/8e/1e828e474ade9592e28c31ad15e1e743.jpg" },
  Maroon: { jhumka: "https://i.pinimg.com/1200x/ee/43/ed/ee43edb56e8f0e761d855c51927dbc97.jpg", churiyan: "https://i.pinimg.com/736x/05/69/b5/0569b569bd884509440ebe3e427a13c5.jpg", earrings: "https://i.pinimg.com/1200x/ee/79/3c/ee793cf6e218f5c9a8edc55afd599987.jpg" },
  Gold: { jhumka: "https://i.pinimg.com/1200x/c3/df/94/c3df9436f1953b21b1e8ebcd590baeaf.jpg", churiyan: "https://i.pinimg.com/736x/fd/74/46/fd7446f9d39bde8897a7c414864e1791.jpg", earrings: "https://i.pinimg.com/1200x/08/9a/38/089a3807a4f00b1e69cd33bed1b27335.jpg" }
};

export default function App() {
  const [selected, setSelected] = useState([]);
  const [look, setLook] = useState([]);
  const [surprise, setSurprise] = useState(false);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("All");
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedColors"));
    if(saved) setSelected(saved);
    const savedLook = JSON.parse(localStorage.getItem("savedLook"));
    if(savedLook) setLook(savedLook);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedColors", JSON.stringify(selected));
    localStorage.setItem("savedLook", JSON.stringify(look));
  }, [selected, look]);

  const toggleColor = (color) => {
    setSelected(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const generateLook = () => {
    if(!selected.length) return;
    setLook(selected.map(c => ({ color: c, ...COLOR_MATCH[c] })));
    setSurprise(false);
  };

  const surpriseMe = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)].name;
    setSelected([randomColor]);
    setLook([{ color: randomColor, ...COLOR_MATCH[randomColor] }]);
    setSurprise(true);

    const confetti = document.createElement("div");
    confetti.className = "confetti";
    document.body.appendChild(confetti);
    setTimeout(() => document.body.removeChild(confetti), 1500);
  };

  const openModal = (item) => setModal(item);
  const closeModal = () => setModal(null);
  const openZoom = (img) => setZoomImg(img);
  const closeZoom = () => setZoomImg(null);

  const filteredColors = COLORS.filter(c => filter === "All" ? true : c.type === filter);

  return (
    <div className="min-h-screen p-6 text-white bg-linear-to-r from-gray-900 via-gray-800 to-black animate-gradientBG">
      <h1 className="text-4xl font-extrabold text-center mb-8">🌙 Eid Outfit Styler PRO+ ✨</h1>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {["All","Jewel","Pastel","Metallic"].map(f => (
          <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-full font-bold ${filter===f?"bg-yellow-400 text-black":"bg-gray-700"}`}>{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {filteredColors.map(color => (
          <div
            key={color.name}
            onClick={() => toggleColor(color.name)}
            className={`cursor-pointer p-4 rounded-3xl text-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl ${selected.includes(color.name)?"ring-4 ring-yellow-400":""}`}
            style={{ backgroundColor: color.hex }}
          >
            <span className="text-sm font-semibold text-black">{color.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button onClick={generateLook} className="bg-linear-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform">Generate Look ✨</button>
        <button onClick={surpriseMe} className="bg-purple-500 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform">Surprise Me 🎲</button>
        <button onClick={()=>{setSelected([]); setLook([]); setSurprise(false);}} className="bg-red-500 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform">Reset 🔄</button>
      </div>

      {look.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {look.map((item,i) => (
            <div key={i} className="bg-white text-black p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 hover:rotate-1">
              <h3 className="font-bold text-xl mb-4 text-center">{item.color}</h3>
              <div className="flex justify-around items-center">
                {["jhumka","churiyan","earrings"].map(k=>(
                  <div key={k} className="flex flex-col items-center transform transition-all hover:scale-110 hover:shadow-xl">
                    <img src={item[k]} onClick={()=>openZoom(item[k])} className="w-24 h-24 rounded-lg cursor-zoom-in" />
                    <p className="mt-2 text-sm font-medium">{k.charAt(0).toUpperCase()+k.slice(1)}</p>
                  </div>
                ))}
              </div>
              {surprise && <p className="mt-2 text-center text-purple-700 font-semibold animate-bounce">💫 Surprise Look!</p>}

              {/* Jewellery Suggestion Box */}
              <div className="mt-4 bg-gray-100 text-gray-900 rounded-xl p-3 shadow-lg">
                <h4 className="font-bold mb-2 text-center">💍 Suggested Jewellery Combo</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Jhumka: Elegant {item.color} style</li>
                  <li>Churiyan: Matching {item.color} bangles</li>
                  <li>Earrings: Coordinated {item.color} earrings</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl relative max-w-2xl w-full">
            <button onClick={closeModal} className="absolute top-2 right-4 text-xl font-bold text-red-500">✕</button>
            <h2 className="font-bold text-2xl text-center mb-4">{modal.color} Outfit</h2>
            <div className="flex justify-around items-center">
              {["jhumka","churiyan","earrings"].map(k=>(
                <div key={k} className="flex flex-col items-center">
                  <img src={modal[k]} onClick={()=>openZoom(modal[k])} className="w-32 h-32 rounded-lg cursor-zoom-in" />
                  <p className="mt-2 font-medium">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {zoomImg && (
        <div onClick={closeZoom} className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out">
          <img src={zoomImg} className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl animate-pulse" />
        </div>
      )}

      <style>{`
        .confetti {
          position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none;
          background-image: radial-gradient(circle, #facc15 5%, transparent 5%), radial-gradient(circle, #f472b6 5%, transparent 5%);
          background-position: 0 0, 20px 20px;
          background-size: 40px 40px;
          animation: confettiFall 1.5s linear;
        }
        @keyframes confettiFall {
          0% { background-position: 0 0, 20px 20px; }
          100% { background-position: 0 100vh, 20px 120vh; }
        }
      `}</style>
    </div>
  );
}