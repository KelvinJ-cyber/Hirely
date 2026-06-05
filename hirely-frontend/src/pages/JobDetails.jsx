// src/pages/JobDetails.jsx

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Clock3,
  DollarSign,
  Building2,
  ArrowLeft,
  Heart,
  Share2,
  Bell,
  Loader2,
  AlertCircle,
  Users,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentDashboardLayout } from '../components/layout/StudentDashboardLayout';
import { userService } from '../services/api';
import '../styles/dashboard.css';
import '../styles/job-details.css';

/* ── Helpers ── */
function getInitial(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatJobType(type) {
  if (!type) return '—';
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function timeAgo(dateString) {
  if (!dateString) return 'Recently';
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Fetch job details ── */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await userService.getJobDetails(id);
        setJob(res.data);

        // Also fetch all jobs for "Similar Jobs" sidebar
        try {
          const allRes = await userService.getJobs();
          const all = Array.isArray(allRes.data) ? allRes.data : [];
          // Show up to 3 similar jobs (different from current)
          setSimilarJobs(all.filter(j => j.id !== Number(id) && j.id !== id).slice(0, 3));
        } catch {
          setSimilarJobs([]);
        }
      } catch (err) {
        console.error('Failed to load job details:', err);
        setError('Could not load this job listing. It may no longer exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  /* ── Parse requirements into bullet items ── */
  const parseItems = (text) => {
    if (!text) return [];
    return text
      .split(/\n|(?:^|\n)\s*[-•*]\s*/)
      .map(s => s.trim())
      .filter(Boolean);
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <StudentDashboardLayout>
        <div className="jd-loading">
          <Loader2 size={40} className="jd-loading-spinner" />
          <span className="jd-loading-text">Loading job details…</span>
        </div>
      </StudentDashboardLayout>
    );
  }

  /* ── Error state ── */
  if (error || !job) {
    return (
      <StudentDashboardLayout>
        <div className="jd-error">
          <div className="jd-error-icon"><AlertCircle size={28} /></div>
          <h3>Job Not Found</h3>
          <p>{error || 'This listing may have been removed or the link is incorrect.'}</p>
          <Link to="/find-jobs" className="jd-back-link" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            <ArrowLeft size={16} /> Back to Jobs
          </Link>
        </div>
      </StudentDashboardLayout>
    );
  }

  const requirementItems = parseItems(job.requirementsAndQualifications);

  return (
    <StudentDashboardLayout>

      {/* ── Back Bar ── */}
      <div className="jd-back-bar">
        <Link to="/find-jobs" className="jd-back-link">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
        <div className="jd-back-actions">
          <button className="jd-icon-btn" title="Save" onClick={() => toast('Saved to bookmarks!')}>
            <Heart size={18} />
          </button>
          <button className="jd-icon-btn" title="Share" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied!');
          }}>
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="jd-layout">

        {/* ═══ LEFT COLUMN ═══ */}
        <div>

          {/* ── Hero Card ── */}
          <div className="jd-hero">
            <div className="jd-hero-company-icon">
              <Building2 size={28} />
            </div>

            <div className="jd-badges">
              <span className="jd-badge type">{formatJobType(job.jobType)}</span>
              {job.isActive !== false && (
                <span className="jd-badge active">Active Hiring</span>
              )}
            </div>

            <h1 className="jd-hero-title">{job.title || 'Untitled Position'}</h1>

            <div className="jd-hero-meta">
              <span className="jd-hero-meta-item">
                <Building2 /> {job.companyName || 'Company'}
              </span>
              <span className="jd-hero-meta-item">
                <MapPin /> {job.location || '—'}
              </span>
              <span className="jd-hero-meta-item">
                <Clock3 /> Posted {timeAgo(job.createdAt)}
              </span>
            </div>

            <div className="jd-hero-bottom">
              <button className="jd-apply-btn" onClick={() => navigate(`/apply/${id}`)}>
                Apply Now
              </button>
            </div>

            {/* Stats Row */}
            <div className="jd-stats-row">
              <div className="jd-stat">
                <div className="jd-stat-icon"><DollarSign /></div>
                <div>
                  <div className="jd-stat-label">Salary Range</div>
                  <div className="jd-stat-value">{job.salaryRange || '—'}</div>
                </div>
              </div>
              <div className="jd-stat">
                <div className="jd-stat-icon"><Briefcase /></div>
                <div>
                  <div className="jd-stat-label">Department</div>
                  <div className="jd-stat-value">{job.department || '—'}</div>
                </div>
              </div>
              <div className="jd-stat">
                <div className="jd-stat-icon"><Layers /></div>
                <div>
                  <div className="jd-stat-label">Job Type</div>
                  <div className="jd-stat-value">{formatJobType(job.jobType)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── About the Role ── */}
          {job.roleOverview && (
            <div className="jd-section">
              <h2 className="jd-section-title">
                <span className="jd-section-dot" />
                About the Role
              </h2>
              <div className="jd-section-body">
                <p>{job.roleOverview}</p>
              </div>
            </div>
          )}

          {/* ── Requirements & Qualifications ── */}
          {requirementItems.length > 0 && (
            <div className="jd-section">
              <h2 className="jd-section-title">
                <span className="jd-section-dot" />
                What You'll Need
              </h2>
              <ul className="jd-section-list">
                {requirementItems.map((item, i) => (
                  <li key={i}>
                    <span className="jd-bullet" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Tech Stack ── */}
          {job.techStack && job.techStack.length > 0 && (
            <div className="jd-section">
              <h2 className="jd-section-title">
                <span className="jd-section-dot" />
                Tech Stack & Skills
              </h2>
              <div className="jd-tech-tags">
                {job.techStack.map((tag, i) => (
                  <span key={i} className="jd-tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ═══ RIGHT SIDEBAR ═══ */}
        <div>

          {/* ── Company Card ── */}
          <div className="jd-sidebar-card">
            <div className="jd-company-header">
              <div className="jd-company-avatar">
                {getInitial(job.companyName)}
              </div>
              <h3 className="jd-company-name">{job.companyName || 'Company'}</h3>
              {job.companyId && (
                <span className="jd-company-id">@ company-{job.companyId}</span>
              )}
            </div>

            <div className="jd-company-stats">
              <div className="jd-company-stat-card">
                <div className="jd-company-stat-label">Department</div>
                <div className="jd-company-stat-val">{job.department || '—'}</div>
              </div>
              <div className="jd-company-stat-card">
                <div className="jd-company-stat-label">Type</div>
                <div className="jd-company-stat-val">{formatJobType(job.jobType)}</div>
              </div>
            </div>

            {job.companyId && (
              <button
                className="jd-view-company-btn"
                onClick={() => navigate(`/public/company/${job.companyId}`)}
              >
                View Company Profile
              </button>
            )}
          </div>

          {/* ── Similar Jobs ── */}
          {similarJobs.length > 0 && (
            <div className="jd-sidebar-card">
              <div className="jd-similar-header">
                <span className="jd-similar-title">Similar Jobs</span>
                <Link to="/find-jobs" className="jd-similar-see-all">See All</Link>
              </div>

              {similarJobs.map(sj => (
                <div className="jd-similar-job" key={sj.id} onClick={() => navigate(`/job/${sj.id}`)}>
                  <div className="jd-similar-avatar">{getInitial(sj.companyName)}</div>
                  <div className="jd-similar-info">
                    <div className="jd-similar-name">{sj.title}</div>
                    <div className="jd-similar-company">{sj.companyName}</div>
                    <div className="jd-similar-meta">
                      <span className="jd-similar-meta-item">
                        <MapPin size={11} /> {sj.location || '—'}
                      </span>
                      <span className="jd-similar-meta-item">
                        <DollarSign size={11} /> {sj.salaryRange || '—'}
                      </span>
                    </div>
                    <span className="jd-similar-details-link">View Details</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Job Alerts ── */}
          <div className="jd-alerts-card">
            <div className="jd-alerts-icon"><Bell size={22} /></div>
            <h4 className="jd-alerts-title">Job Alerts</h4>
            <p className="jd-alerts-text">
              Get notified as soon as similar {job.department || 'tech'} roles are posted.
            </p>
            <button className="jd-alerts-btn" onClick={() => toast.success('Notifications enabled!')}>
              <Bell size={14} /> Enable Notifications
            </button>
          </div>

        </div>
      </div>

    </StudentDashboardLayout>
  );
}