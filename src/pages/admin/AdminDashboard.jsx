
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import SEO from '../../components/SEO';

const AdminDashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('brand'); // brand, creators, internships, jobs
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1); // Reset page on tab change
        fetchLeads();
    }, [activeTab]);

    const updateLeadStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status. Make sure the column exists.');
        }
    };

    const updateLeadNotes = async (id, notes) => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ notes: notes })
                .eq('id', id);

            if (error) throw error;
            setLeads(leads.map(lead => lead.id === id ? { ...lead, notes: notes } : lead));
        } catch (error) {
            console.error('Error updating notes:', error);
            // If it's a column missing error, we alert specifically
            if (error.code === '42703') {
                alert('The "notes" column does not exist in your database. Please run: ALTER TABLE contacts ADD COLUMN notes TEXT;');
            } else {
                alert('Error saving notes.');
            }
        }
    };

    const deleteLead = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;

        try {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setLeads(leads.filter(lead => lead.id !== id));
        } catch (error) {
            console.error('Error deleting lead:', error);
            alert('Error deleting lead.');
        }
    };

    const exportToCSV = () => {
        const dataToExport = filteredLeads; // Export filtered results
        if (dataToExport.length === 0) return;

        const headers = ["Date", "Type", "Name", "Email", "Phone", "City", "Company/Website", "Budget", "Status", "Notes", "Details"];
        const rows = dataToExport.map(lead => [
            formatDate(lead.created_at),
            lead.type,
            `${lead.first_name || ''} ${lead.last_name || ''}`,
            lead.email,
            lead.phone || '',
            lead.address || '',
            lead.company || '',
            lead.budget || '',
            lead.status || 'New',
            lead.notes || '',
            lead.message ? lead.message.replace(/\n/g, ' ') : ''
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(value => `"${value}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `juju_leads_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fetchLeads = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (activeTab === 'meta_ads') {
                query = query.in('type', ['ad_lead', 'ad_lead_partial']);
            } else {
                query = query.eq('type', activeTab);
            }

            const { data, error } = await query;

            if (error) throw error;
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const search = searchTerm.toLowerCase();
        const fullName = `${lead.first_name || ''} ${lead.last_name || ''}`.toLowerCase();
        return (
            fullName.includes(search) ||
            (lead.email && lead.email.toLowerCase().includes(search)) ||
            (lead.company && lead.company.toLowerCase().includes(search)) ||
            (lead.phone && lead.phone.includes(search))
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            <SEO title="Admin Dashboard" noindex={true} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px', flexWrap: 'wrap', gap: '20px' }}>
                <h1 style={{ margin: 0 }}>Dashboard (Leads)</h1>
                <div style={{ display: 'flex', gap: '15px', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search name, email, company..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            minWidth: '250px',
                            fontSize: '14px'
                        }}
                    />
                    <button
                        onClick={exportToCSV}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Export
                    </button>
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#E52323', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        Sitemap
                    </a>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {['brand', 'meta_ads', 'creators', 'internships', 'jobs'].map(tab => (
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
            ) : filteredLeads.length === 0 ? (
                <p>No leads found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLeads.length)} of {filteredLeads.length} leads
                    </div>
                    {currentLeads.map((lead) => (
                        <div key={lead.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
                            <button
                                onClick={() => deleteLead(lead.id)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#ff4444',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}
                            >
                                DELETE
                            </button>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingRight: '80px' }}>
                                <h3 style={{ margin: 0 }}>
                                    {lead.first_name || 'Unknown'} {lead.last_name || ''}
                                    {lead.type === 'ad_lead_partial' && <span style={{ fontSize: '11px', backgroundColor: '#ffd700', padding: '2px 6px', borderRadius: '4px', marginLeft: '10px', verticalAlign: 'middle', color: '#000' }}>Partial</span>}
                                    <span style={{
                                        fontSize: '11px',
                                        backgroundColor: lead.status === 'Interested' ? '#4caf50' : lead.status === 'Not Interested' ? '#f44336' : '#888',
                                        color: '#fff',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        marginLeft: '10px',
                                        verticalAlign: 'middle',
                                        textTransform: 'uppercase'
                                    }}>
                                        {lead.status || 'New'}
                                    </span>
                                </h3>
                                <span style={{ fontSize: '14px', color: '#666' }}>{formatDate(lead.created_at)}</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                                <p><strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a></p>
                                {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}
                                {lead.address && <p><strong>City:</strong> {lead.address}</p>}

                                {/* Brand Specifics */}
                                {activeTab === 'brand' && (
                                    <>
                                        {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
                                        {lead.deadline && <p><strong>Deadline:</strong> {lead.deadline}</p>}
                                        {lead.budget && <p><strong>Budget:</strong> {lead.budget}</p>}
                                    </>
                                )}

                                {/* Meta Ads Specifics */}
                                {activeTab === 'meta_ads' && (
                                    <>
                                        {lead.company && <p><strong>Company/Website:</strong> {lead.company}</p>}
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
                                    <strong>Details:</strong>
                                    <pre style={{ marginTop: '5px', whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', color: '#333' }}>{lead.message}</pre>
                                </div>
                            )}

                            {/* Actions and Notes - Enhanced for Meta Ads */}
                            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #efefef', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '10px', fontSize: '13px' }}>Actions:</strong>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['No Action', 'Interested', 'Not Interested'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => updateLeadStatus(lead.id, status)}
                                                style={{
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    backgroundColor: lead.status === status ? '#333' : '#fff',
                                                    color: lead.status === status ? '#fff' : '#333',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '5px', fontSize: '13px' }}>Admin Notes:</strong>
                                    <textarea
                                        placeholder="Add private notes here..."
                                        defaultValue={lead.notes || ''}
                                        onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                                        style={{
                                            width: '100%',
                                            height: '60px',
                                            padding: '8px',
                                            fontSize: '13px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            resize: 'vertical'
                                        }}
                                    />
                                    <span style={{ fontSize: '10px', color: '#999' }}>Auto-saves on leave</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px', paddingBottom: '50px' }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: currentPage === 1 ? '#eee' : '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            style={{
                                padding: '8px 15px',
                                backgroundColor: currentPage === i + 1 ? '#E52323' : '#fff',
                                color: currentPage === i + 1 ? '#fff' : '#333',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: currentPage === totalPages ? '#eee' : '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
