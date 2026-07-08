import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase Client
const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Readline setup for JSON-RPC over stdio
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Logs can interfere with stdout if not redirected to stderr
const logError = (...args) => {
  console.error(...args);
};

const TOOLS = [
  {
    name: 'get_services',
    description: 'Get details about JUJU Films services, offerings, and production divisions (e.g., Vertical Micro-Drama, OTT Original Series, Branded Commercials, AI Lab).',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'search_blogs',
    description: 'Search for published blog posts on the JUJU Films website by keyword or query.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword, topic, or search query to look for in blog post titles or content.'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of results to return (default 5, max 20).'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'search_case_studies',
    description: 'Search for published case studies (influencer/brand campaigns) on the JUJU Films website.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword, brand name, or campaign theme to search for in case studies.'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of results to return (default 5, max 20).'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'submit_contact_request',
    description: 'Submit a new business inquiry, creator application, job, or internship request to the JUJU Films contacts/leads database.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['brand', 'creator', 'internship', 'job'],
          description: 'The type of request/inquiry.'
        },
        first_name: { type: 'string', description: 'First name of the sender.' },
        last_name: { type: 'string', description: 'Last name of the sender.' },
        email: { type: 'string', description: 'Email address of the sender.' },
        phone: { type: 'string', description: 'Contact phone number.' },
        company: { type: 'string', description: 'Company name (for brands).' },
        budget: { type: 'string', description: 'Budget details/expectations (for brands).' },
        message: { type: 'string', description: 'Detailed inquiry message.' },
        portfolio_url: { type: 'string', description: 'Link to portfolio or previous work (for creators).' }
      },
      required: ['type', 'first_name', 'email', 'message']
    }
  }
];

rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const response = await handleRequest(request);
    if (response) {
      process.stdout.write(JSON.stringify(response) + '\n');
    }
  } catch (err) {
    logError('Error parsing or handling line:', err);
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error: ' + err.message
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
  }
});

async function handleRequest(request) {
  const { jsonrpc, id, method, params } = request;

  if (jsonrpc !== '2.0') {
    return {
      jsonrpc: '2.0',
      id: id || null,
      error: { code: -32600, message: 'Invalid request: not JSON-RPC 2.0' }
    };
  }

  switch (method) {
    case 'initialize':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'juju-mcp-server',
            version: '1.0.0'
          }
        }
      };

    case 'notifications/initialized':
      return null;

    case 'tools/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS
        }
      };

    case 'tools/call': {
      const { name, arguments: args } = params || {};
      try {
        const result = await handleToolCall(name, args);
        return {
          jsonrpc: '2.0',
          id,
          result
        };
      } catch (err) {
        logError(`Error calling tool ${name}:`, err);
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32603,
            message: `Internal error calling tool ${name}: ${err.message}`
          }
        };
      }
    }

    default:
      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` }
      };
  }
}

async function handleToolCall(name, args) {
  switch (name) {
    case 'get_services': {
      const services = [
        {
          name: "Vertical Micro-Drama Production (VMD)",
          description: "Mobile-first 9:16 vertical series (1-5 min episodes) optimized for user retention, hooks, and character engagement on Reels, Shorts, and mobile platforms.",
          details: "Based in Mumbai and Delhi NCR, India. Implements the JUJU VMD Framework™ focusing on 5 key layers: Hook, Character, Escalation, Cliffhanger, and Call-to-Action."
        },
        {
          name: "JUJU Storytellers (Original Series & Features)",
          description: "Premium OTT and film formats designed for deep attention, cultural relevance, and long-term IP shelf life.",
          details: "Partners with top storytellers to build original intellectual property (IP), funded by brands focused on cultural presence."
        },
        {
          name: "JUJU Commercials (Brand-Integrated Ads)",
          description: "Advertising and branded content where stories build cultural presence and brand integration is organic to the narrative.",
          details: "Transitioning brands from high-frequency to high-attention models."
        },
        {
          name: "JUJU AI Lab (AI Pre-Production & Visualisation)",
          description: "Integrating advanced AI workflows at script, storyboarding, and pre-visualisation stages to accelerate pre-production without losing human-centric creativity.",
          details: "Utilizes advanced tools for pre-production visualization and regional language scaling."
        },
        {
          name: "JUJU Ecosystem (Co-Production Infrastructure)",
          description: "Production and logistical co-ownership model facilitating collaboration with top creators and regional storytellers across India.",
          details: "Allows co-ownership and direct partnership with creators instead of simple hiring."
        }
      ];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(services, null, 2)
          }
        ]
      };
    }

    case 'search_blogs': {
      const { query, limit = 5 } = args || {};
      if (!supabase) {
        return {
          content: [{ type: 'text', text: 'Error: Supabase is not configured on the server.' }]
        };
      }
      
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      let results = posts || [];
      if (query) {
        const queryLower = query.toLowerCase();
        results = results.filter(
          p => (p.title && p.title.toLowerCase().includes(queryLower)) ||
               (p.content && p.content.toLowerCase().includes(queryLower))
        );
      }

      results = results.slice(0, limit).map(p => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.content ? p.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '',
        url: `https://www.jujuindia.com/blog/${p.slug}`,
        created_at: p.created_at
      }));

      return {
        content: [
          {
            type: 'text',
            text: results.length > 0 
              ? JSON.stringify(results, null, 2)
              : `No blogs found matching the search query: "${query}"`
          }
        ]
      };
    }

    case 'search_case_studies': {
      const { query, limit = 5 } = args || {};
      if (!supabase) {
        return {
          content: [{ type: 'text', text: 'Error: Supabase is not configured on the server.' }]
        };
      }
      
      const { data: posts, error } = await supabase
        .from('influencer_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      let results = posts || [];
      if (query) {
        const queryLower = query.toLowerCase();
        results = results.filter(
          p => (p.title && p.title.toLowerCase().includes(queryLower)) ||
               (p.content && p.content.toLowerCase().includes(queryLower)) ||
               (p.intro && p.intro.toLowerCase().includes(queryLower))
        );
      }

      results = results.slice(0, limit).map(p => ({
        title: p.title,
        slug: p.slug || p.id,
        excerpt: p.content ? p.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '',
        url: `https://www.jujuindia.com/case-studies/${p.slug || p.id}`,
        created_at: p.created_at
      }));

      return {
        content: [
          {
            type: 'text',
            text: results.length > 0 
              ? JSON.stringify(results, null, 2)
              : `No case studies found matching the search query: "${query}"`
          }
        ]
      };
    }

    case 'submit_contact_request': {
      if (!supabase) {
        return {
          content: [{ type: 'text', text: 'Error: Supabase is not configured on the server.' }]
        };
      }

      const insertData = {
        type: args.type,
        first_name: args.first_name,
        last_name: args.last_name || null,
        email: args.email,
        phone: args.phone || null,
        company: args.company || null,
        budget: args.budget || null,
        message: args.message,
        portfolio_url: args.portfolio_url || null,
        status: 'new',
        source: 'mcp-server'
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert([insertData])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Successfully submitted contact request. ID: ${data[0].id}. A representative will reach out at ${args.email}.`
          }
        ]
      };
    }

    default:
      throw new Error(`Tool not found: ${name}`);
  }
}
