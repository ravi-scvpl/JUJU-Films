import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        console.log("--- Email Route Handler Triggered ---");
        const body = await req.json();
        const { email, caseStudyTitle, videoUrl } = body;
        const BREVO_API_KEY = process.env.BREVO_API_KEY;

        if (!BREVO_API_KEY) {
            console.error("DEBUG: BREVO_API_KEY check failed. process.env.BREVO_API_KEY is undefined.");
            return NextResponse.json({
                error: 'Server configuration error: BREVO_API_KEY is missing.'
            }, { status: 500 });
        }

        if (!email || !caseStudyTitle || !videoUrl) {
            return NextResponse.json({ error: 'Missing required fields (email, title, or url)' }, { status: 400 });
        }

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
            return NextResponse.json({ success: true, messageID: data.messageId });
        } else {
            console.error("DEBUG: Brevo API Error Response:", data);
            return NextResponse.json({
                error: 'Brevo API rejected the request',
                details: data
            }, { status: response.status });
        }
    } catch (error) {
        console.error("DEBUG: Route handler CRASH:", error);
        return NextResponse.json({
            error: 'Internal server error occurred while calling Brevo.',
            message: error.message
        }, { status: 500 });
    }
}
