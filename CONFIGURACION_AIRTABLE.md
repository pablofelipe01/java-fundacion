# Configuración de Airtable para el Examen

## Paso 1: Crear una Base en Airtable

1. Ve a [Airtable.com](https://airtable.com) y crea una cuenta si no tienes una
2. Crea una nueva Base (Workspace)
3. Crea una nueva tabla llamada **"Examenes"** (o el nombre que prefieras)

## Paso 2: Configurar la Tabla

Crea las siguientes columnas en tu tabla:

| Nombre de Campo | Tipo de Campo | Configuración |
|----------------|---------------|---------------|
| Nombre         | Single line text | - |
| Puntaje        | Number | Formato: Integer |
| Total          | Number | Formato: Integer |
| Porcentaje     | Number | Formato: Integer |
| Intentos       | Number | Formato: Integer |
| Fecha          | Date | **Importante:** Usar tipo "Date" (sin hora) |

**Nota importante sobre el campo Fecha:** Asegúrate de que sea tipo "Date" y NO "Date and time". Solo debe guardar la fecha sin la hora.

## Paso 3: Obtener tu API Key

1. Ve a https://airtable.com/create/tokens
2. Haz clic en "Create new token"
3. Dale un nombre (ej: "JavaScript Exam")
4. En "Scopes", selecciona:
   - `data.records:write`
   - `data.records:read`
5. En "Access", selecciona tu Base
6. Crea el token y **cópialo** (solo se muestra una vez)

## Paso 4: Obtener tu Base ID y Table ID

### Base ID:
1. Ve a tu Base en Airtable
2. Haz clic en "Help" (esquina superior derecha)
3. Selecciona "API documentation"
4. En la URL verás algo como: `https://airtable.com/appXXXXXXXXXXXXXX/...`
5. El `appXXXXXXXXXXXXXX` es tu **Base ID**

### Table ID:
1. Abre tu tabla en Airtable
2. Mira la URL del navegador
3. Verás algo como: `https://airtable.com/appXXXXXX/tbljBfcGfdri06bwh/...`
4. El `tbljBfcGfdri06bwh` es tu **Table ID** (siempre empieza con "tbl")

## Paso 5: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los valores vacíos con tus credenciales:

```env
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXXXX
AIRTABLE_TABLE_ID=tbljBfcGfdri06bwh
```

## Paso 6: Reiniciar el Servidor

Después de configurar las variables de entorno, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## ¡Listo!

Ahora cuando un estudiante complete el examen, los resultados se guardarán automáticamente en tu tabla de Airtable.

### Ejemplo de cómo se verán los datos:

| Nombre | Puntaje | Total | Porcentaje | Intentos | Fecha |
|--------|---------|-------|------------|----------|-------|
| Juan Pérez | 12 | 15 | 80 | 18 | 2024-01-15 |
| María García | 14 | 15 | 93 | 15 | 2024-01-15 |

## Solución de Problemas

Si los datos no se guardan:

1. Verifica que las variables de entorno estén correctamente configuradas
2. Revisa la consola del navegador para ver errores
3. Verifica que el token de Airtable tenga los permisos correctos
4. Asegúrate de que el Table ID sea correcto (debe empezar con "tbl")
5. Reinicia el servidor después de cambiar las variables de entorno
