"use client";


import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../../supabaseClient';
import SEO from '../../components/SEO';

const AdminInfluence = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        image_url: '',
        image_alt: '',
        meta_title: '',
        meta_desc: '',
        seo_description: '',
        category: '',
        published: false,
        video_url: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fetchingMeta, setFetchingMeta] = useState(false);
    const [viewMode, setViewMode] = useState('visual');
    const fileInputRef = useRef(null);

    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState('');

    const handleImportFromUrlTxt = async () => {
        if (!window.confirm('WARNING: This will delete all existing case studies and import all videos from url.txt. Are you sure?')) {
            return;
        }

        setImporting(true);
        setImportProgress('Fetching url.txt...');

        try {
            const res = await fetch('/local_assets/url.txt');
            if (!res.ok) throw new Error('Failed to load url.txt');
            const text = await res.text();
            const urls = text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            setImportProgress(`Found ${urls.length} URLs. Deleting existing case studies...`);

            const { error: deleteError } = await supabase
                .from('influencer_posts')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all (assuming uuid is used)

            if (deleteError) throw deleteError;

            let count = 0;
            const ytIdReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const postsToInsert = [];
            const usedSlugs = new Set();

            const makeUniqueSlug = (titleText, id) => {
                let base = titleText
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-');
                if (!base || base.length < 3) base = `video-${id}`;
                let slug = base;
                let counter = 2;
                while (usedSlugs.has(slug)) {
                    slug = `${base}-${counter}`;
                    counter++;
                }
                usedSlugs.add(slug);
                return slug;
            };

            for (const url of urls) {
                count++;
                setImportProgress(`[${count}/${urls.length}] Fetching metadata for ${url}...`);

                const match = url.match(ytIdReg);
                const id = (match && match[2].length === 11) ? match[2] : null;
                if (!id) continue;

                let title = `YouTube Video ${id}`;
                let imageUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

                try {
                    const metaRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
                    const metaData = await metaRes.json();
                    if (metaData && metaData.title) {
                        title = metaData.title;
                        imageUrl = metaData.thumbnail_url || imageUrl;
                    }
                } catch (e) {
                    console.error("noembed error", e);
                }

                postsToInsert.push({
                    title: title,
                    slug: makeUniqueSlug(title, id),
                    video_url: url,
                    image_url: imageUrl,
                    content: '<p></p>',
                    published: true,
                    category: 'Case Study',
                    meta_title: '',
                    meta_desc: '',
                    seo_description: '',
                    image_alt: ''
                });

                await new Promise(r => setTimeout(r, 100));
            }

            setImportProgress(`Inserting ${postsToInsert.length} posts...`);

            const batchSize = 10;
            for (let i = 0; i < postsToInsert.length; i += batchSize) {
                const batch = postsToInsert.slice(i, i + batchSize);
                const { error: insertError } = await supabase
                    .from('influencer_posts')
                    .insert(batch);
                if (insertError) throw insertError;
                setImportProgress(`Inserted ${Math.min(i + batchSize, postsToInsert.length)} / ${postsToInsert.length} posts...`);
            }

            alert('Successfully imported all case studies from url.txt!');
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert(`Error during import: ${err.message}`);
        } finally {
            setImporting(false);
            setImportProgress('');
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('type', 'influence')
            .order('name', { ascending: true });

        if (!error && data) {
            setCategories(data);
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('influencer_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
        setLoading(false);
    };

    const generateSlug = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
            .replace(/\-\-+/g, '-');     // Replace multiple - with single -
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };

            // Auto-generate slug if title changes
            if (name === 'title') {
                const currentSlug = prev.slug;
                const expectedSlug = generateSlug(prev.title);

                // If slug matches the "old" title slug (or is empty), update it
                if (!currentSlug || currentSlug === expectedSlug) {
                    newData.slug = generateSlug(value);
                }
            }

            return newData;
        });
    };

    const fetchVideoMetadata = async (url) => {
        setFetchingMeta(true);
        try {
            const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            if (data && data.title) {
                setFormData(prev => ({
                    ...prev,
                    title: prev.title && !(prev.title.startsWith('http://') || prev.title.startsWith('https://')) ? prev.title : data.title,
                    video_url: prev.video_url || url,
                    image_url: data.thumbnail_url || prev.image_url,
                    slug: generateSlug(data.title)
                }));
            }
        } catch (err) {
            console.error("Error fetching video metadata:", err);
        } finally {
            setFetchingMeta(false);
        }
    };

    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return formData.image_url;

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('influencer-images')
            .upload(filePath, imageFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('influencer-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const imageUrl = await uploadImage();

            const postData = {
                ...formData,
                image_url: imageUrl
            };

            let error;
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('influencer_posts')
                    .update(postData)
                    .eq('id', currentPost.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('influencer_posts')
                    .insert([postData]);
                error = insertError;
            }

            if (error) throw error;

            resetForm();
            fetchPosts();
        } catch (error) {
            alert('Error saving post: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (post) => {
        setIsEditing(true);
        setCurrentPost(post);
        setFormData({
            title: post.title,
            slug: post.slug || '',
            content: post.content,
            image_url: post.image_url,
            image_alt: post.image_alt || '',
            meta_title: post.meta_title || '',
            meta_desc: post.meta_desc || '',
            seo_description: post.seo_description || '',
            category: post.category || '',
            published: post.published,
            video_url: post.video_url || ''
        });
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        const { error } = await supabase
            .from('influencer_posts')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting post: ' + error.message);
        else fetchPosts();
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentPost(null);
        setFormData({
            title: '',
            slug: '',
            content: '',
            image_url: '',
            image_alt: '',
            meta_title: '',
            meta_desc: '',
            seo_description: '',
            category: '',
            published: false,
            video_url: ''
        });
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <SEO title="Case Studies Management" noindex={true} />
                <h1 className="page-title" style={{ margin: 0 }}>Case Studies Management</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {importing && <span style={{ color: '#E52323', fontSize: '13px', fontWeight: 'bold' }}>{importProgress}</span>}
                    <button
                        type="button"
                        onClick={handleImportFromUrlTxt}
                        disabled={importing}
                        className="btn btn-secondary"
                        style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {importing ? 'Importing...' : 'Import from url.txt'}
                    </button>
                </div>
            </div>

            <div className="editor-layout">
                {/* Editor Column */}
                <div className="card">
                    <h2 className="card-title">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="form-label" style={{ marginBottom: '8px' }}>Title</label>
                                {fetchingMeta && <span style={{ color: '#E52323', fontSize: '11px', fontWeight: 'bold' }}>Fetching details...</span>}
                            </div>
                            <input
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                onBlur={async (e) => {
                                    const val = e.target.value.trim();
                                    if (val && (val.startsWith('http://') || val.startsWith('https://'))) {
                                        await fetchVideoMetadata(val);
                                    }
                                }}
                                required
                                placeholder="Enter title or paste video URL to autofill"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Slug (URL identifier)</label>
                            <input
                                className="form-control"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="e.g. multi-channel-campaign"
                            />
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>If empty, ID will be used in URL</small>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Content</label>

                            <div className="rich-text-container">
                                <div className="editor-header">
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
                                        {viewMode === 'visual' ? 'Visual Editor' : 'HTML Source'}
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('visual')}
                                            className={`view-toggle-btn ${viewMode === 'visual' ? 'active' : ''}`}
                                        >
                                            Visual
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('html')}
                                            className={`view-toggle-btn ${viewMode === 'html' ? 'active' : ''}`}
                                        >
                                            &lt;&gt; HTML
                                        </button>
                                    </div>
                                </div>

                                {viewMode === 'visual' ? (
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={handleContentChange}
                                        style={{ height: 'auto' }}
                                    />
                                ) : (
                                    <textarea
                                        className="code-editor"
                                        value={formData.content}
                                        onChange={(e) => handleContentChange(e.target.value)}
                                        placeholder="Enter raw HTML here..."
                                    />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Short Description (Structured Details)</label>
                            <textarea
                                className="form-control"
                                name="meta_desc"
                                value={formData.meta_desc}
                                onChange={handleInputChange}
                                rows="12"
                                placeholder={"Category: FMCG / Lifestyle\nFormat: 50-episode vertical drama series\nObjective: Build subconscious recall among Gen-Z\nStrategy: Brand as producer, not advertiser\nDistribution: Organic platform hosting\n\nImpact:\n12M+ organic views\n\n68% episode completion rate\n\n4.3x brand recall uplift\n\nStrong comment-led engagement\n\nWhy It Worked:\nThe brand funded the narrative. The story carried the values. No visible selling.\nAgency:\nBrand:"}
                            ></textarea>
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>Use 'Key: Value' format for each line to display as structured data on the page.</small>
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="form-label" style={{ marginBottom: '8px' }}>Video URL (for Download Request)</label>
                                {fetchingMeta && <span style={{ color: '#E52323', fontSize: '11px', fontWeight: 'bold' }}>Fetching details...</span>}
                            </div>
                            <input
                                className="form-control"
                                name="video_url"
                                value={formData.video_url}
                                onChange={handleInputChange}
                                onBlur={async (e) => {
                                    const val = e.target.value.trim();
                                    if (val && (val.startsWith('http://') || val.startsWith('https://')) && (!formData.title || formData.title.startsWith('http://') || formData.title.startsWith('https://'))) {
                                        await fetchVideoMetadata(val);
                                    }
                                }}
                                placeholder="https://vimeo.com/... or https://youtube.com/..."
                            />
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>This URL will be sent to users after email verification.</small>
                        </div>
                    </form>
                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card">
                        <h3 className="form-label" style={{ fontSize: '16px', marginBottom: '16px' }}>Publishing</h3>

                        <div className="form-group">
                            <label className="form-label">Meta Title</label>
                            <input
                                className="form-control"
                                name="meta_title"
                                value={formData.meta_title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">SEO Meta Description</label>
                            <textarea
                                className="form-control"
                                name="seo_description"
                                value={formData.seo_description}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Enter SEO meta description for search engines"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-control"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleInputChange}
                                    style={{ width: '18px', height: '18px', marginRight: '10px' }}
                                />
                                <span style={{ fontWeight: 500 }}>Published</span>
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button type="button" onClick={handleSubmit} disabled={uploading} className="btn btn-primary" style={{ flex: 1 }}>
                                {uploading ? 'Saving...' : (isEditing ? 'Update' : 'Publish')}
                            </button>
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="form-label" style={{ fontSize: '16px', marginBottom: '16px' }}>Featured Image</h3>
                        <div className="form-group">
                            <label className="form-label">Alt Tag (SEO)</label>
                            <input
                                className="form-control"
                                name="image_alt"
                                value={formData.image_alt}
                                onChange={handleInputChange}
                                placeholder="Describe the image for SEO"
                                style={{ marginBottom: '10px' }}
                            />
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                        {formData.image_url && <img src={formData.image_url} alt={formData.image_alt || "Current"} className="image-preview" />}
                    </div>
                </div>
            </div >

            {/* List */}
            < div className="card" style={{ marginTop: '32px' }}>
                <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>All Case Studies</h2>
                {
                    loading ? <p>Loading...</p> : (
                        <div className="post-list">
                            {posts.map(post => (
                                <div key={post.id} className="post-item">
                                    <div>
                                        <h3 className="post-title">{post.title}</h3>
                                        <div className="post-meta">
                                            <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                            {post.category && (
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    background: '#f3f4f6',
                                                    color: '#374151',
                                                    fontSize: '11px',
                                                    fontWeight: 600
                                                }}>
                                                    {post.category}
                                                </span>
                                            )}
                                            <span>Last modified: {new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleEdit(post)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>Edit</button>
                                        <button onClick={() => handleDelete(post.id)} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '13px' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default AdminInfluence;
