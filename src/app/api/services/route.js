export async function GET() {
  const services = [
    {
      title: "Vertical Micro-Drama Production (VMD)",
      slug: "vertical-micro-drama-production-india",
      description: "Mobile-first 9:16 vertical series (1-5 min episodes) optimized for user retention, hooks, and character engagement on Reels, Shorts, and mobile platforms.",
      url: "/vertical-micro-drama-production-india"
    },
    {
      title: "JUJU Storytellers (Original Series & Features)",
      slug: "juju-storytellers",
      description: "Premium OTT and film formats designed for deep attention, cultural relevance, and long-term IP shelf life.",
      url: "/juju-storytellers"
    },
    {
      title: "JUJU Commercials (Brand-Integrated Ads)",
      slug: "juju-commercials",
      description: "Advertising and branded content where stories build cultural presence and brand integration is organic to the narrative.",
      url: "/juju-commercials"
    },
    {
      title: "JUJU AI Lab (AI Pre-Production & Visualisation)",
      slug: "juju-ai-films",
      description: "Integrating advanced AI workflows at script, storyboarding, and pre-visualisation stages to accelerate pre-production without losing human-centric creativity.",
      url: "/juju-ai-films"
    },
    {
      title: "JUJU Ecosystem (Co-Production Infrastructure)",
      slug: "juju-ecosystem",
      description: "Production and logistical co-ownership model facilitating collaboration with top creators and regional storytellers across India.",
      url: "/juju-ecosystem"
    }
  ];

  return Response.json(services, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59"
    }
  });
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
