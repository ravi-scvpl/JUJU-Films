import { supabase } from '@/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search');
    
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    let filteredPosts = posts || [];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        p => (p.title && p.title.toLowerCase().includes(searchLower)) ||
             (p.content && p.content.toLowerCase().includes(searchLower))
      );
    }

    // Format url mapping
    const formatted = filteredPosts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      image_url: post.image_url,
      meta_title: post.meta_title,
      meta_desc: post.meta_desc,
      url: `/blog/${post.slug}`,
      created_at: post.created_at
    }));

    return Response.json(formatted, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
