import { createClient } from '@supabase/supabase-js';
const url = 'https://ppbjijjbkwfdrvaghfhc.supabase.co';
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmppampia3dmZHJ2YWdoZmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTEwNDgsImV4cCI6MjA4NTA2NzA0OH0.u9yjMQ5md4J0J4y1XujYQcGbYrPPqNFj1rJUoipZ0TQ';
const client = createClient(url, anon);

const { data, error } = await client.from('blog_posts').select('*').limit(1);
if (error) {
    console.error("Error fetching record:", error);
} else {
    console.log("Record Columns:", data && data.length > 0 ? Object.keys(data[0]) : "Empty table or no data");
}
