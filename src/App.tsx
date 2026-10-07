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
 const DEFAULT_DICTIONARY: DictionaryEntry[] = [
  // --- LETRA A ---
  { id: 'a1', espanol: 'Que conduce al lago', mapudungun: 'Acol', pronunciacion: 'a-col', categoria: 'Naturaleza', ejemplo: 'Acol ko (Agua que conduce al lago)' },
  { id: 'a2', espanol: 'Lugar caliente', mapudungun: 'Achen Niyeu', pronunciacion: 'a-chen ni-yeu', categoria: 'Lugares', ejemplo: 'Achen Niyeu mapu (Lugar que estuvo caliente)' },
  { id: 'a3', espanol: 'Finalizar / Terminar', mapudungun: 'Acun', pronunciacion: 'a-cun', categoria: 'Acciones', ejemplo: 'Acun dungu (Finalizar el asunto)' },
  { id: 'a4', espanol: 'Volver / Regresar', mapudungun: 'Acutun', pronunciacion: 'a-cu-tun', categoria: 'Acciones', ejemplo: 'Acutun ruka meu (Volver a la casa)' },
  { id: 'a5', espanol: 'Nueve', mapudungun: 'Aila', pronunciacion: 'ay-la', categoria: 'Números', ejemplo: 'Aila che (Nueve personas)' },
  { id: 'a6', espanol: 'Agua sobre cascajo', mapudungun: 'Ailinco', pronunciacion: 'ay-lin-co', categoria: 'Naturaleza', ejemplo: 'Ailinco leufu (Río de agua sobre cascajo)' },
  { id: 'a7', espanol: 'Piedra blanca', mapudungun: 'Alicura', pronunciacion: 'a-li-cu-ra', categoria: 'Naturaleza', ejemplo: 'Küme alicura (Buena piedra blanca)' },
  { id: 'a8', espanol: 'Reflejo en el agua', mapudungun: 'Alumco', pronunciacion: 'a-lum-co', categoria: 'Naturaleza', ejemplo: 'Pen alumco (Ver el reflejo en el agua)' },
  { id: 'a9', espanol: 'Reluciente en el fondo', mapudungun: 'Alumine', pronunciacion: 'a-lu-mi-ne', categoria: 'Naturaleza', ejemplo: 'Alumine ko (Agua reluciente en el fondo)' },
  { id: 'a10', espanol: 'Agua del indio', mapudungun: 'Antuco', pronunciacion: 'an-tu-co', categoria: 'Naturaleza', ejemplo: 'Antuco leufu (Arroyo del indio)' },
  { id: 'a11', espanol: 'Pumas alzados', mapudungun: 'Aucapan', pronunciacion: 'au-ca-pan', categoria: 'Animales', ejemplo: 'Aucapan mahuida (Montaña de pumas alzados)' },
  { id: 'a12', espanol: 'Agua que resuena / Eco', mapudungun: 'Auquinco', pronunciacion: 'au-quin-co', categoria: 'Naturaleza', ejemplo: 'Allkütun auquinco (Escuchar el agua que resuena)' },

  // --- LETRA B ---
  { id: 'b1', espanol: 'Bandurria (ave)', mapudungun: 'Bandurria', pronunciacion: 'ban-du-rria', categoria: 'Animales', ejemplo: 'Müna bandurria (Muchas bandurrias)' },
  { id: 'b2', espanol: 'Roca grande', mapudungun: 'Botacura', pronunciacion: 'bo-ta-cu-ra', categoria: 'Naturaleza', ejemplo: 'Füta botacura (Roca muy grande)' },
  { id: 'b3', espanol: 'Bosque grande', mapudungun: 'Bucalemu', pronunciacion: 'bu-ca-le-mu', categoria: 'Naturaleza', ejemplo: 'Miapuln bucalemu meu (Caminar en el bosque grande)' },
  { id: 'b4', espanol: 'Río de muchas corrientes', mapudungun: 'Buraleo', pronunciacion: 'bu-ra-leo', categoria: 'Naturaleza', ejemplo: 'Buraleo leufu (Río caudaloso)' },
  { id: 'b5', espanol: 'Arroyo grande', mapudungun: 'Butaco', pronunciacion: 'bu-ta-co', categoria: 'Naturaleza', ejemplo: 'Küme butaco (Buen arroyo grande)' },
  { id: 'b6', espanol: 'Corral grande', mapudungun: 'Butamalal', pronunciacion: 'bu-ta-ma-lal', categoria: 'Lugares', ejemplo: 'Butamalal meu (En el corral grande)' },
  { id: 'b7', espanol: 'Pantano grande', mapudungun: 'Butamallin', pronunciacion: 'bu-ta-ma-llin', categoria: 'Naturaleza', ejemplo: 'Anümka butamallin (Planta del pantano grande)' },

  // --- LETRA C ---
  { id: 'c1', espanol: 'Molinillo de manzana', mapudungun: 'Caburga', pronunciacion: 'ca-bur-ga', categoria: 'Objetos', ejemplo: 'Caburga pünon (Moler con caburga)' },
  { id: 'c2', espanol: 'Adorno', mapudungun: 'Cacha', pronunciacion: 'ca-cha', categoria: 'Objetos', ejemplo: 'Küme cacha (Buen adorno)' },
  { id: 'c3', espanol: 'Fiesta / Reunión', mapudungun: 'Cahuin', pronunciacion: 'ca-huin', categoria: 'Cultura', ejemplo: 'Kümeke cahuin (Buena reunión)' },
  { id: 'c4', espanol: 'Lago como mar', mapudungun: 'Calafquen', pronunciacion: 'ca-laf-quen', categoria: 'Naturaleza', ejemplo: 'Füta calafquen (Gran lago como mar)' },
  { id: 'c5', espanol: 'Agua azul', mapudungun: 'Calbuco', pronunciacion: 'cal-bu-co', categoria: 'Naturaleza', ejemplo: 'Calbuco ko (Agua azul)' },
  { id: 'c6', espanol: 'Azul', mapudungun: 'Calfu', pronunciacion: 'cal-fu', categoria: 'Colores', ejemplo: 'Calfu wenu (Cielo azul)' },
  { id: 'c7', espanol: 'Aguilucho azul', mapudungun: 'Calfun', pronunciacion: 'cal-fun', categoria: 'Animales', ejemplo: 'Mülen calfun (Hay un aguilucho azul)' },
  { id: 'c8', espanol: 'Puma azul', mapudungun: 'Calfupan', pronunciacion: 'cal-fu-pan', categoria: 'Animales', ejemplo: 'Calfupan mahuida (Cerro del puma azul)' },
  { id: 'c9', espanol: 'Águila grande', mapudungun: 'Calquin', pronunciacion: 'cal-quin', categoria: 'Animales', ejemplo: 'Üñüm calquin (Ave águila grande)' },
  { id: 'c10', espanol: 'Asar', mapudungun: 'Cangcatun', pronunciacion: 'cang-ca-tun', categoria: 'Acciones', ejemplo: 'Cangcatun ilo (Asar carne)' },
  { id: 'c11', espanol: 'Lugar verde', mapudungun: 'Carelhue', pronunciacion: 'ca-rel-hue', categoria: 'Lugares', ejemplo: 'Mülen carelhue meu (Estar en lugar verde)' },
  { id: 'c12', espanol: 'Lago verde', mapudungun: 'Carilafquen', pronunciacion: 'ca-ri-laf-quen', categoria: 'Naturaleza', ejemplo: 'Carilafquen ko (Agua del lago verde)' },
  { id: 'c13', espanol: 'Río verde', mapudungun: 'Carileufu', pronunciacion: 'ca-ri-leu-fu', categoria: 'Naturaleza', ejemplo: 'Pichi carileufu (Pequeño río verde)' },
  { id: 'c14', espanol: 'Piedra pulida dura', mapudungun: 'Caupolican', pronunciacion: 'cau-po-li-can', categoria: 'Cultura', ejemplo: 'Caupolican kura (Piedra dura pulida)' },
  { id: 'c15', espanol: 'Lugar de reunión', mapudungun: 'Caviahue', pronunciacion: 'ca-via-hue', categoria: 'Cultura', ejemplo: 'Caviahue meu (En el lugar de reunión)' },
  { id: 'c16', espanol: 'Seis', mapudungun: 'Cayu', pronunciacion: 'ca-yu', categoria: 'Números', ejemplo: 'Cayu che (Seis personas)' },
  { id: 'c17', espanol: 'Agua / Arroyo', mapudungun: 'Co', pronunciacion: 'co', categoria: 'Naturaleza', ejemplo: 'Pütun co (Beber agua)' },
  { id: 'c18', espanol: 'Nutria salvaje', mapudungun: 'Coipo', pronunciacion: 'coy-po', categoria: 'Animales', ejemplo: 'Coipo leufu (Nutria del río)' },
  { id: 'c19', espanol: 'Color pardo / Moreno', mapudungun: 'Coli', pronunciacion: 'co-li', categoria: 'Colores', ejemplo: 'Coli achawall (Gallina parda)' },
  { id: 'c20', espanol: 'Gato montés', mapudungun: 'Colo Colo', pronunciacion: 'co-lo co-lo', categoria: 'Animales', ejemplo: 'Colo colo mahuida (Gato montés de montaña)' },
  { id: 'c21', espanol: 'Agua colorada', mapudungun: 'Collico', pronunciacion: 'co-lli-co', categoria: 'Naturaleza', ejemplo: 'Collico ko (Agua rojiza)' },
  { id: 'c22', espanol: 'Máscara de piedra', mapudungun: 'Colloncura', pronunciacion: 'co-llon-cu-ra', categoria: 'Cultura', ejemplo: 'Colloncura kura (Máscara de piedra)' },
  { id: 'c23', espanol: 'Lugar de azufre', mapudungun: 'Copahue', pronunciacion: 'co-pa-hue', categoria: 'Naturaleza', ejemplo: 'Copahue mahuida (Volcán de azufre)' },
  { id: 'c24', espanol: 'Flor nacional Mapuche', mapudungun: 'Copihue', pronunciacion: 'co-pi-hue', categoria: 'Naturaleza', ejemplo: 'Lig copihue (Copihue blanco)' },
  { id: 'c25', espanol: 'Arena', mapudungun: 'Corel', pronunciacion: 'co-rel', categoria: 'Naturaleza', ejemplo: 'Corel lafquen (Arena de la playa)' },
  { id: 'c26', espanol: 'Bueno / Rico', mapudungun: 'Cume', pronunciacion: 'cu-me', categoria: 'Expresiones', ejemplo: 'Cume iyaël (Buena comida)' },
  { id: 'c27', espanol: 'Oscuro / Negro', mapudungun: 'Curi', pronunciacion: 'cu-ri', categoria: 'Colores', ejemplo: 'Curi kalshü (Lana negra)' },
  { id: 'c28', espanol: 'Agua oscura', mapudungun: 'Curico', pronunciacion: 'cu-ri-co', categoria: 'Naturaleza', ejemplo: 'Curico leufu (Río de agua oscura)' },
  { id: 'c29', espanol: 'Luna', mapudungun: 'Cuyen', pronunciacion: 'cu-yen', categoria: 'Naturaleza', ejemplo: 'Küme cuyen (Buena luna)' },

  // --- LETRA CH ---
  { id: 'ch1', espanol: 'Arbusto espinoso (Michai)', mapudungun: 'Chacai', pronunciacion: 'cha-cay', categoria: 'Naturaleza', ejemplo: 'Chacai anümka (Planta de chacai)' },
  { id: 'ch2', espanol: 'Saludo de respeto', mapudungun: 'Chacha', pronunciacion: 'cha-cha', categoria: 'Saludos', ejemplo: 'Mari mari chacha (Hola respetado)' },
  { id: 'ch3', espanol: 'Papito / Padre', mapudungun: 'Chachai', pronunciacion: 'cha-chay', categoria: 'Familia', ejemplo: 'Chachai, kümeleimi (Papito, ¿estás bien?)' },
  { id: 'ch4', espanol: 'Sal', mapudungun: 'Chadi', pronunciacion: 'cha-di', categoria: 'Alimentos', ejemplo: 'Pütun chadi (Poner sal)' },
  { id: 'ch5', espanol: 'Encargar / Entregar', mapudungun: 'Chalintecun', pronunciacion: 'cha-lin-te-cun', categoria: 'Acciones', ejemplo: 'Chalintecun dungu (Encargar un asunto)' },
  { id: 'ch6', espanol: 'Aros / Zarcillos', mapudungun: 'Chamay', pronunciacion: 'cha-may', categoria: 'Objetos', ejemplo: 'Küme chamay (Buenos aros)' },
  { id: 'ch7', espanol: 'Gente / Persona', mapudungun: 'Che', pronunciacion: 'che', categoria: 'General', ejemplo: 'Mapuche (Gente de la tierra)' },
  { id: 'ch8', espanol: 'Avestruz / Choique', mapudungun: 'Choique', pronunciacion: 'choy-que', categoria: 'Animales', ejemplo: 'Choique purrun (Danza del avestruz)' },
  { id: 'ch9', espanol: 'Escritura / Carta / Libro', mapudungun: 'Chillca', pronunciacion: 'chill-ca', categoria: 'Objetos', ejemplo: 'Chillcatun (Leer el libro)' },
  { id: 'ch10', espanol: 'Sombrero', mapudungun: 'Chumpiru', pronunciacion: 'chum-pi-ru', categoria: 'Objetos', ejemplo: 'Tukun chumpiru (Ponerse el sombrero)' },
  { id: 'ch11', espanol: 'Robar', mapudungun: 'Chuquin', pronunciacion: 'chu-quin', categoria: 'Acciones', ejemplo: 'Chuquin kelü (Robar algo)' },
  { id: 'ch12', espanol: 'Frío', mapudungun: 'Chuy chuy', pronunciacion: 'chuy chuy', categoria: 'Expresiones', ejemplo: 'Chuy chuy feley (Hace mucho frío)' },

  // --- LETRA D ---
  { id: 'd1', espanol: 'Noticia / Asunto', mapudungun: 'Dengo', pronunciacion: 'den-go', categoria: 'General', ejemplo: 'Küme dengo (Buena noticia)' },
  { id: 'd2', espanol: 'Agua clara', mapudungun: 'Diuco', pronunciacion: 'diu-co', categoria: 'Naturaleza', ejemplo: 'Pütun diuco (Beber agua clara)' },

  // --- LETRA E ---
  { id: 'e1', espanol: 'Tres', mapudungun: 'Ela', pronunciacion: 'e-la', categoria: 'Números', ejemplo: 'Ela che (Tres personas)' },
  { id: 'e2', espanol: 'Cerco / Tapia', mapudungun: 'Elo', pronunciacion: 'e-lo', categoria: 'Lugares', ejemplo: 'Deuma elo (Hacer un cerco)' },
  { id: 'e3', espanol: 'Regar', mapudungun: 'Elpicon', pronunciacion: 'el-pi-con', categoria: 'Acciones', ejemplo: 'Elpicon mapu (Regar la tierra)' },
  { id: 'e4', espanol: 'Enterrar / Sepultar', mapudungun: 'Eltun', pronunciacion: 'el-tun', categoria: 'Acciones', ejemplo: 'Eltun kura (Enterrar la piedra)' },
  { id: 'e5', espanol: 'Entregar / Ceder', mapudungun: 'Elun', pronunciacion: 'e-lun', categoria: 'Acciones', ejemplo: 'Elun ruka (Entregar la casa)' },
  { id: 'e6', espanol: 'Ceniza', mapudungun: 'Entrequen', pronunciacion: 'en-tre-quen', categoria: 'Naturaleza', ejemplo: 'Kütral entrequen (Ceniza de fuego)' },
  { id: 'e7', espanol: 'Dos', mapudungun: 'Epu', pronunciacion: 'e-pu', categoria: 'Números', ejemplo: 'Epu mari (Veinte / Dos dieces)' },

  // --- LETRA F ---
  { id: 'f1', espanol: 'Río grande', mapudungun: 'Futaleufu', pronunciacion: 'fu-ta-leu-fu', categoria: 'Naturaleza', ejemplo: 'Futaleufu leufu (Gran río caudaloso)' },
  { id: 'f2', espanol: 'Lugar de humareda', mapudungun: 'Futrone', pronunciacion: 'fu-tro-ne', categoria: 'Lugares', ejemplo: 'Mülen futrone (Hay humareda)' },

  // --- LETRA G ---
  { id: 'f3', espanol: 'Muchacha joven / Doncella', mapudungun: 'Guaimallen', pronunciacion: 'gwai-ma-llen', categoria: 'Familia', ejemplo: 'Küme guaimallen (Buena muchacha)' },
  { id: 'f4', espanol: 'Isla / Tierra aislada', mapudungun: 'Huapi', pronunciacion: 'hua-pi', categoria: 'Naturaleza', ejemplo: 'Pichi huapi (Isla pequeña)' },
  { id: 'f5', espanol: 'Astuto', mapudungun: 'Gunei', pronunciacion: 'gu-ney', categoria: 'General', ejemplo: 'Gunei che (Persona astuta)' },
  { id: 'f6', espanol: 'Zorro', mapudungun: 'Guru', pronunciacion: 'gu-ru', categoria: 'Animales', ejemplo: 'Guru leufu (Zorro del río)' },

  // --- LETRA H ---
  { id: 'h1', espanol: 'Vaca', mapudungun: 'Huaca', pronunciacion: 'hua-ca', categoria: 'Animales', ejemplo: 'Iyaël huaca (Comida de vaca)' },
  { id: 'h2', espanol: 'Gente nueva / Jóvenes', mapudungun: 'Huechelu', pronunciacion: 'hue-che-lu', categoria: 'General', ejemplo: 'Küme huechelu (Buenos jóvenes)' },
  { id: 'h3', espanol: 'Lugar para nadar', mapudungun: 'Huellelhue', pronunciacion: 'hue-llel-hue', categoria: 'Lugares', ejemplo: 'Amun huellelhue (Ir a nadar)' },
  { id: 'h4', espanol: 'Ciervo andino / Huemul', mapudungun: 'Huemul', pronunciacion: 'hue-mul', categoria: 'Animales', ejemplo: 'Huemul mahuida (Huemul de la montaña)' },
  { id: 'h5', espanol: 'Lo que está alto / Cielo', mapudungun: 'Huenu', pronunciacion: 'hue-nu', categoria: 'Naturaleza', ejemplo: 'Huenu mapu (Tierra de arriba / Cielo)' },
  { id: 'h6', espanol: 'Arco iris', mapudungun: 'Huepil', pronunciacion: 'hue-pil', categoria: 'Naturaleza', ejemplo: 'Pen huepil (Ver el arco iris)' },
  { id: 'h7', espanol: 'Gente del sur', mapudungun: 'Huiliches', pronunciacion: 'hui-li-ches', categoria: 'Cultura', ejemplo: 'Huiliches che (Personas del sur)' },
  { id: 'h8', espanol: 'Extranjero / No mapuche', mapudungun: 'Huinca', pronunciacion: 'huin-ca', categoria: 'General', ejemplo: 'Huinca dungu (Idioma/asunto extranjero)' },

  // --- LETRA I ---
  { id: 'i1', espanol: 'Rodar', mapudungun: 'Imul', pronunciacion: 'i-mul', categoria: 'Acciones', ejemplo: 'Imul kura (Rodar la piedra)' },
  { id: 'i2', espanol: 'Comer', mapudungun: 'In', pronunciacion: 'in', categoria: 'Acciones', ejemplo: 'In iyaël (Comer alimentos)' },

  // --- LETRA K / L ---
  { id: 'k1', espanol: 'Mar / Océano', mapudungun: 'Lafquen', pronunciacion: 'laf-quen', categoria: 'Naturaleza', ejemplo: 'Füta lafquen (Gran mar)' },
  { id: 'k2', espanol: 'Agua medicinal', mapudungun: 'Lahuen co', pronunciacion: 'la-huen co', categoria: 'Naturaleza', ejemplo: 'Pütun lahuen co (Tomar agua medicinal)' },
  { id: 'k3', espanol: 'Luz', mapudungun: 'Lihuen', pronunciacion: 'li-huen', categoria: 'Naturaleza', ejemplo: 'Küme lihuen (Buena luz / Amanecer)' },
  { id: 'k4', espanol: 'Peñasco / Peña', mapudungun: 'Lil', pronunciacion: 'lil', categoria: 'Naturaleza', ejemplo: 'Füta lil (Peñasco grande)' },
  { id: 'k5', espanol: 'Río claro', mapudungun: 'Limay', pronunciacion: 'li-may', categoria: 'Naturaleza', ejemplo: 'Limay leufu (Río de agua clara)' },
  { id: 'k6', espanol: 'Piedra blanca y lisa', mapudungun: 'Liucura', pronunciacion: 'liu-cu-ra', categoria: 'Naturaleza', ejemplo: 'Liucura kura (Piedra blanca suave)' },
  { id: 'k7', espanol: 'Cabeza / Cacique', mapudungun: 'Lonco', pronunciacion: 'lon-co', categoria: 'Cultura', ejemplo: 'Füta lonco (Gran líder)' },

  // --- LETRA M ---
  { id: 'm1', espanol: 'Curandera / Guía espiritual', mapudungun: 'Machi', pronunciacion: 'ma-chi', categoria: 'Cultura', ejemplo: 'Machi ngillatun (Rogativa de la machi)' },
  { id: 'm2', espanol: 'Montaña / Cerro', mapudungun: 'Mahuida', pronunciacion: 'ma-hui-da', categoria: 'Naturaleza', ejemplo: 'Füta mahuida (Gran montaña)' },
  { id: 'm3', espanol: 'Corral', mapudungun: 'Malal', pronunciacion: 'ma-lal', categoria: 'Lugares', ejemplo: 'Malal meu (En el corral)' },
  { id: 'm4', espanol: 'Gente de esta tierra', mapudungun: 'Mapuche', pronunciacion: 'ma-pu-che', categoria: 'Cultura', ejemplo: 'Mapuche che (Persona mapuche)' },
  { id: 'm5', espanol: 'Diez', mapudungun: 'Mari', pronunciacion: 'ma-ri', categoria: 'Números', ejemplo: 'Mari che (Diez personas)' },

  // --- LETRA N / P ---
  { id: 'n1', espanol: 'Jaguar / Puma', mapudungun: 'Nahuel', pronunciacion: 'na-huel', categoria: 'Animales', ejemplo: 'Nahuel mahuida (Cerro del jaguar)' },
  { id: 'n2', espanol: 'Energía / Firmeza', mapudungun: 'Nahuen', pronunciacion: 'na-huen', categoria: 'Expresiones', ejemplo: 'Füta nahuen (Mucha fuerza/energía)' },
  { id: 'n3', espanol: 'Hermano', mapudungun: 'Peñi', pronunciacion: 'pe-ñi', categoria: 'Familia', ejemplo: 'Mari mari peñi (Hola hermano)' },
  { id: 'n4', espanol: 'Pequeño / Chico', mapudungun: 'Pichi', pronunciacion: 'pi-chi', categoria: 'General', ejemplo: 'Pichi che (Niño / Persona pequeña)' },

  // --- LETRA R / T / Y ---
  { id: 'r1', espanol: 'Lugar sagrado', mapudungun: 'Rehue', pronunciacion: 're-hue', categoria: 'Cultura', ejemplo: 'Rehue ngillatun (Ceremonia en el rehue)' },
  { id: 'r2', espanol: 'Estar unidos', mapudungun: 'Trabun', pronunciacion: 'tra-bun', categoria: 'Cultura', ejemplo: 'Füta trabun (Gran encuentro/unión)' },
  { id: 'r3', espanol: 'Esperanza', mapudungun: 'Suyai', pronunciacion: 'su-yay', categoria: 'Expresiones', ejemplo: 'Küme suyai (Buena esperanza)' }
];
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