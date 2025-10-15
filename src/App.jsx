import React, { useState, useEffect } from 'react';
import { User, BookOpen, ShieldCheck, AlertTriangle, MessageSquare, Trophy, RotateCcw, CheckCircle, XCircle, ExternalLink, AlertCircle, Download, ArrowLeft, Mail, Calendar, LogOut, CreditCard, Ban, RefreshCw } from 'lucide-react';

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [user, setUser] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [fines, setFines] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showTrafficOfficer, setShowTrafficOfficer] = useState(false);
  const [currentFine, setCurrentFine] = useState(null);
  const [certificateSent, setCertificateSent] = useState(false);
  const [websiteFeedback, setWebsiteFeedback] = useState('');
  const [websiteFeedbackSubmitted, setWebsiteFeedbackSubmitted] = useState(false);
  const [virtualLicense, setVirtualLicense] = useState(null);
  const [licensePenalties, setLicensePenalties] = useState(0);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showLicenseSuspended, setShowLicenseSuspended] = useState(false);
  const [examAttempts, setExamAttempts] = useState(0);
  const [licenseSuspended, setLicenseSuspended] = useState(false);

  // Mock data for traffic regulations
  const trafficRegulations = {
    pedestrians: [
      "Los peatones deben cruzar en los pasos peatonales señalizados",
      "Respetar los semáforos peatonales",
      "No caminar por carriles vehiculares",
      "Caminar por banquetas o aceras cuando estén disponibles",
      "Utilizar puentes peatonales como elementos seguros para atravesar calles de alto tráfico"
    ],
    cyclists: [
      "Usar casco de protección",
      "Circular por carriles exclusivos para bicicletas",
      "Respetar señales de tránsito",
      "No circular por banquetas o aceras",
      "Utilizar luces delanteras y traseras durante la noche",
      "Usar ropa reflectante o colores llamativos para ser visibles"
    ],
    motorcyclists: [
      "Usar casco y chaleco reflectante",
      "No llevar más de un acompañante",
      "Respetar límites de velocidad",
      "No circular entre carriles en movimiento",
      "Tanto el conductor como el acompañante deben contar con equipo de protección completo (casco, chaleco, guantes)"
    ],
    drivers: [
      "Respetar límites de velocidad (40 km/h en zonas escolares, 60 km/h en avenidas principales)",
      "No usar celular mientras se conduce",
      "Ceder el paso a peatones en cruces",
      "Mantener distancia de seguridad"
    ]
  };

  // Common violations in Celaya
  const commonViolations = [
    {
      violation: "Exceso de velocidad en zonas escolares",
      description: "Conducir a más de 40 km/h en áreas cercanas a escuelas",
      regulation: "Artículo 45 del Reglamento de Tránsito Municipal",
      consequence: "Multa de 10 a 20 días de salario mínimo"
    },
    {
      violation: "No respetar señales de alto",
      description: "No realizar detención obligatoria en intersecciones con señal de ALTO",
      regulation: "Artículo 32 del Reglamento de Tránsito Municipal",
      consequence: "Multa de 5 a 15 días de salario mínimo"
    },
    {
      violation: "Uso de celular al volante",
      description: "Manipular dispositivos móviles mientras se conduce",
      regulation: "Artículo 28 del Reglamento de Tránsito Municipal",
      consequence: "Multa de 8 a 12 días de salario mínimo"
    },
    {
      violation: "Estacionamiento en zonas prohibidas",
      description: "Dejar vehículos en pasos peatonales, rampas o zonas exclusivas",
      regulation: "Artículo 51 del Reglamento de Tránsito Municipal",
      consequence: "Multa de 3 a 8 días de salario mínimo y posible arrastre del vehículo"
    },
    {
      violation: "Circular sin casco (motociclistas)",
      description: "Conducir o viajar en motocicleta sin casco de protección",
      regulation: "Artículo 38 del Reglamento de Tránsito Municipal",
      consequence: "Multa de 6 a 10 días de salario mínimo"
    },
    {
      violation: "Cruzar fuera de pasos peatonales",
      description: "Peatones que cruzan calles en lugares no autorizados",
      regulation: "Artículo 62 del Reglamento de Tránsito Municipal",
      consequence: "Amonestación verbal o multa de 1 a 3 días de salario mínimo"
    }
  ];

  // Comprehensive question bank of 50 questions with randomized correct answers and more traffic signs
  const questionBank = [
    {
      question: "¿Qué significa una señal circular roja con una línea blanca diagonal?",
      options: [
        "Prohibido el paso",
        "Fin de prohibición",
        "Prohibido estacionarse",
        "Zona de construcción"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los peatones al cruzar la calle?",
      options: [
        "Cruzar donde les parezca conveniente",
        "Cruzar en pasos peatonales señalizados",
        "Correr para cruzar rápido",
        "Esperar a que no haya carros y cruzar"
      ],
      correct: 1
    },
    {
      question: "¿Cuál es el límite de velocidad en zonas escolares en Celaya?",
      options: [
        "30 km/h",
        "50 km/h",
        "40 km/h",
        "60 km/h"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal triangular con borde rojo y un niño en el centro?",
      options: [
        "Zona escolar",
        "Paso peatonal",
        "Prohibido el paso a menores",
        "Cuidado con niños jugando"
      ],
      correct: 0
    },
    {
      question: "¿Qué deben usar los motociclistas obligatoriamente?",
      options: [
        "Solo casco",
        "Guantes y botas",
        "Casco y chaleco reflectante",
        "Gafas protectoras"
      ],
      correct: 2
    },
    {
      question: "¿Dónde deben circular las bicicletas?",
      options: [
        "Por las banquetas",
        "Por cualquier carril vehicular",
        "Por el centro de la calle",
        "Por carriles exclusivos para bicicletas"
      ],
      correct: 3
    },
    {
      question: "¿Qué significa una señal de 'ALTO'?",
      options: [
        "Reducir velocidad",
        "Ceder el paso",
        "Detención obligatoria",
        "Prohibido estacionarse"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal circular azul con una 'P' blanca?",
      options: [
        "Prohibido estacionarse",
        "Estacionamiento permitido",
        "Paso peatonal",
        "Zona de carga y descarga"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los conductores al ver un paso peatonal?",
      options: [
        "Acelerar para pasar rápido",
        "Tocar la bocina",
        "Ceder el paso a peatones",
        "Ignorar si no hay peatones visibles"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal de 'CEDA EL PASO'?",
      options: [
        "Detención obligatoria",
        "Prohibido estacionarse",
        "Reducir velocidad y ceder el paso",
        "Límite de velocidad"
      ],
      correct: 2
    },
    {
      question: "¿Está permitido usar el celular mientras se conduce?",
      options: [
        "Sí, si es con manos libres",
        "Sí, si es por emergencia",
        "Sí, si se va despacio",
        "No, está prohibido"
      ],
      correct: 3
    },
    {
      question: "¿Qué significa una señal circular roja con una 'P' tachada?",
      options: [
        "Estacionamiento permitido",
        "Prohibido estacionarse",
        "Paso peatonal",
        "Zona escolar"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los ciclistas al llegar a un semáforo en rojo?",
      options: [
        "Ignorarlo si no hay tráfico",
        "Cruzar rápido",
        "Esperar en la banqueta",
        "Detenerse y esperar la luz verde"
      ],
      correct: 3
    },
    {
      question: "¿Cuántos acompañantes pueden llevar los motociclistas?",
      options: [
        "Dos",
        "Tres",
        "Ninguno",
        "Uno"
      ],
      correct: 3
    },
    {
      question: "¿Qué deben hacer los peatones si no hay paso peatonal cercano?",
      options: [
        "Cruzar donde quieran",
        "No cruzar nunca",
        "Buscar el cruce más seguro y visible",
        "Esperar a que alguien los ayude"
      ],
      correct: 2
    },
    {
      question: "¿Qué equipo de protección deben usar tanto el conductor como el acompañante en motocicleta?",
      options: [
        "Solo casco",
        "Chaleco reflectante solamente",
        "Casco, chaleco y guantes",
        "Guantes y botas"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal circular azul con una bicicleta blanca?",
      options: [
        "Prohibido para bicicletas",
        "Paso peatonal",
        "Carril exclusivo para bicicletas",
        "Zona escolar"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben usar los ciclistas durante la noche para ser visibles?",
      options: [
        "Ropa oscura",
        "Casco de color blanco",
        "Chaleco reflectante solamente",
        "Luces delanteras y traseras"
      ],
      correct: 3
    },
    {
      question: "¿Qué infraestructura segura deben utilizar los peatones para atravesar calles de alto tráfico?",
      options: [
        "Cruzar corriendo",
        "Cruzar por en medio de los carros",
        "Puentes peatonales",
        "Esperar a que alguien los ayude"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben usar los ciclistas para ser visibles durante el día?",
      options: [
        "Ropa negra",
        "Casco de color oscuro",
        "Nada especial",
        "Ropa reflectante o colores llamativos"
      ],
      correct: 3
    },
    {
      question: "¿Qué límite de velocidad se aplica en avenidas principales de Celaya?",
      options: [
        "40 km/h",
        "70 km/h",
        "50 km/h",
        "60 km/h"
      ],
      correct: 3
    },
    {
      question: "¿Qué significa una señal octagonal roja?",
      options: [
        "Ceda el paso",
        "Alto",
        "Prohibido estacionarse",
        "Límite de velocidad"
      ],
      correct: 1
    },
    {
      question: "¿Dónde deben caminar los peatones cuando hay banquetas disponibles?",
      options: [
        "Por la calle",
        "Por los carriles vehiculares",
        "Por las banquetas o aceras",
        "Donde les parezca"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los motociclistas al circular entre carriles?",
      options: [
        "Está permitido siempre",
        "Solo si hay mucho tráfico",
        "No está permitido circular entre carriles en movimiento",
        "Solo en avenidas principales"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los conductores al aproximarse a una zona escolar?",
      options: [
        "Mantener la misma velocidad",
        "Acelerar para pasar rápido",
        "Tocar la bocina",
        "Reducir la velocidad a 40 km/h"
      ],
      correct: 3
    },
    {
      question: "¿Qué deben hacer los ciclistas al circular por la noche?",
      options: [
        "No circular nunca",
        "Circular por las banquetas",
        "Usar ropa oscura",
        "Usar luces delanteras y traseras"
      ],
      correct: 3
    },
    {
      question: "¿Qué infracción comete un conductor que no respeta una señal de ALTO?",
      options: [
        "Exceso de velocidad",
        "Uso de celular",
        "No respetar señales de alto",
        "Estacionamiento indebido"
      ],
      correct: 2
    },
    {
      question: "¿Qué consecuencia tiene el exceso de velocidad en zonas escolares?",
      options: [
        "Amonestación verbal",
        "Multa de 10 a 20 días de salario mínimo",
        "Multa de 3 a 8 días de salario mínimo",
        "Ninguna consecuencia"
      ],
      correct: 1
    },
    {
      question: "¿Qué debe hacer un peatón al ver un semáforo peatonal en rojo?",
      options: [
        "Cruzar rápido",
        "Cruzar si no hay carros",
        "Esperar la luz verde",
        "Ignorar el semáforo"
      ],
      correct: 2
    },
    {
      question: "¿Qué artículo del reglamento prohíbe el uso de celular al volante?",
      options: [
        "Artículo 32",
        "Artículo 28",
        "Artículo 38",
        "Artículo 45"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los conductores al ver un paso peatonal sin semáforo?",
      options: [
        "Acelerar",
        "Tocar la bocina",
        "Ignorar si no hay peatones",
        "Ceder el paso a peatones"
      ],
      correct: 3
    },
    {
      question: "¿Qué equipo es obligatorio para motociclistas en Celaya?",
      options: [
        "Solo casco",
        "Chaleco reflectante solamente",
        "Guantes solamente",
        "Casco y chaleco reflectante"
      ],
      correct: 3
    },
    {
      question: "¿Qué deben hacer los ciclistas al llegar a un cruce peatonal?",
      options: [
        "Circular como vehículo",
        "Cruzar rápido",
        "Bajarse y caminar la bicicleta",
        "Ignorar el cruce"
      ],
      correct: 2
    },
    {
      question: "¿Qué consecuencia tiene circular sin casco en motocicleta?",
      options: [
        "Multa de 1 a 3 días",
        "Amonestación verbal",
        "Multa de 6 a 10 días de salario mínimo",
        "Ninguna consecuencia"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los peatones al cruzar fuera de pasos peatonales?",
      options: [
        "Está permitido siempre",
        "Cruzar corriendo",
        "No está permitido",
        "Buscar el cruce más seguro y visible"
      ],
      correct: 3
    },
    {
      question: "¿Qué artículo regula el estacionamiento en zonas prohibidas?",
      options: [
        "Artículo 28",
        "Artículo 51",
        "Artículo 32",
        "Artículo 62"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben mantener los conductores para evitar accidentes?",
      options: [
        "Velocidad máxima",
        "Música alta",
        "Distancia de seguridad",
        "Ventanas abiertas"
      ],
      correct: 2
    },
    {
      question: "¿Qué consecuencia tiene el estacionamiento en zonas prohibidas?",
      options: [
        "Solo multa",
        "Amonestación verbal",
        "Multa y posible arrastre del vehículo",
        "Ninguna consecuencia"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los motociclistas al transportar un acompañante?",
      options: [
        "El acompañante no necesita casco",
        "Solo el conductor necesita casco",
        "El acompañante puede ir de pie",
        "Ambos deben usar equipo de protección completo"
      ],
      correct: 3
    },
    {
      question: "¿Qué significa una señal amarilla con un libro y un niño?",
      options: [
        "Paso peatonal",
        "Zona escolar",
        "Prohibido estacionarse",
        "Límite de velocidad"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los ciclistas al circular por carriles exclusivos?",
      options: [
        "Circular en contra del tráfico",
        "Circular por la banqueta",
        "Respetar las señales de tránsito",
        "Ignorar las señales"
      ],
      correct: 2
    },
    {
      question: "¿Qué infracción cometen los peatones que cruzan fuera de pasos peatonales?",
      options: [
        "Exceso de velocidad",
        "Uso de celular",
        "Cruzar fuera de pasos peatonales",
        "No usar casco"
      ],
      correct: 2
    },
    {
      question: "¿Qué artículo regula las infracciones de peatones?",
      options: [
        "Artículo 28",
        "Artículo 51",
        "Artículo 38",
        "Artículo 62"
      ],
      correct: 3
    },
    {
      question: "¿Qué consecuencia tiene cruzar fuera de pasos peatonales?",
      options: [
        "Multa de 6 a 10 días",
        "Multa de 10 a 20 días",
        "Amonestación verbal o multa de 1 a 3 días",
        "Ninguna consecuencia"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los conductores al ver un semáforo en amarillo?",
      options: [
        "Acelerar para pasar",
        "Ignorar la luz",
        "Detenerse si es posible hacerlo con seguridad",
        "Tocar la bocina"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben usar los motociclistas para ser visibles en la noche?",
      options: [
        "Ropa oscura",
        "Luces de la motocicleta solamente",
        "Chaleco reflectante",
        "Nada especial"
      ],
      correct: 2
    },
    {
      question: "¿Qué deben hacer los peatones al utilizar puentes peatonales?",
      options: [
        "Evitarlos siempre",
        "Usarlos solo si hay policía",
        "Utilizarlos como elementos seguros para atravesar",
        "Ignorarlos"
      ],
      correct: 2
    },
    {
      question: "¿Qué artículo regula el exceso de velocidad en zonas escolares?",
      options: [
        "Artículo 28",
        "Artículo 45",
        "Artículo 32",
        "Artículo 51"
      ],
      correct: 1
    },
    {
      question: "¿Qué deben hacer los ciclistas al transportar carga?",
      options: [
        "Cargar lo que quieran",
        "Circular por la banqueta",
        "Asegurar la carga para no perder el equilibrio",
        "Ignorar las señales"
      ],
      correct: 2
    },
    {
      question: "¿Qué consecuencia tiene el uso de celular al volante?",
      options: [
        "Multa de 1 a 3 días",
        "Multa de 15 a 20 días",
        "Amonestación verbal",
        "Multa de 8 a 12 días de salario mínimo"
      ],
      correct: 3
    },
    {
      question: "¿Qué deben hacer los conductores al ver un motociclista?",
      options: [
        "Acelerar para adelantar",
        "Tocar la bocina",
        "Ignorar al motociclista",
        "Mantener distancia de seguridad"
      ],
      correct: 3
    },
    {
      question: "¿Qué deben hacer los peatones al caminar por la noche?",
      options: [
        "Usar ropa oscura",
        "Caminar por la calle",
        "Usar ropa clara o reflectante",
        "Ignorar las señales"
      ],
      correct: 2
    },
    {
      question: "¿Qué artículo regula las señales de ALTO?",
      options: [
        "Artículo 38",
        "Artículo 45",
        "Artículo 32",
        "Artículo 28"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal circular azul con una 'R' blanca?",
      options: [
        "Prohibido retroceder",
        "Reducción de velocidad",
        "Ruta alternativa",
        "Rotonda"
      ],
      correct: 3
    },
    {
      question: "¿Qué color tiene la señal de 'PROHIBIDO ESTACIONARSE'?",
      options: [
        "Roja con borde blanco",
        "Azul con letra blanca",
        "Blanca con borde rojo y una 'P' tachada",
        "Amarilla con símbolo negro"
      ],
      correct: 2
    },
    {
      question: "¿Qué forma tiene la señal de 'ALTO'?",
      options: [
        "Circular",
        "Triangular",
        "Octagonal",
        "Rectangular"
      ],
      correct: 2
    },
    {
      question: "¿Qué significa una señal triangular con borde rojo y dos curvas?",
      options: [
        "Curvas peligrosas",
        "Zona de construcción",
        "Prohibido girar",
        "Cruce de ferrocarril"
      ],
      correct: 0
    }
  ];

  // Accident news from 2015 to 2025
  const accidentNews = [
    {
      title: "Accidente fatal en Boulevard Adolfo López Mateos",
      content: "Un choque frontal entre dos vehículos dejó un saldo de 2 personas fallecidas y 3 heridas. El conductor del vehículo responsable no respetó el semáforo en rojo.",
      date: "15 de marzo de 2024",
      year: 2024
    },
    {
      title: "Peatón atropellado en zona escolar",
      content: "Un estudiante fue atropellado frente a la escuela secundaria mientras cruzaba fuera del paso peatonal. El conductor no redujo la velocidad en zona escolar.",
      date: "22 de febrero de 2024",
      year: 2024
    },
    {
      title: "Motociclista sin casco sufre lesiones graves",
      content: "Un joven motociclista sufrió lesiones graves tras caer de su vehículo. No utilizaba casco de protección como lo establece el reglamento vial.",
      date: "8 de marzo de 2024",
      year: 2024
    },
    {
      title: "Accidente por uso de celular al volante",
      content: "Choque múltiple en el centro de Celaya causado por conductor que utilizaba su teléfono móvil mientras conducía.",
      date: "1 de marzo de 2024",
      year: 2024
    },
    {
      title: "Colisión en cruce peatonal de Avenida Juárez",
      content: "Vehículo no cedió el paso a peatones en cruce señalizado, resultando en dos personas heridas. El conductor alegó no haber visto a los peatones.",
      date: "12 de noviembre de 2023",
      year: 2023
    },
    {
      title: "Accidente en puente peatonal de la Central de Abastos",
      content: "Peatón intentó cruzar por la calle en lugar de usar el puente peatonal disponible, siendo atropellado por vehículo que circulaba a exceso de velocidad.",
      date: "5 de septiembre de 2023",
      year: 2023
    },
    {
      title: "Choque en zona escolar afecta a 5 estudiantes",
      content: "Conductor que no respetó límite de velocidad en zona escolar impactó contra grupo de estudiantes que salían de clases.",
      date: "18 de mayo de 2022",
      year: 2022
    },
    {
      title: "Accidente de tránsito en Boulevard José María Morelos",
      content: "Motociclista sin equipo de protección chocó contra vehículo que giraba a la izquierda. El motociclista sufrió fracturas múltiples.",
      date: "30 de julio de 2021",
      year: 2021
    },
    {
      title: "Fatal accidente en carretera Celaya-Salamanca",
      content: "Conductor bajo los efectos del alcohol perdió el control de su vehículo, impactando contra un árbol. Dos personas fallecieron en el lugar.",
      date: "14 de febrero de 2020",
      year: 2020
    },
    {
      title: "Accidente en cruce de Ferrocarril",
      content: "Vehículo ignoró las señales de advertencia del paso a nivel, siendo impactado por tren de carga. Milagrosamente no hubo víctimas fatales.",
      date: "22 de octubre de 2019",
      year: 2019
    },
    {
      title: "Colisión múltiple en Glorieta de la Cruz",
      content: "Cinco vehículos involucrados en accidente debido a exceso de velocidad y no respetar señales de tránsito en glorieta.",
      date: "7 de junio de 2018",
      year: 2018
    },
    {
      title: "Atropellamiento en Parque Principal",
      content: "Adulto mayor atropellado mientras cruzaba fuera de paso peatonal. El conductor no pudo frenar a tiempo debido a la velocidad.",
      date: "19 de abril de 2017",
      year: 2017
    },
    {
      title: "Accidente en zona industrial de Santa Rosa",
      content: "Choque entre camión de carga y automóvil particular. El conductor del automóvil intentó rebasar en zona prohibida.",
      date: "3 de agosto de 2016",
      year: 2016
    },
    {
      title: "Fatal accidente en Boulevard Miguel Hidalgo",
      content: "Joven conductor perdió la vida tras impactar contra poste de luz. No utilizaba cinturón de seguridad y conducía a exceso de velocidad.",
      date: "25 de enero de 2015",
      year: 2015
    }
  ];

  const handleRegistration = (name, email) => {
    setUser({ name, email });
    setCurrentSection(1);
  };

  const handleQuizAnswer = (questionIndex, selectedOption) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = selectedOption;
    setQuizAnswers(newAnswers);

    // Get the current question from the current quiz array
    const currentQuestion = currentQuiz[questionIndex];
    
    if (selectedOption !== currentQuestion.correct) {
      const newFine = {
        id: fines.length + 1,
        question: currentQuestion.question,
        correctAnswer: currentQuestion.options[currentQuestion.correct],
        userAnswer: currentQuestion.options[selectedOption]
      };
      setFines([...fines, newFine]);
      setCurrentFine(newFine);
      
      // Update license penalties
      const newPenalties = licensePenalties + 1;
      setLicensePenalties(newPenalties);
      
      if (newPenalties === 1) {
        // First penalty - show warning
        setShowTrafficOfficer(true);
        setTimeout(() => {
          setShowTrafficOfficer(false);
        }, 4000);
      } else if (newPenalties >= 2) {
        // Second penalty - suspend license
        setLicenseSuspended(true);
        setShowLicenseSuspended(true);
        setTimeout(() => {
          setShowLicenseSuspended(false);
        }, 5000);
      }
    }
  };

  const generateRandomQuiz = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const startNewQuiz = () => {
    const newQuiz = generateRandomQuiz();
    setCurrentQuiz(newQuiz);
    setQuizAnswers(new Array(5).fill(undefined));
    setFines([]);
    setQuizStarted(true);
    setShowResults(false);
    setShowTrafficOfficer(false);
    setShowLicenseSuspended(false);
    
    // Generate or update virtual license
    const newLicense = {
      id: virtualLicense?.id || Math.floor(Math.random() * 1000000),
      name: user?.name,
      issueDate: new Date().toLocaleDateString('es-MX'),
      status: licenseSuspended ? 'REACTIVADA' : 'ACTIVA'
    };
    setVirtualLicense(newLicense);
    setLicensePenalties(0);
    setLicenseSuspended(false);
    setExamAttempts(examAttempts + 1);
  };

  const checkQuizCompletion = () => {
    if (quizAnswers.length === currentQuiz.length && quizAnswers.every(answer => answer !== undefined)) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (quizAnswers.length > 0 && quizAnswers.every(answer => answer !== undefined)) {
      checkQuizCompletion();
    }
  }, [quizAnswers]);

  const generateRandomNews = () => {
    const randomIndex = Math.floor(Math.random() * accidentNews.length);
    return accidentNews[randomIndex];
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real application, this would send the feedback to a server
    console.log('Feedback submitted:', feedback);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setFeedback('');
    }, 3000);
  };

  const handleWebsiteFeedbackSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the feedback to a server
    console.log('Website feedback submitted:', websiteFeedback);
    setWebsiteFeedbackSubmitted(true);
    setTimeout(() => {
      setWebsiteFeedbackSubmitted(false);
      setWebsiteFeedback('');
    }, 3000);
  };

  const sendCertificateByEmail = () => {
    // Simulate sending email (in a real app, this would call an API)
    if (user?.email) {
      setCertificateSent(true);
      // In a real implementation, you would send the certificate to the user's email
      console.log(`Certificate would be sent to: ${user.email}`);
      setTimeout(() => {
        setCertificateSent(false);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentSection(0);
    setQuizAnswers([]);
    setFines([]);
    setShowCertificate(false);
    setFeedback('');
    setWebsiteFeedback('');
    setCurrentQuiz([]);
    setQuizStarted(false);
    setShowResults(false);
    setShowTrafficOfficer(false);
    setCurrentFine(null);
    setCertificateSent(false);
    setSubmittedFeedback(false);
    setWebsiteFeedbackSubmitted(false);
    setVirtualLicense(null);
    setLicensePenalties(0);
    setShowLicenseModal(false);
    setShowLicenseSuspended(false);
    setExamAttempts(0);
    setLicenseSuspended(false);
  };

  // Registration Section
  const RegistrationSection = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Registro de Estudiante</h2>
        <p className="text-gray-600">Ingresa tus datos para comenzar tu formación vial</p>
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleRegistration(formData.get('name'), formData.get('email'));
      }} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Ej: Juan Pérez García"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="ejemplo@escuela.edu.mx"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition transform hover:scale-105"
        >
          Registrarse y Comenzar
        </button>
      </form>
    </div>
  );

  // Study Section (Green Light)
  const StudySection = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Estudio del Reglamento Vial</h2>
        <p className="text-gray-600">Aprende las normas viales del municipio de Celaya, Guanajuato</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Responsabilidades por Rol</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Peatones</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {trafficRegulations.pedestrians.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Ciclistas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {trafficRegulations.cyclists.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Normas Generales</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Motociclistas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {trafficRegulations.motorcyclists.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Conductores</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {trafficRegulations.drivers.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Signs Section with Official Link */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ExternalLink className="w-5 h-5 text-blue-600 mr-2" />
          Señales de Tránsito Oficiales
        </h3>
        <p className="text-gray-600 mb-4">
          Para visualizar las señales de tránsito oficiales con imágenes claras y detalladas, 
          te recomendamos consultar los siguientes recursos oficiales:
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Secretaría de Movilidad del Estado de Guanajuato</h4>
            <p className="text-sm text-gray-600 mb-2">Portal oficial con información sobre señales de tránsito y reglamentos estatales.</p>
            <code className="text-xs bg-gray-100 p-2 rounded block">https://movilidad.guanajuato.gob.mx</code>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Manual de Señalamientos de Tránsito</h4>
            <p className="text-sm text-gray-600 mb-2">Documento oficial de la Secretaría de Comunicaciones y Transportes (SCT) con todas las señales de tránsito reconocidas en México.</p>
            <code className="text-xs bg-gray-100 p-2 rounded block">https://www.gob.mx/sct</code>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Reglamento de Tránsito Municipal de Celaya</h4>
            <p className="text-sm text-gray-600">Consulta el reglamento completo del municipio de Celaya en la página oficial del Ayuntamiento.</p>
            <code className="text-xs bg-gray-100 p-2 rounded block">https://www.celaya.gob.mx/tramites-y-servicios/transito</code>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          <strong>Nota:</strong> Copia y pega las URLs en tu navegador para acceder a los recursos oficiales.
        </p>
      </div>

      {/* Common Violations Section */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          Infracciones Más Comunes en Celaya
        </h3>
        <div className="space-y-4">
          {commonViolations.map((violation, index) => (
            <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
              <h4 className="font-bold text-red-700 mb-1">{violation.violation}</h4>
              <p className="text-sm text-gray-600 mb-2">{violation.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold text-gray-700">Reglamento:</span> {violation.regulation}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Consecuencia:</span> {violation.consequence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentSection(2)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105"
        >
          Ir al Examen Práctico
        </button>
      </div>
    </div>
  );

  // Traffic Officer Modal
  const TrafficOfficerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Infracción Detectada!</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Pregunta:</strong> {currentFine?.question}
          </p>
          <p className="text-sm text-red-600">
            <strong>Tu respuesta:</strong> {currentFine?.userAnswer}
          </p>
          <p className="text-sm text-green-600">
            <strong>Respuesta correcta:</strong> {currentFine?.correctAnswer}
          </p>
        </div>
        <p className="text-gray-600 mb-4">
          Se ha registrado una penalización en tu licencia virtual. 
          ¡Ten más cuidado en tus respuestas!
        </p>
        <div className="text-red-600 font-semibold">
          Penalizaciones: {licensePenalties}/2
        </div>
      </div>
    </div>
  );

  // License Suspended Modal
  const LicenseSuspendedModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ban className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Licencia Virtual Suspendida!</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Has acumulado 2 penalizaciones en tu examen.
          </p>
          <p className="text-sm text-red-600">
            Tu licencia virtual ha sido suspendida.
          </p>
        </div>
        <p className="text-gray-600 mb-4">
          Puedes regresar a estudiar y luego intentar nuevamente el examen. 
          Tu licencia será reactivada para tu próximo intento.
        </p>
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <RefreshCw className="w-5 h-5" />
          <span className="font-semibold">Licencia suspendida temporalmente</span>
        </div>
      </div>
    </div>
  );

  // Virtual License Modal
  const VirtualLicenseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Licencia Virtual de Conducción</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Nombre:</strong> {virtualLicense?.name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Número:</strong> LV-{virtualLicense?.id}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Fecha de emisión:</strong> {virtualLicense?.issueDate}
            </p>
            <p className={`text-sm font-semibold ${virtualLicense?.status === 'ACTIVA' || virtualLicense?.status === 'REACTIVADA' ? 'text-green-600' : 'text-red-600'}`}>
              <strong>Estado:</strong> {virtualLicense?.status}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Penalizaciones:</strong> {licensePenalties}/2
            </p>
            {examAttempts > 1 && (
              <p className="text-sm text-orange-600 mt-2">
                <strong>Intento #{examAttempts}</strong>
              </p>
            )}
          </div>
          <button
            onClick={() => setShowLicenseModal(false)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  // Quiz Section (Yellow Light)
  const QuizSection = () => {
    const currentQuestionIndex = quizAnswers.findIndex(answer => answer === undefined);
    const currentQuestion = currentQuestionIndex !== -1 && quizStarted ? currentQuiz[currentQuestionIndex] : null;
    const quizCompleted = quizAnswers.every(answer => answer !== undefined);

    return (
      <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Examen Práctico de Conducción</h2>
          <p className="text-gray-600">Responde correctamente las 5 preguntas para obtener tu constancia</p>
          
          {/* Virtual License Info */}
          {virtualLicense && (
            <div className="mt-4 bg-white rounded-lg p-3 inline-block">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Licencia: LV-{virtualLicense.id} | Penalizaciones: {licensePenalties}/2
                </span>
                {examAttempts > 1 && (
                  <span className="text-sm text-orange-600 ml-2">
                    Intento #{examAttempts}
                  </span>
                )}
                <button
                  onClick={() => setShowLicenseModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Ver licencia
                </button>
              </div>
            </div>
          )}
        </div>

        {!quizStarted ? (
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="mb-6">
                <ShieldCheck className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Listo para tu examen?</h3>
                <p className="text-gray-600 mb-6">
                  Se te presentarán 5 preguntas aleatorias basadas en el reglamento vial que estudiaste. 
                  Debes responder todas correctamente para aprobar.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Sistema de Licencia Virtual</h4>
                  <p className="text-sm text-gray-600">
                    • Al comenzar el examen, recibirás una licencia virtual<br/>
                    • Primer error: Se registra una penalización<br/>
                    • Segundo error: Licencia suspendida, debes regresar a estudiar<br/>
                    • Cero errores: ¡Aprobado! Obtienes tu constancia
                  </p>
                </div>
                {licenseSuspended && (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mb-4">
                    <p className="text-sm text-orange-700 font-semibold">
                      ⚠️ Tu licencia fue suspendida anteriormente. 
                      Este es tu intento #{examAttempts + 1}. ¡Ten más cuidado!
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={startNewQuiz}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition transform hover:scale-105"
              >
                {licenseSuspended ? 'Reintentar Examen' : 'Comenzar Examen'}
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{currentQuestionIndex + 1}/5</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleQuizAnswer(currentQuestionIndex, optionIndex)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition hover:border-blue-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : showResults && (
          <div className="text-center mt-8">
            {fines.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">¡Excelente trabajo!</h3>
                <p className="text-green-600 mb-4">Has aprobado el examen con todas las respuestas correctas.</p>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Ver Constancia
                  </button>
                  <button
                    onClick={() => setCurrentSection(3)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105"
                  >
                    Ir a Concientización
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Necesitas estudiar más</h3>
                <p className="text-red-600 mb-4">Has cometido {fines.length} errores. Debes regresar a estudiar.</p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-700 mb-2">Errores cometidos:</h4>
                  {fines.map((fine, index) => (
                    <div key={index} className="text-sm text-gray-600 mb-2">
                      <strong>Pregunta:</strong> {fine.question}<br/>
                      <strong>Tu respuesta:</strong> {fine.userAnswer}<br/>
                      <strong>Respuesta correcta:</strong> {fine.correctAnswer}
                    </div>
                  ))}
                </div>
                <button
                  onClick={startNewQuiz}
                  className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition transform hover:scale-105"
                >
                  Intentar de Nuevo
                </button>
              </div>
            )}
          </div>
        )}

        {showCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Constancia de Ciudadano Responsable</h3>
                <p className="text-gray-600 mb-4">Certificamos que {user?.name} ha aprobado satisfactoriamente el curso de Reglamento Vial del municipio de Celaya, Guanajuato.</p>
                <p className="text-sm text-gray-500 mb-4">Fecha: {new Date().toLocaleDateString('es-MX')}</p>
                <div className="space-y-3">
                  <button
                    onClick={sendCertificateByEmail}
                    className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 w-full justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar por Correo Electrónico
                  </button>
                  {certificateSent && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                      ¡Constancia enviada a {user?.email}! Por favor revisa tu bandeja de entrada y spam.
                    </div>
                  )}
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition transform hover:scale-105 w-full"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showTrafficOfficer && <TrafficOfficerModal />}
        {showLicenseSuspended && <LicenseSuspendedModal />}
        {showLicenseModal && <VirtualLicenseModal />}
      </div>
    );
  };

  // Awareness Section (Red Light)
  const AwarenessSection = () => {
    const [currentNews, setCurrentNews] = useState(null);

    const handleShowNews = () => {
      setCurrentNews(generateRandomNews());
    };

    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Concientización y Participación</h2>
          <p className="text-gray-600">Conoce las consecuencias de no seguir el reglamento vial y sé parte de la solución</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Índices de Accidentes y Noticias (2015-2025)
            </h3>
            <p className="text-gray-600 mb-4">
              Conoce las historias reales que podrían evitarse con una mejor cultura vial en nuestra comunidad.
            </p>
            <button
              onClick={handleShowNews}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition transform hover:scale-105 mb-4"
            >
              Generar Noticia Aleatoria
            </button>
            
            {currentNews && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-xs font-semibold text-red-700">{currentNews.date}</span>
                </div>
                <h4 className="font-bold text-red-700 mb-2">{currentNews.title}</h4>
                <p className="text-sm text-gray-600">{currentNews.content}</p>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Estadísticas de Accidentes (2015-2024)</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Promedio anual de accidentes en Celaya: 1,200</p>
                <p>• Accidentes por exceso de velocidad: 45%</p>
                <p>• Accidentes por distracción al volante: 30%</p>
                <p>• Accidentes con peatones: 15%</p>
                <p>• Accidentes con motociclistas: 10%</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                Tu Voz Importa
              </h3>
              <p className="text-gray-600 mb-4">
                Comparte tus ideas y opiniones para mejorar la situación vial en Celaya. ¡Tú puedes ser parte del cambio!
              </p>
              
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Escribe tus ideas, sugerencias o propuestas para mejorar la cultura vial en nuestra comunidad..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submittedFeedback}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 transform hover:scale-105"
                >
                  {submittedFeedback ? '¡Gracias por tu aportación!' : 'Enviar Propuesta'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 text-green-500 mr-2" />
                Opinión sobre esta Plataforma
              </h3>
              <p className="text-gray-600 mb-4">
                Nos interesa conocer tu experiencia con esta plataforma educativa. Tu retroalimentación nos ayudará a mejorar.
              </p>
              
              <form onSubmit={handleWebsiteFeedbackSubmit} className="space-y-4">
                <textarea
                  value={websiteFeedback}
                  onChange={(e) => setWebsiteFeedback(e.target.value)}
                  placeholder="¿Qué te pareció la plataforma? ¿Qué mejorarías? ¿Fue útil para tu aprendizaje?"
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={websiteFeedbackSubmitted}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 transform hover:scale-105"
                >
                  {websiteFeedbackSubmitted ? '¡Gracias por tu opinión!' : 'Enviar Opinión'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white">
          <h3 className="text-xl font-bold mb-2">¡Tú eres la solución!</h3>
          <p className="text-white/90">
            En lugar de buscar culpables, seamos parte activa del cambio que queremos ver en nuestras calles.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">El-Lu-No TECH</h1>
              <p className="text-gray-600">Inteligencia Artificial para el Desarrollo Didáctico</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Municipio de Celaya, Guanajuato</p>
              <p className="text-sm font-semibold text-blue-600">Nivel Medio Superior</p>
            </div>
          </div>
        </div>
      </header>

      {/* Traffic Light Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                currentSection >= 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => user && setCurrentSection(1)}
            >
              {currentSection >= 1 && <BookOpen className="w-8 h-8 text-white" />}
            </div>
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                currentSection >= 2 ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              onClick={() => user && currentSection >= 1 && setCurrentSection(2)}
            >
              {currentSection >= 2 && <ShieldCheck className="w-8 h-8 text-white" />}
            </div>
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                currentSection >= 3 ? 'bg-red-500' : 'bg-gray-300'
              }`}
              onClick={() => user && currentSection >= 2 && setCurrentSection(3)}
            >
              {currentSection >= 3 && <AlertTriangle className="w-8 h-8 text-white" />}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!user ? (
            <RegistrationSection />
          ) : currentSection === 1 ? (
            <StudySection />
          ) : currentSection === 2 ? (
            <QuizSection />
          ) : (
            <AwarenessSection />
          )}
        </div>

        {/* Logout Button */}
        {user && (
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir y regresar al registro
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">El-Lu-No TECH - Celaya, Guanajuato</p>
          <p className="text-sm text-gray-400 mt-4">
            "La educación vial no es solo una materia, es una responsabilidad compartida para construir una comunidad más segura"
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <strong>Nota:</strong> Los comentarios y opiniones se almacenan temporalmente en esta demostración. 
            En una implementación real, se enviarían a un servidor para su revisión por parte del equipo docente.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
