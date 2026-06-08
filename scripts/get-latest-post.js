import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const url = 'https://ppbjijjbkwfdrvaghfhc.supabase.co';
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYmppampia3dmZHJ2YWdoZmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTEwNDgsImV4cCI6MjA4NTA2NzA0OH0.u9yjMQ5md4J0J4y1XujYQcGbYrPPqNFj1rJUoipZ0TQ';
const client = createClient(url, anon);

const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

if (error) {
    console.error("Error fetching record:", error);
} else if (data && data.length > 0) {
    const post = data[0];
    fs.writeFileSync('scripts/latest-content.html', post.content);
    console.log("Saved content to scripts/latest-content.html");
} else {
    console.log("No posts found in database.");
}
