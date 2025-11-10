'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface Exercise {
  id: number
  level: string
  question: string
  hint: string
  validateOutput: (output: string[]) => boolean
  solution: string
}

const exercises: Exercise[] = [
  {
    id: 1,
    level: 'Muy Fácil',
    question: 'Imprime tu nombre en la consola',
    hint: 'Usa console.log() con tu nombre entre comillas',
    validateOutput: (output) => output.length > 0 && output[0].length > 0,
    solution: 'console.log("Tu Nombre");'
  },
  {
    id: 2,
    level: 'Muy Fácil',
    question: 'Imprime el número 100 en la consola',
    hint: 'Usa console.log() con el número 100',
    validateOutput: (output) => output.some(line => line.includes('100')),
    solution: 'console.log(100);'
  },
  {
    id: 3,
    level: 'Fácil',
    question: 'Crea una variable llamada "edad" con el valor 25 e imprímela',
    hint: 'Usa const edad = 25; y luego console.log(edad);',
    validateOutput: (output) => output.some(line => line.includes('25')),
    solution: 'const edad = 25;\nconsole.log(edad);'
  },
  {
    id: 4,
    level: 'Fácil',
    question: 'Suma 10 + 20 e imprime el resultado',
    hint: 'Puedes hacer console.log(10 + 20) o crear una variable',
    validateOutput: (output) => output.some(line => line.includes('30')),
    solution: 'console.log(10 + 20);'
  },
  {
    id: 5,
    level: 'Fácil',
    question: 'Crea una variable "nombre" con tu nombre y otra "apellido" con tu apellido. Imprime el nombre completo',
    hint: 'Usa concatenación: nombre + " " + apellido',
    validateOutput: (output) => output.length > 0 && output[0].includes(' '),
    solution: 'const nombre = "Juan";\nconst apellido = "Pérez";\nconsole.log(nombre + " " + apellido);'
  },
  {
    id: 6,
    level: 'Medio',
    question: 'Multiplica 7 por 8 y guarda el resultado en una variable llamada "resultado". Imprímelo',
    hint: 'const resultado = 7 * 8;',
    validateOutput: (output) => output.some(line => line.includes('56')),
    solution: 'const resultado = 7 * 8;\nconsole.log(resultado);'
  },
  {
    id: 7,
    level: 'Medio',
    question: 'Crea una variable "mensaje" que diga "Hola Mundo" en mayúsculas usando el método toUpperCase()',
    hint: 'const mensaje = "hola mundo".toUpperCase();',
    validateOutput: (output) => output.some(line => line.includes('HOLA MUNDO')),
    solution: 'const mensaje = "hola mundo".toUpperCase();\nconsole.log(mensaje);'
  },
  {
    id: 8,
    level: 'Medio',
    question: 'Crea un array con 3 frutas e imprime la segunda fruta',
    hint: 'const frutas = ["manzana", "banana", "naranja"]; console.log(frutas[1]);',
    validateOutput: (output) => output.length > 0,
    solution: 'const frutas = ["manzana", "banana", "naranja"];\nconsole.log(frutas[1]);'
  },
  {
    id: 9,
    level: 'Medio',
    question: 'Usa un if para verificar si 15 es mayor que 10 e imprime "Es mayor" si es verdad',
    hint: 'if (15 > 10) { console.log("Es mayor"); }',
    validateOutput: (output) => output.some(line => line.toLowerCase().includes('es mayor') || line.toLowerCase().includes('mayor')),
    solution: 'if (15 > 10) {\n  console.log("Es mayor");\n}'
  },
  {
    id: 10,
    level: 'Medio',
    question: 'Crea un bucle for que imprima los números del 1 al 5',
    hint: 'for (let i = 1; i <= 5; i++) { console.log(i); }',
    validateOutput: (output) => {
      const hasOne = output.some(line => line.includes('1'));
      const hasFive = output.some(line => line.includes('5'));
      return hasOne && hasFive && output.length >= 5;
    },
    solution: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}'
  },
  {
    id: 11,
    level: 'Difícil',
    question: 'Crea una función llamada "sumar" que reciba dos números y retorne la suma. Úsala para sumar 5 + 3',
    hint: 'function sumar(a, b) { return a + b; }',
    validateOutput: (output) => output.some(line => line.includes('8')),
    solution: 'function sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(5, 3));'
  },
  {
    id: 12,
    level: 'Difícil',
    question: 'Crea un objeto "persona" con propiedades nombre y edad. Imprime el nombre',
    hint: 'const persona = { nombre: "Ana", edad: 25 };',
    validateOutput: (output) => output.length > 0,
    solution: 'const persona = { nombre: "Ana", edad: 25 };\nconsole.log(persona.nombre);'
  },
  {
    id: 13,
    level: 'Difícil',
    question: 'Crea un array con los números [1, 2, 3, 4, 5] y usa map para duplicar cada número. Imprime el resultado',
    hint: 'const numeros = [1,2,3,4,5]; const duplicados = numeros.map(n => n * 2);',
    validateOutput: (output) => {
      const str = output.join(' ');
      return str.includes('2') && str.includes('4') && str.includes('10');
    },
    solution: 'const numeros = [1, 2, 3, 4, 5];\nconst duplicados = numeros.map(n => n * 2);\nconsole.log(duplicados);'
  },
  {
    id: 14,
    level: 'Difícil',
    question: 'Usa filter para obtener solo los números pares del array [1, 2, 3, 4, 5, 6]. Imprime el resultado',
    hint: 'const numeros = [1,2,3,4,5,6]; const pares = numeros.filter(n => n % 2 === 0);',
    validateOutput: (output) => {
      const str = output.join(' ');
      return str.includes('2') && str.includes('4') && str.includes('6');
    },
    solution: 'const numeros = [1, 2, 3, 4, 5, 6];\nconst pares = numeros.filter(n => n % 2 === 0);\nconsole.log(pares);'
  },
  {
    id: 15,
    level: 'Muy Difícil',
    question: 'Crea una arrow function que calcule el área de un círculo (π * r²). Calcula el área con radio 5',
    hint: 'const areaCirculo = (r) => Math.PI * r * r;',
    validateOutput: (output) => {
      const str = output.join(' ');
      // El área de un círculo con radio 5 es aproximadamente 78.5
      return str.includes('78') || str.includes('79');
    },
    solution: 'const areaCirculo = (r) => Math.PI * r * r;\nconsole.log(areaCirculo(5));'
  }
]

export default function ExamenPage() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [code, setCode] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info' | '', message: string }>({ type: '', message: '' })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const exercise = exercises[currentExercise]
  const progress = ((currentExercise + 1) / exercises.length) * 100

  const executeCode = () => {
    setConsoleOutput([])
    const logs: string[] = []

    const originalLog = console.log
    console.log = (...args: any[]) => {
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ')
      logs.push(message)
      originalLog.apply(console, args)
    }

    try {
      // eslint-disable-next-line no-eval
      eval(code)
      setConsoleOutput(logs)
      console.log = originalLog
      return logs
    } catch (error: any) {
      const errorMsg = '❌ Error: ' + error.message
      setConsoleOutput([errorMsg])
      console.log = originalLog
      return [errorMsg]
    }
  }

  const checkAnswer = () => {
    setAttempts(prev => prev + 1)
    const output = executeCode()

    if (output.length === 0 || output[0].includes('Error')) {
      setFeedback({ type: 'error', message: '❌ Tu código tiene errores. Revísalo e intenta de nuevo.' })
      return
    }

    const isCorrect = exercise.validateOutput(output)

    if (isCorrect) {
      setFeedback({ type: 'success', message: '🎉 ¡Correcto! Excelente trabajo.' })
      setScore(prev => prev + 1)

      setTimeout(() => {
        if (currentExercise < exercises.length - 1) {
          setCurrentExercise(prev => prev + 1)
          setCode('')
          setConsoleOutput([])
          setFeedback({ type: '', message: '' })
          setShowHint(false)
        } else {
          setFeedback({ type: 'success', message: `🏆 ¡Felicidades! Completaste todos los ejercicios. Puntuación: ${score + 1}/${exercises.length}` })
        }
      }, 2000)
    } else {
      setFeedback({ type: 'error', message: '❌ No es correcto. Lee bien la pregunta e intenta de nuevo.' })
    }
  }

  const skipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
      setCode('')
      setConsoleOutput([])
      setFeedback({ type: '', message: '' })
      setShowHint(false)
    }
  }

  const showSolution = () => {
    setCode(exercise.solution)
    setFeedback({ type: 'info', message: '💡 Esta es la solución. Estúdiala y presiona "Verificar" para continuar.' })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Muy Fácil': return '#4CAF50'
      case 'Fácil': return '#8BC34A'
      case 'Medio': return '#FF9800'
      case 'Difícil': return '#FF5722'
      case 'Muy Difícil': return '#f44336'
      default: return '#667eea'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 50px rgba(0,0,0,0.3)' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', position: 'relative' }}>
          <Link href="/" style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Volver al Playground
          </Link>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>📝 Modo Examen</h1>
            <p style={{ fontSize: '1.2em' }}>Resuelve los ejercicios de JavaScript paso a paso</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ background: '#f0f0f0', height: '10px' }}>
          <div style={{ background: '#4CAF50', height: '100%', width: `${progress}%`, transition: 'width 0.5s' }}></div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#667eea' }}>{currentExercise + 1}/{exercises.length}</div>
            <div style={{ color: '#666' }}>Ejercicio</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#4CAF50' }}>{score}</div>
            <div style={{ color: '#666' }}>Correctos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#FF9800' }}>{attempts}</div>
            <div style={{ color: '#666' }}>Intentos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', background: getLevelColor(exercise.level), color: 'white' }}>{exercise.level}</div>
            <div style={{ color: '#666', marginTop: '5px' }}>Dificultad</div>
          </div>
        </div>

        {/* Exercise Question */}
        <div style={{ padding: '30px', background: '#fff' }}>
          <div style={{ background: '#e3f2fd', padding: '25px', borderRadius: '12px', borderLeft: '5px solid #2196F3', marginBottom: '20px' }}>
            <h2 style={{ color: '#1976D2', fontSize: '1.8em', marginBottom: '15px' }}>
              Ejercicio {currentExercise + 1}: {exercise.question}
            </h2>
            {showHint && (
              <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #ffc107' }}>
                <strong style={{ color: '#f57c00' }}>💡 Pista:</strong>
                <div style={{ color: '#666', marginTop: '8px' }}>{exercise.hint}</div>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <div style={{ color: '#61afef', marginBottom: '10px', fontWeight: 'bold' }}>✍️ Escribe tu código aquí:</div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                background: '#2d3748',
                color: '#e8e8e8',
                border: 'none',
                padding: '20px',
                fontFamily: "'Courier New', monospace",
                fontSize: '16px',
                lineHeight: '1.6',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical'
              }}
              placeholder="// Escribe tu solución aquí..."
            />
          </div>

          {/* Console Output */}
          {consoleOutput.length > 0 && (
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #ddd' }}>
              <div style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '10px' }}>📟 Consola:</div>
              {consoleOutput.map((line, index) => (
                <div key={index} style={{
                  padding: '8px',
                  background: line.includes('Error') ? '#ffebee' : 'white',
                  color: line.includes('Error') ? '#f44336' : '#333',
                  borderRadius: '4px',
                  marginBottom: '5px',
                  fontFamily: "'Courier New', monospace"
                }}>
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Feedback */}
          {feedback.message && (
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              background: feedback.type === 'success' ? '#e8f5e9' : feedback.type === 'error' ? '#ffebee' : '#e3f2fd',
              borderLeft: `5px solid ${feedback.type === 'success' ? '#4CAF50' : feedback.type === 'error' ? '#f44336' : '#2196F3'}`,
              fontSize: '1.1em',
              fontWeight: 'bold'
            }}>
              {feedback.message}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={checkAnswer}
              style={{
                flex: '1',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ✅ Verificar Respuesta
            </button>

            <button
              onClick={executeCode}
              style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ▶️ Ejecutar
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                background: '#FF9800',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              💡 {showHint ? 'Ocultar' : 'Ver'} Pista
            </button>

            <button
              onClick={showSolution}
              style={{
                background: '#9C27B0',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              👁️ Ver Solución
            </button>

            <button
              onClick={skipExercise}
              style={{
                background: '#607D8B',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              disabled={currentExercise >= exercises.length - 1}
            >
              ⏭️ Saltar
            </button>
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: '#fff3cd', padding: '20px', margin: '20px', borderRadius: '10px', borderLeft: '5px solid #ffc107' }}>
          <h3 style={{ color: '#f57c00', marginBottom: '10px' }}>💭 Tips:</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '2', color: '#666' }}>
            <li>Lee cuidadosamente cada pregunta</li>
            <li>Usa "Ejecutar" para probar tu código antes de verificar</li>
            <li>Si te atascas, usa la pista</li>
            <li>Puedes ver la solución para aprender</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
