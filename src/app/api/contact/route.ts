import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, incidentType, incidentDate, message, location } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email and phone are required' },
        { status: 400 }
      )
    }

    // Prepare email content
    const emailContent = `
New Child Injury Claims Enquiry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Incident Details:
- Type: ${incidentType || 'Not specified'}
- Date: ${incidentDate || 'Not specified'}
- Location: ${location || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Additional Message:
${message || 'No additional message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
Source: childinjuryclaims.co.uk
    `

    // Log for development - in production you would use a real email service
    console.log('📧 New Enquiry Received:')
    console.log(emailContent)

    // In production, integrate with an email service like:
    // - SendGrid, Mailgun, AWS SES, Resend, etc.
    // For now, we'll simulate a successful submission
    
    // Example with a hypothetical email service:
    // await sendEmail({
    //   to: 'sleeuk89@gmail.com',
    //   subject: `New Child Injury Claim Enquiry from ${name}`,
    //   text: emailContent,
    //   replyTo: email
    // })

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        name,
        email,
        phone,
        incidentType,
        incidentDate,
        message,
        location
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
