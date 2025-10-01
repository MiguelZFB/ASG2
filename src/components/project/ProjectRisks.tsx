import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { AlertTriangle, CheckCircle, Clock, User, Calendar } from 'lucide-react';
import { mockRisks, mockMitigationPlans } from '../../data/mock-data';

interface ProjectRisksProps {
  projectId: string;
}

export function ProjectRisks({ projectId }: ProjectRisksProps) {
  const projectRisks = mockRisks.filter(risk => risk.projectId === projectId);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critico': return 'bg-red-600 text-white';
      case 'alto': return 'bg-red-500 text-white';
      case 'medio': return 'bg-yellow-500 text-white';
      case 'bajo': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mitigado': return 'bg-green-100 text-green-800 border-green-200';
      case 'en_mitigacion': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'identificado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cerrado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case 'ambiental': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-blue-100 text-blue-800';
      case 'gobernanza': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{projectRisks.length}</div>
                <div className="text-sm text-muted-foreground">Riesgos Totales</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {projectRisks.filter(r => r.status === 'en_mitigacion').length}
                </div>
                <div className="text-sm text-muted-foreground">En Mitigación</div>
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
                  {projectRisks.filter(r => r.status === 'mitigado').length}
                </div>
                <div className="text-sm text-muted-foreground">Mitigados</div>
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
                  {projectRisks.filter(r => r.severity === 'alto').length}
                </div>
                <div className="text-sm text-muted-foreground">Alto Riesgo</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk List */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Riesgos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectRisks.map((risk) => {
              const mitigationPlan = mockMitigationPlans.find(plan => plan.riskId === risk.id);
              
              return (
                <div key={risk.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{risk.riskType}</h4>
                        <Badge className={getSeverityColor(risk.severity)}>
                          {risk.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getPillarColor(risk.pillar)}>
                          {risk.pillar.charAt(0).toUpperCase() + risk.pillar.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {risk.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Fase: {risk.phase}</span>
                        <span>Probabilidad: {risk.probability}</span>
                        <span>Identificado: {new Date(risk.identifiedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(risk.status)}>
                      {risk.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  {/* Mitigation Plan */}
                  {mitigationPlan && (
                    <div className="bg-gray-50 rounded-md p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium">Plan de Mitigación</h5>
                        <Badge 
                          variant="outline"
                          className={
                            mitigationPlan.status === 'completado' ? 'bg-green-100 text-green-800' :
                            mitigationPlan.status === 'en_progreso' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {mitigationPlan.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {mitigationPlan.action}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>Responsable: {mitigationPlan.responsible}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Fecha límite: {new Date(mitigationPlan.deadline).toLocaleDateString()}</span>
                        </div>
                        {mitigationPlan.budget && (
                          <div>
                            <span>Presupuesto: ${mitigationPlan.budget.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {mitigationPlan.effectiveness && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Efectividad</span>
                            <span>{mitigationPlan.effectiveness}%</span>
                          </div>
                          <Progress value={mitigationPlan.effectiveness} className="h-1" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {projectRisks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No se han identificado riesgos para este proyecto.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Riesgos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-4 gap-2 min-w-96">
              <div></div>
              <div className="text-center text-sm font-medium p-2">Baja</div>
              <div className="text-center text-sm font-medium p-2">Media</div>
              <div className="text-center text-sm font-medium p-2">Alta</div>
              
              <div className="text-sm font-medium p-2">Crítico</div>
              <div className="h-16 bg-orange-200 border border-orange-300 rounded p-1"></div>
              <div className="h-16 bg-red-200 border border-red-300 rounded p-1"></div>
              <div className="h-16 bg-red-300 border border-red-400 rounded p-1"></div>
              
              <div className="text-sm font-medium p-2">Alto</div>
              <div className="h-16 bg-yellow-200 border border-yellow-300 rounded p-1"></div>
              <div className="h-16 bg-orange-200 border border-orange-300 rounded p-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="h-16 bg-red-200 border border-red-300 rounded p-1"></div>
              
              <div className="text-sm font-medium p-2">Medio</div>
              <div className="h-16 bg-green-200 border border-green-300 rounded p-1"></div>
              <div className="h-16 bg-yellow-200 border border-yellow-300 rounded p-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="h-16 bg-orange-200 border border-orange-300 rounded p-1"></div>
              
              <div className="text-sm font-medium p-2">Bajo</div>
              <div className="h-16 bg-green-200 border border-green-300 rounded p-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="h-16 bg-green-200 border border-green-300 rounded p-1"></div>
              <div className="h-16 bg-yellow-200 border border-yellow-300 rounded p-1"></div>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Los puntos representan los riesgos identificados según su severidad y probabilidad</p>
            <p>• Verde: Riesgo aceptable | Amarillo: Monitorear | Naranja: Mitigar | Rojo: Acción inmediata</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}