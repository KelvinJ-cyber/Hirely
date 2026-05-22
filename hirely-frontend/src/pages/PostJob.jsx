import { useState, useContext } from 'react';
import { 
  MapPin, DollarSign, Tag as TagIcon, X, Briefcase, 
  LayoutTemplate, Send, Save, Eye, Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import { companyService } from '../services/companyService';
import '../styles/dashboard.css';

const DEFAULT_JOB = {
  title: '',
  department: '',
  roleOverview: '',
  requirementsAndQualifications: '',
  jobType: '',
  location: '',
  salaryRange: '',
  techStack: []
};

export function PostJob() {
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState(DEFAULT_JOB);
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.techStack.includes(newTag)) {
        setFormData(prev => ({ ...prev, techStack: [...prev.techStack, newTag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tag => tag !== tagToRemove)
    }));
  };

  const validate = () => {
    const missing = [];
    if (!formData.title) missing.push('Job Title');
    if (!formData.jobType) missing.push('Job Type');
    if (!formData.department) missing.push('Department');
    if (!formData.location) missing.push('Location');
    if (!formData.roleOverview) missing.push('Role Overview');
    if (!formData.requirementsAndQualifications) missing.push('Requirements & Qualifications');
    return missing;
  };

  const handleSubmit = async () => {
    const missing = validate();
    if (missing.length > 0) {
      toast.error(`Please fill out required fields: ${missing.join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await companyService.createJob(userId, formData);
      if (res.success) {
        toast.success('Job posted successfully!');
        setFormData(DEFAULT_JOB); // reset form
      } else {
        toast.error('Error posting job: ' + (res.error || 'Unknown error'));
      }
    } catch (err) {
      toast.error('Unexpected error: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  const headerActions = (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button className="navbar-btn navbar-btn-outline" onClick={() => toast.success('Draft saved.')}>
        Save Draft
      </button>
      <button className="navbar-btn navbar-btn-primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Publishing...' : 'Publish Listing'}
      </button>
    </div>
  );

  return (
    <DashboardLayout headerActions={headerActions}>
      <div className="page-header">
        <h1 className="page-title">Post a New Job</h1>
        <p className="page-subtitle">Create a compelling listing to find your next great hire.</p>
      </div>

      <div className="profile-grid">
        
        {/* Form Column */}
        <div>
          
          {/* Section 1: Basic Information */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon blue">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="section-title">Basic Information</h3>
                <p className="section-subtitle">The fundamental details of the position.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Job Title <span style={{color: '#DC2626'}}>*</span></label>
                  <span className="field-hint">Keep it clear and specific</span>
                </div>
                <input
                  type="text"
                  name="title"
                  className="field-input"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Job Type <span style={{color: '#DC2626'}}>*</span></label>
                <select
                  name="jobType"
                  className="field-input"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Job Type</option>
                  <option value="FULL_TIME">FULL_TIME</option>
                  <option value="PART_TIME">PART_TIME</option>
                  <option value="INTERNSHIP">INTERNSHIP</option>
                  <option value="CONTRACT">CONTRACT</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">Department <span style={{color: '#DC2626'}}>*</span></label>
                <input
                  type="text"
                  name="department"
                  className="field-input"
                  placeholder="e.g. Engineering"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location & Compensation */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon purple">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="section-title">Location & Compensation</h3>
                <p className="section-subtitle">Where is the talent based and what is the reward?</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Location <span style={{color: '#DC2626'}}>*</span></label>
                  <span className="field-hint">City, State or 'Remote'</span>
                </div>
                <div className="field-input-icon">
                  <div className="icon-left"><MapPin size={16} /></div>
                  <input
                    type="text"
                    name="location"
                    className="field-input"
                    placeholder="Remote, US"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Salary Range</label>
                  <span className="field-hint">Displayed to candidates</span>
                </div>
                <div className="field-input-icon">
                  <div className="icon-left"><DollarSign size={16} /></div>
                  <input
                    type="text"
                    name="salaryRange"
                    className="field-input"
                    placeholder="$140,000 - $160,000"
                    value={formData.salaryRange}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Job Description */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon green">
                <LayoutTemplate size={20} />
              </div>
              <div>
                <h3 className="section-title">Job Description</h3>
                <p className="section-subtitle">Clearly define the role, responsibilities, and impact.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Role Overview <span style={{color: '#DC2626'}}>*</span></label>
                  <span className="field-hint">What will they do day-to-day?</span>
                </div>
                <textarea
                  name="roleOverview"
                  className="field-input"
                  rows="4"
                  placeholder="We are looking for a..."
                  value={formData.roleOverview}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="field-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Requirements & Qualifications <span style={{color: '#DC2626'}}>*</span></label>
                  <span className="field-hint">Education, skills, and experience</span>
                </div>
                <textarea
                  name="requirementsAndQualifications"
                  className="field-input"
                  rows="4"
                  placeholder="- 5+ years of experience with..."
                  value={formData.requirementsAndQualifications}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 4: Tags & Skills */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon blue">
                <TagIcon size={20} />
              </div>
              <div>
                <h3 className="section-title">Tags & Skills</h3>
                <p className="section-subtitle">Help candidates find your job through search and filters.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="field-label">Add Tags</label>
                  <span className="field-hint">Press enter to add</span>
                </div>
                
                <div style={{ border: '1.5px solid #E5E0DB', borderRadius: '10px', padding: '12px', backgroundColor: '#fafafa', minHeight: '100px' }}>
                  <div className="field-input-icon" style={{ marginBottom: '12px' }}>
                    <div className="icon-left"><TagIcon size={16} /></div>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="e.g. React, Python, Remote..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                  </div>
                  
                  <div className="chips-container">
                    {formData.techStack.map(tag => (
                      <span key={tag} className="chip">
                        {tag}
                        <button type="button" className="chip-remove" onClick={() => removeTag(tag)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {formData.techStack.length === 0 && (
                      <span className="field-hint" style={{ padding: '4px' }}>No tags added yet.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '2rem' }}>
            <button className="navbar-btn navbar-btn-primary" style={{ padding: '12px 24px', flex: 1, justifyContent: 'center', fontSize: '1rem' }} onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Job Now'}
            </button>
            <button className="navbar-btn navbar-btn-outline" style={{ padding: '12px 24px', flex: 1, justifyContent: 'center', fontSize: '1rem' }} onClick={() => toast.success('Saved as template.')}>
              Save as Template
            </button>
          </div>

        </div>

        {/* Live Preview Column */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#8C6E63', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={16} /> LIVE PREVIEW
            </div>
            <span style={{ backgroundColor: '#F3E8DE', color: '#8C6E63', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem' }}>Candidate View</span>
          </div>

          <div className="sidebar-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '5px', background: 'linear-gradient(90deg, #D3A376, #C4905F)' }}></div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3E2522', margin: 0 }}>
                  {formData.title || 'Job Title Here'}
                </h2>
                <div className="section-icon blue" style={{ width: '32px', height: '32px' }}>
                  <Briefcase size={16} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#8C6E63', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {formData.location || 'Location'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {formData.jobType || 'Job Type'}</span>
              </div>

              <div style={{ fontWeight: '600', color: '#3E2522', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={16} style={{ color: '#8C6E63' }}/> {formData.salaryRange || 'Salary Range'}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3E2522', marginBottom: '8px' }}>Description</h4>
                <p style={{ fontSize: '0.875rem', color: '#5A4A42', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6 }}>
                  {formData.roleOverview || 'Role overview will appear here...'}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3E2522', marginBottom: '8px' }}>Requirements</h4>
                <p style={{ fontSize: '0.875rem', color: '#5A4A42', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6 }}>
                  {formData.requirementsAndQualifications || 'Requirements will appear here...'}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3E2522', marginBottom: '8px' }}>Tags & Skills</h4>
                <div className="chips-container">
                  {formData.techStack.length > 0 ? formData.techStack.map(tag => (
                    <span key={tag} className="chip" style={{ padding: '4px 10px', fontSize: '0.75rem', paddingRight: '10px' }}>
                      {tag}
                    </span>
                  )) : (
                    <span className="field-hint">No tags added</span>
                  )}
                </div>
              </div>

              <button className="navbar-btn navbar-btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: 0.7, cursor: 'not-allowed' }} disabled>
                Apply Now (Disabled in Preview)
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-start', gap: '8px', backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #F3E8DE', fontSize: '0.8rem', color: '#8C6E63' }}>
            <div style={{ marginTop: '2px', color: '#D3A376' }}><Info size={16} /></div>
            <p style={{ margin: 0, lineHeight: 1.4 }}>This preview reflects exactly how candidates will see your posting on the platform. Make sure to double-check the salary and location details.</p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
