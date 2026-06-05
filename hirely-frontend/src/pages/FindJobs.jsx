import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Briefcase, DollarSign, Bookmark,
  ChevronLeft, ChevronRight, ArrowRight, Loader2,
  SlidersHorizontal, Globe, Star, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentDashboardLayout } from '../components/layout/StudentDashboardLayout';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/api';
import '../styles/dashboard.css';
import '../styles/find-jobs.css';

const ITEMS_PER_PAGE = 6;

const FILTER_OPTIONS = [
  { key: 'all',        label: 'All' },
  { key: 'remote',     label: 'Remote' },
  { key: 'FULL_TIME',  label: 'Full-time' },
  { key: 'INTERNSHIP', label: 'Internship' },
  { key: 'PART_TIME',  label: 'Part-time' },
  { key: 'CONTRACT',   label: 'Contract' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getInitial(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function FindJobs() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const firstName = user?.fullName?.split(' ')[0] || 'there';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  /* ── Fetch Jobs ── */
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await userService.getJobs();
        const data = Array.isArray(res.data) ? res.data : [];
        setJobs(data);
      } catch (err) {
        toast.error('Failed to load jobs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  /* ── Filter + Search ── */
  const filtered = useMemo(() => {
    let result = [...jobs];

    // filter pills
    if (activeFilter === 'remote') {
      result = result.filter(j => (j.location || '').toLowerCase().includes('remote'));
    } else if (activeFilter !== 'all') {
      result = result.filter(j => j.jobType === activeFilter);
    }

    return result;
  }, [jobs, activeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  /* ── Format jobType for display ── */
  const formatJobType = (type) => {
    if (!type) return '—';
    return type.replace(/_/g, '-').replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, '-');
  };

  return (
    <StudentDashboardLayout>

      {/* ── Greeting ── */}
      <div className="fj-greeting">
        <h1>{getGreeting()}, {firstName}! 👋</h1>
        <p>We've found {filtered.length} job{filtered.length !== 1 ? 's' : ''} matching your profile.</p>
      </div>

      {/* ── Search Bar ── */}
      <form className="fj-search-bar" onSubmit={handleSearch}>
        <div className="fj-search-field">
          <Search size={18} />
          <input
            type="text"
            className="fj-search-input"
            placeholder="Job title, keywords, or company..."
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="fj-search-divider" />
        <div className="fj-search-field">
          <MapPin size={18} />
          <input
            type="text"
            className="fj-search-input"
            placeholder="Location or 'Remote'"
            value={searchLocation}
            onChange={e => setSearchLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="fj-search-btn">
          <Search size={16} /> Find Jobs
        </button>
      </form>

      {/* ── Filter Pills ── */}
      <div className="fj-filters">
        <button
          className={`fj-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        {FILTER_OPTIONS.filter(f => f.key !== 'all').map(f => (
          <button
            key={f.key}
            className={`fj-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Results Header ── */}
      <div className="fj-results-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="fj-results-title">Recommended for you</span>
          {filtered.length > 0 && (
            <span className="fj-new-badge"><Zap size={12} /> New Results</span>
          )}
        </div>
        <div className="fj-sort">
          <span>Sort by:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {/* ── Job Cards Grid ── */}
      {loading ? (
        <div className="fj-loading">
          <Loader2 size={36} className="sp-spinner" />
          <span className="fj-loading-text">Finding the best jobs for you…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '2rem' }}>
          <Briefcase size={48} style={{ color: '#D3A376', marginBottom: '1rem' }} />
          <h3 style={{ color: '#3E2522', margin: '0 0 4px' }}>No jobs found</h3>
          <p style={{ color: '#8C6E63', fontSize: '0.88rem' }}>
            Try adjusting your search or filters to find more opportunities.
          </p>
        </div>
      ) : (
        <>
          <div className="fj-grid">
            {filtered.map(job => (
              <div className="fj-card" key={job.id}>
                {/* Top row: avatar + title + bookmark */}
                <div className="fj-card-top">
                  <div className="fj-card-avatar">
                    {getInitial(job.companyName)}
                  </div>
                  <div className="fj-card-info">
                    <div className="fj-card-title">{job.title || 'Untitled'}</div>
                    <div className="fj-card-company">{job.companyName || 'Company'}</div>
                  </div>
                  <button className="fj-card-bookmark" title="Save" onClick={() => toast('Saved to bookmarks!')}>
                    <Bookmark size={18} />
                  </button>
                </div>

                {/* Tech Stack Tags */}
                <div className="fj-card-tags">
                  {(job.techStack || []).slice(0, 3).map(tag => (
                    <span key={tag} className="fj-tag">{tag}</span>
                  ))}
                  {(job.techStack || []).length > 3 && (
                    <span className="fj-tag hot">+{job.techStack.length - 3} more</span>
                  )}
                </div>

                {/* Meta: Location + Job Type + Salary */}
                <div className="fj-card-meta">
                  <span><MapPin size={13} /> {job.location || '—'}</span>
                  <span><Briefcase size={13} /> {formatJobType(job.jobType)}</span>
                </div>
                <div className="fj-card-meta" style={{ marginTop: '-8px' }}>
                  <span><DollarSign size={13} /> {job.salary || job.salaryRange || '—'}</span>
                </div>

                {/* Details button */}
                <button className="fj-details-btn" onClick={() => navigate(`/job/${job.id}`)}>
                  Details <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* ── Promo Banner ── */}
          <div className="fj-promo">
            <div>
              <span className="fj-promo-badge">TalentBridge Exclusive</span>
              <h3>Land your dream role faster</h3>
              <p>Our AI career coach analyzes your resume against thousands of job descriptions to give you personalized application tips.</p>
              <button className="fj-promo-btn" onClick={() => toast('Optimizer coming soon!')}>
                Optimize Profile
              </button>
            </div>
            <div className="fj-promo-stats">
              <div className="fj-promo-stat">
                <div className="fj-promo-stat-icon" style={{ color: '#3B82F6' }}>
                  <Globe size={24} />
                </div>
                <span className="fj-promo-stat-value">1.2k+</span>
                <span className="fj-promo-stat-label">Remote Jobs</span>
              </div>
              <div className="fj-promo-stat">
                <div className="fj-promo-stat-icon" style={{ color: '#F59E0B' }}>
                  <Star size={24} />
                </div>
                <span className="fj-promo-stat-value">450+</span>
                <span className="fj-promo-stat-label">Top Rated</span>
              </div>
            </div>
          </div>

        </>
      )}

    </StudentDashboardLayout>
  );
}
