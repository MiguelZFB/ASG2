import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Save, Upload, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { asgQuestions } from '../../data/asg-questions';
import { ASGQuestion } from '../../types/asg';

interface EvaluationFormProps {
  projectId: string;
  projectName: string;
  phase: 'factibilidad' | 'diseño' | 'construccion';
  onBack: () => void;
  onSave: (evaluations: any[]) => void;
}

export function EvaluationForm({ projectId, projectName, phase, onBack, onSave }: EvaluationFormProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [evidence, setEvidence] = useState<Record<string, string[]>>({});
  const [currentSection, setCurrentSection] = useState<'ambiental' | 'social' | 'gobernanza'>('ambiental');

  const phaseQuestions = asgQuestions.filter(q => q.phase === phase);
  const currentQuestions = phaseQuestions.filter(q => q.pillar === currentSection);

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
      case 'ambiental': return 'Pilar Ambiental';
      case 'social': return 'Pilar Social';
      case 'gobernanza': return 'Pilar de Gobernanza';
      default: return pillar;
    }
  };

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCommentChange = (questionId: string, value: string) => {
    setComments(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const renderQuestionInput = (question: ASGQuestion) => {
    const value = responses[question.id];
    
    switch (question.responseType) {
      case 'si_no':
        return (
          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value="true"
                  checked={value === true}
                  onChange={() => handleResponseChange(question.id, true)}
                  className="text-green-600"
                />
                <span>Sí</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value="false"
                  checked={value === false}
                  onChange={() => handleResponseChange(question.id, false)}
                  className="text-red-600"
                />
                <span>No</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value="na"
                  checked={value === 'na'}
                  onChange={() => handleResponseChange(question.id, 'na')}
                  className="text-gray-600"
                />
                <span>No Aplica</span>
              </label>
            </div>
          </div>
        );

      case 'escala':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <label key={num} className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value={num}
                    checked={value === num}
                    onChange={() => handleResponseChange(question.id, num)}
                  />
                  <span>{num}</span>
                </label>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              1 = Muy Bajo | 2 = Bajo | 3 = Medio | 4 = Alto | 5 = Muy Alto
            </div>
          </div>
        );

      case 'texto':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Ingrese su respuesta..."
            className="min-h-20"
          />
        );

      case 'numero':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => handleResponseChange(question.id, Number(e.target.value))}
            placeholder="Ingrese un número"
          />
        );

      case 'fecha':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
          />
        );

      case 'seleccion':
        return (
          <Select value={value || undefined} onValueChange={(val) => handleResponseChange(question.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una opción" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Ingrese su respuesta..."
          />
        );
    }
  };

  const getCompletionPercentage = () => {
    const totalQuestions = phaseQuestions.length;
    const answeredQuestions = phaseQuestions.filter(q => responses[q.id] !== undefined).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getSectionCompletion = (pillar: 'ambiental' | 'social' | 'gobernanza') => {
    const sectionQuestions = phaseQuestions.filter(q => q.pillar === pillar);
    const answeredQuestions = sectionQuestions.filter(q => responses[q.id] !== undefined).length;
    return Math.round((answeredQuestions / sectionQuestions.length) * 100);
  };

  const handleSave = () => {
    const evaluations = Object.entries(responses).map(([questionId, response]) => {
      const question = asgQuestions.find(q => q.id === questionId);
      let score = 0;
      
      if (question?.responseType === 'si_no') {
        score = response === true ? 100 : response === false ? 0 : 50;
      } else if (question?.responseType === 'escala') {
        score = (response - 1) * 25; // Convert 1-5 to 0-100
      } else {
        score = response ? 100 : 0;
      }

      return {
        questionId,
        projectId,
        phase,
        response,
        score,
        comments: comments[questionId] || '',
        evidence: evidence[questionId] || [],
        evaluatedBy: 'Usuario Actual',
        evaluatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
    });

    onSave(evaluations);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Evaluación ASG</h1>
            <p className="text-muted-foreground">
              {projectName} - {getPhaseLabel(phase)}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Evaluación
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de Evaluación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Progreso General</span>
                <span className="font-medium">{getCompletionPercentage()}%</span>
              </div>
              <Progress value={getCompletionPercentage()} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Ambiental</div>
                <div className="font-medium">{getSectionCompletion('ambiental')}%</div>
                <Progress value={getSectionCompletion('ambiental')} className="h-1 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Social</div>
                <div className="font-medium">{getSectionCompletion('social')}%</div>
                <Progress value={getSectionCompletion('social')} className="h-1 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Gobernanza</div>
                <div className="font-medium">{getSectionCompletion('gobernanza')}%</div>
                <Progress value={getSectionCompletion('gobernanza')} className="h-1 mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        {(['ambiental', 'social', 'gobernanza'] as const).map((pillar) => (
          <Button
            key={pillar}
            onClick={() => setCurrentSection(pillar)}
            variant={currentSection === pillar ? 'default' : 'ghost'}
            className="flex-1"
          >
            {getPillarLabel(pillar)}
            <Badge 
              variant="secondary" 
              className="ml-2"
            >
              {getSectionCompletion(pillar)}%
            </Badge>
          </Button>
        ))}
      </div>

      {/* Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentSection === 'ambiental' && <div className="w-4 h-4 bg-green-500 rounded-full" />}
            {currentSection === 'social' && <div className="w-4 h-4 bg-blue-500 rounded-full" />}
            {currentSection === 'gobernanza' && <div className="w-4 h-4 bg-purple-500 rounded-full" />}
            {getPillarLabel(currentSection)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentQuestions.map((question, index) => {
              const isAnswered = responses[question.id] !== undefined;
              
              return (
                <div key={question.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{question.question}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{question.category}</Badge>
                            {question.isRequired && (
                              <Badge variant="destructive" className="text-xs">
                                Requerido
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isAnswered && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {!isAnswered && question.isRequired && (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>

                      {/* Response Input */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Respuesta *
                          </Label>
                          {renderQuestionInput(question)}
                        </div>

                        {/* Comments */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Comentarios (Opcional)
                          </Label>
                          <Textarea
                            value={comments[question.id] || ''}
                            onChange={(e) => handleCommentChange(question.id, e.target.value)}
                            placeholder="Agregue comentarios adicionales..."
                            className="min-h-16"
                          />
                        </div>

                        {/* Evidence Upload */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            Evidencia de Soporte (Opcional)
                          </Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Haga clic para subir archivos o arrastre y suelte
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, XLS, IMG (máx. 10MB)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-muted-foreground">
          {Object.keys(responses).length} de {phaseQuestions.length} preguntas respondidas
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
            disabled={getCompletionPercentage() < 100}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar y Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}