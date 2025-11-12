# Modo Examen - Instrucciones Completas

## Características Implementadas

### ✅ Funcionalidades del Examen

1. **Campo de Nombre**
   - Pantalla inicial para que el estudiante ingrese su nombre completo
   - Validación: mínimo 2 caracteres
   - El nombre se muestra durante todo el examen

2. **Timer de 30 Minutos**
   - Cuenta regresiva visible en todo momento
   - Se pone rojo cuando quedan menos de 5 minutos
   - Parpadea cuando queda menos de 1 minuto
   - Al terminar el tiempo, se envía automáticamente el puntaje

3. **Sin Navegación Hacia Atrás**
   - No hay botón para regresar
   - Solo hay botón "Siguiente" para avanzar
   - Una vez que avanzas, no puedes volver

4. **Pistas Disponibles**
   - Cada ejercicio tiene una pista
   - El botón "Ver Pista" muestra ayuda contextual
   - No afecta el puntaje

5. **Sin Botón de Solución**
   - Eliminado para mantener la integridad del examen
   - Los estudiantes deben resolver por sí mismos

6. **Bloqueo de Copiar/Pegar**
   - No se puede pegar (Ctrl+V) en el editor de código
   - No se puede copiar (Ctrl+C) del editor
   - No se puede cortar (Ctrl+X) del editor
   - Si intentan pegar, aparece un mensaje de alerta

7. **Envío Automático a Airtable**
   - Al terminar el tiempo o completar todos los ejercicios
   - Se envía: Nombre, Puntaje, Total, Porcentaje, Intentos, Fecha
   - Todo automático, sin intervención del estudiante

## Cómo Usar el Examen

### Para el Profesor/Administrador

1. **Configurar Airtable** (solo la primera vez)
   - Sigue las instrucciones en `CONFIGURACION_AIRTABLE.md`
   - Configura tus credenciales en `.env.local`

2. **Iniciar el Servidor**
   ```bash
   npm run dev
   ```

3. **Compartir el Link**
   - Comparte `http://localhost:3000/examen` con los estudiantes
   - O despliega la aplicación en Vercel/Netlify

4. **Monitorear Resultados**
   - Ve a tu tabla de Airtable
   - Los resultados aparecen en tiempo real

### Para el Estudiante

1. **Acceder al Examen**
   - Ir a la URL del examen
   - Leer las instrucciones

2. **Ingresar Nombre**
   - Escribir nombre completo
   - Hacer clic en "Comenzar Examen"

3. **Durante el Examen**
   - Escribir código en el editor
   - Usar "Ejecutar" para probar
   - Usar "Verificar Respuesta" para validar
   - Usar "Ver Pista" si necesitas ayuda
   - Usar "Siguiente" para avanzar

4. **Reglas Importantes**
   - ⏱️ Tienes 30 minutos
   - 🚫 No puedes copiar/pegar código
   - ➡️ No puedes regresar
   - 💡 Puedes usar pistas
   - ⏭️ Debes avanzar en orden

## Estructura de Evaluación

### 15 Ejercicios Organizados por Dificultad

- **Muy Fácil** (2 ejercicios):
  - Imprimir nombre
  - Imprimir número

- **Fácil** (3 ejercicios):
  - Variables básicas
  - Operaciones simples
  - Concatenación

- **Medio** (5 ejercicios):
  - Multiplicación con variables
  - Métodos de strings
  - Arrays básicos
  - Condicionales if
  - Bucles for

- **Difícil** (4 ejercicios):
  - Funciones
  - Objetos
  - Array.map()
  - Array.filter()

- **Muy Difícil** (1 ejercicio):
  - Arrow functions avanzadas

### Sistema de Puntuación

- Cada ejercicio correcto = 1 punto
- Total máximo = 15 puntos
- Se calcula automáticamente el porcentaje
- Se registra el número de intentos

## Datos que se Guardan en Airtable

| Campo      | Descripción                          | Ejemplo        |
|------------|--------------------------------------|----------------|
| Nombre     | Nombre completo del estudiante       | Juan Pérez     |
| Puntaje    | Número de ejercicios correctos       | 12             |
| Total      | Total de ejercicios                  | 15             |
| Porcentaje | Puntaje en porcentaje               | 80             |
| Intentos   | Número total de intentos             | 18             |
| Fecha      | Fecha y hora del examen             | 2024-01-15     |

## Pantallas del Examen

### 1. Pantalla de Inicio
- Título del examen
- Lista de instrucciones
- Campo para nombre
- Botón "Comenzar Examen"

### 2. Pantalla del Examen
- Header con nombre y timer
- Barra de progreso
- Estadísticas (Ejercicio actual, Correctos, Intentos, Dificultad)
- Pregunta del ejercicio
- Pista (opcional)
- Editor de código
- Consola de salida
- Botones de acción

### 3. Pantalla Final
- Mensaje de tiempo terminado
- Puntaje final
- Confirmación de envío

## Seguridad y Control

### Medidas Implementadas

1. **Bloqueo de Copiar/Pegar**: Previene el fraude básico
2. **Sin Navegación Atrás**: Evita cambiar respuestas
3. **Timer Estricto**: Se envía automáticamente al terminar
4. **Validación de Nombre**: Asegura identificación
5. **Registro de Intentos**: Permite analizar dificultad

### Limitaciones

- El examen requiere conexión a internet (para Airtable)
- Si se cierra el navegador, se pierde el progreso
- No hay autenticación de usuario (solo nombre)

## Personalización

### Modificar el Tiempo

En `app/examen/page.tsx`, línea 157:
```typescript
const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutos
```

Cambiar a:
```typescript
const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutos
const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutos
```

### Agregar/Modificar Ejercicios

En `app/examen/page.tsx`, busca el array `exercises` (línea 15) y agrega:

```typescript
{
  id: 16,
  level: 'Fácil',
  question: 'Tu pregunta aquí',
  hint: 'Tu pista aquí',
  validateOutput: (output) => {
    // Tu lógica de validación
    return output.some(line => line.includes('respuesta esperada'))
  },
  solution: 'console.log("solución");'
}
```

### Cambiar Table ID en Airtable

En `.env.local`:
```env
AIRTABLE_TABLE_ID=tblTuNuevoTableID
```

**Nota:** Usar el Table ID (en lugar del nombre) es más confiable y evita problemas con espacios o caracteres especiales.

## Solución de Problemas

### El timer no funciona
- Verifica que `useEffect` esté importado
- Revisa la consola del navegador

### No se guardan los datos en Airtable
- Verifica las variables de entorno en `.env.local`
- Revisa que el token de Airtable tenga permisos
- Verifica que el Table ID sea correcto (debe empezar con "tbl")
- Reinicia el servidor después de cambiar las variables

### No puedo copiar/pegar incluso código válido
- Es una característica de seguridad
- Los estudiantes deben escribir todo el código

### El examen se reinicia si recargo la página
- Es comportamiento esperado
- No hay persistencia local por seguridad

## Mejoras Futuras Sugeridas

1. Guardar progreso en localStorage
2. Autenticación de usuarios
3. Dashboard para profesores
4. Análisis de respuestas comunes
5. Modo práctica sin límite de tiempo
6. Exportar resultados a CSV
7. Gráficas de rendimiento
8. Historial de intentos por estudiante
