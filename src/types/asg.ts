export interface Project {
  id: string;
  name: string;
  location: string;
  currentPhase: 'factibilidad' | 'diseño' | 'construccion';
  asgScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  riskLevel: 'bajo' | 'medio' | 'alto';
  startDate: string;
  expectedEndDate: string;
  status: 'planificacion' | 'en_progreso' | 'completado' | 'suspendido';
  projectType: string;
  area: number;
  budget: number;
}

export interface ASGQuestion {
  id: string;
  phase: 'factibilidad' | 'diseño' | 'construccion';
  pillar: 'ambiental' | 'social' | 'gobernanza';
  category: string;
  question: string;
  responseType: 'si_no' | 'escala' | 'texto' | 'fecha' | 'numero' | 'seleccion' | 'si_no_parcial' | 'si_no_cual' | 'escala_riesgo';
  options?: string[];
  weight: number;
  isRequired: boolean;
}

export interface ASGEvaluation {
  id: string;
  projectId: string;
  questionId: string;
  phase: 'factibilidad' | 'diseño' | 'construccion';
  response: any;
  score: number;
  evidence?: string[];
  comments?: string;
  evaluatedBy: string;
  evaluatedAt: string;
  lastUpdated: string;
}

export interface RiskItem {
  id: string;
  projectId: string;
  evaluationId: string;
  riskType: string;
  description: string;
  severity: 'bajo' | 'medio' | 'alto' | 'critico';
  probability: 'baja' | 'media' | 'alta';
  phase: 'factibilidad' | 'diseño' | 'construccion';
  pillar: 'ambiental' | 'social' | 'gobernanza';
  identifiedAt: string;
  status: 'identificado' | 'en_mitigacion' | 'mitigado' | 'cerrado';
}

export interface MitigationPlan {
  id: string;
  riskId: string;
  action: string;
  responsible: string;
  deadline: string;
  budget?: number;
  status: 'planificado' | 'en_progreso' | 'completado' | 'cancelado';
  effectiveness?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectHistory {
  id: string;
  projectId: string;
  action: string;
  description: string;
  performedBy: string;
  timestamp: string;
  metadata?: Record<string, any>;
}