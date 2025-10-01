import { Project, ASGEvaluation, RiskItem, MitigationPlan, ProjectHistory } from '../types/asg';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Centro Logístico Norte',
    location: 'Bogotá, Cundinamarca',
    currentPhase: 'construccion',
    asgScore: 78,
    environmentalScore: 82,
    socialScore: 75,
    governanceScore: 77,
    riskLevel: 'medio',
    startDate: '2024-01-15',
    expectedEndDate: '2025-06-30',
    status: 'en_progreso',
    projectType: 'Centro de Distribución',
    area: 15000,
    budget: 25000000
  },
  {
    id: '2',
    name: 'Bodega Industrial Zona Franca',
    location: 'Medellín, Antioquia',
    currentPhase: 'diseño',
    asgScore: 85,
    environmentalScore: 88,
    socialScore: 83,
    governanceScore: 84,
    riskLevel: 'bajo',
    startDate: '2024-03-01',
    expectedEndDate: '2025-12-15',
    status: 'en_progreso',
    projectType: 'Bodega Especializada',
    area: 22000,
    budget: 35000000
  },
  {
    id: '3',
    name: 'Complejo Logístico Pacífico',
    location: 'Cali, Valle del Cauca',
    currentPhase: 'factibilidad',
    asgScore: 65,
    environmentalScore: 70,
    socialScore: 58,
    governanceScore: 67,
    riskLevel: 'alto',
    startDate: '2024-06-10',
    expectedEndDate: '2026-04-20',
    status: 'planificacion',
    projectType: 'Hub Logístico',
    area: 45000,
    budget: 65000000
  },
  {
    id: '4',
    name: 'Parque Industrial Sostenible',
    location: 'Barranquilla, Atlántico',
    currentPhase: 'construccion',
    asgScore: 92,
    environmentalScore: 95,
    socialScore: 89,
    governanceScore: 92,
    riskLevel: 'bajo',
    startDate: '2023-09-05',
    expectedEndDate: '2024-11-30',
    status: 'en_progreso',
    projectType: 'Parque Industrial',
    area: 35000,
    budget: 48000000
  }
];

export const mockEvaluations: ASGEvaluation[] = [
  {
    id: '1',
    projectId: '1',
    questionId: 'f1_a1',
    phase: 'factibilidad',
    response: true,
    score: 100,
    evidence: ['estudio_impacto_ambiental.pdf'],
    comments: 'Estudio realizado por consultoría especializada',
    evaluatedBy: 'María González',
    evaluatedAt: '2024-01-20',
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    projectId: '1',
    questionId: 'f1_a2',
    phase: 'factibilidad',
    response: true,
    score: 100,
    evidence: ['analisis_riesgos_climaticos.pdf'],
    comments: 'Evaluación completa de riesgos climáticos',
    evaluatedBy: 'Carlos Rodríguez',
    evaluatedAt: '2024-01-22',
    lastUpdated: '2024-01-22'
  }
];

export const mockRisks: RiskItem[] = [
  {
    id: '1',
    projectId: '3',
    evaluationId: '3',
    riskType: 'Riesgo de Inundación',
    description: 'El terreno se encuentra en zona de riesgo medio de inundación según estudios hidrológicos',
    severity: 'alto',
    probability: 'media',
    phase: 'factibilidad',
    pillar: 'ambiental',
    identifiedAt: '2024-06-15',
    status: 'en_mitigacion'
  },
  {
    id: '2',
    projectId: '3',
    evaluationId: '4',
    riskType: 'Conflicto Social',
    description: 'Posible oposición de comunidades locales al proyecto',
    severity: 'medio',
    probability: 'alta',
    phase: 'factibilidad',
    pillar: 'social',
    identifiedAt: '2024-06-18',
    status: 'identificado'
  },
  {
    id: '3',
    projectId: '1',
    evaluationId: '5',
    riskType: 'Gestión de Residuos',
    description: 'Acumulación excesiva de residuos de construcción',
    severity: 'medio',
    probability: 'baja',
    phase: 'construccion',
    pillar: 'ambiental',
    identifiedAt: '2024-08-10',
    status: 'mitigado'
  }
];

export const mockMitigationPlans: MitigationPlan[] = [
  {
    id: '1',
    riskId: '1',
    action: 'Implementar sistema de drenaje mejorado y elevación de estructuras críticas',
    responsible: 'Ing. Ana Martínez',
    deadline: '2024-09-30',
    budget: 2500000,
    status: 'en_progreso',
    effectiveness: 75,
    createdAt: '2024-06-20',
    updatedAt: '2024-08-15'
  },
  {
    id: '2',
    riskId: '2',
    action: 'Programa de consulta y beneficios comunitarios',
    responsible: 'Dr. Luis Herrera',
    deadline: '2024-12-15',
    budget: 1200000,
    status: 'planificado',
    createdAt: '2024-06-25',
    updatedAt: '2024-06-25'
  },
  {
    id: '3',
    riskId: '3',
    action: 'Plan de gestión integral de residuos con empresa certificada',
    responsible: 'Ing. Patricia Silva',
    deadline: '2024-10-30',
    budget: 800000,
    status: 'completado',
    effectiveness: 95,
    createdAt: '2024-08-12',
    updatedAt: '2024-09-20'
  }
];

export const mockHistory: ProjectHistory[] = [
  {
    id: '1',
    projectId: '1',
    action: 'Creación del Proyecto',
    description: 'Proyecto Centro Logístico Norte creado en el sistema',
    performedBy: 'Sistema',
    timestamp: '2024-01-15T09:00:00Z',
    metadata: { phase: 'factibilidad' }
  },
  {
    id: '2',
    projectId: '1',
    action: 'Evaluación ASG Completada',
    description: 'Completada evaluación de Fase 1 - Factibilidad',
    performedBy: 'María González',
    timestamp: '2024-02-20T14:30:00Z',
    metadata: { phase: 'factibilidad', score: 82 }
  },
  {
    id: '3',
    projectId: '1',
    action: 'Cambio de Fase',
    description: 'Proyecto avanzó de Factibilidad a Diseño',
    performedBy: 'Carlos Rodríguez',
    timestamp: '2024-03-15T11:15:00Z',
    metadata: { fromPhase: 'factibilidad', toPhase: 'diseño' }
  },
  {
    id: '4',
    projectId: '1',
    action: 'Riesgo Identificado',
    description: 'Identificado riesgo de gestión de residuos',
    performedBy: 'Ing. Patricia Silva',
    timestamp: '2024-08-10T16:45:00Z',
    metadata: { riskType: 'Gestión de Residuos', severity: 'medio' }
  }
];