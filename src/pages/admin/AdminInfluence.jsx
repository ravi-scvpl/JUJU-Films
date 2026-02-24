
import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
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
        meta_title: '',
        meta_desc: '',
        category: '',
        published: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [viewMode, setViewMode] = useState('visual');
    const fileInputRef = useRef(null);

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
            meta_title: post.meta_title || '',
            meta_desc: post.meta_desc || '',
            category: post.category || '',
            published: post.published
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
            meta_title: '',
            meta_desc: '',
            category: '',
            published: false
        });
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <div className="admin-header">
                <SEO title="Case Studies Management" noindex={true} />
                <h1 className="page-title">Case Studies Management</h1>
            </div>

            <div className="editor-layout">
                {/* Editor Column */}
                <div className="card">
                    <h2 className="card-title">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter post title"
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
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                        {formData.image_url && <img src={formData.image_url} alt="Current" className="image-preview" />}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="card" style={{ marginTop: '32px' }}>
                <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>All Case Studies</h2>
                {loading ? <p>Loading...</p> : (
                    <div className="post-list">
                        {posts.map(post => (
                            <div key={post.id} className="post-item">
                                <div>
                                    <h3 className="post-title">{post.title}</h3>
                                    <div className="post-meta">
                                        <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
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
                )}
            </div>
        </div>
    );
};

export default AdminInfluence;
