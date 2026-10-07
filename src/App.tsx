import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Languages, 
  PlusCircle, 
  Volume2, 
  Search, 
  Heart, 
  Sparkles, 
  Info,
  CheckCircle,
  Loader2
} from 'lucide-react';

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
  { id: '1', espanol: 'Hola / Saludo general', mapudungun: 'Mari mari', pronunciacion: 'ma-ri ma-ri', categoria: 'Saludos', ejemplo: 'Mari mari peñi (Hola hermano)' },
  { id: '2', espanol: '¿Cómo estás?', mapudungun: '¿Chumleiymi?', pronunciacion: 'chum-ley-mi', categoria: 'Saludos', ejemplo: '¿Chumleiymi am? (¿Cómo estás tú?)' },
  { id: '3', espanol: 'Estoy bien', mapudungun: 'Kümelefun', pronunciacion: 'ku-me-le-fun', categoria: 'Saludos', ejemplo: 'Kümelefun, chaltumay (Estoy bien, gracias)' },
  { id: '4', espanol: 'Muchas gracias', mapudungun: 'Chaltumay', pronunciacion: 'chal-tu-may', categoria: 'Expresiones', ejemplo: 'Chaltumay may (Muchas gracias)' },
  { id: '5', espanol: 'Hermano / Amigo (entre hombres)', mapudungun: 'Peñi', pronunciacion: 'pe-ñi', categoria: 'Familia', ejemplo: 'Mari mari peñi' },
  { id: '6', espanol: 'Hermano/a / Trato de respeto', mapudungun: 'Lamngen', pronunciacion: 'lam-ngen', categoria: 'Familia', ejemplo: 'Mari mari lamngen' },
  { id: '7', espanol: 'Agua', mapudungun: 'Ko', pronunciacion: 'ko', categoria: 'Naturaleza', ejemplo: 'Küme ko (Agua buena/limpia)' },
  { id: '8', espanol: 'Sol / Día', mapudungun: 'Antü', pronunciacion: 'an-tu', categoria: 'Naturaleza', ejemplo: 'Küme antü (Buen día)' },
  { id: '9', espanol: 'Tierra / Territorio', mapudungun: 'Mapu', pronunciacion: 'ma-pu', categoria: 'Naturaleza', ejemplo: 'Wallmapu (Territorio ancestral)' },
  { id: '10', espanol: 'Comida / Alimento', mapudungun: 'Iyaël', pronunciacion: 'i-ya-el', categoria: 'Alimentos', ejemplo: 'Küme iyaël (Comida rica)' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'traductor' | 'diccionario' | 'agregar' | 'info'>('traductor');
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>(() => {
    const saved = localStorage.getItem('mapudungun_dict');
    return saved ? JSON.parse(saved) : DEFAULT_DICTIONARY;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mapudungun_favs');
    return saved ? JSON.parse(saved) : [];
  });

  // Estado del Traductor
  const [inputPhrase, setInputPhrase] = useState('');
  const [translationResult, setTranslationResult] = useState<{
    mapudungun: string;
    pronunciacion: string;
    desglose: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estado del Buscador
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Estado de Nueva Palabra
  const [newEsp, setNewEsp] = useState('');
  const [newMap, setNewMap] = useState('');
  const [newPron, setNewPron] = useState('');
  const [newCat, setNewCat] = useState('General');
  const [newEx, setNewEx] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('mapudungun_dict', JSON.stringify(dictionary));
  }, [dictionary]);

  useEffect(() => {
    localStorage.setItem('mapudungun_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CL';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

 // Función de traducción con IA Gemini
 // Función de traducción con IA Gemini
  // Función de traducción optimizada (Diccionario local + Caché + IA Gemini)
  const handleTranslate = async () => {
    const cleanInput = inputPhrase.trim().toLowerCase();
    if (!cleanInput) return;
    setIsLoading(true);

    // 1. Verificación instantánea en el diccionario local / memoria
    const matchLocal = dictionary.find(
      item => item.espanol.toLowerCase() === cleanInput || item.mapudungun.toLowerCase() === cleanInput
    );

    if (matchLocal) {
      setTranslationResult({
        mapudungun: matchLocal.mapudungun,
        pronunciacion: matchLocal.pronunciacion,
        desglose: `Traducción instantánea (Diccionario Local) — ${matchLocal.ejemplo}`
      });
      setIsLoading(false);
      return;
    }

    // 2. Si no está local, consulta a Gemini 3.8 Flash
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
Traduce brevemente del español al Mapudungun la siguiente frase: "${cleanInput}"

Responde ÚNICAMENTE en JSON estricto:
{
  "mapudungun": "Traducción en mapudungun",
  "pronunciacion": "Guía fonética simplificada",
  "desglose": "Explicación breve"
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      setTranslationResult(parsed);

      // Guardar automáticamente en el diccionario para que la próxima vez sea instantáneo
      const autoEntry: DictionaryEntry = {
        id: Date.now().toString(),
        espanol: inputPhrase,
        mapudungun: parsed.mapudungun,
        pronunciacion: parsed.pronunciacion,
        categoria: 'IA Traducido',
        ejemplo: parsed.desglose
      };

      setDictionary(prev => [autoEntry, ...prev]);

    } catch (error: any) {
      console.error('Error traduciendo:', error);
      setTranslationResult({
        mapudungun: 'Error al traducir',
        pronunciacion: 'Revisa tu conexión o vuelve a intentar',
        desglose: 'No se pudo completar la solicitud.'
      });
    } finally {
      setIsLoading(false);
    }
  };

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de API:', errorData);
        throw new Error(errorData.error?.message || 'Error en la respuesta de la API');
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      setTranslationResult(parsed);
    } catch (error: any) {
      console.error('Error traduciendo:', error);
      setTranslationResult({
        mapudungun: 'Error al traducir',
        pronunciacion: 'Revisa tu conexión o la clave de API',
        desglose: error?.message || 'Ocurrió un error inesperado.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEsp || !newMap) return;

    const newEntry: DictionaryEntry = {
      id: Date.now().toString(),
      espanol: newEsp,
      mapudungun: newMap,
      pronunciacion: newPron || newMap,
      categoria: newCat,
      ejemplo: newEx || `${newMap} (${newEsp})`,
      isCustom: true
    };

    setDictionary(prev => [newEntry, ...prev]);
    setNewEsp('');
    setNewMap('');
    setNewPron('');
    setNewEx('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredDictionary = dictionary.filter(item => {
    const matchesSearch = item.espanol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.mapudungun.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || 
                            (selectedCategory === 'Favoritos' ? favorites.includes(item.id) : item.categoria === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">Español – Mapudungun</h1>
              <p className="text-xs text-slate-400">Diccionario & Traductor con IA</p>
            </div>
          </div>

          <nav className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('traductor')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'traductor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Traductor IA</span>
            </button>
            <button
              onClick={() => setActiveTab('diccionario')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'diccionario' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Diccionario</span>
            </button>
            <button
              onClick={() => setActiveTab('agregar')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'agregar' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Agregar</span>
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all`}
              title="Información Gramatical"
            >
              <Info className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {/* Pestaña Traductor */}
        {activeTab === 'traductor' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <label className="block text-sm font-semibold text-slate-300">
                Escribe cualquier frase en español latino:
              </label>
              <textarea
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                placeholder="Ej: Hola amigo, ¿cómo has estado hoy?"
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleTranslate}
                disabled={isLoading || !inputPhrase.trim()}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Traduciendo con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Traducir al Mapudungun</span>
                  </>
                )}
              </button>
            </div>

            {translationResult && (
              <div className="bg-slate-800/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Mapudungun
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-2">
                      {translationResult.mapudungun}
                    </h2>
                  </div>
                  <button
                    onClick={() => speakText(translationResult.mapudungun)}
                    className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-emerald-400 transition-all"
                    title="Escuchar pronunciación"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">Pronunciación Guía</h3>
                    <p className="text-slate-200 font-mono mt-1 text-sm bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
                      {translationResult.pronunciacion}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">Desglose / Contexto</h3>
                    <p className="text-slate-300 mt-1 text-sm leading-relaxed">
                      {translationResult.desglose}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pestaña Diccionario */}
        {activeTab === 'diccionario' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en español o mapudungun..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Todas">Todas las categorías</option>
                <option value="Favoritos">❤️ Mis Favoritos</option>
                <option value="Saludos">Saludos</option>
                <option value="Familia">Familia</option>
                <option value="Naturaleza">Naturaleza</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Expresiones">Expresiones</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDictionary.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl p-5 shadow-lg transition-all space-y-3 relative group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">
                        {item.categoria}
                      </span>
                      <h3 className="text-xl font-bold text-emerald-400 mt-1">{item.mapudungun}</h3>
                      <p className="text-sm text-slate-300 font-medium">{item.espanol}</p>
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => speakText(item.mapudungun)}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-all"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(item.id) ? 'text-red-500 bg-red-500/10' : 'text-slate-400 hover:text-red-400 hover:bg-slate-700/50'
                        }`}
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/50 text-xs text-slate-400 space-y-1">
                    <p><span className="text-slate-500">Pronunciación:</span> [{item.pronunciacion}]</p>
                    <p><span className="text-slate-500">Ejemplo:</span> {item.ejemplo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pestaña Agregar Palabra */}
        {activeTab === 'agregar' && (
          <form onSubmit={handleAddWord} className="max-w-xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white mb-2">Agregar nuevo término al vocabulario</h2>

            {showSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center space-x-2 text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Palabra guardada correctamente en tu diccionario personal.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Español Latino *</label>
              <input
                type="text"
                required
                value={newEsp}
                onChange={(e) => setNewEsp(e.target.value)}
                placeholder="Ej: Amigo"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mapudungun *</label>
              <input
                type="text"
                required
                value={newMap}
                onChange={(e) => setNewMap(e.target.value)}
                placeholder="Ej: Peñi"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Pronunciación Aprox.</label>
                <input
                  type="text"
                  value={newPron}
                  onChange={(e) => setNewPron(e.target.value)}
                  placeholder="Ej: pe-ñi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Categoría</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="General">General</option>
                  <option value="Saludos">Saludos</option>
                  <option value="Familia">Familia</option>
                  <option value="Naturaleza">Naturaleza</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Expresiones">Expresiones</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Ejemplo de Uso</label>
              <input
                type="text"
                value={newEx}
                onChange={(e) => setNewEx(e.target.value)}
                placeholder="Ej: Mari mari peñi (Hola hermano)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              Guardar en el Diccionario
            </button>
          </form>
        )}

        {/* Pestaña Información */}
        {activeTab === 'info' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4 text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-2">Notas Lingüísticas y Gramaticales</h2>
            <p>
              El **Mapudungun** es el idioma del pueblo Mapuche. Es un idioma **aglutinante**, lo que significa que las palabras se forman añadiendo prefijos y sufijos a una raíz para expresar conceptos complejos en una sola palabra.
            </p>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
              <h3 className="font-semibold text-emerald-400">Trato y Etiqueta:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-slate-200">Peñi:</strong> Se utiliza exclusivamente entre hombres para decir "hermano" o "amigo".</li>
                <li><strong className="text-slate-200">Lamngen:</strong> Se usa de hombre a mujer, de mujer a hombre o entre mujeres. Es un trato de respeto fraternal.</li>
                <li><strong className="text-slate-200">Mari mari:</strong> Es el saludo tradicional universal durante el día.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}