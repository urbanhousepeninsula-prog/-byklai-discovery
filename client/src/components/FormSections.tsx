import { Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DiscoveryFormData } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormSectionProps {
  control: any;
  watch: UseFormWatch<DiscoveryFormData>;
  setValue: UseFormSetValue<DiscoveryFormData>;
  errors: any;
}

export function GeneralInfoSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-4">Información General</h3>
        <p className="text-sm text-muted-foreground mb-6">Cuéntanos quién eres y cómo podemos contactarte.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre Completo *</Label>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="nombre"
                placeholder="Tu nombre"
                className="font-sans"
              />
            )}
          />
          {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa / Proyecto *</Label>
          <Controller
            name="empresa"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="empresa"
                placeholder="Nombre de tu empresa"
                className="font-sans"
              />
            )}
          />
          {errors.empresa && <p className="text-xs text-destructive">{errors.empresa.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="font-sans"
              />
            )}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="telefono"
                placeholder="+52 1234567890"
                className="font-sans"
              />
            )}
          />
          {errors.telefono && <p className="text-xs text-destructive">{errors.telefono.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sitioWeb">Sitio Web</Label>
        <Controller
          name="sitioWeb"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="sitioWeb"
              type="url"
              placeholder="https://tuempresa.com"
              className="font-sans"
            />
          )}
        />
        {errors.sitioWeb && <p className="text-xs text-destructive">{errors.sitioWeb.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="redesSociales">Redes Sociales</Label>
        <Controller
          name="redesSociales"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="redesSociales"
              placeholder="@tuempresa en Instagram, LinkedIn, etc."
              className="font-sans"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="origenLead">¿Cómo nos encontraste? *</Label>
          <Controller
            name="origenLead"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="origenLead">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="referencia">Referencia</SelectItem>
                  <SelectItem value="redes-sociales">Redes Sociales</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.origenLead && <p className="text-xs text-destructive">{errors.origenLead.message}</p>}
        </div>

        <div className="space-y-2 flex items-end">
          <Controller
            name="esDecison"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="esDecison"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="esDecison" className="font-normal cursor-pointer">
                  Soy tomador de decisiones
                </Label>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export function ProjectTypeSection({ control, errors }: FormSectionProps) {
  const projectTypes = [
    'Automatización de procesos',
    'WhatsApp Automation',
    'Branding y Estrategia Digital',
    'Landing Pages',
    'E-commerce',
    'CMS',
    'Sistemas de Leads',
    'Integración de APIs',
    'Funnels de Venta',
    'IA aplicada a negocio',
    'Otro',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Tipo de Proyecto</h3>
        <p className="text-sm text-muted-foreground mb-6">¿En qué áreas necesitas apoyo? (Puedes seleccionar más de una)</p>
      </div>

      <Controller
        name="tiposProyecto"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={field.value?.includes(type) || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), type]
                      : field.value?.filter((t: string) => t !== type) || [];
                    field.onChange(newValue);
                  }}
                />
                <Label htmlFor={type} className="font-normal cursor-pointer text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        )}
      />
      {errors.tiposProyecto && <p className="text-xs text-destructive">{errors.tiposProyecto.message}</p>}
    </div>
  );
}

export function ObjectiveSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Objetivo Principal</h3>
        <p className="text-sm text-muted-foreground mb-6">Describe el problema que buscas resolver o el objetivo clave que esperas alcanzar.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objetivoPrincipal">¿Cuál es tu objetivo principal? *</Label>
        <Controller
          name="objetivoPrincipal"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="objetivoPrincipal"
              placeholder="Ej: Necesito reducir el tiempo de respuesta a leads en un 70% y aumentar la tasa de conversión..."
              rows={5}
              className="font-sans resize-none"
            />
          )}
        />
        <p className="text-xs text-muted-foreground">Mínimo 50 caracteres</p>
        {errors.objetivoPrincipal && <p className="text-xs text-destructive">{errors.objetivoPrincipal.message}</p>}
      </div>
    </div>
  );
}

export function CurrentStateSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Estado Actual de tu Negocio</h3>
        <p className="text-sm text-muted-foreground mb-6">Ayúdanos a entender tu situación digital actual.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label>¿Tu negocio ya cuenta con un sitio web? *</Label>
          <Controller
            name="estadoWeb"
            control={control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="funcionando" id="web1" />
                  <Label htmlFor="web1" className="font-normal cursor-pointer">Sí, y está funcionando bien</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mejoras" id="web2" />
                  <Label htmlFor="web2" className="font-normal cursor-pointer">Sí, pero necesita mejoras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-resultados" id="web3" />
                  <Label htmlFor="web3" className="font-normal cursor-pointer">Sí, pero no genera resultados</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="web4" />
                  <Label htmlFor="web4" className="font-normal cursor-pointer">No, es un proyecto nuevo</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.estadoWeb && <p className="text-xs text-destructive">{errors.estadoWeb.message}</p>}
        </div>

        <div className="space-y-3">
          <Label>¿Utilizas algún CRM? *</Label>
          <Controller
            name="usaCRM"
            control={control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="profesional" id="crm1" />
                  <Label htmlFor="crm1" className="font-normal cursor-pointer">Sí, un CRM profesional (HubSpot, Salesforce, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basico" id="crm2" />
                  <Label htmlFor="crm2" className="font-normal cursor-pointer">Sí, pero es básico (Google Sheets, Excel)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="crm3" />
                  <Label htmlFor="crm3" className="font-normal cursor-pointer">No, gestionamos todo manualmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evaluando" id="crm4" />
                  <Label htmlFor="crm4" className="font-normal cursor-pointer">No, pero estamos evaluando opciones</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.usaCRM && <p className="text-xs text-destructive">{errors.usaCRM.message}</p>}
        </div>

        <div className="space-y-3">
          <Label>¿Tienes automatizaciones implementadas? *</Label>
          <Controller
            name="tieneAutomatizaciones"
            control={control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="varias" id="auto1" />
                  <Label htmlFor="auto1" className="font-normal cursor-pointer">Sí, varias y complejas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basicas" id="auto2" />
                  <Label htmlFor="auto2" className="font-normal cursor-pointer">Sí, algunas básicas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ninguna" id="auto3" />
                  <Label htmlFor="auto3" className="font-normal cursor-pointer">No, ninguna</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prioridad" id="auto4" />
                  <Label htmlFor="auto4" className="font-normal cursor-pointer">No, pero es una prioridad</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.tieneAutomatizaciones && <p className="text-xs text-destructive">{errors.tieneAutomatizaciones.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="herramientasActuales">Herramientas que utilizas actualmente</Label>
        <Controller
          name="herramientasActuales"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="herramientasActuales"
              placeholder="Ej: Mailchimp, Zapier, Shopify, WordPress, n8n..."
              className="font-sans"
            />
          )}
        />
      </div>
    </div>
  );
}

export function ScopeSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Alcance Esperado</h3>
        <p className="text-sm text-muted-foreground mb-6">¿Cuál es tu visión para este proyecto?</p>
      </div>

      <Controller
        name="alcanceEsperado"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mvp" id="scope1" />
              <Label htmlFor="scope1" className="font-normal cursor-pointer">Un MVP para validar una idea rápidamente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completo" id="scope2" />
              <Label htmlFor="scope2" className="font-normal cursor-pointer">Un proyecto completo con todas las funcionalidades</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="consultoria" id="scope3" />
              <Label htmlFor="scope3" className="font-normal cursor-pointer">Solo consultoría estratégica y plan de acción</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mantenimiento" id="scope4" />
              <Label htmlFor="scope4" className="font-normal cursor-pointer">Mantenimiento y optimización de un sistema existente</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.alcanceEsperado && <p className="text-xs text-destructive">{errors.alcanceEsperado.message}</p>}
    </div>
  );
}

export function BudgetSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Presupuesto Estimado</h3>
        <p className="text-sm text-muted-foreground mb-6">¿Cuál es el rango de presupuesto que has asignado?</p>
      </div>

      <Controller
        name="presupuesto"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="menos-1k" id="budget1" />
              <Label htmlFor="budget1" className="font-normal cursor-pointer">Menos de $1,000 USD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1k-3k" id="budget2" />
              <Label htmlFor="budget2" className="font-normal cursor-pointer">$1,000 - $3,000 USD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3k-5k" id="budget3" />
              <Label htmlFor="budget3" className="font-normal cursor-pointer">$3,000 - $5,000 USD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5k-10k" id="budget4" />
              <Label htmlFor="budget4" className="font-normal cursor-pointer">$5,000 - $10,000 USD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10k-plus" id="budget5" />
              <Label htmlFor="budget5" className="font-normal cursor-pointer">Más de $10,000 USD</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.presupuesto && <p className="text-xs text-destructive">{errors.presupuesto.message}</p>}
    </div>
  );
}

export function TimelineSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Timeline Esperado</h3>
        <p className="text-sm text-muted-foreground mb-6">¿Cuál es tu plazo ideal?</p>
      </div>

      <Controller
        name="timeline"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgente" id="timeline1" />
              <Label htmlFor="timeline1" className="font-normal cursor-pointer">Urgente (menos de 2 semanas)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="corto" id="timeline2" />
              <Label htmlFor="timeline2" className="font-normal cursor-pointer">Corto plazo (2-4 semanas)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mediano" id="timeline3" />
              <Label htmlFor="timeline3" className="font-normal cursor-pointer">Mediano plazo (1-3 meses)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="timeline4" />
              <Label htmlFor="timeline4" className="font-normal cursor-pointer">Flexible (más de 3 meses)</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.timeline && <p className="text-xs text-destructive">{errors.timeline.message}</p>}
    </div>
  );
}

export function ProjectStatusSection({ control, errors }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Estado del Proyecto</h3>
        <p className="text-sm text-muted-foreground mb-6">¿En qué etapa se encuentra tu proyecto?</p>
      </div>

      <Controller
        name="estadoProyecto"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="idea" id="status1" />
              <Label htmlFor="status1" className="font-normal cursor-pointer">Es una idea</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="documentacion" id="status2" />
              <Label htmlFor="status2" className="font-normal cursor-pointer">Tengo documentación/requerimientos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existente" id="status3" />
              <Label htmlFor="status3" className="font-normal cursor-pointer">Tengo un sistema existente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="listo" id="status4" />
              <Label htmlFor="status4" className="font-normal cursor-pointer">Estoy listo para iniciar</Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.estadoProyecto && <p className="text-xs text-destructive">{errors.estadoProyecto.message}</p>}
    </div>
  );
}

export function ExpectationsSection({ control, errors }: FormSectionProps) {
  const expectations = [
    'Velocidad de ejecución',
    'Estrategia y consultoría',
    'Automatización completa',
    'Escalabilidad futura',
    'Diseño premium',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Tus Expectativas</h3>
        <p className="text-sm text-muted-foreground mb-6">¿Qué es lo más importante para ti en este proyecto?</p>
      </div>

      <Controller
        name="expectativas"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {expectations.map((exp) => (
              <div key={exp} className="flex items-center space-x-2">
                <Checkbox
                  id={exp}
                  checked={field.value?.includes(exp) || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), exp]
                      : field.value?.filter((e: string) => e !== exp) || [];
                    field.onChange(newValue);
                  }}
                />
                <Label htmlFor={exp} className="font-normal cursor-pointer">
                  {exp}
                </Label>
              </div>
            ))}
          </div>
        )}
      />
      {errors.expectativas && <p className="text-xs text-destructive">{errors.expectativas.message}</p>}
    </div>
  );
}

export function DiagnosticSection({ control }: FormSectionProps) {
  return (
    <div className="space-y-6 p-6 bg-secondary/30 rounded-lg border border-border">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Diagnóstico Estratégico Premium</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Recibe un análisis personalizado de tu situación digital y recomendaciones estratégicas.
        </p>
      </div>

      <Controller
        name="diagnosticoPremium"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="diagnosticoPremium"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor="diagnosticoPremium" className="font-normal cursor-pointer">
              Sí, me interesa un diagnóstico estratégico premium ($1,000 MXN)
            </Label>
          </div>
        )}
      />
    </div>
  );
}

export function AdditionalInfoSection({ control }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-semibold mb-2">Información Adicional</h3>
        <p className="text-sm text-muted-foreground mb-6">¿Hay algo más que consideres importante que sepamos?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="informacionAdicional">Comentarios Adicionales</Label>
        <Controller
          name="informacionAdicional"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="informacionAdicional"
              placeholder="Cuéntanos más sobre tu proyecto, desafíos o expectativas..."
              rows={4}
              className="font-sans resize-none"
            />
          )}
        />
      </div>
    </div>
  );
}
