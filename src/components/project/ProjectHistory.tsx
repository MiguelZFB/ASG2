import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Settings,
  TrendingUp
} from 'lucide-react';
import { mockHistory } from '../../data/mock-data';

interface ProjectHistoryProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectHistory({ projectId, onBack }: ProjectHistoryProps) {
  const projectHistory = mockHistory.filter(item => item.projectId === projectId);

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'creación del proyecto':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'evaluación asg completada':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cambio de fase':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'riesgo identificado':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'creación del proyecto':
        return 'border-blue-200 bg-blue-50';
      case 'evaluación asg completada':
        return 'border-green-200 bg-green-50';
      case 'cambio de fase':
        return 'border-purple-200 bg-purple-50';
      case 'riesgo identificado':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Historial del Proyecto</h1>
          <p className="text-muted-foreground">
            Registro completo de actividades y cambios del proyecto
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{projectHistory.length}</div>
                <div className="text-sm text-muted-foreground">Total Actividades</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {projectHistory.filter(h => h.action.toLowerCase().includes('completada')).length}
                </div>
                <div className="text-sm text-muted-foreground">Evaluaciones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {projectHistory.filter(h => h.action.toLowerCase().includes('fase')).length}
                </div>
                <div className="text-sm text-muted-foreground">Cambios de Fase</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">
                  {projectHistory.filter(h => h.action.toLowerCase().includes('riesgo')).length}
                </div>
                <div className="text-sm text-muted-foreground">Riesgos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Línea de Tiempo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectHistory
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((item, index) => {
                const { date, time } = formatDate(item.timestamp);
                
                return (
                  <div key={item.id} className="relative">
                    {/* Timeline line */}
                    {index < projectHistory.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200"></div>
                    )}
                    
                    {/* Timeline item */}
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getActionColor(item.action)}`}>
                        {getActionIcon(item.action)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{item.action}</h4>
                            <p className="text-muted-foreground mt-1">{item.description}</p>
                            
                            {/* Metadata */}
                            {item.metadata && (
                              <div className="mt-2 space-y-1">
                                {item.metadata.phase && (
                                  <Badge variant="outline" className="mr-2">
                                    Fase: {item.metadata.phase}
                                  </Badge>
                                )}
                                {item.metadata.score && (
                                  <Badge variant="outline" className="mr-2">
                                    Score: {item.metadata.score}
                                  </Badge>
                                )}
                                {item.metadata.fromPhase && item.metadata.toPhase && (
                                  <Badge variant="outline" className="mr-2">
                                    {item.metadata.fromPhase} → {item.metadata.toPhase}
                                  </Badge>
                                )}
                                {item.metadata.riskType && (
                                  <Badge variant="outline" className="mr-2">
                                    {item.metadata.riskType} - {item.metadata.severity}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Date and user */}
                          <div className="text-right text-sm text-muted-foreground ml-4">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="h-3 w-3" />
                              <span>{date}</span>
                            </div>
                            <div className="text-xs">{time}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <User className="h-3 w-3" />
                              <span className="text-xs">{item.performedBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {projectHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay actividades registradas para este proyecto.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Actividades por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-muted-foreground">Enero 2024</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Febrero 2024</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-muted-foreground">Marzo 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}