import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Plus, Trash2, LogOut, Lock, LayoutGrid, Share2, Image as ImageIcon } from "lucide-react";

interface CapabilityItem {
  category: string;
  items: string[];
  image: string;
}

interface NetworkNode {
  title: string;
  image: string;
  pos: string;
}

interface GeneralAssets {
  heroVideo: string;
  aboutImage: string;
  qualityImages: string[];
}

const DEFAULT_CAPABILITIES: CapabilityItem[] = [
  {
    category: "Knit",
    items: ["Jersey", "Fleece", "Rib", "Activewear", "Loungewear"],
    image: "https://images.pexels.com/photos/6373302/pexels-photo-6373302.jpeg"
  },
  {
    category: "Woven",
    items: ["Shirts", "Pants", "Outerwear", "Workwear", "Technical garments"],
    image: "https://images.pexels.com/photos/6616675/pexels-photo-6616675.jpeg"
  },
  {
    category: "Print",
    items: ["Screen Print", "Digital Print", "Sublimation", "Embroidery"],
    image: "https://images.unsplash.com/photo-1663433541063-ddab084d1126?w=600&auto=format&fit=crop&q=60"
  },
  {
    category: "Washing",
    items: ["Garment Wash", "Enzyme Wash", "Stone Wash", "Bleach Wash", "Softener Wash"],
    image: "https://plus.unsplash.com/premium_photo-1755534537396-fa433624ca2f?w=600&auto=format&fit=crop&q=60"
  }
];

const DEFAULT_NETWORK: NetworkNode[] = [
  { 
    title: "Sewing factories", 
    image: "https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=600&auto=format&fit=crop&q=60",
    pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
  },
  { 
    title: "Fabric Mills", 
    image: "https://images.unsplash.com/photo-1660980041852-230420b8f99f?w=600&auto=format&fit=crop&q=60",
    pos: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
  },
  { 
    title: "Trim Suppliers", 
    image: "https://images.pexels.com/photos/4614233/pexels-photo-4614233.jpeg",
    pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
  },
  { 
    title: "Logistics Hub", 
    image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg",
    pos: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
  },
];

const DEFAULT_GENERAL: GeneralAssets = {
  heroVideo: "https://videos.pexels.com/video-files/6460113/6460113-hd_1920_1080_25fps.mp4",
  aboutImage: "https://images.pexels.com/photos/4614195/pexels-photo-4614195.jpeg",
  qualityImages: [
    "https://images.unsplash.com/photo-1673201230274-c4dbd20c3f79?w=600&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1765841918701-79a877196f29?w=600&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1677695578759-5ae6ed633d75?w=600&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1664303810352-447468aa3266?w=600&auto=format&fit=crop&q=60"
  ]
};

export default function Admin({ onClose }: { onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'capability' | 'network' | 'general'>('capability');
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [generalAssets, setGeneralAssets] = useState<GeneralAssets>(DEFAULT_GENERAL);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCap = localStorage.getItem("osl_capabilities");
    if (savedCap) setCapabilities(JSON.parse(savedCap));
    else setCapabilities(DEFAULT_CAPABILITIES);

    const savedNet = localStorage.getItem("osl_network_nodes");
    if (savedNet) setNetworkNodes(JSON.parse(savedNet));
    else setNetworkNodes(DEFAULT_NETWORK);

    const savedGen = localStorage.getItem("osl_general_assets");
    if (savedGen) setGeneralAssets(JSON.parse(savedGen));
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "0325") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleSave = () => {
    localStorage.setItem("osl_capabilities", JSON.stringify(capabilities));
    localStorage.setItem("osl_network_nodes", JSON.stringify(networkNodes));
    localStorage.setItem("osl_general_assets", JSON.stringify(generalAssets));
    alert("All changes saved successfully!");
    window.location.reload();
  };

  // Capability Handlers
  const updateCapCategory = (idx: number, val: string) => {
    const next = [...capabilities];
    next[idx].category = val;
    setCapabilities(next);
  };
  const updateCapImage = (idx: number, val: string) => {
    const next = [...capabilities];
    next[idx].image = val;
    setCapabilities(next);
  };
  const updateCapItems = (idx: number, val: string) => {
    const next = [...capabilities];
    next[idx].items = val.split(",").map(s => s.trim());
    setCapabilities(next);
  };
  const removeCapItem = (idx: number) => {
    setCapabilities(capabilities.filter((_, i) => i !== idx));
  };
  const addCapItem = () => {
    setCapabilities([...capabilities, { category: "New Category", items: [], image: "" }]);
  };

  // Network Handlers
  const updateNetTitle = (idx: number, val: string) => {
    const next = [...networkNodes];
    next[idx].title = val;
    setNetworkNodes(next);
  };
  const updateNetImage = (idx: number, val: string) => {
    const next = [...networkNodes];
    next[idx].image = val;
    setNetworkNodes(next);
  };

  // General Handlers
  const updateGeneralAsset = (key: keyof GeneralAssets, val: string | string[], idx?: number) => {
    if (idx !== undefined && Array.isArray(generalAssets[key])) {
      const nextArr = [...(generalAssets[key] as string[])];
      nextArr[idx] = val as string;
      setGeneralAssets({ ...generalAssets, [key]: nextArr });
    } else {
      setGeneralAssets({ ...generalAssets, [key]: val });
    }
  };

  const handleFileUpload = (idx: number, file: File, type: 'capability' | 'network' | 'general', genKey?: keyof GeneralAssets) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'capability') {
        updateCapImage(idx, base64String);
      } else if (type === 'network') {
        updateNetImage(idx, base64String);
      } else if (type === 'general' && genKey) {
        updateGeneralAsset(genKey, base64String, idx);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-osl-navy flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2rem] max-w-md w-full shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-osl-navy flex items-center gap-2">
              <Lock size={24} /> Admin Login
            </h2>
            <button onClick={onClose} className="text-muted hover:text-osl-navy transition-colors">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                placeholder="••••"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs ml-2">{error}</p>}
            <button className="w-full py-5 bg-osl-navy text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-osl-accent transition-all">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-osl-beige overflow-y-auto">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-osl-navy mb-2">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <button 
                onClick={() => setActiveTab('capability')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'capability' ? 'bg-osl-navy text-white' : 'bg-white text-osl-navy/40 hover:bg-osl-navy/5'}`}
              >
                <LayoutGrid size={14} /> Capability
              </button>
              <button 
                onClick={() => setActiveTab('network')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'network' ? 'bg-osl-navy text-white' : 'bg-white text-osl-navy/40 hover:bg-osl-navy/5'}`}
              >
                <Share2 size={14} /> Network
              </button>
              <button 
                onClick={() => setActiveTab('general')}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'general' ? 'bg-osl-navy text-white' : 'bg-white text-osl-navy/40 hover:bg-osl-navy/5'}`}
              >
                <ImageIcon size={14} /> General
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-osl-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-osl-orange transition-all shadow-lg shadow-osl-accent/20"
            >
              <Save size={16} /> Save All
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-white text-osl-navy rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-osl-navy hover:text-white transition-all shadow-lg shadow-osl-navy/5"
            >
              <LogOut size={16} /> Exit
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'capability' ? (
            <motion.div 
              key="capability"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {capabilities.map((cap, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl shadow-osl-navy/5 border border-osl-navy/5">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-osl-navy">Capability Item #{idx + 1}</h3>
                    <button onClick={() => removeCapItem(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Category Name</label>
                        <input type="text" value={cap.category} onChange={(e) => updateCapCategory(idx, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Image (URL or Upload)</label>
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-osl-navy/10 flex-shrink-0 bg-osl-beige/20">
                            {cap.image ? (
                              <img src={cap.image} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No Image</div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <input 
                              type="text" 
                              value={cap.image} 
                              onChange={(e) => updateCapImage(idx, e.target.value)} 
                              className="w-full px-4 py-2 text-xs rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                              placeholder="Image URL"
                            />
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(idx, e.target.files[0], 'capability')}
                              className="text-[10px] text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-osl-navy file:text-white hover:file:bg-osl-accent cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Items (comma separated)</label>
                      <textarea rows={4} value={cap.items.join(", ")} onChange={(e) => updateCapItems(idx, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors resize-none" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addCapItem} className="w-full py-8 border-2 border-dashed border-osl-navy/10 rounded-3xl text-osl-navy/40 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:border-osl-accent hover:text-osl-accent transition-all">
                <Plus size={20} /> Add New Capability
              </button>
            </motion.div>
          ) : activeTab === 'network' ? (
            <motion.div 
              key="network"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {networkNodes.map((node, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl shadow-osl-navy/5 border border-osl-navy/5">
                  <h3 className="text-lg font-bold text-osl-navy mb-6">Network Node: {node.title}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Title</label>
                      <input type="text" value={node.title} onChange={(e) => updateNetTitle(idx, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Image (URL or Upload)</label>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-osl-navy/10 flex-shrink-0 bg-osl-beige/20">
                          {node.image ? (
                            <img src={node.image} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No Image</div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            type="text" 
                            value={node.image} 
                            onChange={(e) => updateNetImage(idx, e.target.value)} 
                            className="w-full px-4 py-2 text-xs rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                            placeholder="Image URL"
                          />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(idx, e.target.files[0], 'network')}
                            className="text-[10px] text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-osl-navy file:text-white hover:file:bg-osl-accent cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-center text-[10px] text-muted uppercase tracking-widest italic">Note: Network layout positions are fixed to maintain the map structure.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="general"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Hero Video */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-osl-navy/5 border border-osl-navy/5">
                <h3 className="text-lg font-bold text-osl-navy mb-6">Hero Background Video</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">Video (URL or Upload)</label>
                    <div className="flex flex-col gap-4">
                      <input 
                        type="text" 
                        value={generalAssets.heroVideo} 
                        onChange={(e) => updateGeneralAsset('heroVideo', e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                        placeholder="Video URL"
                      />
                      <div className="flex items-center gap-4">
                        <input 
                          type="file" 
                          accept="video/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(0, e.target.files[0], 'general', 'heroVideo')}
                          className="text-[10px] text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-osl-navy file:text-white hover:file:bg-osl-accent cursor-pointer"
                        />
                        <p className="text-[10px] text-muted italic">Note: Large video files may exceed storage limits. Prefer small clips.</p>
                      </div>
                    </div>
                  </div>
                  {generalAssets.heroVideo && (
                    <div className="rounded-xl overflow-hidden border border-osl-navy/10 aspect-video bg-black">
                      <video src={generalAssets.heroVideo} className="w-full h-full object-cover" muted autoPlay loop />
                    </div>
                  )}
                </div>
              </div>

              {/* About Image */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-osl-navy/5 border border-osl-navy/5">
                <h3 className="text-lg font-bold text-osl-navy mb-6">About Section Image</h3>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-osl-navy/10 flex-shrink-0 bg-osl-beige/20">
                    <img src={generalAssets.aboutImage} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input 
                      type="text" 
                      value={generalAssets.aboutImage} 
                      onChange={(e) => updateGeneralAsset('aboutImage', e.target.value)} 
                      className="w-full px-4 py-2 text-xs rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                      placeholder="Image URL"
                    />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(0, e.target.files[0], 'general', 'aboutImage')}
                      className="text-[10px] text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-osl-navy file:text-white hover:file:bg-osl-accent cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Quality Images */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-osl-navy/5 border border-osl-navy/5">
                <h3 className="text-lg font-bold text-osl-navy mb-6">Quality Section Images (4)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {generalAssets.qualityImages.map((img, idx) => (
                    <div key={idx} className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40">Image #{idx + 1}</p>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-osl-navy/10 flex-shrink-0 bg-osl-beige/20">
                          <img src={img} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input 
                            type="text" 
                            value={img} 
                            onChange={(e) => updateGeneralAsset('qualityImages', e.target.value, idx)} 
                            className="w-full px-4 py-2 text-xs rounded-xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                            placeholder="Image URL"
                          />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(idx, e.target.files[0], 'general', 'qualityImages')}
                            className="text-[10px] text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-osl-navy file:text-white hover:file:bg-osl-accent cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
