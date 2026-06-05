import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, X, Info, CheckCircle2,
  Circle, AlertCircle, Briefcase, UploadCloud, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StudentDashboardLayout } from '../components/layout/StudentDashboardLayout';
import { AuthContext } from '../context/AuthContext';
import { userService, applicationService } from '../services/api';
import '../styles/dashboard.css';
import '../styles/apply-job.css';

function formatJobType(type) {
  if (!type) return '—';
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState(null); // base64 string
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await userService.getJobDetails(jobId);
        setJob(res.data);
      } catch (err) {
        toast.error('Failed to load job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    setResumeFile(file);

    // Read file as Base64 string for the backend payload
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like: "data:application/pdf;base64,JVBERi0..."
      // Extract only the base64 part
      const base64String = reader.result.split(',')[1];
      setResumeData(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeData(null);
  };

  const handleSubmit = async () => {
    if (!resumeData || !resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    if (!userId) {
      toast.error('You must be logged in to apply');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        jobId: Number(jobId),
        resumeFileName: resumeFile.name,
        resumeData: resumeData, // byte array base64 encoded
        coverLetter: coverLetter
      };

      await applicationService.applyToJob(userId, payload);
      toast.success('Application submitted successfully!');
      navigate('/applications'); // Or wherever appropriate
    } catch (err) {
      console.error('Full Error Object:', err);
      console.error('Response Data:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Failed to submit application';
      toast.error(`Error: ${typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <StudentDashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Loader2 size={40} className="sp-spinner" color="#D3A376" />
        </div>
      </StudentDashboardLayout>
    );
  }

  if (!job) {
    return (
      <StudentDashboardLayout>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h3>Job not found.</h3>
          <Link to="/find-jobs">Return to job search</Link>
        </div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout>
      <div className="aj-layout">
        
        {/* ── Header ── */}
        <div className="aj-header">
          <Link to={`/job/${jobId}`} className="aj-back-link">
            <ArrowLeft size={16} /> Back to Job Details
          </Link>
          <h1 className="aj-title">Apply for this position</h1>
          <p className="aj-subtitle">
            Complete the form below to submit your application to {job.companyName || 'the company'}.
          </p>
        </div>

        {/* ── Job Brief Card ── */}
        <div className="aj-job-card">
          <div className="aj-job-info">
            <div className="aj-job-icon">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="aj-job-title">{job.title}</h3>
              <div className="aj-job-meta">
                <span>{job.companyName}</span>
                <span className="dot" />
                <span>{job.location || 'Remote'}</span>
              </div>
            </div>
          </div>
          <div className="aj-job-badges">
            <span className="aj-job-badge">{formatJobType(job.jobType)}</span>
            <span className="aj-job-badge" style={{ background: 'transparent', border: '1px solid #E5E0DB' }}>
              Quick Apply
            </span>
          </div>
        </div>

        <div className="aj-content-grid">
          
          {/* ═══ Left: Form ═══ */}
          <div>
            <div className="aj-form-section">
              
              {/* Resume Upload */}
              <div className="aj-field-group">
                <div className="aj-field-header">
                  <span className="aj-field-label">Resume / CV</span>
                  <span className="aj-field-hint">Required (PDF, DOCX up to 5MB)</span>
                </div>
                
                {resumeFile ? (
                  <div className="aj-file-upload">
                    <div className="aj-file-info">
                      <div className="aj-file-icon"><FileText size={24} /></div>
                      <div className="aj-file-details">
                        <span className="aj-file-name">{resumeFile.name}</span>
                        <span className="aj-file-meta">
                          {(resumeFile.size / 1024).toFixed(0)} KB • Document
                        </span>
                      </div>
                    </div>
                    <button className="aj-file-remove" onClick={handleRemoveFile}>
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="aj-file-input-wrapper" style={{ display: 'block' }}>
                    <div className="aj-file-upload" style={{ justifyContent: 'center', padding: '2rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <UploadCloud size={32} color="#D3A376" style={{ marginBottom: '10px' }} />
                        <h4 style={{ margin: '0 0 8px', color: '#3E2522' }}>Upload your resume</h4>
                        <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#8C6E63' }}>
                          Drag and drop or click to browse
                        </p>
                        <div className="aj-file-btn">Browse Files</div>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      className="aj-file-input" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange} 
                    />
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div className="aj-field-group" style={{ marginBottom: 0 }}>
                <div className="aj-field-header">
                  <span className="aj-field-label">Cover Letter</span>
                  <span className="aj-field-hint">Optional but recommended</span>
                </div>
                <div className="aj-textarea-wrapper">
                  <textarea
                    className="aj-textarea"
                    placeholder="Briefly explain why you're a great fit for this role..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    maxLength={2000}
                  />
                  <span className="aj-char-count">{coverLetter.length} / 2000 characters</span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="aj-actions">
              <button className="aj-btn aj-btn-cancel" onClick={() => navigate(-1)}>
                Cancel Application
              </button>
              <div className="aj-btn-group">
                <button className="aj-btn aj-btn-draft" onClick={() => toast.success('Draft saved')}>
                  Save Draft
                </button>
                <button 
                  className="aj-btn aj-btn-submit" 
                  onClick={handleSubmit} 
                  disabled={submitting || !resumeData}
                >
                  {submitting && <Loader2 size={16} className="sp-spinner" />}
                  Submit Application
                </button>
              </div>
            </div>

            <p className="aj-disclaimer">
              By clicking "Submit Application", you agree to our Terms of Service and acknowledge that {job.companyName} will receive your profile information and resume. TalentBridge will process your data according to our Privacy Policy.
            </p>

          </div>

          {/* ═══ Right: Sidebar ═══ */}
          <div>
            
            <div className="aj-sidebar-card tips">
              <div className="aj-sidebar-title blue">
                <Info size={18} /> Tips for your application
              </div>
              <ul className="aj-tips-list">
                <li><span className="dot" /> Tailor your cover letter to specifically address the job requirements.</li>
                <li><span className="dot" /> Double-check your contact information in your resume.</li>
                <li><span className="dot" /> Mention 1-2 specific projects that demonstrate your relevant skills.</li>
              </ul>
            </div>

            <div className="aj-sidebar-card">
              <div className="aj-sidebar-title dark">Application Progress</div>
              <div className="aj-progress-header">
                <span className="aj-progress-label">Profile Quality</span>
                <span className="aj-progress-val">85% (High)</span>
              </div>
              <div className="aj-progress-steps">
                <div className="aj-progress-step done">
                  <CheckCircle2 size={16} /> Basic info complete
                </div>
                <div className="aj-progress-step done">
                  <CheckCircle2 size={16} /> Skills validated
                </div>
                <div className={`aj-progress-step ${resumeFile ? 'done' : 'pending'}`}>
                  {resumeFile ? <CheckCircle2 size={16} /> : <Circle size={16} />} Resume uploaded
                </div>
              </div>
            </div>

            <div className="aj-alert-card">
              <div className="aj-alert-icon"><AlertCircle size={20} /></div>
              <p className="aj-alert-text">
                Make sure your resume is up to date! {job.companyName || 'The company'} is looking for specific experience with <strong>{job.techStack?.[0] || 'relevant technologies'}</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </StudentDashboardLayout>
  );
}
