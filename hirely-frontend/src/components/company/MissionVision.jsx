import { useState } from 'react';
import { Target, X, Plus } from 'lucide-react';
import { SectionCard } from './SectionCard';

/**
 * Mission & Vision section – about, mission statement, core values chips.
 *
 * @param {{
 *   data: { about: string, mission: string, values: string[] },
 *   onChange: (field: string, value: any) => void,
 *   readonly?: boolean
 * }} props
 */
export function MissionVision({ data, onChange, readonly = false }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState('');

  const handleAddValue = () => {
    const trimmed = newValue.trim();
    if (trimmed && !data.values.includes(trimmed)) {
      onChange('values', [...data.values, trimmed]);
    }
    setNewValue('');
    setIsAdding(false);
  };

  const handleRemoveValue = (val) => {
    onChange('values', data.values.filter((v) => v !== val));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAddValue(); }
    if (e.key === 'Escape') { setNewValue(''); setIsAdding(false); }
  };

  return (
    <SectionCard
      icon={Target}
      iconColor="purple"
      title="Mission & Vision"
      subtitle="Tell your story to attract the right talent"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* About the Company */}
        <div className="field-group">
          <label className="field-label">About the Company</label>
          <textarea
            className="field-input"
            rows={4}
            placeholder="Share your company's story, culture, and what makes you unique…"
            value={data.about}
            onChange={(e) => onChange('about', e.target.value)}
            readOnly={readonly}
          />
        </div>

        {/* Mission Statement */}
        <div className="field-group">
          <label className="field-label">Our Mission</label>
          <textarea
            className="field-input"
            rows={3}
            placeholder="What drives your organization forward?"
            value={data.mission}
            onChange={(e) => onChange('mission', e.target.value)}
            readOnly={readonly}
          />
        </div>

        {/* Core Values */}
        <div className="field-group">
          <label className="field-label">Core Values</label>
          <div className="chips-container">
            {data.values.map((val) => (
              <span key={val} className="chip">
                {val}
                {!readonly && (
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => handleRemoveValue(val)}
                    aria-label={`Remove ${val}`}
                  >
                    <X style={{ width: 14, height: 14 }} />
                  </button>
                )}
              </span>
            ))}

            {!readonly && !isAdding && (
              <button
                type="button"
                className="chip-add-btn"
                onClick={() => setIsAdding(true)}
              >
                <Plus style={{ width: 14, height: 14 }} />
                Add Value
              </button>
            )}
          </div>

          {isAdding && (
            <div className="chip-input-row">
              <input
                className="chip-input-field"
                placeholder="e.g. Innovation"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button type="button" className="chip-input-confirm" onClick={handleAddValue}>
                Add
              </button>
              <button
                type="button"
                className="chip-input-cancel"
                onClick={() => { setNewValue(''); setIsAdding(false); }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
