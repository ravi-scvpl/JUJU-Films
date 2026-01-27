
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../supabaseClient';

const AdminBlog = () => {
    const [posts, setPosts] = useState([]);
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
        published: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
            .from('blog-images')
            .upload(filePath, imageFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
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
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', currentPost.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('blog_posts')
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
            slug: post.slug,
            content: post.content,
            image_url: post.image_url,
            meta_title: post.meta_title || '',
            meta_desc: post.meta_desc || '',
            published: post.published
        });
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        const { error } = await supabase
            .from('blog_posts')
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
            published: false
        });
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <h1>Blog Management</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', marginTop: '20px' }}>
                {/* Form */}
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                    <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                        <div>
                            <label>Title</label>
                            <input name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div>
                            <label>Slug</label>
                            <input name="slug" value={formData.slug} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div>
                            <label>Content</label>
                            <textarea name="content" value={formData.content} onChange={handleInputChange} rows="10" style={{ width: '100%', padding: '8px' }}></textarea>
                        </div>
                        <div>
                            <label>Image</label>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                            {formData.image_url && <img src={formData.image_url} alt="Current" style={{ width: '100px', display: 'block', marginTop: '10px' }} />}
                        </div>
                        <div>
                            <label>Meta Title</label>
                            <input name="meta_title" value={formData.meta_title} onChange={handleInputChange} style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div>
                            <label>Meta Description</label>
                            <textarea name="meta_desc" value={formData.meta_desc} onChange={handleInputChange} style={{ width: '100%', padding: '8px' }}></textarea>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="published" checked={formData.published} onChange={handleInputChange} /> Published
                            </label>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" disabled={uploading} style={{ padding: '10px 20px', backgroundColor: '#E52323', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                {uploading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                            </button>
                            {isEditing && <button type="button" onClick={resetForm} style={{ padding: '10px', cursor: 'pointer' }}>Cancel</button>}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div>
                    <h2>All Posts</h2>
                    {loading ? <p>Loading...</p> : (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {posts.map(post => (
                                <div key={post.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0' }}>{post.title}</h3>
                                        <span style={{ fontSize: '12px', color: post.published ? 'green' : 'orange' }}>{post.published ? 'Published' : 'Draft'} </span>
                                        <span style={{ fontSize: '12px', color: '#666' }}>({new Date(post.created_at).toLocaleDateString()})</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleEdit(post)}>Edit</button>
                                        <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBlog;
