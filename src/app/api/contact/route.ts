import { NextRequest, NextResponse } from 'next/server'

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

    const emailData = {
      to: process.env.CONTACT_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: `Portfolio Contact: ${sanitizedName}`,
      text: `
New contact form submission:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Message: ${sanitizedMessage}

---
Sent from your portfolio contact form
IP: ${ip}
Time: ${new Date().toISOString()}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Portfolio Contact</h2>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p><strong>Name:</strong> ${sanitizedName}</p>
    <p><strong>Email:</strong> ${sanitizedEmail}</p>
    <p><strong>Message:</strong></p>
    <div style="background: white; padding: 15px; border-radius: 3px; white-space: pre-wrap;">${sanitizedMessage}</div>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
  <p style="color: #666; font-size: 12px;">
    Sent from your portfolio contact form<br>
    IP: ${ip}<br>
    Time: ${new Date().toLocaleString()}
  </p>
</div>
      `,
      replyTo: sanitizedEmail,
    }

    await fetch(process.env.CLOUDFLARE_EMAIL_API!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify(emailData),
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}