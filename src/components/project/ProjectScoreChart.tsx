import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Project } from '../../types/asg';
import { Badge } from '../ui/badge';

interface ProjectScoreChartProps {
  project: Project;
}

export function ProjectScoreChart({ project }: ProjectScoreChartProps) {
  // Radar chart data for ASG pillars
  const radarData = [
    {
      pillar: 'Ambiental',
      score: project.environmentalScore,
      fullMark: 100
    },
    {
      pillar: 'Social',
      score: project.socialScore,
      fullMark: 100
    },
    {
      pillar: 'Gobernanza',
      score: project.governanceScore,
      fullMark: 100
    }
  ];

  // Bar chart data for phase progression (mock data)
  const phaseData = [
    {
      phase: 'Factibilidad',
      ambiental: 88,
      social: 75,
      gobernanza: 82,
      overall: 82
    },
    {
      phase: 'Diseño',
      ambiental: 82,
      social: 68,
      gobernanza: 78,
      overall: 76
    },
    {
      phase: 'Construcción',
      ambiental: 72,
      social: 85,
      gobernanza: 68,
      overall: 75
    }
  ];

  // Historical trend data (mock)
  const trendData = [
    { month: 'Ene', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Abr', score: 75 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 78 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart - ASG Pillars */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis ASG por Pilares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pillar" />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }}
                  />
                  <Radar
                    name="Score ASG"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{project.environmentalScore}</div>
                <div className="text-sm text-muted-foreground">Ambiental</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{project.socialScore}</div>
                <div className="text-sm text-muted-foreground">Social</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{project.governanceScore}</div>
                <div className="text-sm text-muted-foreground">Gobernanza</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Phase Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso por Fases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ambiental" fill="#10b981" name="Ambiental" />
                  <Bar dataKey="social" fill="#3b82f6" name="Social" />
                  <Bar dataKey="gobernanza" fill="#8b5cf6" name="Gobernanza" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights y Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-500">Fortaleza</Badge>
              </div>
              <h4 className="font-medium mb-1">Gestión Ambiental Sólida</h4>
              <p className="text-sm text-muted-foreground">
                El proyecto mantiene altos estándares ambientales con un score de {project.environmentalScore}/100.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-500">Oportunidad</Badge>
              </div>
              <h4 className="font-medium mb-1">Mejora en Aspectos Sociales</h4>
              <p className="text-sm text-muted-foreground">
                El pilar social requiere atención adicional para alcanzar el nivel de los otros pilares.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500">Acción</Badge>
              </div>
              <h4 className="font-medium mb-1">Plan de Mejora Continua</h4>
              <p className="text-sm text-muted-foreground">
                Implementar medidas específicas para mantener la tendencia positiva en todas las fases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle>Benchmarking del Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Score ASG vs. Promedio del Sector</span>
                <span className="text-sm text-muted-foreground">78 vs. 65</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="text-sm text-green-600 mt-1">
                +13 puntos por encima del promedio sectorial
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">Top 25%</div>
                <div className="text-sm text-muted-foreground">Ranking sectorial</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">LEED Gold</div>
                <div className="text-sm text-muted-foreground">Certificación objetivo</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Meta de sostenibilidad</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}