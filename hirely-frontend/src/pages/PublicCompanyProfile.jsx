import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { companyService } from '../services/companyService';
import '../styles/dashboard.css';

/**
 * Public view of a company profile.
 * URL: /public/company/:userId
 */
export function PublicCompanyProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await companyService.getProfile(userId);
        if (res.success && res.data) {
          setProfile(res.data);
          document.title = `${res.data.legalName} – Company Profile`;
        } else {
          setError('Profile not found');
        }
      } catch (e) {
        setError(e.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId]);

  if (loading) {
    return <div className="loading-spinner">Loading profile…</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const {
    legalName,
    primaryIndustry,
    tagline,
    aboutCompany,
    missionStatement,
    coreValues,
    headquarters,
    website,
    email,
    linkedin,
    logoUrl,
  } = profile;

  return (
    <div className="public-profile-page">
      {/* Header */}
      <header className="public-header">
        {logoUrl && <img src={logoUrl} alt="Company logo" className="public-logo" />}
        <h1 className="public-company-name">{legalName}</h1>
        <p className="public-industry">{primaryIndustry}</p>
        {tagline && <p className="public-tagline">{tagline}</p>}
      </header>

      {/* Sections */}
      <section className="public-section">
        <h2>About Company</h2>
        <p>{aboutCompany}</p>
      </section>

      <section className="public-section">
        <h2>Mission Statement</h2>
        <p>{missionStatement}</p>
      </section>

      {coreValues && coreValues.length > 0 && (
        <section className="public-section">
          <h2>Core Values</h2>
          <ul className="public-values-list">
            {coreValues.map((val, i) => (
              <li key={i}>{val}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="public-section">
        <h2>Headquarters</h2>
        <p>{headquarters}</p>
      </section>

      {website && (
        <section className="public-section">
          <h2>Website</h2>
          <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
        </section>
      )}

      <section className="public-section">
        <h2>Contact Information</h2>
        {email && <p>Email: <a href={`mailto:${email}`}>{email}</a></p>}
        {linkedin && <p>LinkedIn: <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>}
      </section>

      <section className="public-section">
        <h2>Open Jobs</h2>
        <p>Coming soon…</p>
      </section>
    </div>
  );
}
