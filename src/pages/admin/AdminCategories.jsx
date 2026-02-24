import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import SEO from '../../components/SEO';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'blog' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching categories:', error);
        else setCategories(data || []);
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.name.trim()) return;

        setSubmitting(true);
        const slug = newCategory.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const { error } = await supabase.from('categories').insert([{
            name: newCategory.name,
            type: newCategory.type,
            slug
        }]);

        if (error) {
            alert('Error creating category: ' + error.message);
        } else {
            setNewCategory({ name: '', type: 'blog' });
            fetchCategories();
        }
        setSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting category: ' + error.message);
        else fetchCategories();
    };

    return (
        <div>
            <div className="admin-header">
                <SEO title="Category Management" noindex={true} />
                <h1 className="page-title">Category Management</h1>
            </div>

            <div className="editor-layout">
                {/* Create Column */}
                <div className="card">
                    <h2 className="card-title">Add New Category</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                className="form-control"
                                name="name"
                                value={newCategory.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Technology, Campaigns"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <select
                                className="form-control"
                                name="type"
                                value={newCategory.type}
                                onChange={handleInputChange}
                            >
                                <option value="blog">Blog</option>
                                <option value="influence">Case Studies</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Adding...' : 'Add Category'}
                        </button>
                    </form>
                </div>

                {/* List Column */}
                <div className="card" style={{ flex: 2 }}>
                    <h2 className="card-title">Existing Categories</h2>
                    {loading ? <p>Loading...</p> : (
                        <div className="post-list">
                            {categories.length === 0 && <p>No categories found.</p>}
                            {categories.map(cat => (
                                <div key={cat.id} className="post-item" style={{ alignItems: 'center' }}>
                                    <div>
                                        <h3 className="post-title" style={{ fontSize: '16px' }}>{cat.name}</h3>
                                        <div className="post-meta">
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                background: cat.type === 'blog' ? '#e0f2fe' : '#fce7f3',
                                                color: cat.type === 'blog' ? '#0369a1' : '#be185d',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                marginTop: '4px'
                                            }}>
                                                {cat.type === 'influence' ? 'CASE STUDIES' : cat.type.toUpperCase()}
                                            </span>
                                            <span style={{ marginLeft: '10px' }}>Slug: {cat.slug}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="btn btn-danger"
                                        style={{ padding: '4px 12px', fontSize: '12px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
