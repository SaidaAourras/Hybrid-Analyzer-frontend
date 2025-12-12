'use client'
import { useState, useEffect } from "react";
import { Brain, Zap, Shield, TrendingUp, ArrowRight, Sparkles, BarChart3, FileText, Globe } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Analyse contextuelle avancée propulsée par l'IA",
      color: "from-purple-600 to-indigo-600"
    },
    {
      icon: Zap,
      title: "Analyse Ultra-Rapide",
      description: "Résultats instantanés en quelques secondes",
      color: "from-cyan-600 to-blue-600"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Vos données protégées par chiffrement",
      color: "from-emerald-600 to-teal-600"
    }
  ];

  const stats = [
    { value: "99.8%", label: "Précision" },
    { value: "<2s", label: "Temps de réponse" },
    { value: "50K+", label: "Analyses quotidiennes" },
    { value: "24/7", label: "Disponibilité" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/30 border border-indigo-500/30 rounded-full mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-sm text-indigo-200">Propulsé par l'IA de nouvelle génération</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Hybrid-Analyzer
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-300 mb-8 font-light animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            AI-Powered Media Monitoring Pipeline
          </p>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Transformez vos données textuelles en insights exploitables grâce à notre plateforme d'analyse contextuelle alimentée par l'intelligence artificielle
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <button onClick={router.push('/auth/login')} className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 flex items-center gap-2">
              Commencer l'analyse
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl font-semibold text-lg transition-all duration-300">
              Voir la démo
            </button>
          </div>

          {/* Floating Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 bg-slate-900/60 backdrop-blur-lg border rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeFeature === index 
                    ? "border-indigo-500/50 shadow-lg shadow-indigo-500/20" 
                    : "border-slate-700/30"
                }`}
                style={{ 
                  transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-slate-400">Simple, rapide et efficace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-slate-900/60 backdrop-blur-lg border border-slate-700/30 rounded-3xl hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-xl">
                1
              </div>
              <FileText className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Entrez votre texte</h3>
              <p className="text-slate-400 leading-relaxed">Collez ou tapez le contenu que vous souhaitez analyser dans notre interface intuitive</p>
            </div>

            <div className="relative p-8 bg-slate-900/60 backdrop-blur-lg border border-slate-700/30 rounded-3xl hover:border-purple-500/30 transition-all duration-300 group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center font-black text-xl">
                2
              </div>
              <Brain className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">IA analyse</h3>
              <p className="text-slate-400 leading-relaxed">Notre intelligence artificielle traite et analyse le contenu en temps réel</p>
            </div>

            <div className="relative p-8 bg-slate-900/60 backdrop-blur-lg border border-slate-700/30 rounded-3xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center font-black text-xl">
                3
              </div>
              <BarChart3 className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Obtenez les résultats</h3>
              <p className="text-slate-400 leading-relaxed">Recevez un résumé détaillé avec catégorie, ton et score de confiance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-lg border border-indigo-500/30 rounded-3xl">
            <Globe className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Prêt à transformer vos données ?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Rejoignez des milliers d'utilisateurs qui font confiance à Hybrid-Analyzer
            </p>
            <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105">
              Commencer gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>Hybrid-Analyzer © 2025 • AI-Powered Media Monitoring Pipeline</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}