import { useState, useEffect, useContext, useCallback } from 'react';
import {
  MapPin, Mail, Pencil, Eye, Briefcase, GraduationCap,
  Award, Plus, X, Upload, FileText, Download, Trash2,
  Loader2, Shield, Globe, Bell as BellIcon, Phone
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentDashboardLayout } from '../components/layout/StudentDashboardLayout';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/api';
import '../styles/dashboard.css';
import '../styles/student-dashboard.css';

/* ── helper: compute profile strength ── */
function computeStrength(profile) {
  let score = 0;
  const total = 7;
  if (profile.fullName) score++;
  if (profile.aboutMe) score++;
  if (profile.bio) score++;
  if (profile.phone) score++;
  if (profile.skillSet?.length > 0) score++;
  if (profile.educationList?.length > 0) score++;
  if (profile.experienceList?.length > 0) score++;
  return Math.round((score / total) * 100);
}

export function StudentDashboard() {
  const { userId, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.getProfile(userId);
      setProfile(res.data);
    } catch (err) {
      toast.error('Failed to load profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <StudentDashboardLayout>
        <div className="sp-loading">
          <Loader2 size={36} className="sp-spinner" />
          <span className="sp-loading-text">Loading your profile…</span>
        </div>
      </StudentDashboardLayout>
    );
  }

  /* ── Fallback if no profile ── */
  if (!profile) {
    return (
      <StudentDashboardLayout>
        <div className="empty-state" style={{ marginTop: '2rem' }}>
          <Briefcase size={48} style={{ color: '#D3A376', marginBottom: '1rem' }} />
          <h3 style={{ color: '#3E2522', margin: '0 0 4px' }}>Profile Not Found</h3>
          <p style={{ color: '#8C6E63', fontSize: '0.88rem' }}>
            We couldn't load your profile. Please try refreshing.
          </p>
        </div>
      </StudentDashboardLayout>
    );
  }

  const strength = computeStrength(profile);
  const initial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <StudentDashboardLayout>

      {/* ══════════════════════════════
          Profile Hero
          ══════════════════════════════ */}
      <div className="profile-hero">
        <div className="profile-hero-banner" />
        <div className="profile-hero-content">
          <div className="profile-hero-avatar">{initial}</div>
          <div className="profile-hero-info">
            <div className="profile-hero-name-row">
              <span className="profile-hero-name">{profile.fullName || 'Your Name'}</span>
              <span className="profile-hero-badge">Open to Work</span>
            </div>
            <div className="profile-hero-tagline">{profile.bio || 'Add a professional bio to stand out'}</div>
            <div className="profile-hero-meta">
              {profile.phone && (
                <span><Phone size={13} /> {profile.phone}</span>
              )}
              {profile.email && (
                <span><Mail size={13} /> {profile.email}</span>
              )}
            </div>
          </div>
          <div className="profile-hero-actions">
            <button className="btn-view-public" onClick={() => toast('Public profile coming soon.')}>
              <Eye size={15} /> View Public
            </button>
            <button className="btn-edit-profile" onClick={() => toast('Edit profile coming soon.')}>
              <Pencil size={15} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          Two-Column Layout
          ══════════════════════════════ */}
      <div className="student-profile-layout">

        {/* ── Left Column (Main Content) ── */}
        <div>

          {/* About Me */}
          <div className="sp-section">
            <div className="sp-section-header">
              <span className="sp-section-title">About Me</span>
              <button className="sp-section-edit" title="Edit">
                <Pencil size={16} />
              </button>
            </div>
            <p className="sp-about-text">
              {profile.aboutMe || 'Tell employers about yourself, your interests, and what you\'re looking for in your career.'}
            </p>
          </div>

          {/* Experience */}
          <div className="sp-section">
            <div className="sp-section-header">
              <span className="sp-section-title">Experience</span>
              <button className="sp-section-action" onClick={() => toast('Add experience coming soon.')}>
                <Plus size={14} /> Add Experience
              </button>
            </div>
            {profile.experienceList?.length > 0 ? (
              profile.experienceList.map((exp, i) => (
                <div className="sp-entry" key={i}>
                  <div className="sp-entry-icon"><Briefcase size={18} /></div>
                  <div className="sp-entry-content">
                    <div className="sp-entry-top">
                      <span className="sp-entry-title">{exp.title || 'Untitled Role'}</span>
                      <span className="sp-entry-timeline">{exp.timeline || ''}</span>
                    </div>
                    <div className="sp-entry-org">{exp.nameOfInstitute || ''}</div>
                    {exp.description && (
                      <p className="sp-entry-desc">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sp-about-text" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                No experience added yet. Click "Add Experience" to get started.
              </p>
            )}
          </div>

          {/* Education */}
          <div className="sp-section">
            <div className="sp-section-header">
              <span className="sp-section-title">Education</span>
              <button className="sp-section-action" onClick={() => toast('Add education coming soon.')}>
                <Plus size={14} /> Add Education
              </button>
            </div>
            {profile.educationList?.length > 0 ? (
              profile.educationList.map((edu, i) => (
                <div className="sp-entry" key={i}>
                  <div className="sp-entry-icon"><GraduationCap size={18} /></div>
                  <div className="sp-entry-content">
                    <div className="sp-entry-top">
                      <span className="sp-entry-title">{edu.title || 'Untitled'}</span>
                      <span className="sp-entry-timeline">{edu.timeline || ''}</span>
                    </div>
                    <div className="sp-entry-org">{edu.nameOfInstitute || ''}</div>
                    {edu.description && (
                      <p className="sp-entry-desc">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sp-about-text" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                No education added yet. Click "Add Education" to get started.
              </p>
            )}
          </div>

          {/* Accomplishments (Hardcoded placeholder) */}
          <div className="sp-section">
            <div className="sp-section-header">
              <span className="sp-section-title">Accomplishments</span>
              <button className="sp-section-edit" title="Edit"><Pencil size={16} /></button>
            </div>
            {(profile.experienceList?.length > 0 || profile.educationList?.length > 0) ? (
              <div className="sp-accomplishments-grid">
                {profile.educationList?.length > 0 && (
                  <div className="sp-accomplishment-card">
                    <div className="sp-accomplishment-icon"><Award size={18} /></div>
                    <div>
                      <div className="sp-accomplishment-title">Academic Excellence</div>
                      <div className="sp-accomplishment-desc">Completed {profile.educationList.length} degree(s) / certification(s)</div>
                    </div>
                  </div>
                )}
                {profile.experienceList?.length > 0 && (
                  <div className="sp-accomplishment-card">
                    <div className="sp-accomplishment-icon"><Briefcase size={18} /></div>
                    <div>
                      <div className="sp-accomplishment-title">Professional Experience</div>
                      <div className="sp-accomplishment-desc">{profile.experienceList.length} professional role(s) added</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="sp-about-text" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Accomplishments will appear here as you add your experience and education.
              </p>
            )}
          </div>

        </div>

        {/* ── Right Sidebar ── */}
        <div className="sp-sidebar">

          {/* Profile Strength */}
          <div className="sp-widget">
            <div className="sp-strength-header">
              <span className="sp-widget-title">Profile Strength</span>
              <span className="sp-strength-pct">{strength}%</span>
            </div>
            <div className="sp-strength-bar">
              <div className="sp-strength-fill" style={{ width: `${strength}%` }} />
            </div>
            <p className="sp-strength-hint">
              {strength < 100
                ? 'Add more details to your profile to reach 100% and get more visibility from recruiters.'
                : 'Your profile is complete! You\'re getting maximum visibility.'}
            </p>
            {strength < 100 && (
              <button className="sp-complete-btn">Complete Profile</button>
            )}
          </div>

          {/* Resume & Files */}
          <div className="sp-widget">
            <span className="sp-widget-title">Resume & Files</span>
            <p className="sp-widget-subtitle">Manage your professional documents.</p>
            <div className="sp-upload-zone" onClick={() => toast('File upload coming soon.')}>
              <div className="sp-upload-icon"><Upload size={20} /></div>
              <span className="sp-upload-text">Click to upload file</span>
              <span className="sp-upload-hint">PDF, DOCX up to 10MB</span>
            </div>
          </div>

          {/* Skills */}
          <div className="sp-widget">
            <span className="sp-widget-title">Skills</span>
            <p className="sp-widget-subtitle">Tags to help recruiters find you.</p>
            <div className="sp-skills-list">
              {profile.skillSet?.length > 0 ? (
                profile.skillSet.map(skill => (
                  <span key={skill} className="sp-skill-tag">
                    {skill}
                    <button className="sp-skill-remove" title="Remove"><X size={12} /></button>
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.78rem', color: '#8C6E63', fontStyle: 'italic' }}>No skills added yet.</span>
              )}
            </div>
            <div className="sp-skill-add">
              <input type="text" className="sp-skill-input" placeholder="Add a skill…" />
              <button className="sp-skill-add-btn" title="Add"><Plus size={16} /></button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="sp-widget">
            <span className="sp-widget-title">Privacy Settings</span>
            <div className="sp-privacy-item">
              <input type="checkbox" className="sp-privacy-checkbox" defaultChecked />
              <div>
                <div className="sp-privacy-label"><Globe size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} /> Public Profile</div>
                <div className="sp-privacy-desc">Your profile is visible to all registered companies and recruiters.</div>
              </div>
            </div>
            <div className="sp-privacy-item">
              <input type="checkbox" className="sp-privacy-checkbox" defaultChecked />
              <div>
                <div className="sp-privacy-label"><Shield size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} /> Search Indexing</div>
                <div className="sp-privacy-desc">Allow search engines like Google to index your public profile.</div>
              </div>
            </div>
            <div className="sp-privacy-item">
              <input type="checkbox" className="sp-privacy-checkbox" />
              <div>
                <div className="sp-privacy-label"><BellIcon size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} /> Job Alerts & Marketing</div>
                <div className="sp-privacy-desc">Receive personalized job recommendations and career advice via email.</div>
              </div>
            </div>
            <button className="sp-delete-account" onClick={() => toast.error('Account deletion is not available yet.')}>
              Delete Account
            </button>
          </div>

        </div>
      </div>

    </StudentDashboardLayout>
  );
}
