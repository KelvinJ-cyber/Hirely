import { useState, useCallback, useEffect } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BasicInformation } from '../components/company/BasicInformation';
import { MissionVision } from '../components/company/MissionVision';
import { ContactSocial } from '../components/company/ContactSocial';
import { CompanyLogo } from '../components/company/CompanyLogo';
import { ProfileCompletion } from '../components/company/ProfileCompletion';
import { companyService } from '../services/companyService';
import '../styles/dashboard.css';

/* ── default empty state ── */
const DEFAULT_BASIC = {
  companyName: '',
  industry: '',
  website: '',
  headquarters: '',
  tagline: '',
};

const DEFAULT_MISSION = {
  about: '',
  mission: '',
  values: [],
};

const DEFAULT_CONTACT = {
  email: '',
  linkedin: '',
};

/* ── completion score helper ── */
function calcCompletion(basic, mission, contact, logo) {
  const checks = [
    basic.companyName,
    basic.industry,
    basic.website,
    basic.headquarters,
    basic.tagline,
    mission.about,
    mission.mission,
    mission.values.length > 0,
    contact.email,
    contact.linkedin,
    !!logo,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}

function completionHint(pct) {
  if (pct === 100) return 'Your profile is complete! 🎉';
  if (pct >= 80) return 'Almost there — fill in the remaining fields.';
  if (pct >= 50) return 'Good progress! Add more details to stand out.';
  return 'Complete your profile to attract top candidates.';
}

export function CompanyProfile() {
  const [basic, setBasic] = useState(DEFAULT_BASIC);
  const [mission, setMission] = useState(DEFAULT_MISSION);
  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Retrieve userId – placeholder using localStorage; replace with auth context later
  const userId = localStorage.getItem('userId') || '1';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await companyService.getProfile(userId);
        if (res.success && res.data) {
          const data = res.data;
          setBasic({
            companyName: data.legalName || '',
            industry: data.primaryIndustry || '',
            website: data.website || '',
            headquarters: data.headquarters || '',
            tagline: data.tagline || '',
          });
          setMission({
            about: data.aboutCompany || '',
            mission: data.missionStatement || '',
            values: data.coreValues || [],
          });
          setContact({
            email: data.email || '',
            linkedin: data.linkedin || '',
          });
          if (data.logoUrl) setLogoPreview(data.logoUrl);
          setProfileExists(true);
        } else {
          // No existing profile – stay in editable mode
          setProfileExists(false);
        }
      } catch (e) {
        // Treat 404 as no profile; other errors as failure
        if (e?.response?.status === 404) {
          setProfileExists(false);
        } else {
          setError(e.message || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleBasicChange = useCallback((field, value) => {
    setBasic((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleMissionChange = useCallback((field, value) => {
    setMission((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleContactChange = useCallback((field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleLogoChange = useCallback((file) => {
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }, []);

  const validateProfile = () => {
    const missing = [];
    if (!basic.companyName) missing.push('Company Legal Name');
    if (!basic.industry) missing.push('Primary Industry');
    if (!basic.website) missing.push('Website');
    if (!basic.headquarters) missing.push('Headquarters');
    if (!basic.tagline) missing.push('Tagline');
    if (!mission.about) missing.push('About Company');
    if (!mission.mission) missing.push('Mission Statement');
    if (mission.values.length === 0) missing.push('At least one Core Value');
    return missing;
  };

  const handleSubmit = async () => {
    const missing = validateProfile();
    if (missing.length > 0) {
      toast.error('Please fill the required fields:\n' + missing.join(', '));
      return;
    }
    setSubmitting(true);
    const payload = {
      legalName: basic.companyName,
      primaryIndustry: basic.industry,
      website: basic.website,
      headquarters: basic.headquarters,
      tagline: basic.tagline,
      aboutCompany: mission.about,
      missionStatement: mission.mission,
      coreValues: mission.values,
    };
    try {
      const res = await companyService.createProfile(userId, payload);
      if (res.success) {
        toast.success('Profile saved successfully!');
        setProfileExists(true);
      } else {
        toast.error('Error saving profile: ' + (res.error || 'Unknown error'));
      }
    } catch (e) {
      toast.error('Unexpected error: ' + (e.message || e));
    } finally {
      setSubmitting(false);
    }
  };


  const completion = calcCompletion(basic, mission, contact, logoPreview);
  const hint = completionHint(completion);

  const headerActions = profileExists ? (
    <button
      className="navbar-btn navbar-btn-outline"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#374151', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', transition: 'all 0.2s', cursor: 'pointer' }}
      onClick={() => window.open(`/public/company/${userId}`, '_blank')}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
    >
      <ExternalLink size={16} />
      View Public Profile
    </button>
  ) : null;

  if (loading) {
    return (
      <DashboardLayout headerActions={headerActions}>
        <div className="loading-spinner">Loading profile…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout headerActions={headerActions}>
        <div className="error-message">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout headerActions={headerActions}>
      {/* ── Page Header ── */}
      <div className="page-header">
        <h1 className="page-title">Company Profile</h1>
        <p className="page-subtitle">
          Manage your company presence and employer brand across TalentBridge.
        </p>
      </div>

      {/* ── Verification Banner ── */}
      <div className="verification-banner">
        <div className="verification-banner-icon">
          <ShieldCheck style={{ width: 22, height: 22 }} />
        </div>
        <div>
          <h4>{profileExists ? 'Profile Pending Verification' : 'Complete Your Profile'}</h4>
          <p>
            {profileExists
              ? 'Our team is currently reviewing your company details. This typically takes 24–48 hours.'
              : 'Fill out the sections below to create your company profile.'}
          </p>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <div className="profile-grid">
        {/* Left column — form sections */}
        <div>
          <BasicInformation data={basic} onChange={handleBasicChange} readonly={profileExists} />
          <MissionVision data={mission} onChange={handleMissionChange} readonly={profileExists} />
          <ContactSocial data={contact} onChange={handleContactChange} readonly={profileExists} />
        </div>

        {/* Right column — logo + completion */}
        <div className="sidebar-cards-col">
          <CompanyLogo logoPreview={logoPreview} onLogoChange={handleLogoChange} readonly={profileExists} />
          <ProfileCompletion percentage={completion} hint={hint} />
        </div>
        {/* Save button – only when creating a new profile */}
        {!profileExists && (
          <div className="save-button-wrapper" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <button
              className="navbar-btn navbar-btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
