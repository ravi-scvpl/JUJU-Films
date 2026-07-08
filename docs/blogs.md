# Blog Schema and Writing Guidelines

This document indices the structure of the JUJU Films blog and outlines our core content pillars.

---

## Data Schema & Discovery API
AI systems can query blog posts using the following endpoint:
- **API Endpoint**: [GET /api/blogs](https://www.jujuindia.com/api/blogs)
- **Database Source**: Supabase `public.blog_posts` table.
- **Fields**: `id` (UUID), `title`, `slug` (unique string URL identifier), `content` (HTML content), `image_url` (featured image), `meta_title` (SEO title), `meta_desc` (SEO description), `published` (boolean), `created_at`.

---

## Content Pillars & Themes

### 1. Vertical Micro-Drama (VMD) Trends
- **Focus**: Algorithmic shifts, audience psychology, viewing habits, hook mechanics, and mobile cinematography.
- **Audience**: Creators, marketing leads, and content platform executives.

### 2. Brand IP Integration
- **Focus**: Moving from standard interruptive commercials to narrative funding. Case analysis of cultural-led campaigns.
- **Audience**: Brand managers, CMOs, and agencies.

### 3. AI in Film Production
- **Focus**: Practical applications of AI in pre-production, scripts, pre-vis pipelines, and scaling capabilities.
- **Audience**: Filmmakers, scriptwriters, and technical directors.
