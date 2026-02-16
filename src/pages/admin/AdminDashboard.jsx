
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import SEO from '../../components/SEO';

const AdminDashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('brand'); // brand, creators, internships, jobs

    useEffect(() => {
        fetchLeads();
    }, [activeTab]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .eq('type', activeTab)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            <SEO title="Admin Dashboard" noindex={true} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <h1 style={{ margin: 0 }}>Dashboard (Leads)</h1>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#E52323', fontWeight: 'bold' }}>
                    View Sitemap XML
                </a>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {['brand', 'creators', 'internships', 'jobs'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: activeTab === tab ? '#E52323' : '#fff',
                            color: activeTab === tab ? '#fff' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab === 'brand' ? 'Brand Collabs' : tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading leads...</p>
            ) : leads.length === 0 ? (
                <p>No leads found for this category.</p>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {leads.map((lead) => (
                        <div key={lead.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0 }}>{lead.first_name} {lead.last_name}</h3>
                                <span style={{ fontSize: '14px', color: '#666' }}>{formatDate(lead.created_at)}</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                                <p><strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a></p>
                                {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}

                                {/* Brand Specifics */}
                                {activeTab === 'brand' && (
                                    <>
                                        {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
                                        {lead.deadline && <p><strong>Deadline:</strong> {lead.deadline}</p>}
                                        {lead.budget && <p><strong>Budget:</strong> {lead.budget}</p>}
                                    </>
                                )}

                                {/* Creator Specifics */}
                                {lead.portfolio_url && <p><strong>Portfolio:</strong> <a href={lead.portfolio_url} target="_blank" rel="noopener noreferrer">{lead.portfolio_url}</a></p>}

                                {/* Uploaded File */}
                                {lead.file_url && <p><strong>Attachement:</strong> <a href={lead.file_url} target="_blank" rel="noopener noreferrer">View File</a></p>}
                            </div>

                            {lead.message && (
                                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                    <strong>Message:</strong>
                                    <p style={{ marginTop: '5px' }}>{lead.message}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
