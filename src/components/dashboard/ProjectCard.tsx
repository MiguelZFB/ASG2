import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Calendar, MapPin, Building, AlertTriangle, Eye } from 'lucide-react';
import { Project } from '../../types/asg';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
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
      case 'factibilidad': return 'Factibilidad';
      case 'diseño': return 'Diseño';
      case 'construccion': return 'Construcción';
      default: return phase;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'bajo': return 'text-green-600 bg-green-50';
      case 'medio': return 'text-yellow-600 bg-yellow-50';
      case 'alto': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-2">{project.name}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{project.projectType}</span>
            </div>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* ASG Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span>Score ASG General</span>
              <span className={`font-semibold ${getScoreColor(project.asgScore)}`}>
                {project.asgScore}/100
              </span>
            </div>
            <Progress value={project.asgScore} className="h-2" />
          </div>

          {/* Pillar Scores */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground">Ambiental</div>
              <div className={`font-semibold ${getScoreColor(project.environmentalScore)}`}>
                {project.environmentalScore}
              </div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Social</div>
              <div className={`font-semibold ${getScoreColor(project.socialScore)}`}>
                {project.socialScore}
              </div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Gobernanza</div>
              <div className={`font-semibold ${getScoreColor(project.governanceScore)}`}>
                {project.governanceScore}
              </div>
            </div>
          </div>

          {/* Phase and Risk */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-foreground">Fase Actual: </span>
              <Badge variant="outline">{getPhaseLabel(project.currentPhase)}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <Badge variant="outline" className={getRiskColor(project.riskLevel)}>
                Riesgo {project.riskLevel}
              </Badge>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Inicio: {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span>Área: {project.area.toLocaleString()} m²</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => onViewDetails(project.id)}
            className="w-full"
            variant="outline"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}