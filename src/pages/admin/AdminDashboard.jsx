
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
    const { role } = useAuth();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('brand'); // brand, creators, internships, jobs
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isAddingLead, setIsAddingLead] = useState(false);
    const [newLead, setNewLead] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        address: '', // City
        deadline: '',
        budget: '',
        start_timeline: 'Immediately',
        website_url: '',
        brand_type: 'Startup/ D2C Brand',
        has_ambassador: 'No',
        message: '', // Services
        lead_status: '🔵 Cold – Passive'
    });

    const tabs = role === 'admin'
        ? ['organic_website', 'paid_ads', 'creators', 'internships', 'jobs', 'self']
        : ['organic_website', 'paid_ads', 'self'];

    useEffect(() => {
        setCurrentPage(1); // Reset page on tab change
        fetchLeads();
    }, [activeTab]);

    const updateLeadField = async (id, field, value) => {
        try {
            const updateData = { [field]: value };

            // Add automatic timestamps for status and action
            if (field === 'lead_status') updateData.status_updated_at = new Date().toISOString();
            if (field === 'lead_action') updateData.action_updated_at = new Date().toISOString();

            const { error } = await supabase
                .from('contacts')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;

            // Update local state including timestamps
            setLeads(leads.map(lead =>
                lead.id === id ? { ...lead, ...updateData } : lead
            ));
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            alert(`Error updating ${field}. Make sure the column exists.`);
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

    const addFeedback = async (contactId, content, bdaName) => {
        if (!content.trim()) return;
        try {
            const { data, error } = await supabase
                .from('lead_feedbacks')
                .insert([{ contact_id: contactId, content, bda_name: bdaName || 'BDA' }])
                .select()
                .single();

            if (error) throw error;

            // Update local state
            setLeads(leads.map(lead => {
                if (lead.id === contactId) {
                    return {
                        ...lead,
                        lead_feedbacks: [data, ...(lead.lead_feedbacks || [])]
                    };
                }
                return lead;
            }));
        } catch (error) {
            console.error('Error adding feedback:', error);
            alert('Error adding feedback. Make sure the lead_feedbacks table exists.');
        }
    };

    const deleteLead = async (id) => {
        if (role !== 'admin') {
            alert('Only admins can delete leads.');
            return;
        }

        if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;

        try {
            // First delete related feedbacks due to foreign key constraint
            const { error: feedbackError } = await supabase
                .from('lead_feedbacks')
                .delete()
                .eq('contact_id', id);

            if (feedbackError) throw feedbackError;

            // Then delete the contact
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

    const handleAddLead = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('contacts')
                .insert([{
                    ...newLead,
                    message: newLead.message ? `Services: ${newLead.message}` : '',
                    source: 'self',
                    type: activeTab === 'paid_ads' ? 'paid_ads' : activeTab
                }]);

            if (error) throw error;

            setIsAddingLead(false);
            setNewLead({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                company: '',
                address: '',
                deadline: '',
                budget: '',
                start_timeline: 'Immediately',
                website_url: '',
                brand_type: 'Startup/ D2C Brand',
                has_ambassador: 'No',
                message: '',
                lead_status: '🔵 Cold – Passive'
            });
            fetchLeads();
            alert('Lead added successfully!');
        } catch (error) {
            console.error('Error adding lead:', error);
            alert('Error adding lead. Make sure the "source" column exists.');
        }
    };

    const exportToCSV = () => {
        const dataToExport = filteredLeads; // Export filtered results
        if (dataToExport.length === 0) return;

        const headers = ["Date", "Type", "Name", "Email", "Phone", "City", "Company/Website", "Budget", "Status", "Tag", "Action", "Notes", "Details"];
        const rows = dataToExport.map(lead => [
            formatDate(lead.created_at),
            lead.type,
            `${lead.first_name || ''} ${lead.last_name || ''}`,
            lead.email,
            lead.phone || '',
            lead.address || '',
            lead.company || '',
            lead.budget || '',
            lead.lead_status || lead.status || 'New',
            lead.lead_tag || '',
            lead.lead_action || '',
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
    };

    const fetchLeads = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('contacts')
                .select('*, lead_feedbacks(*)')
                .order('created_at', { ascending: false });

            if (activeTab === 'self') {
                query = query.eq('source', 'self');
            } else if (activeTab === 'paid_ads') {
                query = query.in('type', ['paid_ads', 'paid_ads_partial', 'ad_lead', 'ad_lead_partial']);
            } else {
                query = query.eq('type', activeTab);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Sort inner feedbacks by date descending
            const enrichedData = data.map(lead => ({
                ...lead,
                lead_feedbacks: (lead.lead_feedbacks || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            }));

            setLeads(enrichedData);
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

    const getLeadAge = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now - past;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMins < 60) return `${diffInMins}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${diffInDays}d ago`;
    };

    const renderServiceTags = (message, type) => {
        if (!message) return null;

        // Extract services part: "Services: Commercial, AI Films"
        const serviceMatch = message.match(/Services:\s*(.*)/i);
        if (!serviceMatch) return null;

        const services = serviceMatch[1].split(',').map(s => s.trim()).filter(s => s);

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                {services.map((service, idx) => (
                    <span key={idx} style={{
                        fontSize: '11px',
                        backgroundColor: '#f0f0f0',
                        color: '#444',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontWeight: '500'
                    }}>
                        {service}
                    </span>
                ))}
            </div>
        );
    };

    const getCleanMessage = (message) => {
        if (!message) return '';
        // Remove the "Services: ..." block to avoid redundancy
        return message.replace(/Services:\s*.*($|\n)/i, '').trim();
    };

    return (
        <div>
            <SEO title="Admin Dashboard" noindex={true} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                <img src="/juju-black-logo.webp" alt="JUJU Films" style={{ height: '50px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px', flexWrap: 'wrap', gap: '20px' }}>
                <h1 style={{ margin: 0 }}>Leads Dashboard</h1>
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
                    {role === 'admin' && (
                        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#E52323', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                            Sitemap
                        </a>
                    )}
                    <button
                        onClick={() => setIsAddingLead(!isAddingLead)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#E52323',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {isAddingLead ? 'Cancel' : 'Add Lead'}
                    </button>
                </div>
            </div>

            {/* Add Lead Form */}
            {isAddingLead && (
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', marginBottom: '30px', border: '1px solid #eee' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Add New Lead</h2>
                    <form onSubmit={handleAddLead} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>First Name*</label>
                            <input
                                type="text"
                                required
                                value={newLead.first_name}
                                onChange={(e) => setNewLead({ ...newLead, first_name: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Last Name</label>
                            <input
                                type="text"
                                value={newLead.last_name}
                                onChange={(e) => setNewLead({ ...newLead, last_name: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Email*</label>
                            <input
                                type="email"
                                required
                                value={newLead.email}
                                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Phone</label>
                            <input
                                type="text"
                                value={newLead.phone}
                                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>City (Address)</label>
                            <input
                                type="text"
                                value={newLead.address}
                                onChange={(e) => setNewLead({ ...newLead, address: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Company</label>
                            <input
                                type="text"
                                value={newLead.company}
                                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Website URL</label>
                            <input
                                type="url"
                                value={newLead.website_url}
                                onChange={(e) => setNewLead({ ...newLead, website_url: e.target.value })}
                                placeholder="https://example.com"
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Deadline</label>
                            <input
                                type="text"
                                value={newLead.deadline}
                                onChange={(e) => setNewLead({ ...newLead, deadline: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Budget</label>
                            <input
                                type="text"
                                value={newLead.budget}
                                onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Timeline</label>
                            <select
                                value={newLead.start_timeline}
                                onChange={(e) => setNewLead({ ...newLead, start_timeline: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="Immediately">Immediately</option>
                                <option value="Next 30 Days">Next 30 Days</option>
                                <option value="Expanding Future">Expanding Future</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Brand Type</label>
                            <select
                                value={newLead.brand_type}
                                onChange={(e) => setNewLead({ ...newLead, brand_type: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="Startup/ D2C Brand">Startup/ D2C Brand</option>
                                <option value="Established Enterprise">Established Enterprise</option>
                                <option value="Ad Agency">Ad Agency</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Celebrity Ambassador?</label>
                            <select
                                value={newLead.has_ambassador}
                                onChange={(e) => setNewLead({ ...newLead, has_ambassador: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Initial Status</label>
                            <select
                                value={newLead.lead_status}
                                onChange={(e) => setNewLead({ ...newLead, lead_status: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="🔥 Hot – Ready">🔥 Hot – Ready</option>
                                <option value="🟢 Warm – Nurture">🟢 Warm – Nurture</option>
                                <option value="🔵 Cold – Passive">🔵 Cold – Passive</option>
                                <option value="⚫ Not Interested – Closed">⚫ Not Interested – Closed</option>
                            </select>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Services (Comma-separated)</label>
                            <input
                                type="text"
                                placeholder="Commercial, AI Films, etc."
                                value={newLead.message}
                                onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setIsAddingLead(false)}
                                style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                style={{ padding: '10px 25px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Save Lead
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
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
                        {tab === 'organic_website' ? 'Brand Collabs' : tab === 'paid_ads' ? 'Paid Ads' : tab}
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
                            {role === 'admin' && (
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
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingRight: '80px' }}>
                                <h3 style={{ margin: 0 }}>
                                    {lead.first_name || 'Unknown'} {lead.last_name || ''}
                                    {lead.lead_tag && (
                                        <span style={{
                                            fontSize: '10px',
                                            backgroundColor: lead.lead_tag === 'complete' ? '#4caf50' : lead.lead_tag === 'verified' ? '#2196f3' : '#ffd700',
                                            color: lead.lead_tag === 'partial' ? '#000' : '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            marginLeft: '10px',
                                            verticalAlign: 'middle',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }}>
                                            {lead.lead_tag}
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '11px',
                                        backgroundColor: '#888',
                                        color: '#fff',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        marginLeft: '10px',
                                        verticalAlign: 'middle',
                                        textTransform: 'uppercase'
                                    }}>
                                        {lead.lead_status || lead.status || 'New'}
                                    </span>
                                    {lead.source === 'self' && (
                                        <span style={{
                                            fontSize: '10px',
                                            backgroundColor: '#333',
                                            color: '#fff',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            marginLeft: '10px',
                                            verticalAlign: 'middle',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }}>
                                            SELF
                                        </span>
                                    )}
                                </h3>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>{getLeadAge(lead.created_at)}</div>
                                    <div style={{ fontSize: '11px', color: '#999' }}>{formatDate(lead.created_at)}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                                <p><strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a></p>
                                {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}
                                {lead.address && <p><strong>City:</strong> {lead.address}</p>}

                                {/* Brand Specifics */}
                                {activeTab === 'organic_website' && (
                                    <>
                                        {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
                                        {lead.deadline && <p><strong>Deadline:</strong> {lead.deadline}</p>}
                                        {lead.budget && <p><strong>Budget:</strong> {lead.budget}</p>}
                                    </>
                                )}

                                {/* Meta Ads Specifics */}
                                {activeTab === 'paid_ads' && (
                                    <>
                                        {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
                                        {lead.website_url && <p><strong>Website:</strong> <a href={lead.website_url} target="_blank" rel="noopener noreferrer">{lead.website_url}</a></p>}
                                        {lead.start_timeline && <p><strong>Timeline:</strong> {lead.start_timeline}</p>}
                                        {lead.brand_type && <p><strong>Brand Type:</strong> {lead.brand_type}</p>}
                                        {lead.has_ambassador && <p><strong>Ambassador:</strong> {lead.has_ambassador}</p>}
                                    </>
                                )}

                                {/* Creator Specifics */}
                                {lead.portfolio_url && <p><strong>Portfolio:</strong> <a href={lead.portfolio_url} target="_blank" rel="noopener noreferrer">{lead.portfolio_url}</a></p>}

                                {/* Uploaded Files */}
                                {lead.file_url && <p><strong>Attachment:</strong> <a href={lead.file_url} target="_blank" rel="noopener noreferrer">View File</a></p>}
                                {lead.brief_url && <p><strong>Project Brief:</strong> <a href={lead.brief_url} target="_blank" rel="noopener noreferrer" style={{ color: '#E52323', fontWeight: 'bold' }}>View Brief</a></p>}

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <strong style={{ fontSize: '13px' }}>Requested Services:</strong>
                                    {renderServiceTags(lead.message)}
                                </div>
                            </div>

                            {getCleanMessage(lead.message) && (
                                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                    <strong>Additional Details:</strong>
                                    <pre style={{ marginTop: '5px', whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', color: '#333' }}>{getCleanMessage(lead.message)}</pre>
                                </div>
                            )}

                            {/* Actions and Notes - Enhanced for Meta Ads */}
                            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #efefef', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '10px', fontSize: '13px' }}>
                                        Status:
                                        <span style={{ fontWeight: 'normal', color: '#999', fontSize: '11px', marginLeft: '8px' }}>
                                            {lead.status_updated_at ? `(Updated ${getLeadAge(lead.status_updated_at)})` : ''}
                                        </span>
                                    </strong>
                                    <select
                                        value={lead.lead_status || '🔵 Cold – Passive'}
                                        onChange={(e) => updateLeadField(lead.id, 'lead_status', e.target.value)}
                                        style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    >
                                        <option value="🔥 Hot – Ready">🔥 Hot – Ready</option>
                                        <option value="🟢 Warm – Nurture">🟢 Warm – Nurture</option>
                                        <option value="🔵 Cold – Passive">🔵 Cold – Passive</option>
                                        <option value="⚫ Not Interested – Closed">⚫ Not Interested – Closed</option>
                                    </select>
                                </div>
                                <div>
                                    <strong style={{ display: 'block', marginBottom: '10px', fontSize: '13px' }}>
                                        Action:
                                        <span style={{ fontWeight: 'normal', color: '#999', fontSize: '11px', marginLeft: '8px' }}>
                                            {lead.action_updated_at ? `(Updated ${getLeadAge(lead.action_updated_at)})` : ''}
                                        </span>
                                    </strong>
                                    <select
                                        value={lead.lead_action || 'No Action Taken'}
                                        onChange={(e) => updateLeadField(lead.id, 'lead_action', e.target.value)}
                                        style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    >
                                        <option value="No Action Taken">No Action Taken</option>
                                        <option value="With Calling Team">With Calling Team</option>
                                        <option value="Handed over to Sales Director">Handed over to Sales Director</option>
                                        <option value="Sales Close handed over to production">Sales Close handed over to production</option>
                                    </select>
                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', color: '#999' }}>Auto-saves</span>
                                </div>
                            </div>

                            {/* BDA Feedback Timeline */}
                            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #efefef' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <strong style={{ fontSize: '14px', color: '#333' }}>BDA Feedback Timeline ({lead.lead_feedbacks?.length || 0})</strong>
                                </div>

                                {/* Add Feedback Form */}
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                    <input
                                        type="text"
                                        placeholder="BDA Name"
                                        id={`bda-name-${lead.id}`}
                                        style={{ width: '100px', padding: '8px', fontSize: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Add new call feedback..."
                                        id={`bda-feedback-${lead.id}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const content = e.target.value;
                                                const bdaName = document.getElementById(`bda-name-${lead.id}`).value;
                                                addFeedback(lead.id, content, bdaName);
                                                e.target.value = '';
                                            }
                                        }}
                                        style={{ flexGrow: 1, padding: '8px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    <button
                                        onClick={() => {
                                            const content = document.getElementById(`bda-feedback-${lead.id}`).value;
                                            const bdaName = document.getElementById(`bda-name-${lead.id}`).value;
                                            addFeedback(lead.id, content, bdaName);
                                            document.getElementById(`bda-feedback-${lead.id}`).value = '';
                                        }}
                                        style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Timeline List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                    {lead.lead_feedbacks?.map((f, i) => (
                                        <div key={f.id} style={{ display: 'flex', gap: '15px', position: 'relative', paddingBottom: '15px' }}>
                                            {/* Dot and Line */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
                                                <div style={{ width: '8px', height: '8px', backgroundColor: '#E52323', borderRadius: '50%', zIndex: 1 }}></div>
                                                {i !== lead.lead_feedbacks.length - 1 && (
                                                    <div style={{ width: '2px', flexGrow: 1, backgroundColor: '#eee', position: 'absolute', top: '8px', bottom: '-8px' }}></div>
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div style={{ flexGrow: 1, fontSize: '13px', backgroundColor: '#fdfdfd', padding: '8px 12px', borderRadius: '4px', borderLeft: '3px solid #E52323' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: 'bold', color: '#333' }}>{f.bda_name || 'BDA'}</span>
                                                    <span style={{ fontSize: '11px', color: '#999' }}>{getLeadAge(f.created_at)}</span>
                                                </div>
                                                <p style={{ margin: 0, color: '#555', lineHeight: '1.4' }}>{f.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!lead.lead_feedbacks || lead.lead_feedbacks.length === 0) && (
                                        <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', textAlign: 'center', margin: '10px 0' }}>No feedback recorded yet.</p>
                                    )}
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
