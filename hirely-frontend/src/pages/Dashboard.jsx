import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, Users, CalendarCheck, CheckCircle2,
  Search, Eye, Pencil, Trash2, MapPin, Clock,
  ChevronLeft, ChevronRight, Lightbulb, PlusCircle,
  FileText, X, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import { companyService } from '../services/companyService';
import '../styles/dashboard.css';

const STATS = [
  { label: 'Active Jobs',       value: '12',  icon: Briefcase,      color: '#3B82F6', bg: 'rgba(59,130,246,0.10)' },
  { label: 'Total Applicants',  value: '842', icon: Users,          color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
  { label: 'Interviews',        value: '48',  icon: CalendarCheck,  color: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  { label: 'Hired',             value: '6',   icon: CheckCircle2,   color: '#16A34A', bg: 'rgba(22,163,74,0.10)'  },
];

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ──────────────────────────────────────────────
   Inline Edit Modal
   ────────────────────────────────────────────── */
function EditModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({
    title: job.title || '',
    department: job.department || '',
    roleOverview: job.roleOverview || '',
    requirementsAndQualifications: job.requirementsAndQualifications || '',
    jobType: job.jobtype || job.jobType || 'FULL_TIME',
    location: job.location || '',
    salaryRange: job.salaryRange || '',
    techStack: job.techStack || []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !form.techStack.includes(newTag)) {
        setForm(p => ({ ...p, techStack: [...p.techStack, newTag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setForm(p => ({
      ...p,
      techStack: p.techStack.filter(t => t !== tagToRemove)
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3>Edit Listing</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          <div className="form-grid">
            <div className="field-group full-width">
              <label className="field-label">Job Title</label>
              <input className="field-input" value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Department</label>
              <input className="field-input" value={form.department}
                onChange={e => setForm(p => ({ ...p, department: e.target.value }))} />
            </div>

            <div className="field-group">
              <label className="field-label">Job Type</label>
              <select className="field-input" value={form.jobType}
                onChange={e => setForm(p => ({ ...p, jobType: e.target.value }))}>
                <option value="FULL_TIME">FULL_TIME</option>
                <option value="PART_TIME">PART_TIME</option>
                <option value="INTERNSHIP">INTERNSHIP</option>
                <option value="CONTRACT">CONTRACT</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Location</label>
              <input className="field-input" value={form.location}
                onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Range</label>
              <input className="field-input" value={form.salaryRange}
                onChange={e => setForm(p => ({ ...p, salaryRange: e.target.value }))} />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Role Overview</label>
              <textarea className="field-input" rows="3" value={form.roleOverview}
                onChange={e => setForm(p => ({ ...p, roleOverview: e.target.value }))} />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Requirements & Qualifications</label>
              <textarea className="field-input" rows="3" value={form.requirementsAndQualifications}
                onChange={e => setForm(p => ({ ...p, requirementsAndQualifications: e.target.value }))} />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Tech Stack & Tags (Press Enter)</label>
              <div style={{ border: '1.5px solid #E5E0DB', borderRadius: '10px', padding: '8px' }}>
                <input type="text" className="field-input" style={{ border: 'none', marginBottom: '8px' }}
                  placeholder="Add a skill..."
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className="chips-container">
                  {form.techStack.map(tag => (
                    <span key={tag} className="chip" style={{ padding: '4px 10px' }}>
                      {tag}
                      <button type="button" className="chip-remove" onClick={() => removeTag(tag)}><X size={14} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="navbar-btn navbar-btn-outline" onClick={onClose}>Cancel</button>
          <button className="navbar-btn navbar-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><Loader2 size={16} className="spin" /> Saving...</> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Delete Confirmation Modal
   ────────────────────────────────────────────── */
function DeleteModal({ job, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Delete Listing</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '0.9rem', color: '#5A4A42', lineHeight: 1.6 }}>
            Are you sure you want to delete <strong>"{job.title}"</strong>? This action cannot be undone and all applicant data for this listing will be removed.
          </p>
        </div>
        <div className="modal-footer">
          <button className="navbar-btn navbar-btn-outline" onClick={onClose} disabled={deleting}>Cancel</button>
          <button onClick={handleDelete} disabled={deleting}
            style={{ 
              padding: '10px 20px', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              border: 'none', 
              borderRadius: '10px', 
              cursor: deleting ? 'not-allowed' : 'pointer',
              backgroundColor: '#ef4444',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => !deleting && (e.currentTarget.style.backgroundColor = '#dc2626')}
            onMouseOut={e => !deleting && (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            {deleting ? <><Loader2 size={16} className="spin" /> Deleting...</> : <><Trash2 size={16} /> Yes, Delete</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Dashboard Component
   ────────────────────────────────────────────── */
export function Dashboard() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const [listings, setListings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState('all');
  const [sortBy, setSortBy]         = useState('recent');

  const [editJob, setEditJob]   = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);

  /* ── Fetch Listings ── */
  const fetchListings = useCallback(async () => {
    setLoading(true);
    const res = await companyService.getListings(userId);
    if (res.success) {
      const jobs = Array.isArray(res.data) ? res.data : [];
      setListings(jobs);
    } else {
      toast.error(res.error || 'Failed to load listings.');
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  /* ── Filter / Sort ── */
  const filtered = useMemo(() => {
    let result = [...listings];

    // filter
    if (filter === 'active')  result = result.filter(j => j.isActive === true);
    if (filter === 'paused')  result = result.filter(j => j.isActive === false);

    // sort
    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.postedAt || b['posted At'] || 0) - new Date(a.postedAt || a['posted At'] || 0));
    } else if (sortBy === 'applicants') {
      result.sort((a, b) => (b.totalApplicant || 0) - (a.totalApplicant || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return result;
  }, [listings, filter, sortBy]);

  /* ── Actions ── */
  const handleEdit = async (updatedData) => {
    const res = await companyService.updateJob(editJob.id, userId, updatedData);
    if (res.success) {
      toast.success('Listing updated successfully.');
      setEditJob(null);
      fetchListings();
    } else {
      toast.error(res.error || 'Failed to update listing.');
    }
  };

  const handleDelete = async () => {
    const res = await companyService.deleteJob(deleteJob.id, userId);
    if (res.success) {
      toast.success('Listing deleted.');
      setDeleteJob(null);
      fetchListings();
    } else {
      toast.error(res.error || 'Failed to delete listing.');
    }
  };

  /* ── Filter counts ── */
  const activeCount = listings.filter(j => j.isActive === true).length;
  const pausedCount = listings.filter(j => j.isActive === false).length;

  /* ── Header actions ── */
  const headerActions = (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button className="navbar-btn navbar-btn-outline">
        <FileText size={16} /> View Reports
      </button>
      <button className="navbar-btn navbar-btn-primary" onClick={() => navigate('/post-job')}>
        <PlusCircle size={16} /> Post New Job
      </button>
    </div>
  );

  return (
    <DashboardLayout headerActions={headerActions}>
      <div className="page-header">
        <h1 className="page-title">Manage Listings</h1>
        <p className="page-subtitle">Track performance and manage your active recruitment campaigns.</p>
      </div>

      {/* ── Stats Row ── */}
      <div className="stats-row">
        {STATS.map(s => (
          <div className="stat-card" key={s.label}>
            <div>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              <s.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="listing-toolbar">
        <div className="listing-filters">
          {[
            { key: 'all',    label: `All (${listings.length})` },
            { key: 'active', label: `Active (${activeCount})` },
            { key: 'paused', label: `Paused (${pausedCount})` },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-pill ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="listing-sort">
          <span className="sort-label">Sort by:</span>
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="recent">Recent</option>
            <option value="applicants">Applicants</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* ── Job Cards Grid ── */}
      {loading ? (
        <div className="loading-spinner">Loading listings…</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Briefcase size={48} style={{ color: '#D3A376', marginBottom: '1rem' }} />
          <h3 style={{ color: '#3E2522', margin: '0 0 4px' }}>No listings found</h3>
          <p style={{ color: '#8C6E63', fontSize: '0.88rem' }}>
            {filter !== 'all'
              ? 'Try adjusting your filters.'
              : 'Get started by posting your first job listing.'}
          </p>
          {filter === 'all' && (
            <button className="navbar-btn navbar-btn-primary" style={{ marginTop: '1rem' }}
              onClick={() => navigate('/post-job')}>
              <PlusCircle size={16} /> Post a Job
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="listings-grid">
            {filtered.map(job => {
              const isActive = job.isActive === true;
              const posted   = job.postedAt || job['posted At'];
              return (
                <div className="listing-card" key={job.id}>
                  {/* Top row */}
                  <div className="listing-card-top">
                    <h3 className="listing-card-title">{job.title || 'Untitled'}</h3>
                    <span className={`listing-badge ${isActive ? 'active' : 'paused'}`}>
                      {isActive ? 'Active' : 'Paused'}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="listing-card-meta">
                    <span><MapPin size={14} /> {job.location || '—'}</span>
                    <span><Briefcase size={14} /> {job.jobtype || job.jobType || '—'}</span>
                  </div>

                  {/* Applicants */}
                  <div className="listing-card-applicants">
                    <div className="applicant-bar">
                      <Users size={16} style={{ color: '#8B5CF6' }} />
                      <div>
                        <span className="applicant-label">TOTAL APPLICANTS</span>
                        <span className="applicant-count">{job.totalApplicant ?? 0}</span>
                      </div>
                    </div>
                    <button className="view-list-btn" onClick={() => toast('Applicant list coming soon.')}>
                      View List →
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="listing-card-footer">
                    <span className="listing-posted">
                      <Clock size={13} /> Posted on {formatDate(posted)}
                    </span>
                    <div className="listing-actions">
                      <button className="listing-action-btn view" title="Preview"
                        onClick={() => toast('Job preview coming soon.')}>
                        <Eye size={15} />
                      </button>
                      <button className="listing-action-btn edit" title="Edit"
                        onClick={() => setEditJob(job)}>
                        <Pencil size={15} />
                      </button>
                      <button className="listing-action-btn delete" title="Delete"
                        onClick={() => setDeleteJob(job)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Pro Tip Banner ── */}
      <div className="pro-tip-banner">
        <div className="pro-tip-icon">
          <Lightbulb size={22} />
        </div>
        <div>
          <h4>Pro Tip: Optimize your listings</h4>
          <p>Listings with clear salary ranges and defined "Day-in-the-life" descriptions receive up to 45% more qualified applicants. Consider updating your active drafts to improve conversion.</p>
          <a href="#">View Recruitment Guide →</a>
        </div>
      </div>

      {/* ── Modals ── */}
      {editJob && <EditModal job={editJob} onClose={() => setEditJob(null)} onSave={handleEdit} />}
      {deleteJob && <DeleteModal job={deleteJob} onClose={() => setDeleteJob(null)} onConfirm={handleDelete} />}
    </DashboardLayout>
  );
}
