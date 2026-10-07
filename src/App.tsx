import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Search } from 'lucide-react';

interface DictionaryEntry {
  id: string;
  espanol: string;
  mapudungun: string;
  pronunciacion: string;
  categoria: string;
  ejemplo: string;
  isCustom?: boolean;
}

const DEFAULT_DICTIONARY: DictionaryEntry[] = [
  // --- LETRA A ---
  { id: 'a1', espanol: 'Que conduce al lago', mapudungun: 'Acol', pronunciacion: 'a-col', categoria: 'Naturaleza', ejemplo: 'Acol ko' },
  { id: 'a2', espanol: 'Lugar caliente', mapudungun: 'Achen Niyeu', pronunciacion: 'a-chen ni-yeu', categoria: 'Lugares', ejemplo: 'Achen Niyeu mapu' },
  { id: 'a3', espanol: 'Finalizar / Terminar', mapudungun: 'Acun', pronunciacion: 'a-cun', categoria: 'Acciones', ejemplo: 'Acun dungu' },
  { id: 'a4', espanol: 'Volver / Regresar', mapudungun: 'Acutun', pronunciacion: 'a-cu-tun', categoria: 'Acciones', ejemplo: 'Acutun ruka meu' },
  { id: 'a5', espanol: 'Nueve', mapudungun: 'Aila', pronunciacion: 'ay-la', categoria: 'Números', ejemplo: 'Aila che' },
  { id: 'a6', espanol: 'Agua sobre cascajo', mapudungun: 'Ailinco', pronunciacion: 'ay-lin-co', categoria: 'Naturaleza', ejemplo: 'Ailinco leufu' },
  { id: 'a7', espanol: 'Piedra blanca', mapudungun: 'Alicura', pronunciacion: 'a-li-cu-ra', categoria: 'Naturaleza', ejemplo: 'Küme alicura' },
  { id: 'a8', espanol: 'Reflejo en el agua', mapudungun: 'Alumco', pronunciacion: 'a-lum-co', categoria: 'Naturaleza', ejemplo: 'Pen alumco' },
  { id: 'a9', espanol: 'Reluciente en el fondo', mapudungun: 'Alumine', pronunciacion: 'a-lu-mi-ne', categoria: 'Naturaleza', ejemplo: 'Alumine ko' },
  { id: 'a10', espanol: 'Agua del indio', mapudungun: 'Antuco', pronunciacion: 'an-tu-co', categoria: 'Naturaleza', ejemplo: 'Antuco leufu' },
  { id: 'a11', espanol: 'Pumas alzados', mapudungun: 'Aucapan', pronunciacion: 'au-ca-pan', categoria: 'Animales', ejemplo: 'Aucapan mahuida' },
  { id: 'a12', espanol: 'Agua que resuena / Eco', mapudungun: 'Auquinco', pronunciacion: 'au-quin-co', categoria: 'Naturaleza', ejemplo: 'Allkütun auquinco' },

  // --- LETRA B ---
  { id: 'b1', espanol: 'Bandurria', mapudungun: 'Bandurria', pronunciacion: 'ban-du-rria', categoria: 'Animales', ejemplo: 'Müna bandurria' },
  { id: 'b2', espanol: 'Roca grande', mapudungun: 'Botacura', pronunciacion: 'bo-ta-cu-ra', categoria: 'Naturaleza', ejemplo: 'Füta botacura' },
  { id: 'b3', espanol: 'Bosque grande', mapudungun: 'Bucalemu', pronunciacion: 'bu-ca-le-mu', categoria: 'Naturaleza', ejemplo: 'Bucalemu meu' },
  { id: 'b4', espanol: 'Río de muchas corrientes', mapudungun: 'Buraleo', pronunciacion: 'bu-ra-leo', categoria: 'Naturaleza', ejemplo: 'Buraleo leufu' },
  { id: 'b5', espanol: 'Arroyo grande', mapudungun: 'Butaco', pronunciacion: 'bu-ta-co', categoria: 'Naturaleza', ejemplo: 'Küme butaco' },

  // --- LETRA C ---
  { id: 'c1', espanol: 'Fiesta / Reunión', mapudungun: 'Cahuin', pronunciacion: 'ca-huin', categoria: 'Cultura', ejemplo: 'Kümeke cahuin' },
  { id: 'c2', espanol: 'Agua azul', mapudungun: 'Calbuco', pronunciacion: 'cal-bu-co', categoria: 'Naturaleza', ejemplo: 'Calbuco ko' },
  { id: 'c3', espanol: 'Azul', mapudungun: 'Calfu', pronunciacion: 'cal-fu', categoria: 'Colores', ejemplo: 'Calfu wenu' },
  { id: 'c4', espanol: 'Águila grande', mapudungun: 'Calquin', pronunciacion: 'cal-quin', categoria: 'Animales', ejemplo: 'Üñüm calquin' },
  { id: 'c5', espanol: 'Seis', mapudungun: 'Cayu', pronunciacion: 'ca-yu', categoria: 'Números', ejemplo: 'Cayu che' },
  { id: 'c6', espanol: 'Agua / Arroyo', mapudungun: 'Co', pronunciacion: 'co', categoria: 'Naturaleza', ejemplo: 'Pütun co' },
  { id: 'c7', espanol: 'Gato montés', mapudungun: 'Colo Colo', pronunciacion: 'co-lo co-lo', categoria: 'Animales', ejemplo: 'Colo colo mahuida' },
  { id: 'c8', espanol: 'Bueno / Rico', mapudungun: 'Cume', pronunciacion: 'cu-me', categoria: 'Expresiones', ejemplo: 'Cume iyaël' },
  { id: 'c9', espanol: 'Oscuro / Negro', mapudungun: 'Curi', pronunciacion: 'cu-ri', categoria: 'Colores', ejemplo: 'Curi kalshü' },
  { id: 'c10', espanol: 'Luna', mapudungun: 'Cuyen', pronunciacion: 'cu-yen', categoria: 'Naturaleza', ejemplo: 'Küme cuyen' },

  // --- LETRA CH ---
  { id: 'ch1', espanol: 'Saludo de respeto', mapudungun: 'Chacha', pronunciacion: 'cha-cha', categoria: 'Saludos', ejemplo: 'Mari mari chacha' },
  { id: 'ch2', espanol: 'Sal', mapudungun: 'Chadi', pronunciacion: 'cha-di', categoria: 'Alimentos', ejemplo: 'Pütun chadi' },
  { id: 'ch3', espanol: 'Gente / Persona', mapudungun: 'Che', pronunciacion: 'che', categoria: 'General', ejemplo: 'Mapuche' },
  { id: 'ch4', espanol: 'Avestruz / Choique', mapudungun: 'Choique', pronunciacion: 'choy-que', categoria: 'Animales', ejemplo: 'Choique purrun' },
  { id: 'ch5', espanol: 'Frío', mapudungun: 'Chuy chuy', pronunciacion: 'chuy chuy', categoria: 'Expresiones', ejemplo: 'Chuy chuy feley' },

  // --- LETRA E ---
  { id: 'e1', espanol: 'Tres', mapudungun: 'Ela', pronunciacion: 'e-la', categoria: 'Números', ejemplo: 'Ela che' },
  { id: 'e2', espanol: 'Dos', mapudungun: 'Epu', pronunciacion: 'e-pu', categoria: 'Números', ejemplo: 'Epu mari' },

  // --- LETRA G / H ---
  { id: 'g1', espanol: 'Zorro', mapudungun: 'Guru', pronunciacion: 'gu-ru', categoria: 'Animales', ejemplo: 'Guru leufu' },
  { id: 'h1', espanol: 'Vaca', mapudungun: 'Huaca', pronunciacion: 'hua-ca', categoria: 'Animales', ejemplo: 'Huaca' },
  { id: 'h2', espanol: 'Cielo / Lo alto', mapudungun: 'Huenu', pronunciacion: 'hue-nu', categoria: 'Naturaleza', ejemplo: 'Huenu mapu' },
  { id: 'h3', espanol: 'Extranjero', mapudungun: 'Huinca', pronunciacion: 'huin-ca', categoria: 'General', ejemplo: 'Huinca dungu' },

  // --- LETRA M / P / R / S ---
  { id: 'm1', espanol: 'Montaña / Cerro', mapudungun: 'Mahuida', pronunciacion: 'ma-hui-da', categoria: 'Naturaleza', ejemplo: 'Füta mahuida' },
  { id: 'm2', espanol: 'Gente de esta tierra', mapudungun: 'Mapuche', pronunciacion: 'ma-pu-che', categoria: 'Cultura', ejemplo: 'Mapuche che' },
  { id: 'm3', espanol: 'Diez', mapudungun: 'Mari', pronunciacion: 'ma-ri', categoria: 'Números', ejemplo: 'Mari mari' },
  { id: 'p1', espanol: 'Hermano', mapudungun: 'Peñi', pronunciacion: 'pe-ñi', categoria: 'Familia', ejemplo: 'Mari mari peñi' },
  { id: 'p2', espanol: 'Pequeño / Chico', mapudungun: 'Pichi', pronunciacion: 'pi-chi', categoria: 'General', ejemplo: 'Pichi che' },
  { id: 'r1', espanol: 'Lugar sagrado', mapudungun: 'Rehue', pronunciacion: 're-hue', categoria: 'Cultura', ejemplo: 'Rehue ngillatun' },
  { id: 's1', espanol: 'Esperanza', mapudungun: 'Suyai', pronunciacion: 'su-yay', categoria: 'Expresiones', ejemplo: 'Küme suyai' }
];

export default function App() {
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>(() => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DICTIONARY;
  });

  const [inputPhrase, setInputPhrase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState<{
    mapudungun: string;
    pronunciacion: string;
    desglose: string;
  } | null>(null);

  const handleTranslate = async () => {
    const cleanInput = inputPhrase.trim().toLowerCase();
    if (!cleanInput) return;
    setIsLoading(true);

    const matchLocal = dictionary.find(
      item =>
        item.espanol.toLowerCase().trim() === cleanInput ||
        item.mapudungun.toLowerCase().trim() === cleanInput
    );

    if (matchLocal) {
      setTranslationResult({
        mapudungun: matchLocal.mapudungun,
        pronunciacion: matchLocal.pronunciacion,
        desglose: Traducción instantánea (Diccionario Local) — ${matchLocal.ejemplo}
      });
      setIsLoading(false);
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setTranslationResult({
        mapudungun: 'Falta la clave de API',
        pronunciacion: 'Configura VITE_GEMINI_API_KEY en Vercel',
        desglose: 'Revisa las variables de entorno.'
      });
      setIsLoading(false);
      return;
    }

    const prompt = `Eres un lingüista experto en el idioma Mapudungun (Mapuche). 
Traduce la siguiente frase del español al Mapudungun: "${cleanInput}"

Responde ÚNICAMENTE en JSON estricto sin bloques de código:
{
  "mapudungun": "Traducción en mapudungun",
  "pronunciacion": "Guía fonética simplificada",
  "desglose": "Explicación breve del significado"
}`;

    try {
      const response = await fetch(
        https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey},
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (!response.ok) throw new Error('Error en el servidor');

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/json/gi, '').replace(//g, '').trim();
      const parsed = JSON.parse(cleanJson);

      setTranslationResult(parsed);

      const autoEntry: DictionaryEntry = {
        id: Date.now().toString(),
        espanol: inputPhrase,
        mapudungun: parsed.mapudungun,
        pronunciacion: parsed.pronunciacion,
        categoria: 'IA Traducido',
        ejemplo: parsed.desglose
      };

      setDictionary(prev => [autoEntry, ...prev]);
    } catch (error) {
      setTranslationResult({
        mapudungun: 'Error al traducir',
        pronunciacion: 'Revisa tu conexión o la clave de API',
        desglose: 'El servidor de IA no respondió. Intenta con palabras del diccionario local.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CL';
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredDictionary = dictionary.filter(
    item =>
      item.espanol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mapudungun.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8" />
            Traductor Mapudungun AI
          </h1>
          <p className="text-slate-400 text-sm">
            Diccionario Instantáneo e Inteligencia Artificial
          </p>
        </header>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Español / Frase
            </label>
            <textarea
              value={inputPhrase}
              onChange={e => setInputPhrase(e.target.value)}
              placeholder="Ejemplo: zorro, agua, o escribe una frase completa..."
              className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <button
            onClick={handleTranslate}
            disabled={isLoading || !inputPhrase.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-5 h-5" />
            {isLoading ? 'Traduciendo...' : 'Traducir al Mapudungun'}
          </button>

          {translationResult && (
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase">Mapudungun</span>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-2xl font-bold text-white">{translationResult.mapudungun}</p>
                  <button
                    onClick={() => handleSpeak(translationResult.mapudungun)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-emerald-400 transition"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Pronunciación Guía</span>
                <p className="text-slate-300 italic">{translationResult.pronunciacion}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Desglose / Contexto</span>
                <p className="text-slate-400 text-sm mt-1">{translationResult.desglose}</p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Diccionario Base</h2>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full">
              {dictionary.length} Palabras
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar en el diccionario..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="divide-y divide-slate-800 max-h-72 overflow-y-auto pr-1">
            {filteredDictionary.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-400">{item.mapudungun}</p>
                  <p className="text-sm text-slate-300">{item.espanol}</p>
                  <p className="text-xs text-slate-500 italic">Pronuncia: {item.pronunciacion}</p>
                </div>
                <button
                  onClick={() => handleSpeak(item.mapudungun)}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}