import { ASGEvaluation, Project } from '../types/asg';
import { asgQuestions, phaseWeights, overallWeights } from '../data/asg-questions';

export function calculatePillarScore(
  evaluations: ASGEvaluation[],
  projectId: string,
  phase: 'factibilidad' | 'diseño' | 'construccion',
  pillar: 'ambiental' | 'social' | 'gobernanza'
): number {
  const pillarQuestions = asgQuestions.filter(q => q.phase === phase && q.pillar === pillar);
  const pillarEvaluations = evaluations.filter(e => 
    e.projectId === projectId && 
    pillarQuestions.some(q => q.id === e.questionId)
  );

  if (pillarEvaluations.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  pillarQuestions.forEach(question => {
    const evaluation = pillarEvaluations.find(e => e.questionId === question.id);
    if (evaluation) {
      totalScore += evaluation.score * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
}

export function calculatePhaseScore(
  evaluations: ASGEvaluation[],
  projectId: string,
  phase: 'factibilidad' | 'diseño' | 'construccion'
): number {
  const environmentalScore = calculatePillarScore(evaluations, projectId, phase, 'ambiental');
  const socialScore = calculatePillarScore(evaluations, projectId, phase, 'social');
  const governanceScore = calculatePillarScore(evaluations, projectId, phase, 'gobernanza');

  const weights = phaseWeights[phase];
  
  return Math.round(
    environmentalScore * weights.ambiental +
    socialScore * weights.social +
    governanceScore * weights.gobernanza
  );
}

export function calculateOverallASGScore(
  evaluations: ASGEvaluation[],
  projectId: string
): {
  overall: number;
  environmental: number;
  social: number;
  governance: number;
  byPhase: {
    factibilidad: number;
    diseño: number;
    construccion: number;
  };
} {
  // Calculate scores by phase
  const factibilidadScore = calculatePhaseScore(evaluations, projectId, 'factibilidad');
  const diseñoScore = calculatePhaseScore(evaluations, projectId, 'diseño');
  const construccionScore = calculatePhaseScore(evaluations, projectId, 'construccion');

  // Calculate overall score by phase
  const overallScore = Math.round(
    factibilidadScore * overallWeights.factibilidad +
    diseñoScore * overallWeights.diseño +
    construccionScore * overallWeights.construccion
  );

  // Calculate overall scores by pillar across all phases
  const environmentalScores = [
    calculatePillarScore(evaluations, projectId, 'factibilidad', 'ambiental'),
    calculatePillarScore(evaluations, projectId, 'diseño', 'ambiental'),
    calculatePillarScore(evaluations, projectId, 'construccion', 'ambiental')
  ];

  const socialScores = [
    calculatePillarScore(evaluations, projectId, 'factibilidad', 'social'),
    calculatePillarScore(evaluations, projectId, 'diseño', 'social'),
    calculatePillarScore(evaluations, projectId, 'construccion', 'social')
  ];

  const governanceScores = [
    calculatePillarScore(evaluations, projectId, 'factibilidad', 'gobernanza'),
    calculatePillarScore(evaluations, projectId, 'diseño', 'gobernanza'),
    calculatePillarScore(evaluations, projectId, 'construccion', 'gobernanza')
  ];

  const environmentalOverall = Math.round(
    environmentalScores[0] * overallWeights.factibilidad +
    environmentalScores[1] * overallWeights.diseño +
    environmentalScores[2] * overallWeights.construccion
  );

  const socialOverall = Math.round(
    socialScores[0] * overallWeights.factibilidad +
    socialScores[1] * overallWeights.diseño +
    socialScores[2] * overallWeights.construccion
  );

  const governanceOverall = Math.round(
    governanceScores[0] * overallWeights.factibilidad +
    governanceScores[1] * overallWeights.diseño +
    governanceScores[2] * overallWeights.construccion
  );

  return {
    overall: overallScore,
    environmental: environmentalOverall,
    social: socialOverall,
    governance: governanceOverall,
    byPhase: {
      factibilidad: factibilidadScore,
      diseño: diseñoScore,
      construccion: construccionScore
    }
  };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excelente';
  if (score >= 60) return 'Aceptable';
  return 'Requiere Mejora';
}

export function getRiskLevel(score: number): 'bajo' | 'medio' | 'alto' {
  if (score >= 80) return 'bajo';
  if (score >= 60) return 'medio';
  return 'alto';
}

export function convertResponseToScore(response: any, responseType: string): number {
  switch (responseType) {
    case 'si_no':
      if (response === 'na') return 50; // No aplica = score neutral
      return response === true ? 100 : 0;
    
    case 'si_no_parcial':
      if (response === 'si') return 100;
      if (response === 'parcial') return 50;
      if (response === 'no') return 0;
      return 0;
    
    case 'si_no_cual':
      // Para preguntas tipo "¿Tiene gravamen? SI-NO, ¿cuál?"
      // Si es "si" (tiene gravamen), es negativo = 0 puntos
      // Si es "no" (no tiene gravamen), es positivo = 100 puntos
      if (typeof response === 'object' && response !== null) {
        return response.answer === 'no' ? 100 : 0;
      }
      return response === false || response === 'no' ? 100 : 0;
    
    case 'escala':
      return response * 20; // Assuming 1-5 scale, convert to 0-100
    
    case 'escala_riesgo':
      // Para escala de riesgo: 1=Muy Bajo, 2=Bajo, 3=Moderado, 4=Alto, 5=Muy Alto
      // Invertir la escala: menor riesgo = mayor score
      if (response === 1) return 100; // Muy Bajo riesgo
      if (response === 2) return 80;  // Bajo riesgo  
      if (response === 3) return 60;  // Moderado riesgo
      if (response === 4) return 40;  // Alto riesgo
      if (response === 5) return 20;  // Muy Alto riesgo
      return 50; // Default neutral
    
    case 'texto':
      // Para respuestas de texto, asignar score basado en si está completo
      return response && response.toString().trim().length > 0 ? 100 : 0;
    
    case 'numero':
      return Math.min(100, Math.max(0, response)); // Clamp between 0-100
    
    default:
      return response ? 100 : 0;
  }
}