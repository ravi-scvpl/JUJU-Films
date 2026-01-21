import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch article data
        fetch('/blog/blogs.json')
            .then(res => res.json())
            .then(data => {
                const foundBlog = data.articles.find(article => article.id === id);
                setBlog(foundBlog);
            })
            .catch(err => console.error("Error fetching blog:", err));

        // Enable theme switching
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        }
    }, [id]);

    if (!blog) return <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch" style={{ minHeight: '100vh', paddingBottom: '100px', paddingTop: '150px' }}>

            {/* Full Width Image (1/13) */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '60px' }}>
                <div style={{ gridColumn: '1 / 13' }}>
                    <img
                        src={`https://placehold.co/1920x800/222/fff?text=${encodeURIComponent(blog.title)}`}
                        alt={blog.title}
                        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '80vh', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Content Area (5/13) */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                <div style={{ gridColumn: '5 / 13' }}>
                    <div style={{ fontSize: '14px', marginBottom: '20px' }}>
                        06.01.2026 • {blog.theme || 'Blog'}
                    </div>

                    <h1 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '400', marginBottom: '40px', fontFamily: 'serif' }}>
                        {blog.title}
                    </h1>

                    <p style={{ fontSize: '24px', lineHeight: '1.5', marginBottom: '60px' }}>
                        {blog.intro}
                    </p>

                    {blog.sections && blog.sections.map((section, index) => (
                        <div key={index} style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px' }}>{section.heading}</h3>
                            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{section.content}</p>
                        </div>
                    ))}

                    {blog.juju_pov && (
                        <div style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f0f0f0ff', borderLeft: '4px solid #fff' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>JUJU POV</h3>
                            {blog.juju_pov.intro && <p style={{ fontSize: '18px', marginBottom: '20px', color: '#5a5959ff' }}>{blog.juju_pov.intro}</p>}
                            <ul style={{ paddingLeft: '20px', marginBottom: '20px', color: '#ccc', lineHeight: '1.6' }}>
                                {blog.juju_pov.points.map((point, i) => (
                                    <li key={i} style={{ marginBottom: '10px' }}>{point}</li>
                                ))}
                            </ul>
                            <p style={{ fontSize: '18px', fontStyle: 'italic', fontWeight: '500' }}>
                                "{blog.juju_pov.closing}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
