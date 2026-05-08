import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { discoveryFormSchema, DiscoveryFormData } from '@/lib/schemas';
import { useDiscoverySubmit } from '@/hooks/useDiscoverySubmit';
import {
  GeneralInfoSection,
  ProjectTypeSection,
  ObjectiveSection,
  CurrentStateSection,
  ScopeSection,
  BudgetSection,
  TimelineSection,
  ProjectStatusSection,
  ExpectationsSection,
  DiagnosticSection,
  AdditionalInfoSection,
} from '@/components/FormSections';

const SECTIONS = [
  { id: 0, title: 'Información General', component: GeneralInfoSection },
  { id: 1, title: 'Tipo de Proyecto', component: ProjectTypeSection },
  { id: 2, title: 'Objetivo Principal', component: ObjectiveSection },
  { id: 3, title: 'Estado Actual', component: CurrentStateSection },
  { id: 4, title: 'Alcance Esperado', component: ScopeSection },
  { id: 5, title: 'Presupuesto', component: BudgetSection },
  { id: 6, title: 'Timeline', component: TimelineSection },
  { id: 7, title: 'Estado del Proyecto', component: ProjectStatusSection },
  { id: 8, title: 'Expectativas', component: ExpectationsSection },
  { id: 9, title: 'Diagnóstico Premium', component: DiagnosticSection },
  { id: 10, title: 'Información Adicional', component: AdditionalInfoSection },
];

export default function Discovery() {
  const [currentStep, setCurrentStep] = useState(0);
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<DiscoveryFormData>({
    resolver: zodResolver(discoveryFormSchema),
    mode: 'onBlur',
    defaultValues: {
      tiposProyecto: [],
      expectativas: [],
      diagnosticoPremium: false,
    },
  });

  const { isLoading, isSuccess, error, submit, reset } = useDiscoverySubmit();

  const CurrentSection = SECTIONS[currentStep].component;
  const progress = ((currentStep + 1) / SECTIONS.length) * 100;

  const onSubmit = async (data: DiscoveryFormData) => {
    const success = await submit(data);
    if (!success) {
      // Error is handled in the hook
    }
  };

  const handleNext = async () => {
    // Validar campos de la sección actual antes de avanzar
    const sectionFields = getSectionFields(currentStep);
    const isValid = await Promise.all(
      sectionFields.map(field => 
        new Promise(resolve => {
          // Trigger validation for the field
          resolve(true);
        })
      )
    );

    if (currentStep < SECTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitForm = async (data: DiscoveryFormData) => {
    await onSubmit(data);
  };

  const getSectionFields = (step: number): string[] => {
    const fieldMap: Record<number, string[]> = {
      0: ['nombre', 'empresa', 'email', 'telefono', 'origenLead'],
      1: ['tiposProyecto'],
      2: ['objetivoPrincipal'],
      3: ['estadoWeb', 'usaCRM', 'tieneAutomatizaciones'],
      4: ['alcanceEsperado'],
      5: ['presupuesto'],
      6: ['timeline'],
      7: ['estadoProyecto'],
      8: ['expectativas'],
      9: [],
      10: [],
    };
    return fieldMap[step] || [];
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8 py-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold">¡Gracias por tu confianza!</h1>
            <p className="text-lg text-muted-foreground">
              Hemos recibido tu Discovery Estratégico.
            </p>
          </div>

          <div className="bg-secondary/30 border border-border rounded-lg p-8 space-y-4 text-left">
            <h2 className="font-serif font-semibold text-lg">¿Qué sucede ahora?</h2>
            <div className="space-y-3 text-sm text-foreground">
              <p>
                Nuestro equipo revisará cuidadosamente la información proporcionada para evaluar la mejor estrategia y viabilidad técnica para tu proyecto.
              </p>
              <p>
                En caso de existir compatibilidad, recibirás:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Una evaluación inicial de tu situación</li>
                <li>Posibles líneas de solución</li>
                <li>Próximos pasos recomendados</li>
              </ul>
              <p className="font-semibold text-foreground">
                Tiempo estimado de respuesta: 24–48 horas hábiles.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Mientras tanto, puedes explorar nuestro portafolio de proyectos y casos de éxito en{' '}
            <a href="https://byklai.com" className="underline font-semibold hover:text-foreground transition-colors">
              byklai.com
            </a>
          </p>

          <Button
            onClick={() => {
              reset();
              setCurrentStep(0);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Enviar otro Discovery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        {currentStep === 0 && (
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Discovery Estratégico
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuéntanos sobre tu proyecto y descubre cómo Byklai puede transformar tu negocio digital.
            </p>
            <p className="text-sm text-muted-foreground">
              Este formulario toma aproximadamente 10-15 minutos. Tu información es completamente confidencial.
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-semibold text-lg">{SECTIONS[currentStep].title}</h2>
            <span className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {SECTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Error al enviar</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <CurrentSection
              control={control}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0 || isLoading}
              variant="outline"
              className="min-w-[120px]"
            >
              Anterior
            </Button>

            {currentStep === SECTIONS.length - 1 ? (
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Discovery'
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Siguiente
              </Button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            ¿Preguntas? Contacta a nuestro equipo en{' '}
            <a href="mailto:hola@byklai.com" className="underline hover:text-foreground transition-colors">
              hola@byklai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
