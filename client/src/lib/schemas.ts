import { z } from 'zod';

export const discoveryFormSchema = z.object({
  // Sección 1: Información General
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  empresa: z.string().min(2, 'El nombre de la empresa es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(10, 'Teléfono inválido'),
  sitioWeb: z.string().url('URL inválida').optional().or(z.literal('')),
  redesSociales: z.string().optional(),
  origenLead: z.string().min(1, 'Selecciona el origen del lead'),
  esDecison: z.boolean(),

  // Sección 2: Tipo de Proyecto
  tiposProyecto: z.array(z.string()).min(1, 'Selecciona al menos un tipo de proyecto'),

  // Sección 3: Objetivo Principal
  objetivoPrincipal: z.string().min(50, 'Describe tu objetivo con al menos 50 caracteres'),

  // Sección 4: Estado Actual
  estadoWeb: z.string().min(1, 'Selecciona el estado actual de tu web'),
  usaCRM: z.string().min(1, 'Selecciona si usas CRM'),
  tieneAutomatizaciones: z.string().min(1, 'Selecciona si tienes automatizaciones'),
  herramientasActuales: z.string().optional(),

  // Sección 5: Alcance Esperado
  alcanceEsperado: z.string().min(1, 'Selecciona el alcance esperado'),

  // Sección 6: Presupuesto
  presupuesto: z.string().min(1, 'Selecciona un rango de presupuesto'),

  // Sección 7: Timeline
  timeline: z.string().min(1, 'Selecciona el timeline'),

  // Sección 8: Estado del Proyecto
  estadoProyecto: z.string().min(1, 'Selecciona el estado del proyecto'),

  // Sección 9: Expectativas
  expectativas: z.array(z.string()).min(1, 'Selecciona al menos una expectativa'),

  // Sección 10: Diagnóstico Premium
  diagnosticoPremium: z.boolean(),

  // Sección 11: Información Adicional
  informacionAdicional: z.string().optional(),
});

export type DiscoveryFormData = z.infer<typeof discoveryFormSchema>;
