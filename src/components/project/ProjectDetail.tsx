import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign,
  Users,
  FileText,
  AlertTriangle,
  Edit,
  History
} from 'lucide-react';
import { Project } from '../../types/asg';
import { ProjectScoreChart } from './ProjectScoreChart';
import { ProjectRisks } from './ProjectRisks';
import { ProjectHistory } from './ProjectHistory';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onEditEvaluation: (phase: string) => void;
  onViewHistory: () => void;
}

export function ProjectDetail({ project, onBack, onEditEvaluation, onViewHistory }: ProjectDetailProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return 'bg-green-500';
      case 'en_progreso': return 'bg-blue-500';
      case 'planificacion': return 'bg-yellow-500';
      case 'suspendido': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completado': return 'Completado';
      case 'en_progreso': return 'En Progreso';
      case 'planificacion': return 'Planificación';
      case 'suspendido': return 'Suspendido';
      default: return status;
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'bajo': return 'text-green-600 bg-green-50 border-green-200';
      case 'medio': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'alto': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{project.projectType}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onViewHistory} variant="outline">
            <History className="h-4 w-4 mr-2" />
            Historial
          </Button>
          <Badge className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ASG Scores */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evaluación ASG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Score */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium">Score ASG General</span>
                  <span className={`text-2xl font-bold ${getScoreColor(project.asgScore)}`}>
                    {project.asgScore}/100
                  </span>
                </div>
                <Progress value={project.asgScore} className="h-3" />
                <div className="text-sm text-muted-foreground mt-1">
                  {project.asgScore >= 80 ? 'Excelente desempeño ASG' : 
                   project.asgScore >= 60 ? 'Desempeño ASG aceptable' : 
                   'Requiere mejoras significativas'}
                </div>
              </div>

              {/* Pillar Scores */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Ambiental</div>
                  <div className={`text-2xl font-bold ${getScoreColor(project.environmentalScore)}`}>
                    {project.environmentalScore}
                  </div>
                  <Progress value={project.environmentalScore} className="h-2 mt-2" />
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Social</div>
                  <div className={`text-2xl font-bold ${getScoreColor(project.socialScore)}`}>
                    {project.socialScore}
                  </div>
                  <Progress value={project.socialScore} className="h-2 mt-2" />
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Gobernanza</div>
                  <div className={`text-2xl font-bold ${getScoreColor(project.governanceScore)}`}>
                    {project.governanceScore}
                  </div>
                  <Progress value={project.governanceScore} className="h-2 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fase Actual</label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    {getPhaseLabel(project.currentPhase)}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Nivel de Riesgo</label>
                <div className="mt-1">
                  <Badge className={getRiskColor(project.riskLevel)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Riesgo {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Fechas</div>
                  <div className="text-sm text-muted-foreground">
                    Inicio: {new Date(project.startDate).toLocaleDateString()}<br/>
                    Fin esperado: {new Date(project.expectedEndDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Área</div>
                  <div className="text-sm text-muted-foreground">
                    {project.area.toLocaleString()} m²
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Presupuesto</div>
                  <div className="text-sm text-muted-foreground">
                    ${project.budget.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="evaluation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evaluation">Evaluación por Fases</TabsTrigger>
          <TabsTrigger value="risks">Gestión de Riesgos</TabsTrigger>
          <TabsTrigger value="charts">Gráficos y Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Factibilidad */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Factibilidad</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEditEvaluation('factibilidad')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-sm mt-1">
                      <span>Completado</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ambiental:</span>
                      <span className="font-medium text-green-600">88</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social:</span>
                      <span className="font-medium text-yellow-600">75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gobernanza:</span>
                      <span className="font-medium text-green-600">82</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diseño */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Diseño</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEditEvaluation('diseño')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Progress value={70} className="h-2" />
                    <div className="flex justify-between text-sm mt-1">
                      <span>Completado</span>
                      <span className="font-medium">70%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ambiental:</span>
                      <span className="font-medium text-green-600">82</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social:</span>
                      <span className="font-medium text-yellow-600">68</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gobernanza:</span>
                      <span className="font-medium text-green-600">78</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Construcción */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Construcción</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEditEvaluation('construccion')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-sm mt-1">
                      <span>Completado</span>
                      <span className="font-medium">45%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ambiental:</span>
                      <span className="font-medium text-yellow-600">72</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social:</span>
                      <span className="font-medium text-green-600">85</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gobernanza:</span>
                      <span className="font-medium text-yellow-600">68</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks">
          <ProjectRisks projectId={project.id} />
        </TabsContent>

        <TabsContent value="charts">
          <ProjectScoreChart project={project} />
        </TabsContent>
      </Tabs>
    </div>
  );
}