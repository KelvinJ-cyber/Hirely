import { Mail } from 'lucide-react';
import { SectionCard } from './SectionCard';

/**
 * Contact & Social Presence section – recruitment email and LinkedIn.
 *
 * @param {{ data: object, onChange: (field: string, value: string) => void, readonly?: boolean }} props
 */
export function ContactSocial({ data, onChange, readonly = false }) {
  return (
    <SectionCard
      icon={Mail}
      iconColor="green"
      title="Contact & Social Presence"
    >
      <div className="form-grid">
        {/* Recruitment Email */}
        <div className="field-group">
          <label className="field-label">Recruitment Email</label>
          <div className="field-input-icon">
            <span className="icon-left"><Mail /></span>
            <input
              className="field-input"
              type="email"
              placeholder="careers@yourcompany.com"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              readOnly={readonly}
            />
          </div>
        </div>

        {/* LinkedIn URL
        <div className="field-group">
          <label className="field-label">LinkedIn Profile URL</label>
          <div className="field-input-icon">
            <span className="icon-left"><LinkedinIcon  /></span>
            <input
              className="field-input"
              placeholder="linkedin.com/company/your-company"
              value={data.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              readOnly={readonly}
            />
          </div>
        </div> */}
      </div>
    </SectionCard>
  );
}
