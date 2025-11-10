'use client'

import { useState, useRef, useEffect } from 'react'

// Tipos de línea de consola
type ConsoleLineType = 'log' | 'error' | 'warn' | 'info'

interface ConsoleLine {
  type: ConsoleLineType
  message: string
}

// Ejemplos de código predefinidos
const ejemplos = {
  variables: `// VARIABLES EN JAVASCRIPT
// Hay 3 formas de declarar variables

// 1. let - puede cambiar
let nombre = "Ana";
console.log("Nombre:", nombre);

nombre = "María"; // Podemos cambiar el valor
console.log("Nuevo nombre:", nombre);

// 2. const - NO puede cambiar
const edad = 25;
console.log("Edad:", edad);

// edad = 30; // ¡Esto daría error!

// 3. var - forma antigua (no la uses)
var ciudad = "Bogotá";
console.log("Ciudad:", ciudad);

// REGLA: Usa const por defecto, let si necesitas cambiar`,

  operaciones: `// OPERACIONES MATEMÁTICAS

// Suma
const suma = 10 + 5;
console.log("10 + 5 =", suma);

// Resta
const resta = 20 - 8;
console.log("20 - 8 =", resta);

// Multiplicación
const multiplicacion = 6 * 7;
console.log("6 × 7 =", multiplicacion);

// División
const division = 50 / 5;
console.log("50 ÷ 5 =", division);

// Módulo (resto de la división)
const modulo = 17 % 5;
console.log("17 % 5 =", modulo);

// Operaciones combinadas
const resultado = (10 + 5) * 2;
console.log("(10 + 5) × 2 =", resultado);

// Incremento
let contador = 0;
contador++;
console.log("Contador después de ++:", contador);`,

  strings: `// TRABAJANDO CON STRINGS (TEXTOS)

const nombre = "Juan";
const apellido = "Pérez";

// Concatenación con +
const nombreCompleto = nombre + " " + apellido;
console.log("Nombre completo:", nombreCompleto);

// Template strings (moderno)
const edad = 25;
const mensaje = \`Hola, soy \${nombre} y tengo \${edad} años\`;
console.log(mensaje);

// Métodos de strings
console.log("Mayúsculas:", nombre.toUpperCase());
console.log("Minúsculas:", nombre.toLowerCase());
console.log("Longitud:", nombre.length);

// Obtener un carácter
console.log("Primera letra:", nombre[0]);

// Verificar si contiene algo
const texto = "JavaScript es genial";
console.log("¿Contiene 'Java'?", texto.includes("Java"));`,

  condicionales: `// CONDICIONALES - TOMAR DECISIONES

const edad = 20;

// If básico
if (edad >= 18) {
    console.log("Eres mayor de edad");
}

// If-else
if (edad >= 18) {
    console.log("✅ Puedes votar");
} else {
    console.log("❌ Aún no puedes votar");
}

// If-else if-else
const nota = 85;

if (nota >= 90) {
    console.log("Calificación: A - Excelente!");
} else if (nota >= 80) {
    console.log("Calificación: B - Muy bien!");
} else if (nota >= 70) {
    console.log("Calificación: C - Bien");
} else {
    console.log("Calificación: D - Necesitas mejorar");
}

// Operadores de comparación
console.log("5 > 3:", 5 > 3);
console.log("10 === 10:", 10 === 10);
console.log("'hola' !== 'adios':", 'hola' !== 'adios');`,

  bucles: `// BUCLES - REPETIR ACCIONES

// FOR LOOP
console.log("--- Bucle FOR ---");
for (let i = 1; i <= 5; i++) {
    console.log("Número:", i);
}

// Bucle con array
const frutas = ["manzana", "banana", "naranja"];
console.log("\\n--- Recorrer array ---");
for (let i = 0; i < frutas.length; i++) {
    console.log(\`Fruta \${i + 1}: \${frutas[i]}\`);
}

// WHILE LOOP
console.log("\\n--- Bucle WHILE ---");
let contador = 0;
while (contador < 3) {
    console.log("Contador:", contador);
    contador++;
}

// Tabla de multiplicar
console.log("\\n--- Tabla del 5 ---");
for (let i = 1; i <= 10; i++) {
    console.log(\`5 × \${i} = \${5 * i}\`);
}`,

  funciones: `// FUNCIONES - BLOQUES DE CÓDIGO REUTILIZABLES

// Función básica
function saludar(nombre) {
    return "¡Hola, " + nombre + "!";
}

console.log(saludar("Ana"));
console.log(saludar("Luis"));

// Función con múltiples parámetros
function sumar(a, b) {
    return a + b;
}

console.log("5 + 3 =", sumar(5, 3));
console.log("10 + 20 =", sumar(10, 20));

// Función que usa otra función
function calcularAreaRectangulo(base, altura) {
    return base * altura;
}

const area = calcularAreaRectangulo(5, 3);
console.log("Área del rectángulo:", area);

// Función sin return (solo hace algo)
function mostrarMensaje(mensaje) {
    console.log("📢", mensaje);
}

mostrarMensaje("¡Las funciones son geniales!");

// Parámetros por defecto
function saludarConHora(nombre, hora = "día") {
    return \`¡Buenos \${hora}, \${nombre}!\`;
}

console.log(saludarConHora("María"));
console.log(saludarConHora("Juan", "noches"));`,

  arrays: `// ARRAYS - LISTAS DE ELEMENTOS

// Crear un array
const numeros = [1, 2, 3, 4, 5];
console.log("Array de números:", numeros);

const frutas = ["manzana", "banana", "naranja"];
console.log("Array de frutas:", frutas);

// Acceder a elementos
console.log("Primera fruta:", frutas[0]);
console.log("Segunda fruta:", frutas[1]);

// Longitud del array
console.log("Cantidad de frutas:", frutas.length);

// Agregar elementos
frutas.push("uva");
console.log("Después de push:", frutas);

// Eliminar el último
frutas.pop();
console.log("Después de pop:", frutas);

// Agregar al inicio
frutas.unshift("fresa");
console.log("Después de unshift:", frutas);

// Verificar si algo existe
console.log("¿Hay bananas?", frutas.includes("banana"));

// Recorrer un array
console.log("\\n--- Todas las frutas ---");
for (let i = 0; i < frutas.length; i++) {
    console.log(\`\${i + 1}. \${frutas[i]}\`);
}`,

  objetos: `// OBJETOS - ESTRUCTURAS DE DATOS COMPLEJAS

// Crear un objeto
const persona = {
    nombre: "Ana",
    edad: 28,
    ciudad: "Bogotá",
    profesion: "Desarrolladora"
};

// Acceder a propiedades
console.log("Nombre:", persona.nombre);
console.log("Edad:", persona.edad);

// Otra forma de acceder
console.log("Ciudad:", persona["ciudad"]);

// Modificar propiedades
persona.edad = 29;
console.log("Nueva edad:", persona.edad);

// Agregar propiedades
persona.email = "ana@email.com";
console.log("Email agregado:", persona.email);

// Objeto más complejo
const estudiante = {
    nombre: "Luis",
    edad: 20,
    materias: ["Matemáticas", "Física", "Programación"],
    promedio: 8.5,
    activo: true
};

console.log("\\nEstudiante:", estudiante.nombre);
console.log("Materias:", estudiante.materias);
console.log("Primera materia:", estudiante.materias[0]);

// Método en objeto
const calculadora = {
    sumar: function(a, b) {
        return a + b;
    },
    restar: function(a, b) {
        return a - b;
    }
};

console.log("\\n10 + 5 =", calculadora.sumar(10, 5));
console.log("10 - 5 =", calculadora.restar(10, 5));`,

  arrow: `// ARROW FUNCTIONS (ES6) - FUNCIONES MODERNAS

// Función tradicional
function sumarTradicional(a, b) {
    return a + b;
}

// Arrow function equivalente
const sumar = (a, b) => {
    return a + b;
};

// Arrow function corta (sin llaves, return implícito)
const sumarCorta = (a, b) => a + b;

console.log("Suma tradicional:", sumarTradicional(5, 3));
console.log("Arrow function:", sumar(5, 3));
console.log("Arrow function corta:", sumarCorta(5, 3));

// Con un solo parámetro (sin paréntesis)
const cuadrado = x => x * x;
console.log("Cuadrado de 5:", cuadrado(5));

// Sin parámetros
const saludar = () => "¡Hola Mundo!";
console.log(saludar());

// Arrow functions con arrays
const numeros = [1, 2, 3, 4, 5];

// Duplicar cada número
const duplicados = numeros.map(num => num * 2);
console.log("Números duplicados:", duplicados);

// Filtrar números mayores a 2
const mayores = numeros.filter(num => num > 2);
console.log("Mayores a 2:", mayores);

// Más ejemplos útiles
const obtenerInfo = nombre => \`Usuario: \${nombre}\`;
console.log(obtenerInfo("María"));

const esPar = numero => numero % 2 === 0;
console.log("¿4 es par?", esPar(4));
console.log("¿7 es par?", esPar(7));`,

  metodos: `// MÉTODOS DE ARRAY - MAP, FILTER, REDUCE

const numeros = [1, 2, 3, 4, 5];
console.log("Array original:", numeros);

// MAP - Transforma cada elemento
const duplicados = numeros.map(num => num * 2);
console.log("Duplicados (map):", duplicados);

const cuadrados = numeros.map(num => num * num);
console.log("Cuadrados (map):", cuadrados);

// FILTER - Filtra elementos que cumplen condición
const pares = numeros.filter(num => num % 2 === 0);
console.log("Números pares (filter):", pares);

const mayoresQue2 = numeros.filter(num => num > 2);
console.log("Mayores que 2 (filter):", mayoresQue2);

// FIND - Encuentra el primer elemento
const primerPar = numeros.find(num => num % 2 === 0);
console.log("Primer número par (find):", primerPar);

// SOME - ¿Alguno cumple la condición?
const hayPares = numeros.some(num => num % 2 === 0);
console.log("¿Hay números pares? (some):", hayPares);

// EVERY - ¿Todos cumplen la condición?
const todosMayoresQueCero = numeros.every(num => num > 0);
console.log("¿Todos > 0? (every):", todosMayoresQueCero);

// REDUCE - Reduce array a un valor
const suma = numeros.reduce((total, num) => total + num, 0);
console.log("Suma de todos (reduce):", suma);

// Ejemplo práctico con objetos
const productos = [
    { nombre: "Laptop", precio: 1000 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 75 }
];

console.log("\\n--- Productos ---");
productos.forEach(p => console.log(\`\${p.nombre}: $\${p.precio}\`));

const precioTotal = productos.reduce((total, p) => total + p.precio, 0);
console.log("Precio total:", precioTotal);

const caros = productos.filter(p => p.precio > 50);
console.log("Productos caros:", caros);`
}

export default function Home() {
  const [code, setCode] = useState(`// ¡Bienvenido al JavaScript Playground!
// Escribe tu código aquí y presiona "Ejecutar"

console.log('¡Hola Mundo!');

const nombre = 'Juan';
const edad = 25;

console.log('Mi nombre es ' + nombre);
console.log('Tengo ' + edad + ' años');

// Prueba hacer operaciones:
const suma = 10 + 5;
console.log('10 + 5 =', suma);`)

  const [consoleOutput, setConsoleOutput] = useState<ConsoleLine[]>([
    { type: 'info', message: '👋 Bienvenido! Escribe código en el editor y presiona "EJECUTAR" para ver los resultados aquí.' }
  ])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Agregar línea a la consola
  const addConsoleLine = (type: ConsoleLineType, message: string) => {
    setConsoleOutput(prev => [...prev, { type, message }])
  }

  // Limpiar consola
  const clearConsole = () => {
    setConsoleOutput([{ type: 'info', message: 'Consola limpia. Ejecuta código para ver resultados.' }])
  }

  // Limpiar editor
  const clearEditor = () => {
    setCode('// Escribe tu código aquí...\n\n')
    textareaRef.current?.focus()
  }

  // Ejecutar código
  const executeCode = () => {
    setConsoleOutput([])

    // Capturar console.log, error, warn
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    const logs: ConsoleLine[] = []

    console.log = (...args: any[]) => {
      logs.push({ type: 'log', message: args.join(' ') })
      originalLog.apply(console, args)
    }

    console.error = (...args: any[]) => {
      logs.push({ type: 'error', message: args.join(' ') })
      originalError.apply(console, args)
    }

    console.warn = (...args: any[]) => {
      logs.push({ type: 'warn', message: args.join(' ') })
      originalWarn.apply(console, args)
    }

    try {
      // Ejecutar el código
      // eslint-disable-next-line no-eval
      eval(code)

      if (logs.length === 0) {
        logs.push({ type: 'info', message: '✅ Código ejecutado sin errores. Usa console.log() para ver resultados.' })
      }
    } catch (error: any) {
      logs.push({ type: 'error', message: '❌ Error: ' + error.message })
    } finally {
      // Restaurar console
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn

      setConsoleOutput(logs)
    }
  }

  // Cargar ejemplo
  const loadExample = (tipo: keyof typeof ejemplos) => {
    setCode(ejemplos[tipo])
    textareaRef.current?.focus()
    setConsoleOutput([{ type: 'info', message: `📚 Ejemplo "${tipo}" cargado. Presiona EJECUTAR para verlo en acción.` }])
  }

  // Mostrar ayuda
  const showHelp = () => {
    setConsoleOutput([
      { type: 'info', message: '=== AYUDA ===' },
      { type: 'info', message: '' },
      { type: 'info', message: '1. Escribe código JavaScript en el editor' },
      { type: 'info', message: '2. Presiona "EJECUTAR" o usa Ctrl+Enter' },
      { type: 'info', message: '3. Los resultados aparecen aquí' },
      { type: 'info', message: '4. Usa console.log() para mostrar valores' },
      { type: 'info', message: '5. Los errores aparecen en rojo' },
      { type: 'info', message: '' },
      { type: 'info', message: 'Ejemplos disponibles abajo ⬇️' }
    ])
  }

  // Manejo de teclas
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter para ejecutar
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      executeCode()
    }

    // Ctrl + L para limpiar consola
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      clearConsole()
    }

    // Tab para indentar (4 espacios)
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newValue)

      // Establecer la posición del cursor después del tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4
        }
      }, 0)
    }
  }

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 JavaScript Playground</h1>
        <p>Escribe, ejecuta y aprende JavaScript en tiempo real</p>
      </div>

      <div className="main-content">
        {/* EDITOR DE CÓDIGO */}
        <div className="editor-section">
          <div className="editor-header">
            <span className="editor-title">📝 Editor de Código</span>
            <div className="editor-buttons">
              <button className="example-btn" onClick={showHelp}>❓ Ayuda</button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            className="codeEditor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="// Escribe tu código JavaScript aquí...&#10;// Ejemplo:&#10;console.log('¡Hola Mundo!');&#10;&#10;const nombre = 'Juan';&#10;console.log('Mi nombre es ' + nombre);"
          />
          <div className="action-buttons">
            <button className="run-btn" onClick={executeCode}>▶️ EJECUTAR</button>
            <button className="clear-btn" onClick={clearEditor}>🗑️ Limpiar Editor</button>
          </div>
        </div>

        {/* CONSOLA DE SALIDA */}
        <div className="output-section">
          <div className="output-header">
            <span className="output-title">💻 Consola de Salida</span>
            <button className="clear-btn" onClick={clearConsole}>🧹 Limpiar Consola</button>
          </div>
          <div className="output">
            {consoleOutput.map((line, index) => (
              <div key={index} className={`console-line console-${line.type}`}>
                {line.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN DE EJEMPLOS */}
      <div className="examples-section">
        <h2 className="examples-title">📚 Ejemplos para Practicar</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Haz click en cualquier ejemplo para cargarlo en el editor
        </p>

        <div className="examples-grid">
          <div className="example-card" onClick={() => loadExample('variables')}>
            <h3>1. Variables <span className="badge beginner">BÁSICO</span></h3>
            <p>Aprende a declarar y usar variables con let, const y var</p>
          </div>

          <div className="example-card" onClick={() => loadExample('operaciones')}>
            <h3>2. Operaciones <span className="badge beginner">BÁSICO</span></h3>
            <p>Suma, resta, multiplicación, división y más</p>
          </div>

          <div className="example-card" onClick={() => loadExample('strings')}>
            <h3>3. Strings <span className="badge beginner">BÁSICO</span></h3>
            <p>Trabajar con textos y concatenación</p>
          </div>

          <div className="example-card" onClick={() => loadExample('condicionales')}>
            <h3>4. Condicionales <span className="badge beginner">BÁSICO</span></h3>
            <p>If, else if, else - tomar decisiones</p>
          </div>

          <div className="example-card" onClick={() => loadExample('bucles')}>
            <h3>5. Bucles <span className="badge intermediate">INTERMEDIO</span></h3>
            <p>For y while - repetir acciones</p>
          </div>

          <div className="example-card" onClick={() => loadExample('funciones')}>
            <h3>6. Funciones <span className="badge intermediate">INTERMEDIO</span></h3>
            <p>Crear y usar funciones reutilizables</p>
          </div>

          <div className="example-card" onClick={() => loadExample('arrays')}>
            <h3>7. Arrays <span className="badge intermediate">INTERMEDIO</span></h3>
            <p>Listas y métodos de arrays</p>
          </div>

          <div className="example-card" onClick={() => loadExample('objetos')}>
            <h3>8. Objetos <span className="badge intermediate">INTERMEDIO</span></h3>
            <p>Estructuras de datos complejas</p>
          </div>

          <div className="example-card" onClick={() => loadExample('arrow')}>
            <h3>9. Arrow Functions <span className="badge advanced">AVANZADO</span></h3>
            <p>Funciones modernas de ES6</p>
          </div>

          <div className="example-card" onClick={() => loadExample('metodos')}>
            <h3>10. Métodos de Array <span className="badge advanced">AVANZADO</span></h3>
            <p>map, filter, reduce y más</p>
          </div>
        </div>
      </div>

      {/* TIPS */}
      <div className="tips-section">
        <h3>💡 Tips para usar el Playground</h3>
        <ul>
          <li>Usa <code>console.log()</code> para ver resultados en la consola</li>
          <li>Los errores aparecen en rojo - léelos para saber qué corregir</li>
          <li>Puedes ejecutar el código con <span className="key">Ctrl+Enter</span></li>
          <li>Experimenta! Cambia valores y ve qué pasa</li>
          <li>No tengas miedo de romper cosas - solo recarga la página</li>
        </ul>
      </div>

      {/* ATAJOS */}
      <div className="shortcuts">
        <h3>⌨️ Atajos de Teclado</h3>
        <div className="shortcut-item">
          <span>Ejecutar código</span>
          <span className="key">Ctrl + Enter</span>
        </div>
        <div className="shortcut-item">
          <span>Limpiar consola</span>
          <span className="key">Ctrl + L</span>
        </div>
        <div className="shortcut-item">
          <span>Seleccionar todo</span>
          <span className="key">Ctrl + A</span>
        </div>
      </div>
    </div>
  )
}
