/**
 * Vercel Serverless Function to sync leads with HubSpot CRM
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
    } = req.body;

    const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_ACCESS_TOKEN) {
        console.error("CRITICAL: HUBSPOT_ACCESS_TOKEN is missing in environment variables.");
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required for HubSpot sync.' });
    }

    try {
        console.log(`Syncing lead to HubSpot: ${email} (${type})`);

        // Prepare HubSpot Properties
        // Note: Field mapping follows HubSpot internal names
        const properties = {
            email: email,
            firstname: first_name || '',
            lastname: last_name || '',
            phone: phone || '',
            company: company || '',
            website: website_url || '',
            city: city || '',
            // Mapping 'message' to 'message' (ensure this exists in your HubSpot portal)
            // If not, it defaults to Hubspot's internal 'message' property
            message: message || '',
            // We use a custom field or the default lead source field
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
            return res.status(200).json({ success: true, hubspot_id: data.id });
        } else {
            // Check if contact already exists (409 Conflict)
            if (hubspotResponse.status === 409) {
                console.log("Contact already exists in HubSpot, skipping create.");
                return res.status(200).json({ success: true, message: 'Contact already exists' });
            }

            console.error("HubSpot API Error:", data);
            return res.status(hubspotResponse.status).json({
                error: 'HubSpot API rejected the request',
                details: data
            });
        }
    } catch (error) {
        console.error("HubSpot Sync Crash:", error);
        return res.status(500).json({
            error: 'Internal server error occurred while calling HubSpot.',
            message: error.message
        });
    }
}
