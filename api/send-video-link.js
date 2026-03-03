// Vercel Serverless Function for Brevo (Sendinblue) email delivery
export default async function handler(req, res) {
    console.log("--- Email API Triggered ---");

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, caseStudyTitle, videoUrl } = req.body;
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
        console.error("DEBUG: BREVO_API_KEY check failed. process.env.BREVO_API_KEY is undefined.");
        return res.status(500).json({
            error: 'Server configuration error: BREVO_API_KEY is missing.',
            env_keys: Object.keys(process.env).filter(k => k.includes('BREVO') || k.includes('VITE'))
        });
    }

    if (!email || !caseStudyTitle || !videoUrl) {
        return res.status(400).json({ error: 'Missing required fields (email, title, or url)' });
    }

    try {
        console.log(`DEBUG: Attempting to send email to ${email} for "${caseStudyTitle}"`);

        const brevoPayload = {
            sender: {
                name: "JUJU Films",
                email: "info@jujuindia.com"
            },
            to: [{ email: email }],
            subject: `High-Res Video: ${caseStudyTitle}`,
            htmlContent: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a; background-color: #ffffff; color: #111111;">
                    <h1 style="color: #E52323; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">JUJU Films</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
                    <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in our work. You requested the high-resolution video for the case study: <strong>${caseStudyTitle}</strong>.</p>
                    
                    <div style="margin: 30px 0;">
                        <a href="${videoUrl}" target="_blank" style="background-color: #E52323; color: #ffffff; padding: 15px 25px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px;">Watch / Download Video</a>
                    </div>
                    
                    <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this link: <br/>${videoUrl}</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} JUJU Films. All rights reserved.</p>
                </div>
            `
        };

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(brevoPayload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("DEBUG: Brevo Success:", data);
            return res.status(200).json({ success: true, messageID: data.messageId });
        } else {
            console.error("DEBUG: Brevo API Error Response:", data);
            return res.status(response.status).json({
                error: 'Brevo API rejected the request',
                details: data
            });
        }
    } catch (error) {
        console.error("DEBUG: Serverless function CRASH:", error);
        return res.status(500).json({
            error: 'Internal server error occurred while calling Brevo.',
            message: error.message,
            stack: error.stack
        });
    }
}
