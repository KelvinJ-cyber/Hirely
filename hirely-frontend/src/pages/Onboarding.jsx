import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Plus, X, Upload,
  User, GraduationCap, Briefcase, FileText,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/api';

const STEPS = [
  { id: 'profile', label: 'About', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'resume', label: 'Resume', icon: FileText },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 – Profile
  const [profile, setProfile] = useState({ aboutMe: '', bio: '', skillSets: [] });
  const [skillInput, setSkillInput] = useState('');

  // Step 2 – Education
  const [educations, setEducations] = useState([
    { title: '', description: '', nameOfInstitute: '', timeline: '' },
  ]);

  // Step 3 – Experience
  const [experiences, setExperiences] = useState([
    { title: '', description: '', nameOfInstitute: '', timeline: '' },
  ]);

  /* ── helpers ── */
  const addSkill = () => {
    const t = skillInput.trim();
    if (t && !profile.skillSets.includes(t)) {
      setProfile((p) => ({ ...p, skillSets: [...p.skillSets, t] }));
      setSkillInput('');
    }
  };

  const updateEntry = (list, setList, idx, field, val) =>
    setList(list.map((e, i) => (i === idx ? { ...e, [field]: val } : e)));

  const addEntry = (setList) =>
    setList((p) => [...p, { title: '', description: '', nameOfInstitute: '', timeline: '' }]);

  const removeEntry = (list, setList, idx) => {
    if (list.length > 1) setList((p) => p.filter((_, i) => i !== idx));
  };

  /* ── submit per step ── */
  const submitStep = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (step === 0) {
        await userService.createProfile(userId, profile);
      } else if (step === 1) {
        for (const edu of educations) {
          if (edu.title && edu.nameOfInstitute) await userService.addEducation(userId, edu);
        }
      } else if (step === 2) {
        for (const exp of experiences) {
          if (exp.title && exp.nameOfInstitute) await userService.addExperience(userId, exp);
        }
      }
      if (step < 3) setStep(step + 1);
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 3) { navigate('/dashboard'); return; }
    submitStep();
  };

  /* ── shared textarea style ── */
  const textareaStyle = {
    width: '100%',
    padding: '0.7rem 1rem',
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '0.75rem',
    fontSize: '0.9rem',
    color: '#3E2522',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    resize: 'none',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#3E2522',
    marginBottom: 6,
  };

  /* ── render sections ── */
  const renderProfile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>About Me</label>
        <textarea
          style={textareaStyle}
          rows={3}
          placeholder="Tell us about yourself…"
          value={profile.aboutMe}
          onChange={(e) => setProfile((p) => ({ ...p, aboutMe: e.target.value }))}
          onFocus={(e) => { e.target.style.borderColor = '#D3A376'; e.target.style.boxShadow = '0 0 0 3px rgba(211,163,118,0.2)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
        />
      </div>
      <div>
        <label style={labelStyle}>Bio</label>
        <textarea
          style={textareaStyle}
          rows={2}
          placeholder="A short professional bio…"
          value={profile.bio}
          onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
          onFocus={(e) => { e.target.style.borderColor = '#D3A376'; e.target.style.boxShadow = '0 0 0 3px rgba(211,163,118,0.2)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
        />
      </div>
      <div>
        <label style={labelStyle}>Skills</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            className="tb-input"
            style={{ flex: 1 }}
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
          />
          <Button type="button" variant="outline" size="md" onClick={addSkill} leftIcon={<Plus style={{ width: 16, height: 16 }} />}>
            Add
          </Button>
        </div>
        {profile.skillSets.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {profile.skillSets.map((s) => (
              <span key={s} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', background: 'rgba(211,163,118,0.15)',
                color: '#3E2522', fontSize: '0.8rem', fontWeight: 500,
                borderRadius: 20,
              }}>
                {s}
                <button type="button"
                  onClick={() => setProfile((p) => ({ ...p, skillSets: p.skillSets.filter((x) => x !== s) }))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <X style={{ width: 14, height: 14 }} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderEntries = (entries, setEntries, label) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {entries.map((entry, idx) => (
        <div key={idx} style={{
          padding: '1.25rem', background: '#FFF2DF', borderRadius: '0.75rem',
          border: '1px solid rgba(211,163,118,0.2)', position: 'relative',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {entries.length > 1 && (
            <button type="button" onClick={() => removeEntry(entries, setEntries, idx)}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none', color: '#9CA3AF',
                cursor: 'pointer', padding: 0, transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
          <Input label="Title" placeholder={`e.g. ${label === 'Education' ? 'Bachelor of CS' : 'Software Intern'}`}
            value={entry.title} onChange={(e) => updateEntry(entries, setEntries, idx, 'title', e.target.value)} />
          <Input label={label === 'Education' ? 'Institution' : 'Company / Organization'}
            placeholder={label === 'Education' ? 'Harvard University' : 'Google Inc.'}
            value={entry.nameOfInstitute} onChange={(e) => updateEntry(entries, setEntries, idx, 'nameOfInstitute', e.target.value)} />
          <Input label="Timeline" placeholder="2020 – 2024"
            value={entry.timeline} onChange={(e) => updateEntry(entries, setEntries, idx, 'timeline', e.target.value)} />
          <div>
            <label style={labelStyle}>Description</label>
            <textarea rows={2}
              style={textareaStyle}
              placeholder="Describe your role or studies…"
              value={entry.description}
              onChange={(e) => updateEntry(entries, setEntries, idx, 'description', e.target.value)}
              onFocus={(e) => { e.target.style.borderColor = '#D3A376'; e.target.style.boxShadow = '0 0 0 3px rgba(211,163,118,0.2)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" fullWidth onClick={() => addEntry(setEntries)} leftIcon={<Plus style={{ width: 16, height: 16 }} />}>
        Add {label}
      </Button>
    </div>
  );

  const renderResume = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1.5rem', border: '2px dashed #D3A376', borderRadius: '1rem',
      background: 'rgba(211,163,118,0.04)', transition: 'border-color 0.2s, background 0.2s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C08B5C'; e.currentTarget.style.background = 'rgba(211,163,118,0.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#D3A376'; e.currentTarget.style.background = 'rgba(211,163,118,0.04)'; }}
    >
      <Upload style={{ width: 40, height: 40, color: '#9CA3AF', marginBottom: 12 }} />
      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#3E2522', marginBottom: 4 }}>Upload your resume</p>
      <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: 16 }}>PDF, DOC or DOCX (max 5MB)</p>
      <Button type="button" variant="outline" size="sm">Browse Files</Button>
    </div>
  );

  const stepContent = [renderProfile, () => renderEntries(educations, setEducations, 'Education'), () => renderEntries(experiences, setExperiences, 'Experience'), renderResume];

  return (
    <div style={{ minHeight: '100vh', background: '#FFE0B2', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 40, height: 40, background: '#3E2522', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(62,37,34,0.2)' }}>
          <Briefcase style={{ width: 20, height: 20, color: '#fff' }} />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3E2522', letterSpacing: '-0.02em' }}>TalentBridge</span>
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3E2522', marginBottom: 4, textAlign: 'center' }}>Complete Your Profile</h1>
      <p style={{ fontSize: '0.85rem', color: '#8C6E63', marginBottom: '2rem', textAlign: 'center' }}>Help employers get to know you better</p>

      {/* Progress Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', width: '100%', maxWidth: 520 }}>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const done = i < step;
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  background: active ? '#D3A376' : done ? '#16A34A' : '#FFFFFF',
                  color: active || done ? '#fff' : '#9CA3AF',
                  border: !active && !done ? '2px solid #E5E7EB' : 'none',
                  boxShadow: active ? '0 4px 14px rgba(211,163,118,0.4)' : 'none',
                  transform: active ? 'scale(1.1)' : 'scale(1)',
                }}>
                  <Icon style={{ width: 18, height: 18 }} />
                </div>
                <span style={{
                  fontSize: '0.75rem', marginTop: 6, fontWeight: 600,
                  color: active ? '#D3A376' : done ? '#16A34A' : '#9CA3AF',
                }}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  height: 2, flex: 1, marginTop: -20,
                  background: i < step ? '#16A34A' : '#E5E7EB',
                  transition: 'background 0.3s ease',
                  borderRadius: 1,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 520,
        background: '#FFFFFF', borderRadius: '1.25rem',
        boxShadow: '0 4px 30px rgba(62,37,34,0.10)',
        padding: '2rem',
      }}>
        {error && (
          <div style={{
            marginBottom: '1.25rem', padding: '0.75rem 1rem',
            background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)',
            borderRadius: '0.75rem', fontSize: '0.85rem', color: '#DC2626', textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {stepContent[step]()}

        {/* Navigation */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6',
        }}>
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => { setStep(step - 1); setError(''); }} leftIcon={<ChevronLeft style={{ width: 16, height: 16 }} />}>
              Back
            </Button>
          ) : <div />}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {step < 3 && (
              <Button type="button" variant="secondary" onClick={() => { setStep(step + 1); setError(''); }}>Skip</Button>
            )}
            <Button type="button" variant="accent" loading={isLoading} onClick={handleNext}
              rightIcon={<ChevronRight style={{ width: 16, height: 16 }} />}>
              {step === 3 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
