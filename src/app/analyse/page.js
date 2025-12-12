"use client";
import React, { useEffect, useState } from "react";
import {
  Send,
  FileText,
  TrendingUp,
  Tag,
  Smile,
  Calendar,
  User,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function HybridAnalyzer() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const { logout } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);
  const analyze = async (text, token) => {
    const API_URL = "http://localhost:8000";
    const encodedText = encodeURIComponent(text);

    const response = await fetch(
      `${API_URL}/api/v1/analysis/analyse?text=${encodedText}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur backend:", data);
      throw new Error(data.detail || "Erreur lors de l'analyse");
    }

    return data;
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const token = localStorage.getItem("token");
    try {
      const data = await analyze(inputText, token);
      console.log(data);
      setResult(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="w-full flex items-center justify-between px-6 py-4 mb-6">
          {/* Logo ou titre de l'app */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600/80 rounded-xl flex items-center justify-center backdrop-blur">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-2xl">
              Hybrid-Analyzer
            </span>
          </div>

          {/* Bouton logout */}
          <button
            onClick={logout}
            className="text-white hover:text-red-400 transition-colors p-2"
            title="Se déconnecter"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </header>
        
        {/* Input Section */}
        <div className="bg-slate-900/80 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-slate-700/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600/80 rounded-xl flex items-center justify-center backdrop-blur">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Analyse de Texte
            </h2>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Entrez votre texte à analyser ici..."
            className="w-full h-48 bg-slate-800/90 border border-slate-600/50 rounded-2xl p-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none backdrop-blur text-lg"
          />

          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="mt-6 w-full bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Analyse en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyser le texte
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-slate-900/80 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-700/80 rounded-xl flex items-center justify-center backdrop-blur">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Résultats de l'Analyse
              </h2>
            </div>

            {/* Resume */}
            <div className="bg-slate-800/70 rounded-2xl p-6 mb-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résumé
              </h3>
              <p className="text-white/95 text-lg leading-relaxed">
                {result.resume}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Category */}
              <div className="bg-gradient-to-br from-purple-900/60 to-fuchsia-900/60 rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Tag className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-300 font-medium">Catégorie</span>
                </div>
                <p className="text-2xl font-bold text-white capitalize">
                  {result.category}
                </p>
              </div>

              {/* Ton */}
              <div className="bg-gradient-to-br from-emerald-900/60 to-teal-900/60 rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Smile className="w-5 h-5 text-green-300" />
                  <span className="text-emerald-300 font-medium">Ton</span>
                </div>
                <p className="text-2xl font-bold text-white capitalize">
                  {result.ton}
                </p>
              </div>

              {/* Score */}
              <div className="bg-gradient-to-br from-blue-900/60 to-cyan-900/60 rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-300 font-medium">Score</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {(result.score * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 text-blue-300 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">User ID</span>
                </div>
                <p className="text-white font-semibold">{result.user_id}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-blue-300 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">ID d'analyse</span>
                </div>
                <p className="text-white font-semibold">{result.id}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-blue-300 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="text-white font-semibold text-sm">
                  {new Date(result.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
