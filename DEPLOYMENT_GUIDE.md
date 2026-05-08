# Guía de Despliegue y Configuración - Byklai Discovery

## 1. Configuración del Webhook de n8n

La página de Discovery está diseñada para enviar los datos del formulario a un webhook de n8n. Sigue estos pasos para configurarlo:

### 1.1 Crear el Webhook en n8n

1. Abre tu instancia de n8n
2. Crea un nuevo workflow
3. Agrega un nodo **"Webhook"** como punto de entrada
4. Configura el webhook:
   - **HTTP Method:** POST
   - **Path:** `/discovery` (o el que prefieras)
   - **Authentication:** Ninguna (o configura según tu seguridad)

### 1.2 Procesar los Datos

Después del webhook, agrega los nodos que necesites:

- **Google Sheets:** Para almacenar los datos en una hoja de cálculo
- **HubSpot:** Para crear contactos automáticamente
- **Email:** Para enviar notificaciones internas
- **Conditional:** Para filtrar clientes según presupuesto o tipo de proyecto

### 1.3 Obtener la URL del Webhook

Una vez configurado, n8n te proporcionará una URL similar a:
```
https://tu-instancia-n8n.com/webhook/discovery
```

## 2. Configuración de Variables de Entorno

### 2.1 En Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto:

```env
REACT_APP_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/discovery
```

### 2.2 En Vercel

1. Ve a tu proyecto en Vercel
2. Navega a **Settings → Environment Variables**
3. Agrega la variable:
   - **Name:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://tu-instancia-n8n.com/webhook/discovery`

**Nota:** En Vercel, las variables de entorno deben tener el prefijo `VITE_` para ser accesibles en el frontend.

## 3. Actualizar el Hook de Envío

Si usas Vercel, actualiza el archivo `client/src/hooks/useDiscoverySubmit.ts`:

```typescript
const webhookUrl = process.env.VITE_N8N_WEBHOOK_URL || 
  'https://your-n8n-instance.com/webhook/discovery';
```

## 4. Despliegue en Vercel

### 4.1 Preparar el Repositorio

```bash
# Asegúrate de que el proyecto esté en Git
git add .
git commit -m "Initial discovery form setup"
```

### 4.2 Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"New Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Configura las variables de entorno (como se describió arriba)
6. Haz clic en **"Deploy"**

### 4.3 Configuración de Build

Vercel debería detectar automáticamente la configuración. Si no, asegúrate de que:

- **Framework Preset:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`

## 5. Pruebas Post-Despliegue

### 5.1 Verificar que el Formulario Funciona

1. Accede a tu URL de Vercel
2. Completa el formulario de Discovery
3. Verifica que los datos lleguen a tu webhook de n8n

### 5.2 Monitorear en n8n

1. Ve a tu workflow en n8n
2. Haz clic en **"Execution"** para ver los datos recibidos
3. Verifica que los datos se procesen correctamente (Google Sheets, HubSpot, etc.)

## 6. Personalización Avanzada

### 6.1 Agregar Validaciones Adicionales en n8n

Puedes agregar un nodo **"If"** para filtrar clientes:

```javascript
// Ejemplo: Filtrar solo clientes con presupuesto > $5K
return data.presupuesto === '5k-10k' || data.presupuesto === '10k-plus';
```

### 6.2 Enviar Confirmación por Email

Agrega un nodo **"Email"** después del webhook para enviar una confirmación al cliente:

```
To: {{$node.Webhook.json.email}}
Subject: Hemos recibido tu Discovery Estratégico
Body: Gracias por tu confianza. Nuestro equipo revisará tu información en 24-48 horas.
```

### 6.3 Crear Contactos en HubSpot Automáticamente

Agrega un nodo **"HubSpot"** para crear contactos:

```javascript
{
  email: data.email,
  firstname: data.nombre.split(' ')[0],
  lastname: data.nombre.split(' ')[1] || '',
  phone: data.telefono,
  company: data.empresa,
  website: data.sitioWeb,
  lifecyclestage: 'lead',
  hs_lead_status: 'NEW',
  // Campos personalizados
  tipo_proyecto: data.tiposProyecto.join(', '),
  presupuesto: data.presupuesto,
  timeline: data.timeline,
}
```

## 7. Solución de Problemas

### Problema: El formulario no envía datos

**Solución:**
1. Verifica que la URL del webhook sea correcta en las variables de entorno
2. Comprueba que el webhook de n8n esté activo (status "Active")
3. Abre la consola del navegador (F12) y busca errores de CORS

### Problema: CORS Error

**Solución:**
Si ves un error de CORS, configura el webhook de n8n para aceptar solicitudes desde tu dominio:

En n8n, en el nodo Webhook, agrega headers:
```
Access-Control-Allow-Origin: *
```

### Problema: Los datos no llegan a Google Sheets

**Solución:**
1. Verifica que el nodo de Google Sheets esté correctamente autenticado
2. Comprueba que la hoja de cálculo tenga los nombres de columnas correctos
3. Revisa los logs de ejecución en n8n para ver dónde falla

## 8. Monitoreo y Mantenimiento

### 8.1 Monitorear el Tráfico

En Vercel, ve a **Analytics** para ver:
- Número de visitantes
- Tasa de conversión (formularios completados)
- Tiempo de carga promedio

### 8.2 Revisar Logs

En Vercel, ve a **Logs** para ver:
- Errores de servidor
- Solicitudes fallidas
- Problemas de rendimiento

### 8.3 Actualizar el Webhook

Si necesitas cambiar la URL del webhook:
1. Actualiza la variable de entorno en Vercel
2. Redeploy el proyecto (Vercel lo hace automáticamente)

## 9. Seguridad

### 9.1 Proteger el Webhook

Para evitar spam, considera:

1. **Rate Limiting:** Limita el número de solicitudes por IP
2. **Validación de Email:** Verifica que el email sea válido antes de procesar
3. **Honeypot Field:** Agrega un campo oculto para detectar bots

### 9.2 Encriptación de Datos

Si manejas datos sensibles, considera:

1. **HTTPS:** Vercel proporciona HTTPS automáticamente
2. **Encriptación en n8n:** Encripta datos antes de almacenarlos
3. **Cumplimiento GDPR:** Asegúrate de cumplir con regulaciones de privacidad

## 10. Próximos Pasos

1. **Personalizar el Branding:** Actualiza colores, logos y textos según tu marca
2. **Agregar Más Campos:** Extiende el formulario según tus necesidades
3. **Integrar con tu CRM:** Conecta con HubSpot, Salesforce, etc.
4. **Automatizar Seguimiento:** Crea secuencias de email automáticas
5. **Analizar Resultados:** Monitorea qué tipos de clientes se registran

---

**Soporte:** Si tienes preguntas, contacta a hola@byklai.com
