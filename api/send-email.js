// Vercel Serverless Function to send email notifications
// This uses Resend API - you'll need to sign up at https://resend.com (free tier available)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, service, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get Resend API key from environment variable
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || 'your-email@example.com';

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'West Orange Plumbing <onboarding@resend.dev>', // Use your verified domain later
        to: TO_EMAIL,
        subject: `New Lead: ${firstName} ${lastName} - ${service}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
                .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; }
                .footer { background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
                .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🔧 New Service Request</h1>
                  <p>West Orange Plumbing Services</p>
                </div>
                <div class="content">
                  <div class="urgent">
                    <strong>⚡ New lead received!</strong> Contact this customer as soon as possible.
                  </div>
                  
                  <div class="field">
                    <div class="label">Customer Name:</div>
                    <div class="value">${firstName} ${lastName}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Service Requested:</div>
                    <div class="value">${service}</div>
                  </div>
                  
                  ${message ? `
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">${message}</div>
                  </div>
                  ` : ''}
                  
                  <div class="field">
                    <div class="label">Submitted:</div>
                    <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>This is an automated notification from West Orange Plumbing Services</p>
                  <p>Lead submitted via westorangeplumbing.com</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(500).json({ error: 'Failed to send email', details: data });
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
