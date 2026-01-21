import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogContent = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blog/blogs.json')
            .then(res => res.json())
            .then(data => {
                if (data.articles) {
                    setBlogs(data.articles);
                }
            })
            .catch(err => console.error("Error fetching blogs:", err));
    }, []);

    return (
        <section className="section" style={{ paddingTop: 0, marginTop: '-1px', paddingBottom: '80px', backgroundColor: '#000', color: '#fff' }}>
            <div className="grid hero__content" style={{ paddingTop: 0, marginTop: 0 }}>
                <p pos="row" pos-s="row" className="hero__title" style={{ marginTop: 0, paddingBottom: '20px' }}>
                    Journal
                </p>
            </div>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
                <div style={{ gridColumn: '2 / 12' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                        {blogs.map((blog, index) => (
                            <Link to={`/blog/${blog.id}`} key={index} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                <div style={{ marginBottom: '20px', overflow: 'hidden' }}>
                                    <img
                                        src={`https://placehold.co/600x400/222/fff?text=${encodeURIComponent(blog.theme || 'Blog')}`}
                                        alt={blog.title}
                                        style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }}
                                    />
                                </div>
                                <div style={{ fontSize: '14px', marginBottom: '10px', color: '#fff' }}>06.01.2026</div>
                                <h3 style={{ fontFamily: 'serif', fontSize: '28px', lineHeight: '1.2', fontWeight: '400', marginBottom: '15px', color: '#fff' }}>
                                    {blog.title}
                                </h3>
                                <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#aaa', margin: 0 }}>
                                    {blog.intro}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogContent;
