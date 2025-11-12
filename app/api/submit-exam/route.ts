import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, puntaje, total, intentos, fecha } = body

    // Validar que tengamos los datos necesarios
    if (!nombre || puntaje === undefined || !total) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Configuración de Airtable
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      console.error('Faltan variables de entorno de Airtable')
      return NextResponse.json(
        { error: 'Configuración de Airtable incompleta' },
        { status: 500 }
      )
    }

    // Enviar a Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`

    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          Nombre: nombre,
          Puntaje: puntaje,
          Total: total,
          Porcentaje: Math.round((puntaje / total) * 100),
          Intentos: intentos,
          Fecha: fecha
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error de Airtable:', errorData)
      return NextResponse.json(
        { error: 'Error al guardar en Airtable', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Error en submit-exam:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
