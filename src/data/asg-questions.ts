import { ASGQuestion } from '../types/asg';

export const asgQuestions: ASGQuestion[] = [
  // ============ PREGUNTAS GENERALES DEL PROYECTO ============
  
  // Información Básica
  {
    id: 'info_1',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'Cronograma (tiempo estimado del proyecto)',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_2',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'Área total (m2)',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_3',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'Precio del Terreno',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_4',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'Proyección retorno de inversión',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_5',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'Cap Rate',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_6',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'IPC',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_7',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'TRM',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_8',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'DTF',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },
  {
    id: 'info_9',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Información del Proyecto',
    question: 'IBR',
    responseType: 'texto',
    weight: 0.05,
    isRequired: true
  },

  // ============ PREGUNTAS TÉCNICAS Y DE ESTUDIOS ============

  // Estudios y Documentación Técnica
  {
    id: 'tech_1',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Estudios Técnicos',
    question: '¿El proyecto cuenta con un estudio topográfico actualizado y validado por Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_2',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Estudios Técnicos',
    question: '¿Se tiene evidencia que el estudio topográfico se generó en área exacta del Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_3',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Estudios Técnicos',
    question: '¿Existe un estudio de suelos que garantice la viabilidad y seguridad de la Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_4',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Estudios Técnicos',
    question: '¿Se cuenta con confirmación de disponibilidad de agua, energía y gas en Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_5',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Diseño Técnico',
    question: '¿El proyecto dispone de licencia constructiva en condiciones adecuadas y buena Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_6',
    phase: 'diseño',
    pillar: 'ambiental',
    category: 'Diseño Técnico',
    question: '¿Se han identificado y evaluado los riesgos de construcción asociados al Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_7',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Diseño Técnico',
    question: '¿Se ha verificado la ubicación de la volumetría y su aptitud para soportar el Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_8',
    phase: 'diseño',
    pillar: 'ambiental',
    category: 'Diseño Técnico',
    question: '¿El diseño técnico contempla urbanismo, arquitectura, trazado vial, sisten Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_9',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Presupuesto',
    question: '¿El proyecto cuenta con un presupuesto detallado y validado para su de Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_10',
    phase: 'construccion',
    pillar: 'gobernanza',
    category: 'Cronograma',
    question: '¿Se tiene una estimación clara y real de los tiempos del proyecto? Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },
  {
    id: 'tech_11',
    phase: 'construccion',
    pillar: 'ambiental',
    category: 'Ejecución',
    question: '¿Se dispone de un plan o ejecución de cerramiento perimetral para el p Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.15,
    isRequired: true
  },

  // ============ NORMATIVA Y CUMPLIMIENTO ============
  
  // Normativa
  {
    id: 'norm_1',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Normativa',
    question: '¿El proyecto incluye medidas de seguridad física y ciberseguridad en todas su Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_2',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Normativa',
    question: 'en la normativa local? Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_3',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Normativa',
    question: 'plan de ordenamiento territorial? Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_4',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Normativa',
    question: 'urbanística aplicable? Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_5',
    phase: 'construccion',
    pillar: 'gobernanza',
    category: 'Normativa',
    question: 'normativa? Sí - No - Parcial (Observación)',
    responseType: 'si_no_parcial',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_6',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Estudios de Títulos',
    question: '¿El inmueble cuenta con un estudio de títulos? SI-NO',
    responseType: 'si_no',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_7',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Estudios de Títulos',
    question: '¿El inmueble tiene algún gravamen? SI-NO, ¿cuál?',
    responseType: 'si_no_cual',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'norm_8',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Estudios de Títulos',
    question: '¿El inmueble tiene alguna limitación a la propiedad? SI-NO, ¿cuál?',
    responseType: 'si_no_cual',
    weight: 0.1,
    isRequired: true
  },

  // ============ ASPECTOS LEGALES Y FINANCIEROS ============

  // Aspectos Legales
  {
    id: 'legal_1',
    phase: 'factibilidad',
    pillar: 'social',
    category: 'Aspectos Legales',
    question: '¿La sociedad o el representante legal tienen alguna restricción legal para la adquisición o firma de los contratos relacionados con el inmueble? SI-NO, ¿cuál?',
    responseType: 'si_no_cual',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'legal_2',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Aspectos Legales',
    question: '¿Cuál es el vehículo jurídico de adquisición seleccionado?',
    responseType: 'texto',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'legal_3',
    phase: 'diseño',
    pillar: 'gobernanza',
    category: 'Aspectos Legales',
    question: '¿El propietario del inmueble cuenta con un estudio de debida diligencia? SI-NO',
    responseType: 'si_no',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'legal_4',
    phase: 'construccion',
    pillar: 'gobernanza',
    category: 'Aspectos Legales',
    question: 'El inmueble se encuentra al día en el pago del impuesto predial y demás que le apliquen SI-NO',
    responseType: 'si_no',
    weight: 0.1,
    isRequired: true
  },
  {
    id: 'legal_5',
    phase: 'construccion',
    pillar: 'gobernanza',
    category: 'Aspectos Legales',
    question: '¿El inmueble cuenta con declaración de construcción? SI-NO',
    responseType: 'si_no',
    weight: 0.1,
    isRequired: true
  },

  // ============ ANÁLISIS ECONÓMICO ============

  // Factores Económicos
  {
    id: 'econ_1',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Análisis Económico',
    question: '¿Qué factores económicos nacionales han sido analizados (crecimiento, inversión, políticas públicas que impactan en el proyecto?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },
  {
    id: 'econ_2',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Análisis Económico',
    question: '¿Qué condiciones o tendencias internacionales se han considerado y de qué manera pueden afectar el desarrollo del proyecto?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },
  {
    id: 'econ_3',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Análisis Económico',
    question: '¿Qué hallazgos principales se obtuvieron del estudio de mercado en relación a la demanda, oferta y competencia en el sector?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },
  {
    id: 'econ_4',
    phase: 'factibilidad',
    pillar: 'social',
    category: 'Análisis Económico',
    question: '¿Qué clusters económicos o industriales existen en la región y cómo se relacionan con el proyecto?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },
  {
    id: 'econ_5',
    phase: 'factibilidad',
    pillar: 'social',
    category: 'Análisis Económico',
    question: '¿Quiénes son los clientes potenciales identificados para la Zona Franca y qué necesidades específicas presentan?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },
  {
    id: 'econ_6',
    phase: 'factibilidad',
    pillar: 'gobernanza',
    category: 'Análisis Económico',
    question: '¿Cuál es la propuesta de valor definida para atraer a los clientes y en qué se diferencia de la competencia?',
    responseType: 'texto',
    weight: 0.12,
    isRequired: true
  },

  // ============ EVALUACIÓN DE RIESGOS ASG ============

  // Riesgos Ambientales
  {
    id: 'risk_amb_1',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Riesgos Ambientales',
    question: 'Riesgo por Huella de carbono y emisiones del proyecto',
    responseType: 'escala_riesgo',
    weight: 0.2,
    isRequired: true
  },
  {
    id: 'risk_amb_2',
    phase: 'factibilidad',
    pillar: 'ambiental',
    category: 'Riesgos Ambientales',
    question: 'Riesgo de Contaminación del Suelo y Agua',
    responseType: 'escala_riesgo',
    weight: 0.2,
    isRequired: true
  },
  {
    id: 'risk_amb_3',
    phase: 'diseño',
    pillar: 'ambiental',
    category: 'Riesgos Ambientales',
    question: 'Riesgo de cambio climático y desastres naturales',
    responseType: 'escala_riesgo',
    weight: 0.2,
    isRequired: true
  },

  // Riesgos Sociales
  {
    id: 'risk_soc_1',
    phase: 'factibilidad',
    pillar: 'social',
    category: 'Riesgos Sociales',
    question: 'Riesgo de Impacto en la Comunidad Local',
    responseType: 'escala_riesgo',
    weight: 0.2,
    isRequired: true
  },
  {
    id: 'risk_soc_2',
    phase: 'diseño',
    pillar: 'social',
    category: 'Riesgos Sociales',
    question: 'Riesgo de Acceso a Servicios Básicos',
    responseType: 'escala_riesgo',
    weight: 0.2,
    isRequired: true
  }
];

export const phaseWeights = {
  factibilidad: { ambiental: 0.4, social: 0.3, gobernanza: 0.3 },
  diseño: { ambiental: 0.4, social: 0.3, gobernanza: 0.3 },
  construccion: { ambiental: 0.35, social: 0.35, gobernanza: 0.3 }
};

export const overallWeights = {
  factibilidad: 0.3,
  diseño: 0.3,
  construccion: 0.4
};