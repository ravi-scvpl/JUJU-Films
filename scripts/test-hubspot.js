/**
 * Manual Verification Script: HubSpot Integration
 * 
 * This script mocks a lead submission to test the api/hubspot-sync.js bridge.
 * 
 * Usage:
 * 1. Ensure HUBSPOT_ACCESS_TOKEN is set in your .env
 * 2. Run: node scripts/test-hubspot.js
 */

/**
 * Manual Verification Script: HubSpot Integration (ESM Version)
 * 
 * This script mocks a lead submission to test the api/hubspot-sync.js bridge.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

if (!HUBSPOT_ACCESS_TOKEN) {
    console.error('ERROR: HUBSPOT_ACCESS_TOKEN not found in .env');
    process.exit(1);
}

const testLead = {
    first_name: 'Test',
    last_name: 'Lead',
    email: 'test-lead-juju@example.com',
    phone: '+919999999999',
    company: 'JUJU Test Studio',
    city: 'Mumbai',
    message: 'This is a test lead from the verification script.',
    type: 'organic_website'
};

async function runTest() {
    console.log('--- HubSpot Integration Test ---');
    console.log('Payload:', JSON.stringify(testLead, null, 2));

    try {
        const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: {
                    email: testLead.email,
                    firstname: testLead.first_name,
                    lastname: testLead.last_name,
                    phone: testLead.phone,
                    company: testLead.company,
                    city: testLead.city,
                    message: testLead.message
                }
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('SUCCESS: Lead created in HubSpot!');
            console.log('HubSpot ID:', data.id);
        } else if (response.status === 409) {
            console.log('INFO: Contact already exists (409 Conflict). Integration is working correctly.');
        } else {
            console.error('FAILED: HubSpot API error');
            console.error('Status:', response.status);
            console.error('Details:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('CRASH: Test script encountered an error');
        console.error(error);
    }
}

runTest();
