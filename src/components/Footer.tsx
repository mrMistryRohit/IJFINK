import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Research", to: "/research" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Contact", to: "/contact" },
];

const researchAreas = ["Healthcare", "Pharmacy", "Biochemistry", "Biotechnology", "Neuroscience", "Environmental Biology"];

// Neuron Network Component
const NeuronNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
        {/* Animated neuron nodes and connections */}
        <defs>
          <style>{`
            @keyframes pulse-node {
              0%, 100% { r: 3; opacity: 0.6; }
              50% { r: 5; opacity: 1; }
            }
            @keyframes pulse-line {
              0%, 100% { stroke-opacity: 0.3; }
              50% { stroke-opacity: 0.8; }
            }
            .neuron-node {
              animation: pulse-node 2s ease-in-out infinite;
              fill: #10b981;
            }
            .neuron-line {
              stroke: #10b981;
              stroke-width: 1;
              animation: pulse-line 3s ease-in-out infinite;
            }
          `}</style>
        </defs>
        
        {/* Network lines */}
        <line x1="50" y1="100" x2="300" y2="200" className="neuron-line" style={{ animationDelay: "0s" }} />
        <line x1="300" y1="200" x2="600" y2="150" className="neuron-line" style={{ animationDelay: "0.3s" }} />
        <line x1="600" y1="150" x2="800" y2="300" className="neuron-line" style={{ animationDelay: "0.6s" }} />
        <line x1="800" y1="300" x2="950" y2="100" className="neuron-line" style={{ animationDelay: "0.9s" }} />
        <line x1="100" y1="400" x2="350" y2="450" className="neuron-line" style={{ animationDelay: "0.2s" }} />
        <line x1="350" y1="450" x2="650" y2="480" className="neuron-line" style={{ animationDelay: "0.5s" }} />
        <line x1="650" y1="480" x2="900" y2="500" className="neuron-line" style={{ animationDelay: "0.8s" }} />
        <line x1="300" y1="200" x2="100" y2="400" className="neuron-line" style={{ animationDelay: "0.4s" }} />
        <line x1="600" y1="150" x2="650" y2="480" className="neuron-line" style={{ animationDelay: "0.7s" }} />
        
        {/* Network nodes */}
        <circle cx="50" cy="100" className="neuron-node" style={{ animationDelay: "0s" }} />
        <circle cx="300" cy="200" className="neuron-node" style={{ animationDelay: "0.3s" }} />
        <circle cx="600" cy="150" className="neuron-node" style={{ animationDelay: "0.6s" }} />
        <circle cx="800" cy="300" className="neuron-node" style={{ animationDelay: "0.9s" }} />
        <circle cx="950" cy="100" className="neuron-node" style={{ animationDelay: "1.2s" }} />
        <circle cx="100" cy="400" className="neuron-node" style={{ animationDelay: "0.2s" }} />
        <circle cx="350" cy="450" className="neuron-node" style={{ animationDelay: "0.5s" }} />
        <circle cx="650" cy="480" className="neuron-node" style={{ animationDelay: "0.8s" }} />
        <circle cx="900" cy="500" className="neuron-node" style={{ animationDelay: "1.1s" }} />
      </svg>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[hsl(220,55%,12%)] via-[hsl(220,55%,10%)] to-[hsl(220,55%,8%)] text-white overflow-hidden">
      <NeuronNetwork />
      

<div className="relative z-10 container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-8">
          {/* Column 1: Quick Links & Research Areas */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-emerald-400">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/60 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-emerald-400">Research</h4>
              <ul className="space-y-2.5">
                {researchAreas.map((area) => (
                  <li key={area} className="text-sm text-white/60">{area}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-emerald-400">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide font-bold mb-0.5">Address</p>
                  <span className="text-sm text-white/70">5th Floor, & GP, Regus Campus, RDB Boulevard, Plot K-1, EP Block, Sector V, Kolkata, West Bengal 700091</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide font-bold mb-0.5">Phone</p>
                  <a href="tel:+918337075844" className="text-sm text-white/70 hover:text-emerald-400 transition-colors">+91 83370 75844</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide font-bold mb-0.5">Email</p>
                  <a href="mailto:contact@inkyourjournal.com" className="text-sm text-white/70 hover:text-emerald-400 transition-colors">contact@inkyourjournal.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Ink Your Journal — Biological Sciences Journal. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Ethics Policy"].map((item) => (
              <a key={item} href="#" className="text-sm text-white/40 hover:text-emerald-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
