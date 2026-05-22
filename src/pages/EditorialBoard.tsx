import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, GraduationCap, BookOpen, Award, Users, ArrowRight } from "lucide-react";
import editorInChiefImg from "@/assets/Editorial Board Member/Pradeep Kumar Das (Chief Editor).png";
import asstEditorImg from "@/assets/Editorial Board Member/Koushik Mukherjee (Asst. Editor).jpeg";
import AvikImg from "@/assets/Editorial Board Member/Avik Chowdhury.png";
import SoumyabrataRoyImg from "@/assets/Editorial Board Member/Soumyabrata Roy.jpg.jpeg";
import SekharPalImg from "@/assets/Editorial Board Member/sekhar pal.jpg.jpeg";
import PieuNaskarImg from "@/assets/Editorial Board Member/piu naskar.jpeg";
import DurgaPrasadBarikImg from "@/assets/Editorial Board Member/Durga prasad barik.jpg.jpeg";
import ChhandaMallickMukherjeeImg from "@/assets/Editorial Board Member/chanda mallick.jpg.jpeg";
import AmritaBanerjeeImg from "@/assets/Editorial Board Member/amrita banerjee.jpg.jpeg";
import ProsunTribediImg from "@/assets/Editorial Board Member/prosun tribedi.png";
import NagendraThakurImg from "@/assets/Editorial Board Member/Nagendra-Thakur.jpg.jpeg";
import HarekrishnaJanaImg from "@/assets/Editorial Board Member/Harekrishna-Jana.jpg.jpeg";


const editorInChief = {
  name: "Prof. (Dr.) Pradeep Kr. Das Mohapatra",
  role: "Editor-in-Chief",
  department: "Professor, Dean of Science, HOD | Dept. of Microbiology",
  institution: "Raiganj University, Uttar Dinajpur, WB, India",
  achievement: "Excellence in Innovation Research, 2020-2025",
  image: editorInChiefImg,
  bio: "Prof. (Dr.) Pradeep Kr. Das Mohapatra serves as Professor, Dean of Science, and HOD of Microbiology at Raiganj University, West Bengal. Recognized for Excellence in Innovation Research (2020-2025), he drives pioneering microbiological research and academic leadership, fostering scientific advancement and student mentorship at the forefront of microbial sciences.",
  specializations: ["Microbial Biotechnology & Innovation", "Applied Microbiology Research", "Industrial & Environmental Microbiology", "Innovative Microbial Technologies"],
};

const assistantEditors = [
  {
    name: "Dr. Koushik Mukherjee, PhD",
    role: "Assistant Professor, HOD",
    department: "Dept. of Microbiology",
    institution: "Kalyani Mahavidyalaya, WB, India",
    image: asstEditorImg,
    bio: "Dr. Koushik Mukherjee, PhD, is Assistant Professor & HOD of Microbiology at Kalyani Mahavidyalaya, WB. He also serves as Assistant Editor, blending academic excellence with editorial expertise in microbiological sciences.",
    specializations: ["Medical Microbiology", "Microbial Pathogenesis Research", "Clinical & Diagnostic Microbiology"],
  },
  // {
  //   name: "Prof. David Kumar, PhD",
  //   role: "Assistant Editor",
  //   department: "Department of Microbiology",
  //   institution: "University of Singapore",
  //   image: figImg,
  //   bio: "Prof. Kumar is a leading expert in microbial genomics and bioinformatics. His work has contributed to understanding pathogenic mechanisms in various microorganisms.",
  //   specializations: ["Microbiology", "Genomics", "Bioinformatics"],
  // },
];

const reviewers = [
  {
    name: "Dr. Avik Acharya Chowdhury, PhD",
    role: "Senior Reviewer",
    designation: "Associate Professor",
    department: "Associate Professor | Dept. of Biosciences",
    institution: "JIS University, WB, India",
    image: AvikImg,
    bio: "Dr. Avik Acharya Chowdhury is an Associate Professor in the Department of Biosciences at JIS University, Kolkata, India. His research interests encompass cancer biology, autophagy-mediated signaling, tumor microenvironment, and molecular therapeutics targeting leukemia and breast cancer. He has contributed to the fields of molecular oncology and translational biosciences through publications in reputed international journals and scholarly book chapters.",
    specializations: ["Biosciences", "Molecular Bioscience Research", "Molecular Bioscience Research"],
  },
  {
    name: "Dr. Pieu Naskar, PhD",
    role: "Peer Reviewer",
    designation: "Assistant Professor, HOD",
    department: "Assistant  Professor, HOD | Dept. of Microbiology",
    institution: "Kulti College, WB, India",
    image: PieuNaskarImg,
    bio: "Dr. Pieu Naskar, PhD, is Assistant Professor & HOD of Microbiology at Kulti College, WB, India, dedicated to microbiological education and research.",
    specializations: ["Microbiology", "Environmental Microbiology", "Medical Microbiology"],
  },
  {
    name: "Dr. Sekhar Pal, PhD",
    role: "Peer Reviewer",
    designation: "Assistant Professor",
    department: "Assistant Professor | Dept. of Microbiology",
    institution: "RMKVCC, WB, India",
    image: SekharPalImg,
    bio: "Dr. Sekhar Pal, PhD, is Assistant Professor of Microbiology at Ramakrishna Mission Vivekananda Centenary College, WB, and serves as a Peer Reviewer.",
    specializations: ["Microbiology", "Applied Microbiology"],
  },
  {
    name: "Dr. Soumyabrata Roy, PhD",
    role: "Senior Reviewer",
    designation: "Assistant Professor",
    department: "Assistant  Professor | Dept. of Biosciences",
    institution: "JIS University, WB, India",
    image: SoumyabrataRoyImg,
    bio: "Dr. Soumyabrata Roy, PhD, is Assistant Professor of Biosciences at JIS University, WB, and serves as a Senior Reviewer.",
    specializations: ["Biosciences", "Molecular Bioscience"],
  },
];

const editorialMembers = [
  {
    name: "Dr. Amrita Banerjee, PhD",
    role: "Assistant Professor (Research)",
    department: "Centre for Industrial Biotechnology Research",
    institution: "Siksha 'O' Anusandhan University, Bhubaneshwar, India",
    image: AmritaBanerjeeImg,
    bio: "Dr. Amrita Banerjee, PhD, is Assistant Professor (Research) at the Centre for Industrial Biotechnology Research, Siksha 'O' Anusandhan University, Bhubaneshwar. She focuses on innovative industrial biotech solutions.",
    specializations: ["Industrial Biotechnology", "Bioprocess Innovation", "Research & Development"],
  },
  {
    name: "Dr. Chhanda Mallick Mukherjee, PhD",
    role: "Assistant Professor",
    department: "Department of Bio-Medical Laboratory Science & Management",
    institution: "Vidyasagar University, WB., India",
    image: ChhandaMallickMukherjeeImg,
    bio: "Dr. Chhanda Mallick Mukherjee, PhD, serves as Assistant Professor in Bio-Medical Laboratory Science & Management at Vidyasagar University, WB. She contributes significantly to biomedical education and diagnostic research.",
    specializations: ["Biomedical Science", "Diagnostic Management", "Clinical Lab Science"],
  },
  {
    name: "Dr. Durga Prasad Barik, PhD",
    role: "Professor",
    department: "Department of Botany & Biotechnology",
    institution: "Ravenshaw University, Odisha, India",
    image: DurgaPrasadBarikImg,
    bio: "Dr. Durga Prasad Barik, PhD, is a Professor in the Department of Botany & Biotechnology at Ravenshaw University, Odisha. With years of academic excellence, he advances research in plant sciences and biotechnological innovations.",
    specializations: ["Plant Biotechnology", "Genetic Research", "Molecular Botany"],
  },
  {
    name: "Dr. Harekrishna Jana, PhD",
    role: "Assistant Professor, HOD",
    department: "Department of Microbiology",
    institution: "Raja Narendralal Khan Women's College, WB., India",
    image: HarekrishnaJanaImg,
    bio: "Dr. Harekrishna Jana, PhD, is Assistant Professor and HOD of Microbiology at Raja Narendralal Khan Women's College, WB. He empowers women students through quality microbiological education.",
    specializations: ["Medical Microbiology", "Academic Mentorship"],
  },
  {
    name: "Dr. Koushik Mukherjee, PhD",
    role: "Assistant Professor, HOD",
    department: "Dept. of Microbiology",
    institution: "Kalyani Mahavidyalaya, WB, India",
    image: asstEditorImg,
    bio: "Dr. Koushik Mukherjee, PhD, is Assistant Professor & HOD of Microbiology at Kalyani Mahavidyalaya, WB. He also serves as Assistant Editor, blending academic excellence with editorial expertise in microbiological sciences.",
    specializations: ["Medical Microbiology", "Microbial Pathogenesis Research", "Clinical & Diagnostic Microbiology"],
  },
  {
    name: "Dr. Nagendra Thakur, PhD",
    role: "Associate Professor, HOD",
    department: "Department of Microbiology",
    institution: "Sikkim University, India",
    image: NagendraThakurImg,
    bio: "Dr. Nagendra Thakur, PhD, is Associate Professor and HOD of Microbiology at Sikkim University, India. He drives microbiological research and education in the Himalayan region.",
    specializations: ["Microbial Ecology", "Applied Microbiology", "Himalayan Microbiology"],
  },
  {
    name: "Dr. Prosun Tribedi, PhD",
    role: "Professor and Dean Academics",
    department: "Department of Biotechnology",
    institution: "The Neotia University, WB., India",
    image: ProsunTribediImg,
    bio: "Dr. Prosun Tribedi, PhD, is Professor and Dean of Academics in the Department of Biotechnology at The Neotia University, WB. He leads academic strategies and biotech research initiatives.",
    specializations: ["Biotechnology", "Academic Administration", "Environmental Biotech"],
  },
];

const EditorialBoard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] pt-32 pb-20 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Users size={12} /> Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              Editorial{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Board
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Meet the distinguished scholars and researchers who ensure the highest standards of research integrity and academic excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editor-in-Chief */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Editor-in-Chief
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1 bg-gradient-to-br from-slate-800 to-[hsl(168,45%,12%)] p-8 flex flex-col items-center justify-center text-center">
                <img
                  src={editorInChief.image}
                  alt={editorInChief.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/30 mb-4"
                />
                <h3 className="text-lg font-bold text-white">{editorInChief.name}</h3>
                <p className="text-sm font-medium text-emerald-400 mt-1">{editorInChief.role}</p>
                <p className="text-xs text-white/50 mt-1">{editorInChief.department}</p>
                <p className="text-xs text-white/50">{editorInChief.institution}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-amber-400">
                  <Award size={14} />
                  <span>{editorInChief.achievement}</span>
                </div>
              </div>
              <div className="md:col-span-2 p-8">
                <p className="text-muted-foreground leading-relaxed mb-6">{editorInChief.bio}</p>
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" /> Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {editorInChief.specializations.map((spec) => (
                    <span key={spec} className="bg-secondary text-secondary-foreground text-xs px-3 py-1.5 rounded-full font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Board Members */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Our Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Editorial Board Members
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))] gap-8 max-w-8xl mx-auto">
            {editorialMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`bg-card rounded-xl border border-border card-shadow hover:elevated-shadow transition-shadow overflow-hidden lg:col-span-6 ${
                  i === 4 ? "lg:col-start-4" : ""
                }`}
              >
                <div className="p-6 text-center border-b border-border">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary/25 ring-4 ring-emerald-500/10"
                  />
                  <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.institution}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specializations.map((spec) => (
                      <span key={spec} className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant Editors */}
      {/* <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Editorial Team
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Assistant Editors
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {assistantEditors.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border card-shadow hover:elevated-shadow transition-shadow overflow-hidden"
              >
                <div className="p-6 text-center border-b border-border">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary/25 ring-4 ring-emerald-500/10"
                  />
                  <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.institution}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specializations.map((spec) => (
                      <span key={spec} className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Reviewers */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Review Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Reviewers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {reviewers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border card-shadow hover:elevated-shadow transition-shadow overflow-hidden"
              >
                <div className="p-6 text-center border-b border-border">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary/25 ring-4 ring-emerald-500/10"
                  />
                  <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{member.designation}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.institution}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specializations.map((spec) => (
                      <span key={spec} className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Members */}
      {/* <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Our Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Editorial Board Members
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {editorialMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border card-shadow hover:elevated-shadow transition-shadow overflow-hidden"
              >
                <div className="p-6 text-center border-b border-border">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary/25 ring-4 ring-emerald-500/10"
                  />
                  <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{member.institution}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specializations.map((spec) => (
                      <span key={spec} className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Peer Review Standards */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Peer Review Standards
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our rigorous peer-review process ensures only the highest quality research is published
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Double-Blind Review", desc: "Identities of authors and reviewers are concealed throughout the review process." },
              { icon: Award, title: "Expert Reviewers", desc: "Manuscripts are reviewed by 2-3 subject-matter experts in the relevant field." },
              { icon: Mail, title: "Rapid Turnaround", desc: "Average review time of 4-6 weeks from submission to first decision." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-card p-6 rounded-xl border border-border card-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary flex items-center justify-center">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 px-4 bg-gradient-to-r from-primary to-emerald-500">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-2">Interested in Joining the Editorial Board?</h2>
          <p className="text-white/80 mb-6">We welcome applications from leading researchers worldwide. Reach out to discuss how you can contribute</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all">
              Contact Us <ArrowRight size={18} />
            </Link>
            <Link to="/submit" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Submit Your Research
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EditorialBoard;
