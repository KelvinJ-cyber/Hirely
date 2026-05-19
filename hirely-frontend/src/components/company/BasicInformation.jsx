import { Building2, Globe, MapPin } from 'lucide-react';
import { SectionCard } from './SectionCard';

/**
 * Basic Information section – company name, industry, website, HQ, tagline.
 * @param {{ data: object, onChange: (field: string, value: string) => void, readonly?: boolean }} props
 */
export function BasicInformation({ data, onChange, readonly = false }) {
  const handle = (field) => (e) => onChange(field, e.target.value);

  return (
    <SectionCard icon={Building2} iconColor="blue" title="Basic Information">
      <div className="form-grid">
        {/* Company Legal Name */}
        <div className="field-group">
          <label className="field-label">Company Legal Name</label>
          <input
            className="field-input"
            placeholder="e.g. Vanguard Tech Solutions"
            value={data.companyName}
            onChange={handle('companyName')}
            readOnly={readonly}
          />
        </div>

        {/* Primary Industry */}
        <div className="field-group">
          <label className="field-label">Primary Industry</label>
          <input
            className="field-input"
            placeholder="e.g. Cloud Computing"
            value={data.industry}
            onChange={handle('industry')}
            readOnly={readonly}
          />
        </div>

        {/* Company Website */}
        <div className="field-group">
          <label className="field-label">Company Website</label>
          <div className="field-input-icon">
            <span className="icon-left"><Globe /></span>
            <input
              className="field-input"
              placeholder="https://yourcompany.com"
              value={data.website}
              onChange={handle('website')}
              readOnly={readonly}
            />
          </div>
        </div>

        {/* Headquarters */}
        <div className="field-group">
          <label className="field-label">Headquarters</label>
          <div className="field-input-icon">
            <span className="icon-left"><MapPin /></span>
            <input
              className="field-input"
              placeholder="e.g. Austin, TX"
              value={data.headquarters}
              onChange={handle('headquarters')}
              readOnly={readonly}
            />
          </div>
        </div>

        {/* Short Tagline */}
        <div className="field-group full-width">
          <label className="field-label">Short Tagline</label>
          <input
            className="field-input"
            placeholder="Building the infrastructure of tomorrow, today."
            value={data.tagline}
            onChange={handle('tagline')}
            readOnly={readonly}
          />
          <span className="field-hint">Appears below your logo in search results.</span>
        </div>
      </div>
    </SectionCard>
  );
}
