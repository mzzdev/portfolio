import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const attempts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000
const MAX_ATTEMPTS = 3

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userAttempts = attempts.get(ip)

  if (!userAttempts || now > userAttempts.resetTime) {
    attempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userAttempts.count >= MAX_ATTEMPTS) {
    return false
  }

  userAttempts.count++
  return true
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)

    if (sanitizedName.length > 100 || sanitizedMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long.' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: `mzzdev <noreply@${process.env.RESEND_DOMAIN}>`,
      to: [process.env.CONTACT_EMAIL!],
      subject: `[Portfolio] Nueva notificación de contacto - ${sanitizedName}`,
      replyTo: sanitizedEmail,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Portfolio] Nueva notificación de contacto</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #495057; margin: 0 0 10px 0;">🔔 Nueva notificación de formulario de contacto desde mzzdev.com</h2>
      <p style="margin: 0; color: #6c757d;">Recibido el ${new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>

    <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="color: #495057; margin-top: 0;">Datos del contacto:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #495057;">Nombre / Empresa:</td>
          <td style="padding: 8px 0;">${sanitizedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${sanitizedEmail}" style="color: #007bff; text-decoration: none;">${sanitizedEmail}</a></td>
        </tr>
      </table>
    </div>

    <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px;">
      <h3 style="color: #495057; margin-top: 0;">Mensaje:</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-family: system-ui, sans-serif;">${sanitizedMessage}</div>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
      <p style="color: #6c757d; font-size: 12px; margin: 0;">
        Este email fue enviado desde el formulario de contacto de <strong>mzzdev.com</strong> de manera automática.<br>
        IP: ${ip}
      </p>
    </div>

  </div>
</body>
</html>
      `,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
