import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { 
  ArrowLeft, 
  Save, 
  Calculator,
  CheckCircle,
  AlertCircle,
  Building,
  MapPin,
  Play,
  RotateCcw,
  Download,
  Share
} from 'lucide-react';
import { asgQuestions, phaseWeights } from '../../data/asg-questions';
import { ASGQuestion } from '../../types/asg';
import { calculatePillarScore, convertResponseToScore } from '../../utils/scoring';
import { ScorePreview } from './ScorePreview';

interface QuickEvaluationFormProps {
  onBack: () => void;
  onSave: (projectData: any) => void;
}

interface ProjectInfo {
  name: string;
  location: string;
  type: string;
  area: number;
  budget: number;
}

export function QuickEvaluationForm({ onBack, onSave }: QuickEvaluationFormProps) {
  const [currentStep, setCurrentStep] = useState<'project-info' | 'evaluation' | 'results'>('project-info');
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    location: '',
    type: '',
    area: 0,
    budget: 0
  });
  
  const [currentPhase, setCurrentPhase] = useState<'factibilidad' | 'diseño' | 'construccion'>('factibilidad');
  const [currentPillar, setCurrentPillar] = useState<'ambiental' | 'social' | 'gobernanza'>('ambiental');
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [scores, setScores] = useState({
    ambiental: 0,
    social: 0,
    gobernanza: 0,
    overall: 0
  });

  // Get questions for current phase and pillar
  const currentQuestions = asgQuestions.filter(q => 
    q.phase === currentPhase && q.pillar === currentPillar
  );

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = asgQuestions.filter(q => q.phase === currentPhase).length;
  const answeredQuestions = Object.keys(responses).filter(key => 
    asgQuestions.find(q => q.id === key && q.phase === currentPhase)
  ).length;

  // Calculate scores in real time
  useEffect(() => {
    const mockEvaluations = Object.entries(responses).map(([questionId, response]) => {
      const question = asgQuestions.find(q => q.id === questionId);
      const score = convertResponseToScore(response, question?.responseType || 'si_no');
      
      return {
        id: `eval_${questionId}`,
        projectId: 'temp',
        questionId,
        phase: question?.phase || 'factibilidad',
        response,
        score,
        comments: '',
        evidence: [],
        evaluatedBy: 'Usuario',
        evaluatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
    });

    const ambientalScore = calculatePillarScore(mockEvaluations, 'temp', currentPhase, 'ambiental');
    const socialScore = calculatePillarScore(mockEvaluations, 'temp', currentPhase, 'social');
    const gobernanzaScore = calculatePillarScore(mockEvaluations, 'temp', currentPhase, 'gobernanza');

    const weights = phaseWeights[currentPhase];
    const overallScore = Math.round(
      ambientalScore * weights.ambiental +
      socialScore * weights.social +
      gobernanzaScore * weights.gobernanza
    );

    setScores({
      ambiental: ambientalScore,
      social: socialScore,
      gobernanza: gobernanzaScore,
      overall: overallScore
    });
  }, [responses, currentPhase]);

  const handleProjectInfoChange = (field: keyof ProjectInfo, value: string | number) => {
    setProjectInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResponseChange = (value: any) => {
    if (currentQuestion) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next pillar or complete
      const pillars: ('ambiental' | 'social' | 'gobernanza')[] = ['ambiental', 'social', 'gobernanza'];
      const currentPillarIndex = pillars.indexOf(currentPillar);
      
      if (currentPillarIndex < pillars.length - 1) {
        setCurrentPillar(pillars[currentPillarIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        // All questions completed, show results
        setCurrentStep('results');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Move to previous pillar
      const pillars: ('ambiental' | 'social' | 'gobernanza')[] = ['ambiental', 'social', 'gobernanza'];
      const currentPillarIndex = pillars.indexOf(currentPillar);
      
      if (currentPillarIndex > 0) {
        const prevPillar = pillars[currentPillarIndex - 1];
        const prevQuestions = asgQuestions.filter(q => 
          q.phase === currentPhase && q.pillar === prevPillar
        );
        setCurrentPillar(prevPillar);
        setCurrentQuestionIndex(prevQuestions.length - 1);
      }
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'factibilidad': return 'Factibilidad y Adquisición';
      case 'diseño': return 'Diseño y Licenciamiento';
      case 'construccion': return 'Construcción y Entrega';
      default: return phase;
    }
  };

  const getPillarLabel = (pillar: string) => {
    switch (pillar) {
      case 'ambiental': return 'Ambiental';
      case 'social': return 'Social';
      case 'gobernanza': return 'Gobernanza';
      default: return pillar;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;
    
    const value = responses[currentQuestion.id];
    
    switch (currentQuestion.responseType) {
      case 'si_no':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={value === true ? 'default' : 'outline'}
                onClick={() => handleResponseChange(true)}
                className="h-16"
              >
                <CheckCircle className="h-6 w-6 mr-2" />
                Sí
              </Button>
              <Button
                variant={value === false ? 'default' : 'outline'}
                onClick={() => handleResponseChange(false)}
                className="h-16"
              >
                <AlertCircle className="h-6 w-6 mr-2" />
                No
              </Button>
              <Button
                variant={value === 'na' ? 'default' : 'outline'}
                onClick={() => handleResponseChange('na')}
                className="h-16"
              >
                No Aplica
              </Button>
            </div>
          </div>
        );

      case 'si_no_parcial':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={value === 'si' ? 'default' : 'outline'}
                onClick={() => handleResponseChange('si')}
                className="h-16"
              >
                <CheckCircle className="h-6 w-6 mr-2" />
                Sí
              </Button>
              <Button
                variant={value === 'parcial' ? 'default' : 'outline'}
                onClick={() => handleResponseChange('parcial')}
                className="h-16"
              >
                <AlertCircle className="h-6 w-6 mr-2" />
                Parcial
              </Button>
              <Button
                variant={value === 'no' ? 'default' : 'outline'}
                onClick={() => handleResponseChange('no')}
                className="h-16"
              >
                No
              </Button>
            </div>
            {value === 'parcial' && (
              <Textarea
                placeholder="Observaciones..."
                value={value?.observaciones || ''}
                onChange={(e) => handleResponseChange({ 
                  ...value, 
                  observaciones: e.target.value 
                })}
                className="mt-2"
              />
            )}
          </div>
        );

      case 'si_no_cual':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={value?.answer === 'si' ? 'default' : 'outline'}
                onClick={() => handleResponseChange({ answer: 'si', cual: value?.cual || '' })}
                className="h-16"
              >
                <CheckCircle className="h-6 w-6 mr-2" />
                Sí
              </Button>
              <Button
                variant={value?.answer === 'no' ? 'default' : 'outline'}
                onClick={() => handleResponseChange({ answer: 'no', cual: '' })}
                className="h-16"
              >
                <AlertCircle className="h-6 w-6 mr-2" />
                No
              </Button>
            </div>
            {value?.answer === 'si' && (
              <div className="space-y-2">
                <Label>¿Cuál?</Label>
                <Input
                  value={value?.cual || ''}
                  onChange={(e) => handleResponseChange({ 
                    ...value, 
                    cual: e.target.value 
                  })}
                  placeholder="Especifique..."
                  className="h-12"
                />
              </div>
            )}
          </div>
        );

      case 'escala':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <Button
                  key={num}
                  variant={value === num ? 'default' : 'outline'}
                  onClick={() => handleResponseChange(num)}
                  className="h-16 flex flex-col"
                >
                  <span className="text-2xl">{num}</span>
                  <span className="text-xs">
                    {num === 1 && 'Muy Bajo'}
                    {num === 2 && 'Bajo'}
                    {num === 3 && 'Medio'}
                    {num === 4 && 'Alto'}
                    {num === 5 && 'Muy Alto'}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        );

      case 'escala_riesgo':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {[
                { value: 1, label: 'Muy Bajo', color: 'bg-green-100 text-green-800 border-green-300' },
                { value: 2, label: 'Bajo', color: 'bg-green-50 text-green-700 border-green-200' },
                { value: 3, label: 'Moderado', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
                { value: 4, label: 'Alto', color: 'bg-orange-100 text-orange-800 border-orange-300' },
                { value: 5, label: 'Muy Alto', color: 'bg-red-100 text-red-800 border-red-300' }
              ].map(option => (
                <Button
                  key={option.value}
                  variant={value === option.value ? 'default' : 'outline'}
                  onClick={() => handleResponseChange(option.value)}
                  className={`h-16 flex flex-col ${value === option.value ? '' : option.color}`}
                >
                  <span className="text-lg font-bold">{option.value}</span>
                  <span className="text-xs text-center">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
        );

      case 'texto':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handleResponseChange(e.target.value)}
            placeholder="Ingrese su respuesta detallada..."
            className="min-h-24"
          />
        );

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleResponseChange(e.target.value)}
            placeholder="Ingrese su respuesta..."
            className="text-lg h-12"
          />
        );
    }
  };

  const handleSaveProject = () => {
    const projectData = {
      projectInfo,
      phase: currentPhase,
      responses,
      scores
    };
    onSave(projectData);
  };

  const resetEvaluation = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setCurrentPillar('ambiental');
  };

  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  const isResponseValid = (response: any, responseType: string): boolean => {
    if (response === undefined || response === null) return false;
    
    switch (responseType) {
      case 'si_no':
        return response === true || response === false || response === 'na';
      
      case 'si_no_parcial':
        return response === 'si' || response === 'parcial' || response === 'no';
      
      case 'si_no_cual':
        return response?.answer === 'si' || response?.answer === 'no';
      
      case 'escala':
      case 'escala_riesgo':
        return typeof response === 'number' && response >= 1 && response <= 5;
      
      case 'texto':
        return typeof response === 'string' && response.trim().length > 0;
      
      default:
        return true;
    }
  };

  if (currentStep === 'results') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => setCurrentStep('evaluation')} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Evaluación
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Resultados de Evaluación ASG</h1>
              <p className="text-muted-foreground">
                {projectInfo.name} - {getPhaseLabel(currentPhase)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Compartir
            </Button>
            <Button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Proyecto
            </Button>
          </div>
        </div>

        <ScorePreview scores={scores} phase={currentPhase} />
      </div>
    );
  }

  if (currentStep === 'project-info') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nueva Evaluación ASG</h1>
            <p className="text-muted-foreground">
              Comience ingresando la información básica del proyecto
            </p>
          </div>
        </div>

        {/* Project Info Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre del Proyecto *</Label>
                <Input
                  value={projectInfo.name}
                  onChange={(e) => handleProjectInfoChange('name', e.target.value)}
                  placeholder="Ej: Centro Logístico Norte"
                />
              </div>
              <div className="space-y-2">
                <Label>Ubicación *</Label>
                <Input
                  value={projectInfo.location}
                  onChange={(e) => handleProjectInfoChange('location', e.target.value)}
                  placeholder="Ej: Bogotá, Cundinamarca"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Proyecto *</Label>
                <Select value={projectInfo.type} onValueChange={(value) => handleProjectInfoChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bodega">Bodega Industrial</SelectItem>
                    <SelectItem value="centro_distribucion">Centro de Distribución</SelectItem>
                    <SelectItem value="parque_industrial">Parque Industrial</SelectItem>
                    <SelectItem value="hub_logistico">Hub Logístico</SelectItem>
                    <SelectItem value="almacen">Almacén</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Área (m²) *</Label>
                <Input
                  type="number"
                  value={projectInfo.area || ''}
                  onChange={(e) => handleProjectInfoChange('area', Number(e.target.value))}
                  placeholder="Ej: 15000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Presupuesto (USD) *</Label>
                <Input
                  type="number"
                  value={projectInfo.budget || ''}
                  onChange={(e) => handleProjectInfoChange('budget', Number(e.target.value))}
                  placeholder="Ej: 25000000"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={() => setCurrentStep('evaluation')}
                disabled={!projectInfo.name || !projectInfo.location || !projectInfo.type || !projectInfo.area || !projectInfo.budget}
                className="min-w-32"
              >
                <Play className="h-4 w-4 mr-2" />
                Comenzar Evaluación
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => setCurrentStep('project-info')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{projectInfo.name}</h1>
            <p className="text-muted-foreground">
              {getPhaseLabel(currentPhase)} - {getPillarLabel(currentPillar)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={resetEvaluation} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar
          </Button>
          <Button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar Proyecto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evaluation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Progreso de Evaluación</h3>
                  <span className="text-sm text-muted-foreground">
                    {answeredQuestions} de {totalQuestions} preguntas
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <div className="text-center">
                  <span className="text-2xl font-bold">{completionPercentage}%</span>
                  <span className="text-muted-foreground ml-2">Completado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase Selector */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                {(['factibilidad', 'diseño', 'construccion'] as const).map((phase) => (
                  <Button
                    key={phase}
                    onClick={() => {
                      setCurrentPhase(phase);
                      setCurrentPillar('ambiental');
                      setCurrentQuestionIndex(0);
                    }}
                    variant={currentPhase === phase ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    {getPhaseLabel(phase)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pillar Selector */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                {(['ambiental', 'social', 'gobernanza'] as const).map((pillar) => (
                  <Button
                    key={pillar}
                    onClick={() => {
                      setCurrentPillar(pillar);
                      setCurrentQuestionIndex(0);
                    }}
                    variant={currentPillar === pillar ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      pillar === 'ambiental' ? 'bg-green-500' :
                      pillar === 'social' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    {getPillarLabel(pillar)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          {currentQuestion && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    Pregunta {currentQuestionIndex + 1} de {currentQuestions.length}
                  </Badge>
                  <Badge variant="secondary">
                    {currentQuestion.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                  {renderQuestionInput()}
                </div>

                <div className="flex justify-between">
                  <Button 
                    onClick={handlePrevious}
                    variant="outline"
                    disabled={currentQuestionIndex === 0 && currentPillar === 'ambiental'}
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!isResponseValid(responses[currentQuestion.id], currentQuestion.responseType)}
                    className={isResponseValid(responses[currentQuestion.id], currentQuestion.responseType) ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {currentQuestionIndex === currentQuestions.length - 1 && currentPillar === 'gobernanza' ? 
                      'Ver Resultados' : 'Siguiente'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Score Panel */}
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Score ASG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className={`text-4xl font-bold ${getScoreColor(scores.overall)}`}>
                    {scores.overall}
                  </div>
                  <div className="text-muted-foreground">de 100</div>
                </div>
                <Progress value={scores.overall} className="h-3" />
                <div className="text-sm text-muted-foreground">
                  {scores.overall >= 80 ? 'Excelente' : 
                   scores.overall >= 60 ? 'Aceptable' : 
                   'Requiere Mejora'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pillar Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Scores por Pilar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Ambiental</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(scores.ambiental)}`}>
                    {scores.ambiental}
                  </span>
                </div>
                <Progress value={scores.ambiental} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Social</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(scores.social)}`}>
                    {scores.social}
                  </span>
                </div>
                <Progress value={scores.social} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span>Gobernanza</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(scores.gobernanza)}`}>
                    {scores.gobernanza}
                  </span>
                </div>
                <Progress value={scores.gobernanza} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Proyecto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{projectInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{projectInfo.type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Área:</span> {projectInfo.area.toLocaleString()} m²
              </div>
              <div>
                <span className="text-muted-foreground">Presupuesto:</span> ${projectInfo.budget.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}