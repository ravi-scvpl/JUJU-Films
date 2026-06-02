import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            first_name,
            last_name,
            email,
            phone,
            company,
            message,
            type,
            website_url,
            city
        } = body;

        const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

        if (!HUBSPOT_ACCESS_TOKEN) {
            console.error("CRITICAL: HUBSPOT_ACCESS_TOKEN is missing in environment variables.");
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        if (!email) {
            return NextResponse.json({ error: 'Email is required for HubSpot sync.' }, { status: 400 });
        }

        console.log(`Syncing lead to HubSpot: ${email} (${type})`);

        // Prepare HubSpot properties using standard mapping
        const properties = {
            email: email,
            firstname: first_name || '',
            lastname: last_name || '',
            phone: phone || '',
            company: company || '',
            website: website_url || '',
            city: city || '',
            message: message || '',
            hs_lead_status: 'NEW'
        };

        const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ properties })
        });

        const data = await hubspotResponse.json();

        if (hubspotResponse.ok) {
            console.log("HubSpot Sync Success:", data.id);
            return NextResponse.json({ success: true, hubspot_id: data.id });
        } else {
            // Check if contact already exists (409 Conflict)
            if (hubspotResponse.status === 409) {
                console.log("Contact already exists in HubSpot, skipping create.");
                return NextResponse.json({ success: true, message: 'Contact already exists' });
            }

            console.error("HubSpot API Error:", data);
            return NextResponse.json({
                error: 'HubSpot API rejected the request',
                details: data
            }, { status: hubspotResponse.status });
        }
    } catch (error) {
        console.error("HubSpot Sync Crash:", error);
        return NextResponse.json({
            error: 'Internal server error occurred while calling HubSpot.',
            message: error.message
        }, { status: 500 });
    }
}
