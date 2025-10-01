import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Plus, Search, FileText, Leaf } from 'lucide-react';
import { mockProjects } from './data/mock-data';
import { Project } from './types/asg';

// Components
import { DashboardStats } from './components/dashboard/DashboardStats';
import { ProjectFilters } from './components/dashboard/ProjectFilters';
import { ProjectCard } from './components/dashboard/ProjectCard';
import { ProjectDetail } from './components/project/ProjectDetail';
import { ProjectHistory } from './components/project/ProjectHistory';
import { EvaluationForm } from './components/evaluation/EvaluationForm';
import { QuickEvaluationForm } from './components/evaluation/QuickEvaluationForm';
import { ComprehensiveEvaluationForm } from './components/evaluation/ComprehensiveEvaluationForm';

type ViewMode = 'dashboard' | 'project-detail' | 'project-history' | 'evaluation' | 'new-project' | 'quick-evaluation' | 'comprehensive-evaluation';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<'factibilidad' | 'diseño' | 'construccion'>('factibilidad');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    phase: '',
    riskLevel: '',
    scoreRange: ''
  });

  const [projects, setProjects] = useState<Project[]>(mockProjects);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesPhase = !filters.phase || project.currentPhase === filters.phase;
    const matchesRisk = !filters.riskLevel || project.riskLevel === filters.riskLevel;
    
    let matchesScore = true;
    if (filters.scoreRange) {
      const [min, max] = filters.scoreRange.split('-').map(Number);
      matchesScore = project.asgScore >= min && project.asgScore <= max;
    }

    return matchesSearch && matchesStatus && matchesPhase && matchesRisk && matchesScore;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      phase: '',
      riskLevel: '',
      scoreRange: ''
    });
    setSearchTerm('');
  };

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleEditEvaluation = (phase: 'factibilidad' | 'diseño' | 'construccion') => {
    setSelectedPhase(phase);
    setCurrentView('evaluation');
  };

  const handleViewHistory = () => {
    setCurrentView('project-history');
  };

  const handleSaveEvaluation = (evaluations: any[]) => {
    // In a real app, this would save to the database
    console.log('Saving evaluations:', evaluations);
    setCurrentView('project-detail');
  };

  const handleSaveQuickEvaluation = (projectData: any) => {
    // Create new project from quick evaluation
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.projectInfo.name,
      location: projectData.projectInfo.location,
      currentPhase: projectData.phase,
      asgScore: projectData.scores.overall,
      environmentalScore: projectData.scores.ambiental,
      socialScore: projectData.scores.social,
      governanceScore: projectData.scores.gobernanza,
      riskLevel: projectData.scores.overall >= 80 ? 'bajo' : projectData.scores.overall >= 60 ? 'medio' : 'alto',
      startDate: new Date().toISOString().split('T')[0],
      expectedEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'en_progreso',
      projectType: projectData.projectInfo.type,
      area: projectData.projectInfo.area,
      budget: projectData.projectInfo.budget
    };

    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
    setCurrentView('project-detail');
  };

  const handleSaveComprehensiveEvaluation = (projectData: any) => {
    // Create new project from comprehensive evaluation
    const asgScore = calculateASGScore(projectData);
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.projectInfo.name,
      location: `${projectData.projectInfo.city}, ${projectData.projectInfo.country}`,
      currentPhase: 'factibilidad',
      asgScore: asgScore,
      environmentalScore: calculateEnvironmentalScore(projectData.asg.environmental),
      socialScore: calculateSocialScore(projectData.asg.social),
      governanceScore: 75, // Default governance score
      riskLevel: projectData.results.riskLevel,
      startDate: new Date().toISOString().split('T')[0],
      expectedEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planificacion',
      projectType: projectData.projectInfo.type,
      area: projectData.financial.totalArea,
      budget: projectData.financial.landPrice * projectData.financial.totalArea
    };

    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
    setCurrentView('project-detail');
  };

  const calculateASGScore = (projectData: any): number => {
    const envScore = calculateEnvironmentalScore(projectData.asg.environmental);
    const socScore = calculateSocialScore(projectData.asg.social);
    const govScore = 75; // Default governance score
    return Math.round((envScore + socScore + govScore) / 3);
  };

  const calculateEnvironmentalScore = (environmental: any): number => {
    const totalRisk = environmental.carbonFootprint + environmental.soilWaterContamination + environmental.climateChangeRisk;
    // Convert risk to score (lower risk = higher score)
    return Math.max(0, 100 - (totalRisk * 6));
  };

  const calculateSocialScore = (social: any): number => {
    const totalRisk = social.communityImpact + social.basicServicesAccess + social.humanRightsRisk;
    // Convert risk to score (lower risk = higher score)
    return Math.max(0, 100 - (totalRisk * 6));
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const renderContent = () => {
    switch (currentView) {
      case 'project-detail':
        return selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={() => setCurrentView('dashboard')}
            onEditEvaluation={handleEditEvaluation}
            onViewHistory={handleViewHistory}
          />
        ) : null;

      case 'project-history':
        return (
          <ProjectHistory
            projectId={selectedProjectId}
            onBack={() => setCurrentView('project-detail')}
          />
        );

      case 'evaluation':
        return selectedProject ? (
          <EvaluationForm
            projectId={selectedProject.id}
            projectName={selectedProject.name}
            phase={selectedPhase}
            onBack={() => setCurrentView('project-detail')}
            onSave={handleSaveEvaluation}
          />
        ) : null;

      case 'quick-evaluation':
        return (
          <QuickEvaluationForm
            onBack={() => setCurrentView('dashboard')}
            onSave={handleSaveQuickEvaluation}
          />
        );

      case 'comprehensive-evaluation':
        return (
          <ComprehensiveEvaluationForm
            onBack={() => setCurrentView('dashboard')}
            onSave={handleSaveComprehensiveEvaluation}
          />
        );

      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Sistema ASG - Real Estate Industrial</h1>
                <p className="text-muted-foreground mt-1">
                  Evaluación y trazabilidad de sostenibilidad para proyectos inmobiliarios
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setCurrentView('comprehensive-evaluation')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Evaluación Integral
                </Button>
                <Button 
                  onClick={() => setCurrentView('quick-evaluation')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Evaluación Rápida
                </Button>
              </div>
            </div>

            {/* Evaluation Options Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 border rounded-lg bg-blue-50">
                <h3 className="flex items-center gap-2 font-semibold text-blue-900 mb-3">
                  <FileText className="h-5 w-5" />
                  Evaluación Integral
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Formulario completo que incluye: información general, evaluación financiera, técnica, legal, 
                  económica y ASG. Ideal para análisis exhaustivo de factibilidad.
                </p>
                <Button 
                  onClick={() => setCurrentView('comprehensive-evaluation')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  Iniciar Evaluación Integral
                </Button>
              </div>
              
              <div className="p-6 border rounded-lg bg-green-50">
                <h3 className="flex items-center gap-2 font-semibold text-green-900 mb-3">
                  <Leaf className="h-5 w-5" />
                  Evaluación Rápida ASG
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  Evaluación interactiva enfocada en criterios ASG (Ambiental, Social, Gobernanza) 
                  con scoring en tiempo real y navegación paso a paso.
                </p>
                <Button 
                  onClick={() => setCurrentView('quick-evaluation')}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Iniciar Evaluación Rápida
                </Button>
              </div>
            </div>

            {/* Stats */}
            <DashboardStats projects={filteredProjects} />

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar proyectos por nombre o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <ProjectFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Projects Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Proyectos ({filteredProjects.length})
                </h2>
              </div>
              
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={handleViewProject}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    No se encontraron proyectos que coincidan con los criterios de búsqueda.
                  </div>
                  <Button 
                    onClick={handleClearFilters}
                    variant="outline"
                    className="mt-4"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
}