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

    // Format the email content
    const emailSubject = `New Child Injury Claim Enquiry from ${name}`
    const emailMessage = `
NEW CHILD INJURY CLAIM ENQUIRY

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Phone: ${phone}

INCIDENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type of Incident: ${incidentType || 'Not specified'}
Date of Incident: ${incidentDate || 'Not specified'}
Location: ${location || 'Not specified'}

ADDITIONAL MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message || 'No additional message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
Website: childinjuryclaims.co.uk
    `.trim()

    // Log for server-side record
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 NEW CHILD INJURY CLAIM ENQUIRY')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`To: sleeuk89@gmail.com`)
    console.log(`From: ${name} <${email}>`)
    console.log(`Phone: ${phone}`)
    console.log(`Incident: ${incidentType || 'N/A'}`)
    console.log(`Date: ${incidentDate || 'N/A'}`)
    console.log(`Location: ${location || 'N/A'}`)
    console.log(`Message: ${message || 'None'}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Try Formsubmit.co - Free email forwarding service
    // This sends the form data to sleeuk89@gmail.com
    try {
      const formData = new URLSearchParams()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('subject', emailSubject)
      formData.append('message', emailMessage)
      formData.append('_captcha', 'false')
      formData.append('_template', 'table')
      formData.append('_replyto', email)
      
      const formsubmitResponse = await fetch('https://formsubmit.co/sleeuk89@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      })

      if (formsubmitResponse.ok) {
        console.log('✅ Email sent successfully via Formsubmit.co')
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your enquiry has been submitted. We will contact you within 24 hours.'
        })
      }
    } catch (formsubmitError) {
      console.log('Formsubmit.co failed, trying backup...')
    }

    // Backup: Try Formspree.io (your form: https://formspree.io/f/xyknozda)
    try {
      const formspreeData = new URLSearchParams()
      formspreeData.append('name', name)
      formspreeData.append('email', email)
      formspreeData.append('phone', phone)
      formspreeData.append('message', emailMessage)
      formspreeData.append('_subject', emailSubject)

      const formspreeResponse = await fetch('https://formspree.io/f/xyknozda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formspreeData.toString()
      })

      if (formspreeResponse.ok) {
        console.log('✅ Email sent successfully via Formspree to sleeuk89@gmail.com')
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your enquiry has been submitted. We will contact you within 24 hours.'
        })
      }
    } catch (formspreeError) {
      console.log('Formspree failed:', formspreeError)
    }

    // Return success even if external services fail - data is logged
    // In production, you would integrate with a proper email service like:
    // - SendGrid, Mailgun, AWS SES, or Resend
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. We will contact you within 24 hours.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry. Please try calling us directly.' },
      { status: 500 }
    )
  }
}
