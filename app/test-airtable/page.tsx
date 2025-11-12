'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TestAirtable() {
  const [resultado, setResultado] = useState<string>('')
  const [cargando, setCargando] = useState(false)

  const probarConexion = async () => {
    setCargando(true)
    setResultado('Enviando datos de prueba...')

    try {
      const response = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: 'Prueba de Sistema',
          puntaje: 10,
          total: 15,
          intentos: 12,
          fecha: new Date().toISOString().split('T')[0]
        })
      })

      const data = await response.json()

      if (response.ok) {
        setResultado(`✅ ¡Éxito! Los datos se guardaron correctamente en Airtable.\n\nRespuesta: ${JSON.stringify(data, null, 2)}`)
      } else {
        setResultado(`❌ Error: ${data.error}\n\nDetalles: ${JSON.stringify(data, null, 2)}`)
      }
    } catch (error: any) {
      setResultado(`❌ Error de conexión: ${error.message}`)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 15px 50px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '15px', color: '#667eea' }}>🧪 Prueba de Conexión Airtable</h1>
          <p style={{ fontSize: '1.1em', color: '#666' }}>Verifica que tu configuración funcione correctamente</p>
        </div>

        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>ℹ️ Información:</h3>
          <ul style={{ lineHeight: '2', color: '#666', marginLeft: '20px' }}>
            <li>Este test enviará datos de prueba a tu tabla de Airtable</li>
            <li>Verifica que hayas configurado las credenciales en <code>.env.local</code></li>
            <li>Si la prueba es exitosa, verás un nuevo registro en tu tabla</li>
            <li>Los datos de prueba son: Nombre: "Prueba de Sistema", Puntaje: 10/15</li>
          </ul>
        </div>

        <button
          onClick={probarConexion}
          disabled={cargando}
          style={{
            width: '100%',
            background: cargando ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '18px',
            borderRadius: '8px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            cursor: cargando ? 'not-allowed' : 'pointer',
            marginBottom: '30px',
            transition: 'all 0.3s'
          }}
        >
          {cargando ? '⏳ Enviando...' : '🚀 Probar Conexión'}
        </button>

        {resultado && (
          <div style={{
            background: resultado.includes('✅') ? '#e8f5e9' : '#ffebee',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: `5px solid ${resultado.includes('✅') ? '#4CAF50' : '#f44336'}`,
            marginBottom: '30px'
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#333',
              margin: 0
            }}>
              {resultado}
            </pre>
          </div>
        )}

        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
          <h4 style={{ color: '#f57c00', marginBottom: '10px' }}>🔧 Si ves errores:</h4>
          <ul style={{ marginLeft: '20px', lineHeight: '2', color: '#666' }}>
            <li><strong>INVALID_VALUE_FOR_COLUMN "Fecha":</strong> Verifica que el campo "Fecha" en Airtable sea tipo "Date" (no "Date and time")</li>
            <li><strong>INVALID_PERMISSIONS:</strong> Verifica que tu API token tenga permisos de escritura</li>
            <li><strong>NOT_FOUND:</strong> Verifica que el Table ID sea correcto</li>
            <li><strong>AUTHENTICATION_REQUIRED:</strong> Verifica tu API Key</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link
            href="/examen"
            style={{
              background: '#667eea',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
            📝 Ir al Examen
          </Link>
          <Link
            href="/"
            style={{
              background: '#607D8B',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
            🏠 Volver al Inicio
          </Link>
        </div>

      </div>
    </div>
  )
}
