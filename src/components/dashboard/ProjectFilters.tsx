import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Filter, X } from 'lucide-react';

interface ProjectFiltersProps {
  filters: {
    status: string;
    phase: string;
    riskLevel: string;
    scoreRange: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
}

export function ProjectFilters({ filters, onFilterChange, onClearFilters }: ProjectFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filtros</span>
        {hasActiveFilters && (
          <Button 
            onClick={onClearFilters} 
            variant="ghost" 
            size="sm"
            className="ml-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Estado</label>
          <Select value={filters.status || "all"} onValueChange={(value) => onFilterChange('status', value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="planificacion">Planificación</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="suspendido">Suspendido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Fase</label>
          <Select value={filters.phase || "all"} onValueChange={(value) => onFilterChange('phase', value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las fases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fases</SelectItem>
              <SelectItem value="factibilidad">Factibilidad</SelectItem>
              <SelectItem value="diseño">Diseño</SelectItem>
              <SelectItem value="construccion">Construcción</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Nivel de Riesgo</label>
          <Select value={filters.riskLevel || "all"} onValueChange={(value) => onFilterChange('riskLevel', value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los riesgos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los riesgos</SelectItem>
              <SelectItem value="bajo">Riesgo Bajo</SelectItem>
              <SelectItem value="medio">Riesgo Medio</SelectItem>
              <SelectItem value="alto">Riesgo Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Score ASG</label>
          <Select value={filters.scoreRange || "all"} onValueChange={(value) => onFilterChange('scoreRange', value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los scores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los scores</SelectItem>
              <SelectItem value="80-100">Excelente (80-100)</SelectItem>
              <SelectItem value="60-79">Aceptable (60-79)</SelectItem>
              <SelectItem value="0-59">Requiere Mejora (0-59)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">Filtros activos:</div>
          <div className="flex flex-wrap gap-2">
            {filters.status && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Estado: {filters.status}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onFilterChange('status', '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.phase && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Fase: {filters.phase}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onFilterChange('phase', '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.riskLevel && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Riesgo: {filters.riskLevel}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onFilterChange('riskLevel', '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.scoreRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Score: {filters.scoreRange}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onFilterChange('scoreRange', '')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}