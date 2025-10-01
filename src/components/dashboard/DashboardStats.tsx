import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Building, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Project } from '../../types/asg';
import { Progress } from '../ui/progress';

interface DashboardStatsProps {
  projects: Project[];
}

export function DashboardStats({ projects }: DashboardStatsProps) {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'en_progreso').length;
  const completedProjects = projects.filter(p => p.status === 'completado').length;
  const highRiskProjects = projects.filter(p => p.riskLevel === 'alto').length;
  
  const averageScore = Math.round(
    projects.reduce((sum, p) => sum + p.asgScore, 0) / totalProjects
  );

  const phaseDistribution = {
    factibilidad: projects.filter(p => p.currentPhase === 'factibilidad').length,
    diseño: projects.filter(p => p.currentPhase === 'diseño').length,
    construccion: projects.filter(p => p.currentPhase === 'construccion').length,
  };

  const riskDistribution = {
    bajo: projects.filter(p => p.riskLevel === 'bajo').length,
    medio: projects.filter(p => p.riskLevel === 'medio').length,
    alto: projects.filter(p => p.riskLevel === 'alto').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{activeProjects} activos</span>
            <span>{completedProjects} completados</span>
          </div>
        </CardContent>
      </Card>

      {/* Average ASG Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Score ASG Promedio</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}/100</div>
          <Progress value={averageScore} className="h-2 mt-2" />
          <div className="text-xs text-muted-foreground mt-1">
            {averageScore >= 80 ? 'Excelente' : averageScore >= 60 ? 'Aceptable' : 'Requiere Mejora'}
          </div>
        </CardContent>
      </Card>

      {/* Phase Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distribución por Fase</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Factibilidad</span>
              <Badge variant="outline">{phaseDistribution.factibilidad}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Diseño</span>
              <Badge variant="outline">{phaseDistribution.diseño}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Construcción</span>
              <Badge variant="outline">{phaseDistribution.construccion}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distribución de Riesgos</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Alto</span>
              <Badge variant="destructive">{riskDistribution.alto}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Medio</span>
              <Badge className="bg-yellow-500 hover:bg-yellow-600">{riskDistribution.medio}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bajo</span>
              <Badge className="bg-green-500 hover:bg-green-600">{riskDistribution.bajo}</Badge>
            </div>
          </div>
          {highRiskProjects > 0 && (
            <div className="mt-3 p-2 bg-red-50 rounded-md">
              <div className="text-xs text-red-800">
                {highRiskProjects} proyecto{highRiskProjects > 1 ? 's' : ''} de alto riesgo requiere{highRiskProjects === 1 ? '' : 'n'} atención
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}