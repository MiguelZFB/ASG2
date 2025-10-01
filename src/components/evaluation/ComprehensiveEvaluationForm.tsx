import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  DollarSign, 
  FileText, 
  Scale, 
  TrendingUp, 
  Leaf, 
  Users, 
  Shield,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  Calculator
} from 'lucide-react';

interface FormData {
  // Información General
  projectInfo: {
    name: string;
    type: string;
    location: string;
    city: string;
    country: string;
    duration: string;
  };
  
  // Evaluación Financiera
  financial: {
    totalArea: number;
    landPrice: number;
    roiProjection: string;
    capRate: string;
    ipc: number;
    trm: number;
    dtf: number;
    ibr: number;
  };
  
  // Evaluación Técnica
  technical: {
    [key: string]: {
      answer: 'si' | 'no' | 'parcial';
      observations?: string;
    };
  };
  
  // Evaluación Legal
  legal: {
    hasStudyOfTitles: boolean;
    hasLiens: {
      answer: boolean;
      details?: string;
    };
    hasPropertyLimitations: {
      answer: boolean;
      details?: string;
    };
    hasLegalRestrictions: {
      answer: boolean;
      details?: string;
    };
    legalVehicle: string;
    hasDueDiligence: boolean;
    isTaxesCurrent: boolean;
    hasConstructionDeclaration: boolean;
  };
  
  // Evaluación Económica
  economic: {
    nationalEconomicFactors: string;
    internationalTrends: string;
    marketStudyFindings: string;
    availableClusters: string;
    potentialClients: string;
    valueProposition: string;
  };
  
  // Evaluación ASG
  asg: {
    environmental: {
      carbonFootprint: number;
      soilWaterContamination: number;
      climateChangeRisk: number;
    };
    social: {
      communityImpact: number;
      basicServicesAccess: number;
      humanRightsRisk: number;
    };
  };
  
  // Resultados
  results: {
    initialAlerts: string;
    riskLevel: 'bajo' | 'moderado' | 'alto';
    boardApproval: string;
  };
}

interface ComprehensiveEvaluationFormProps {
  onBack: () => void;
  onSave: (data: FormData) => void;
}

const technicalQuestions = [
  "¿El proyecto cuenta con un estudio topográfico actualizado y validado por un profesional competente?",
  "¿Se tiene definida y registrada la localización georreferenciada exacta del predio?",
  "¿Existe un estudio de suelos que garantice la viabilidad y seguridad de la construcción?",
  "¿Se cuenta con confirmación de disponibilidad de agua, energía y gas en el área del proyecto?",
  "¿El predio dispone de vías de acceso en condiciones adecuadas y buena conectividad con el entorno?",
  "¿Se han identificado y evaluado los riesgos de construcción asociados al predio?",
  "¿Se ha verificado la estabilidad del subsuelo y su aptitud para soportar el proyecto?",
  "¿El diseño técnico contempla urbanismo, arquitectura, trazado vial, sistemas hidrosanitario, eléctrico, de comunicaciones y ambientales?",
  "¿El proyecto cuenta con un presupuesto detallado y validado para su desarrollo?",
  "¿Se tiene una programación clara y realista de las fases del proyecto?",
  "¿Se dispone de un plan o ejecución de cerramiento perimetral para el predio o construcción?",
  "¿El proyecto incluye medidas de seguridad física y operativa en todas sus fases?",
  "¿Se verifica el cumplimiento de las normas volumétricas establecidas en la normativa local?",
  "¿El proyecto cumple con los índices de ocupación permitidos en el plan de ordenamiento territorial?",
  "¿Se respeta el índice de construcción definido por la normativa urbanística aplicable?",
  "¿El diseño cumple con los aislamientos reglamentarios exigidos por la normativa?"
];

const asgEnvironmentalOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "Se proyecta usar energías renovables y materiales con baja huella de carbono. El proyecto busca una certificación LEED Gold o superior."
  },
  {
    value: 3,
    label: "Moderado", 
    description: "El proyecto usa la red eléctrica tradicional y no considera la eficiencia energética en el diseño inicial."
  },
  {
    value: 5,
    label: "Muy Alto",
    description: "No se evalúa ni se planea reducir el consumo de energía o emisiones."
  }
];

const soilWaterRiskOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "El terreno no tiene historial de contaminación."
  },
  {
    value: 3,
    label: "Moderado",
    description: "El terreno está cerca de fuentes de agua."
  },
  {
    value: 5,
    label: "Muy Alto", 
    description: "El terreno es un humedal o zona de importancia ambiental."
  }
];

const climateRiskOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "El proyecto se ubica en una zona de baja amenaza por inundaciones o sismos."
  },
  {
    value: 3,
    label: "Moderado",
    description: "La zona tiene historial de inundaciones menores y el diseño cumple con el mínimo de la norma de sismo resistencia (NSR) colombiana."
  },
  {
    value: 5,
    label: "Muy Alto",
    description: "El proyecto está en una zona de alto riesgo de desastres naturales sin medidas de mitigación."
  }
];

const communityImpactOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "Se ha realizado consulta pública y se tiene apoyo de la comunidad."
  },
  {
    value: 3,
    label: "Moderado",
    description: "No se ha consultado a la comunidad, pero no hay oposición visible."
  },
  {
    value: 5,
    label: "Muy Alto",
    description: "La comunidad ha expresado oposición, ha habido protestas o el proyecto desplaza a familias."
  }
];

const basicServicesOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "El proyecto no afectará el acceso de la comunidad a servicios básicos."
  },
  {
    value: 3,
    label: "Moderado",
    description: "El proyecto requiere una gran cantidad de recursos, lo que podría afectar temporalmente a la comunidad."
  },
  {
    value: 5,
    label: "Muy Alto",
    description: "El consumo del proyecto afectará directamente el suministro de agua o energía de la comunidad local."
  }
];

const humanRightsOptions = [
  {
    value: 1,
    label: "Muy Bajo",
    description: "La ubicación presenta un riesgo bajo."
  },
  {
    value: 3,
    label: "Moderado",
    description: "La ubicación presenta un riesgo medio."
  },
  {
    value: 5,
    label: "Muy Alto",
    description: "La ubicación presenta un riesgo alto."
  }
];

export function ComprehensiveEvaluationForm({ onBack, onSave }: ComprehensiveEvaluationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectInfo: {
      name: '',
      type: '',
      location: '',
      city: '',
      country: '',
      duration: ''
    },
    financial: {
      totalArea: 0,
      landPrice: 0,
      roiProjection: '',
      capRate: '',
      ipc: 0,
      trm: 0,
      dtf: 0,
      ibr: 0
    },
    technical: {},
    legal: {
      hasStudyOfTitles: false,
      hasLiens: { answer: false },
      hasPropertyLimitations: { answer: false },
      hasLegalRestrictions: { answer: false },
      legalVehicle: '',
      hasDueDiligence: false,
      isTaxesCurrent: false,
      hasConstructionDeclaration: false
    },
    economic: {
      nationalEconomicFactors: '',
      internationalTrends: '',
      marketStudyFindings: '',
      availableClusters: '',
      potentialClients: '',
      valueProposition: ''
    },
    asg: {
      environmental: {
        carbonFootprint: 0,
        soilWaterContamination: 0,
        climateChangeRisk: 0
      },
      social: {
        communityImpact: 0,
        basicServicesAccess: 0,
        humanRightsRisk: 0
      }
    },
    results: {
      initialAlerts: '',
      riskLevel: 'bajo',
      boardApproval: ''
    }
  });

  const steps = [
    { id: 'info', title: 'Información General', icon: Building },
    { id: 'financial', title: 'Evaluación Financiera', icon: DollarSign },
    { id: 'technical', title: 'Evaluación Técnica', icon: FileText },
    { id: 'legal', title: 'Evaluación Legal', icon: Scale },
    { id: 'economic', title: 'Análisis Económico', icon: TrendingUp },
    { id: 'asg', title: 'Evaluación ASG', icon: Leaf },
    { id: 'results', title: 'Resultados', icon: CheckCircle2 }
  ];

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateTechnicalAnswer = (questionIndex: number, answer: 'si' | 'no' | 'parcial', observations?: string) => {
    setFormData(prev => ({
      ...prev,
      technical: {
        ...prev.technical,
        [questionIndex]: { answer, observations }
      }
    }));
  };

  const calculateRiskLevel = (): 'bajo' | 'moderado' | 'alto' => {
    const { environmental, social } = formData.asg;
    const totalRisk = 
      environmental.carbonFootprint + 
      environmental.soilWaterContamination + 
      environmental.climateChangeRisk +
      social.communityImpact +
      social.basicServicesAccess +
      social.humanRightsRisk;

    if (totalRisk < 10) return 'bajo';
    if (totalRisk <= 20) return 'moderado';
    return 'alto';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // Before going to results, calculate risk level
        const riskLevel = calculateRiskLevel();
        updateFormData('results', { riskLevel });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Nombre del proyecto *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectInfo.name}
                    onChange={(e) => updateFormData('projectInfo', { name: e.target.value })}
                    placeholder="Ej: Centro Logístico Norte"
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectType">Tipo de Proyecto *</Label>
                  <Input
                    id="projectType"
                    value={formData.projectInfo.type}
                    onChange={(e) => updateFormData('projectInfo', { type: e.target.value })}
                    placeholder="Ej: Bodega Industrial, Centro Logístico"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    value={formData.projectInfo.city}
                    onChange={(e) => updateFormData('projectInfo', { city: e.target.value })}
                    placeholder="Ej: Bogotá"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="country">País *</Label>
                  <Input
                    id="country"
                    value={formData.projectInfo.country}
                    onChange={(e) => updateFormData('projectInfo', { country: e.target.value })}
                    placeholder="Ej: Colombia"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Ubicación Completa *</Label>
                  <Input
                    id="location"
                    value={formData.projectInfo.location}
                    onChange={(e) => updateFormData('projectInfo', { location: e.target.value })}
                    placeholder="Ej: Zona Franca Bogotá, Funza, Cundinamarca"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Cronograma (tiempo estimado) *</Label>
                  <Input
                    id="duration"
                    value={formData.projectInfo.duration}
                    onChange={(e) => updateFormData('projectInfo', { duration: e.target.value })}
                    placeholder="Ej: 18 meses"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5" />
                Negociación del Terreno
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalArea">Área total (m2) *</Label>
                  <Input
                    id="totalArea"
                    type="number"
                    value={formData.financial.totalArea}
                    onChange={(e) => updateFormData('financial', { totalArea: Number(e.target.value) })}
                    placeholder="Ej: 50000"
                  />
                </div>
                <div>
                  <Label htmlFor="landPrice">Precio del Terreno (por m2) *</Label>
                  <Input
                    id="landPrice"
                    type="number"
                    value={formData.financial.landPrice}
                    onChange={(e) => updateFormData('financial', { landPrice: Number(e.target.value) })}
                    placeholder="Ej: 150000"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" />
                Proyección de Rentabilidad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roiProjection">Proyección retorno de inversión *</Label>
                  <Input
                    id="roiProjection"
                    value={formData.financial.roiProjection}
                    onChange={(e) => updateFormData('financial', { roiProjection: e.target.value })}
                    placeholder="Ej: 12% anual"
                  />
                </div>
                <div>
                  <Label htmlFor="capRate">Cap Rate *</Label>
                  <Input
                    id="capRate"
                    value={formData.financial.capRate}
                    onChange={(e) => updateFormData('financial', { capRate: e.target.value })}
                    placeholder="Ej: 8.5%"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5" />
                Supuestos Económicos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="ipc">IPC *</Label>
                  <Input
                    id="ipc"
                    type="number"
                    step="0.01"
                    value={formData.financial.ipc}
                    onChange={(e) => updateFormData('financial', { ipc: Number(e.target.value) })}
                    placeholder="Ej: 3.5"
                  />
                </div>
                <div>
                  <Label htmlFor="trm">TRM *</Label>
                  <Input
                    id="trm"
                    type="number"
                    value={formData.financial.trm}
                    onChange={(e) => updateFormData('financial', { trm: Number(e.target.value) })}
                    placeholder="Ej: 4200"
                  />
                </div>
                <div>
                  <Label htmlFor="dtf">DTF *</Label>
                  <Input
                    id="dtf"
                    type="number"
                    step="0.01"
                    value={formData.financial.dtf}
                    onChange={(e) => updateFormData('financial', { dtf: Number(e.target.value) })}
                    placeholder="Ej: 10.5"
                  />
                </div>
                <div>
                  <Label htmlFor="ibr">IBR *</Label>
                  <Input
                    id="ibr"
                    type="number"
                    step="0.01"
                    value={formData.financial.ibr}
                    onChange={(e) => updateFormData('financial', { ibr: Number(e.target.value) })}
                    placeholder="Ej: 12.75"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Responda a cada pregunta técnica seleccionando "Sí", "No" o "Parcial". 
              Para respuestas "Parcial", puede agregar observaciones adicionales.
            </p>
            
            <div className="space-y-6">
              {technicalQuestions.map((question, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="font-medium">{index + 1}. {question}</p>
                      
                      <RadioGroup 
                        value={formData.technical[index]?.answer || ''}
                        onValueChange={(value: 'si' | 'no' | 'parcial') => 
                          updateTechnicalAnswer(index, value, formData.technical[index]?.observations)
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id={`q${index}-si`} />
                          <Label htmlFor={`q${index}-si`} className="text-green-600">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`q${index}-no`} />
                          <Label htmlFor={`q${index}-no`} className="text-red-600">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="parcial" id={`q${index}-parcial`} />
                          <Label htmlFor={`q${index}-parcial`} className="text-yellow-600">Parcial</Label>
                        </div>
                      </RadioGroup>
                      
                      {formData.technical[index]?.answer === 'parcial' && (
                        <div>
                          <Label htmlFor={`obs${index}`}>Observaciones</Label>
                          <Textarea
                            id={`obs${index}`}
                            value={formData.technical[index]?.observations || ''}
                            onChange={(e) => updateTechnicalAnswer(index, 'parcial', e.target.value)}
                            placeholder="Describa los detalles de la respuesta parcial..."
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label>¿El inmueble cuenta con un estudio de títulos?</Label>
                    <RadioGroup 
                      value={formData.legal.hasStudyOfTitles.toString()}
                      onValueChange={(value) => updateFormData('legal', { hasStudyOfTitles: value === 'true' })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="titles-si" />
                        <Label htmlFor="titles-si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="titles-no" />
                        <Label htmlFor="titles-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label>¿El inmueble tiene algún gravamen (Plusvalía, valorización)?</Label>
                    <RadioGroup 
                      value={formData.legal.hasLiens.answer.toString()}
                      onValueChange={(value) => updateFormData('legal', { 
                        hasLiens: { 
                          answer: value === 'true',
                          details: value === 'false' ? '' : formData.legal.hasLiens.details
                        }
                      })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="liens-si" />
                        <Label htmlFor="liens-si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="liens-no" />
                        <Label htmlFor="liens-no">No</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.legal.hasLiens.answer && (
                      <div>
                        <Label htmlFor="liens-details">¿Cuál?</Label>
                        <Input
                          id="liens-details"
                          value={formData.legal.hasLiens.details || ''}
                          onChange={(e) => updateFormData('legal', { 
                            hasLiens: { ...formData.legal.hasLiens, details: e.target.value }
                          })}
                          placeholder="Especifique el tipo de gravamen..."
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label>¿El inmueble tiene alguna limitación a la propiedad (Usufructos, servidumbre, RPH, hipoteca)?</Label>
                    <RadioGroup 
                      value={formData.legal.hasPropertyLimitations.answer.toString()}
                      onValueChange={(value) => updateFormData('legal', { 
                        hasPropertyLimitations: { 
                          answer: value === 'true',
                          details: value === 'false' ? '' : formData.legal.hasPropertyLimitations.details
                        }
                      })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="limitations-si" />
                        <Label htmlFor="limitations-si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="limitations-no" />
                        <Label htmlFor="limitations-no">No</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.legal.hasPropertyLimitations.answer && (
                      <div>
                        <Label htmlFor="limitations-details">¿Cuál?</Label>
                        <Input
                          id="limitations-details"
                          value={formData.legal.hasPropertyLimitations.details || ''}
                          onChange={(e) => updateFormData('legal', { 
                            hasPropertyLimitations: { ...formData.legal.hasPropertyLimitations, details: e.target.value }
                          })}
                          placeholder="Especifique el tipo de limitación..."
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label>¿La sociedad o el representante legal tienen alguna restricción legal para la adquisición o firma de los contratos relacionados con el inmueble?</Label>
                    <RadioGroup 
                      value={formData.legal.hasLegalRestrictions.answer.toString()}
                      onValueChange={(value) => updateFormData('legal', { 
                        hasLegalRestrictions: { 
                          answer: value === 'true',
                          details: value === 'false' ? '' : formData.legal.hasLegalRestrictions.details
                        }
                      })}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="restrictions-si" />
                        <Label htmlFor="restrictions-si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="restrictions-no" />
                        <Label htmlFor="restrictions-no">No</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.legal.hasLegalRestrictions.answer && (
                      <div>
                        <Label htmlFor="restrictions-details">¿Cuál?</Label>
                        <Input
                          id="restrictions-details"
                          value={formData.legal.hasLegalRestrictions.details || ''}
                          onChange={(e) => updateFormData('legal', { 
                            hasLegalRestrictions: { ...formData.legal.hasLegalRestrictions, details: e.target.value }
                          })}
                          placeholder="Especifique el tipo de restricción..."
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="legalVehicle">¿Cuál es el vehículo jurídico de adquisición seleccionado?</Label>
                    <Input
                      id="legalVehicle"
                      value={formData.legal.legalVehicle}
                      onChange={(e) => updateFormData('legal', { legalVehicle: e.target.value })}
                      placeholder="Ej: Sociedad Anónima, SAS, Fideicomiso..."
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>¿El propietario del inmueble cuenta con un estudio de debida diligencia?</Label>
                      <RadioGroup 
                        value={formData.legal.hasDueDiligence.toString()}
                        onValueChange={(value) => updateFormData('legal', { hasDueDiligence: value === 'true' })}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="diligence-si" />
                          <Label htmlFor="diligence-si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="diligence-no" />
                          <Label htmlFor="diligence-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>¿El inmueble se encuentra al día en el pago del impuesto predial y demás que le apliquen?</Label>
                      <RadioGroup 
                        value={formData.legal.isTaxesCurrent.toString()}
                        onValueChange={(value) => updateFormData('legal', { isTaxesCurrent: value === 'true' })}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="taxes-si" />
                          <Label htmlFor="taxes-si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="taxes-no" />
                          <Label htmlFor="taxes-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>¿El inmueble cuenta con declaración de construcción?</Label>
                      <RadioGroup 
                        value={formData.legal.hasConstructionDeclaration.toString()}
                        onValueChange={(value) => updateFormData('legal', { hasConstructionDeclaration: value === 'true' })}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="construction-si" />
                          <Label htmlFor="construction-si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="construction-no" />
                          <Label htmlFor="construction-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'economic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="nationalFactors">¿Qué factores económicos nacionales han sido analizados (crecimiento, inversión, políticas públicas) y cómo impactan en el proyecto?</Label>
                    <Textarea
                      id="nationalFactors"
                      value={formData.economic.nationalEconomicFactors}
                      onChange={(e) => updateFormData('economic', { nationalEconomicFactors: e.target.value })}
                      placeholder="Describa los factores económicos nacionales analizados y su impacto..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="internationalTrends">¿Qué condiciones o tendencias internacionales se han considerado y de qué manera influyen en la viabilidad del proyecto?</Label>
                    <Textarea
                      id="internationalTrends"
                      value={formData.economic.internationalTrends}
                      onChange={(e) => updateFormData('economic', { internationalTrends: e.target.value })}
                      placeholder="Describa las tendencias internacionales consideradas..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="marketStudy">¿Qué hallazgos principales se obtuvieron del estudio de mercado en relación con la demanda, oferta y competencia en el sector?</Label>
                    <Textarea
                      id="marketStudy"
                      value={formData.economic.marketStudyFindings}
                      onChange={(e) => updateFormData('economic', { marketStudyFindings: e.target.value })}
                      placeholder="Resuma los hallazgos del estudio de mercado..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="clusters">¿Qué clusters económicos o industriales existen en la región y cómo se relacionan con las oportunidades para el proyecto?</Label>
                    <Textarea
                      id="clusters"
                      value={formData.economic.availableClusters}
                      onChange={(e) => updateFormData('economic', { availableClusters: e.target.value })}
                      placeholder="Describa los clusters disponibles y sus oportunidades..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="potentialClients">¿Quiénes son los clientes potenciales identificados para la Zona Franca y qué necesidades o características específicas presentan?</Label>
                    <Textarea
                      id="potentialClients"
                      value={formData.economic.potentialClients}
                      onChange={(e) => updateFormData('economic', { potentialClients: e.target.value })}
                      placeholder="Identifique los clientes potenciales y sus necesidades..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label htmlFor="valueProposition">¿Cuál es la propuesta de valor definida para atraer a los clientes y en qué se diferencia de la competencia?</Label>
                    <Textarea
                      id="valueProposition"
                      value={formData.economic.valueProposition}
                      onChange={(e) => updateFormData('economic', { valueProposition: e.target.value })}
                      placeholder="Describa la propuesta de valor única del proyecto..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'asg':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-6">
                <Leaf className="h-6 w-6 text-green-600" />
                Evaluación Ambiental
              </h3>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo por Huella de carbono y emisiones del proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.environmental.carbonFootprint.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        environmental: { ...formData.asg.environmental, carbonFootprint: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {asgEnvironmentalOptions.map(option => {
                        const isSelected = formData.asg.environmental.carbonFootprint === option.value;
                        const bgColor = option.value === 1 ? 'hover:bg-green-50' : option.value === 3 ? 'hover:bg-yellow-50' : 'hover:bg-red-50';
                        const selectedBg = option.value === 1 ? 'bg-green-100 border-green-300' : option.value === 3 ? 'bg-yellow-100 border-yellow-300' : 'bg-red-100 border-red-300';
                        
                        return (
                          <div key={option.value} className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${bgColor} ${isSelected ? selectedBg : ''}`}>
                            <RadioGroupItem value={option.value.toString()} id={`carbon-${option.value}`} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={`carbon-${option.value}`} className="font-medium cursor-pointer">
                                {option.value} - {option.label}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo de Contaminación del Suelo y Agua</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.environmental.soilWaterContamination.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        environmental: { ...formData.asg.environmental, soilWaterContamination: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {soilWaterRiskOptions.map(option => {
                        const isSelected = formData.asg.environmental.soilWaterContamination === option.value;
                        const bgColor = option.value === 1 ? 'hover:bg-green-50' : option.value === 3 ? 'hover:bg-yellow-50' : 'hover:bg-red-50';
                        const selectedBg = option.value === 1 ? 'bg-green-100 border-green-300' : option.value === 3 ? 'bg-yellow-100 border-yellow-300' : 'bg-red-100 border-red-300';
                        
                        return (
                          <div key={option.value} className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${bgColor} ${isSelected ? selectedBg : ''}`}>
                            <RadioGroupItem value={option.value.toString()} id={`soil-${option.value}`} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={`soil-${option.value}`} className="font-medium cursor-pointer">
                                {option.value} - {option.label}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo de cambio climático y desastres naturales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.environmental.climateChangeRisk.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        environmental: { ...formData.asg.environmental, climateChangeRisk: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {climateRiskOptions.map(option => (
                        <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={option.value.toString()} id={`climate-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`climate-${option.value}`} className="font-medium">
                              {option.value} - {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                Evaluación Social
              </h3>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo de Impacto en la Comunidad Local</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.social.communityImpact.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        social: { ...formData.asg.social, communityImpact: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {communityImpactOptions.map(option => (
                        <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={option.value.toString()} id={`community-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`community-${option.value}`} className="font-medium">
                              {option.value} - {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo de Acceso a Servicios Básicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.social.basicServicesAccess.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        social: { ...formData.asg.social, basicServicesAccess: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {basicServicesOptions.map(option => (
                        <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={option.value.toString()} id={`services-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`services-${option.value}`} className="font-medium">
                              {option.value} - {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Derechos humanos (Riesgo por grupos armados)</CardTitle>
                    <CardDescription>Basado en los "Mapas de Riesgo a la vulneración de derechos a la vida, libertad, integridad y seguridad"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.asg.social.humanRightsRisk.toString()}
                      onValueChange={(value) => updateFormData('asg', { 
                        social: { ...formData.asg.social, humanRightsRisk: Number(value) }
                      })}
                      className="space-y-4"
                    >
                      {humanRightsOptions.map(option => (
                        <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={option.value.toString()} id={`rights-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`rights-${option.value}`} className="font-medium">
                              {option.value} - {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'results':
        const totalRisk = 
          formData.asg.environmental.carbonFootprint + 
          formData.asg.environmental.soilWaterContamination + 
          formData.asg.environmental.climateChangeRisk +
          formData.asg.social.communityImpact +
          formData.asg.social.basicServicesAccess +
          formData.asg.social.humanRightsRisk;

        const riskLevel = totalRisk < 10 ? 'bajo' : totalRisk <= 20 ? 'moderado' : 'alto';
        const riskColor = riskLevel === 'bajo' ? 'text-green-600' : riskLevel === 'moderado' ? 'text-yellow-600' : 'text-red-600';
        const riskBg = riskLevel === 'bajo' ? 'bg-green-100' : riskLevel === 'moderado' ? 'bg-yellow-100' : 'bg-red-100';

        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="initialAlerts">Alertas encontradas en fase inicial</Label>
                  <Textarea
                    id="initialAlerts"
                    value={formData.results.initialAlerts}
                    onChange={(e) => updateFormData('results', { initialAlerts: e.target.value })}
                    placeholder="Resuma los hallazgos y alertas identificados durante la evaluación..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Resultado de Riesgo (Cálculo automático)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-lg ${riskBg}`}>
                      <span className={`font-medium ${riskColor}`}>
                        Puntuación Total: {totalRisk}
                      </span>
                    </div>
                    <Badge 
                      variant={riskLevel === 'bajo' ? 'default' : 'destructive'}
                      className={`text-lg px-4 py-2 ${riskColor} ${riskBg} border-0`}
                    >
                      Riesgo {riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>• Menor a 10: Riesgo bajo (verde)</p>
                    <p>• Entre 10 y 20: Riesgo moderado (amarillo)</p>
                    <p>• Mayor a 20: Riesgo alto (rojo)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Riesgo Ambiental</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {formData.asg.environmental.carbonFootprint + 
                         formData.asg.environmental.soilWaterContamination + 
                         formData.asg.environmental.climateChangeRisk}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Riesgo Social</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {formData.asg.social.communityImpact + 
                         formData.asg.social.basicServicesAccess + 
                         formData.asg.social.humanRightsRisk}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="boardApproval">Aprobación de junta directiva</Label>
                  <Textarea
                    id="boardApproval"
                    value={formData.results.boardApproval}
                    onChange={(e) => updateFormData('results', { boardApproval: e.target.value })}
                    placeholder="Estado de la aprobación, comentarios de la junta directiva..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Evaluación Integral del Proyecto</h1>
                <p className="text-muted-foreground">
                  Formulario completo de evaluación ASG para proyectos inmobiliarios industriales
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso del formulario</span>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} de {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <Button
                    key={step.id}
                    variant={isActive ? 'default' : isCompleted ? 'secondary' : 'outline'}
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setCurrentStep(index)}
                  >
                    <StepIcon className="h-4 w-4" />
                    {step.title}
                    {isCompleted && <CheckCircle2 className="h-4 w-4" />}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <div className="flex gap-2">
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Guardar Evaluación
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}