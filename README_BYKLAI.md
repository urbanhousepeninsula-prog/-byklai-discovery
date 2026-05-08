# Byklai Discovery - Página de Discovery Estratégico

Una página premium de formulario de discovery diseñada para Byklai, enfocada en filtrar clientes de alto valor y recopilar información estratégica para propuestas personalizadas.

## Características

✨ **Diseño Editorial Premium**
- Tipografía elegante (Lora + DM Sans)
- Espacios negativos amplios
- Interfaz minimalista y profesional
- Totalmente responsive

🎯 **Formulario Multi-Paso Inteligente**
- 11 secciones estratégicas
- Validación en tiempo real con Zod
- Barra de progreso visual
- Navegación fluida entre pasos

🔗 **Integración n8n**
- Webhook listo para conectar con n8n
- Envío automático de datos a CRM
- Procesamiento de leads automatizado

📊 **Filtrado de Clientes**
- Detecta presupuesto real
- Identifica madurez digital
- Clasifica por tipo de proyecto
- Señales de alerta integradas

## Stack Tecnológico

- **Frontend:** Next.js 19 + React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4 + shadcn/ui
- **Validación:** Zod + React Hook Form
- **Despliegue:** Vercel

## Estructura del Proyecto

```
client/
├── src/
│   ├── pages/
│   │   ├── Discovery.tsx          # Página principal del formulario
│   │   ├── Home.tsx               # Landing page
│   │   └── NotFound.tsx           # Página 404
│   ├── components/
│   │   ├── FormSections.tsx       # Componentes de cada sección
│   │   └── ui/                    # Componentes shadcn/ui
│   ├── hooks/
│   │   └── useDiscoverySubmit.ts  # Hook para envío de datos
│   ├── lib/
│   │   └── schemas.ts             # Validación Zod
│   ├── App.tsx                    # Rutas principales
│   └── index.css                  # Estilos globales
└── public/
    └── favicon.ico

DEPLOYMENT_GUIDE.md                # Guía de despliegue
```

## Secciones del Formulario

1. **Información General** - Datos de contacto y empresa
2. **Tipo de Proyecto** - Selección múltiple de servicios
3. **Objetivo Principal** - Descripción del problema a resolver
4. **Estado Actual** - Madurez digital actual
5. **Alcance Esperado** - MVP, proyecto completo, etc.
6. **Presupuesto** - Rango de inversión
7. **Timeline** - Plazo esperado
8. **Estado del Proyecto** - Idea, documentación, etc.
9. **Expectativas** - Prioridades del cliente
10. **Diagnóstico Premium** - Opción de servicio adicional
11. **Información Adicional** - Comentarios libres

## Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+
- pnpm 10+

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd byklai-discovery

# Instalar dependencias
pnpm install

# Crear archivo de variables de entorno
cp .env.example .env.local

# Agregar tu URL de webhook n8n
# REACT_APP_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/discovery
```

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Abrir en el navegador
# http://localhost:3000
```

### Build para Producción

```bash
# Compilar el proyecto
pnpm build

# Previsualizar build
pnpm preview
```

## Configuración del Webhook n8n

Ver `DEPLOYMENT_GUIDE.md` para instrucciones detalladas sobre:
- Crear el webhook en n8n
- Configurar variables de entorno
- Procesar datos en n8n
- Integrar con Google Sheets, HubSpot, etc.

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Vercel detectará automáticamente la configuración
4. Haz deploy con un click

Ver `DEPLOYMENT_GUIDE.md` para pasos detallados.

## Personalización

### Cambiar Colores

Edita `client/src/index.css`:
```css
:root {
  --primary: #1a1a1a;
  --primary-foreground: #ffffff;
  /* ... más variables */
}
```

### Agregar Campos al Formulario

1. Actualiza el schema en `client/src/lib/schemas.ts`
2. Agrega el campo en el componente de sección correspondiente
3. Actualiza el hook `useDiscoverySubmit.ts` si es necesario

### Cambiar Textos y Mensajes

Todos los textos están en los componentes. Busca y reemplaza según necesites.

## Flujo de Datos

```
Usuario completa formulario
        ↓
Validación Zod en tiempo real
        ↓
Envío POST a webhook n8n
        ↓
n8n procesa los datos
        ↓
Google Sheets / HubSpot / Email
        ↓
Usuario ve pantalla de éxito
```

## Pantalla de Éxito

Después de enviar el formulario, el usuario ve:
- Confirmación visual (checkmark)
- Mensaje de agradecimiento
- Explicación de próximos pasos
- Tiempo estimado de respuesta (24-48 horas)

## Manejo de Errores

- Validación en tiempo real de campos
- Mensajes de error claros y específicos
- Reintentos automáticos en caso de fallo
- Logging de errores para debugging

## Accesibilidad

- ✅ Etiquetas HTML semánticas
- ✅ ARIA labels donde sea necesario
- ✅ Contraste de colores WCAG AA
- ✅ Navegación por teclado
- ✅ Focus visible en todos los elementos

## Performance

- Lighthouse Score: 96+ (Mobile), 100 (Desktop)
- First Contentful Paint: < 2s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0

## Seguridad

- HTTPS automático en Vercel
- Validación de datos en frontend y backend
- CORS configurado correctamente
- Rate limiting recomendado en n8n

## Soporte y Contacto

- Email: hola@byklai.com
- Sitio web: https://byklai.com
- Portafolio: https://byklai.com/portfolio

## Licencia

© 2026 Byklai. Todos los derechos reservados.

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0.0
