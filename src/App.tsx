import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Capability from "./components/Capability";
import Quality from "./components/Quality";
import Network from "./components/Network";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Capability />
        <Quality />
        <Network />
        <Contact />
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      
      {isAdminOpen && <Admin onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}
