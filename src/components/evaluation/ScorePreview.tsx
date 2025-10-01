import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Target,
  Award
} from 'lucide-react';

interface ScorePreviewProps {
  scores: {
    ambiental: number;
    social: number;
    gobernanza: number;
    overall: number;
  };
  phase: string;
}

export function ScorePreview({ scores, phase }: ScorePreviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <Target className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Aceptable';
    return 'Requiere Mejora';
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'factibilidad': return 'Factibilidad';
      case 'diseño': return 'Diseño';
      case 'construccion': return 'Construcción';
      default: return phase;
    }
  };

  const recommendations = [
    {
      pillar: 'ambiental',
      score: scores.ambiental,
      recommendations: scores.ambiental < 60 ? [
        'Implementar medidas de eficiencia energética',
        'Considerar certificaciones ambientales',
        'Mejorar gestión de residuos'
      ] : scores.ambiental < 80 ? [
        'Incorporar más materiales sostenibles',
        'Optimizar sistemas de gestión de agua'
      ] : [
        'Mantener altos estándares ambientales',
        'Considerar innovaciones sostenibles'
      ]
    },
    {
      pillar: 'social',
      score: scores.social,
      recommendations: scores.social < 60 ? [
        'Desarrollar plan de consulta comunitaria',
        'Implementar políticas de inclusión',
        'Mejorar condiciones laborales'
      ] : scores.social < 80 ? [
        'Ampliar programas de beneficio comunitario',
        'Fortalecer políticas de diversidad'
      ] : [
        'Mantener excelencia en gestión social',
        'Considerar programas de innovación social'
      ]
    },
    {
      pillar: 'gobernanza',
      score: scores.gobernanza,
      recommendations: scores.gobernanza < 60 ? [
        'Fortalecer marcos de cumplimiento',
        'Implementar políticas anticorrupción',
        'Mejorar transparencia'
      ] : scores.gobernanza < 80 ? [
        'Optimizar procesos de auditoría',
        'Mejorar sistemas de reporte'
      ] : [
        'Mantener excelencia en gobernanza',
        'Liderar mejores prácticas del sector'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Resultado Final</span>
            <Badge variant="outline">{getPhaseLabel(phase)}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              {getScoreIcon(scores.overall)}
              <div className={`text-6xl font-bold ${getScoreColor(scores.overall)}`}>
                {scores.overall}
              </div>
              <div className="text-2xl text-muted-foreground">/100</div>
            </div>
            <div>
              <Badge 
                className={`text-lg px-4 py-2 ${
                  scores.overall >= 80 ? 'bg-green-100 text-green-800' :
                  scores.overall >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {getScoreLabel(scores.overall)}
              </Badge>
            </div>
            <Progress value={scores.overall} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Pillar Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose por Pilares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Ambiental</div>
                <div className={`text-2xl font-bold ${getScoreColor(scores.ambiental)}`}>
                  {scores.ambiental}
                </div>
                <Progress value={scores.ambiental} className="h-2" />
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Social</div>
                <div className={`text-2xl font-bold ${getScoreColor(scores.social)}`}>
                  {scores.social}
                </div>
                <Progress value={scores.social} className="h-2" />
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Gobernanza</div>
                <div className={`text-2xl font-bold ${getScoreColor(scores.gobernanza)}`}>
                  {scores.gobernanza}
                </div>
                <Progress value={scores.gobernanza} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Desempeño</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Award className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-medium">Ranking Sectorial</div>
                <div className="text-sm text-muted-foreground">
                  {scores.overall >= 80 ? 'Top 25%' : 
                   scores.overall >= 60 ? 'Top 50%' : 
                   'Requiere Mejora'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {scores.overall >= 75 ? 
                <TrendingUp className="h-8 w-8 text-green-500" /> :
                <TrendingDown className="h-8 w-8 text-red-500" />
              }
              <div>
                <div className="font-medium">Tendencia</div>
                <div className="text-sm text-muted-foreground">
                  {scores.overall >= 75 ? 'Positiva' : 'Requiere Atención'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Target className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-medium">Meta Recomendada</div>
                <div className="text-sm text-muted-foreground">85 puntos</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="font-medium">Certificación Posible</div>
                <div className="text-sm text-muted-foreground">
                  {scores.overall >= 80 ? 'LEED Gold' : 
                   scores.overall >= 60 ? 'LEED Silver' : 
                   'LEED Certified'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de Mejora</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((item) => (
              <div key={item.pillar}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-4 h-4 rounded-full ${
                    item.pillar === 'ambiental' ? 'bg-green-500' :
                    item.pillar === 'social' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <h4 className="font-medium capitalize">{item.pillar}</h4>
                  <Badge variant="outline" className={getScoreColor(item.score)}>
                    {item.score}/100
                  </Badge>
                </div>
                <ul className="space-y-1 ml-6">
                  {item.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-xs mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}