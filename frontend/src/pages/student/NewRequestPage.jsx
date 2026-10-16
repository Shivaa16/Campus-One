import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FilePlus,
  Send,
  Save,
  ArrowLeft,
  Building2,
  Calendar,
  Layers,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { REQUEST_CATEGORIES } from '../../services/routingRules';
import { requestService } from '../../services/requestService';
import { RoutingPreview } from '../../components/workflow/RoutingPreview';
import { DocumentUpload } from '../../components/workflow/DocumentUpload';
import { SubmissionSuccessModal } from '../../components/workflow/SubmissionSuccessModal';
import './NewRequestPage.css';

const CATEGORY_OPTIONS = [
  { value: REQUEST_CATEGORIES.HACKATHON, label: 'Hackathon Permission' },
  { value: REQUEST_CATEGORIES.INTERNSHIP, label: 'Internship Permission' },
  { value: REQUEST_CATEGORIES.LEAVE, label: 'Leave Request' },
  { value: REQUEST_CATEGORIES.BONAFIDE, label: 'Bonafide Certificate' },
  { value: REQUEST_CATEGORIES.REIMBURSEMENT, label: 'Reimbursement' },
  { value: REQUEST_CATEGORIES.ATTENDANCE, label: 'Attendance Correction' },
  { value: REQUEST_CATEGORIES.OTHER, label: 'Other' },
];

const DEFAULT_TITLES = {
  [REQUEST_CATEGORIES.HACKATHON]: 'Hackathon Participation & Attendance Exemption',
  [REQUEST_CATEGORIES.INTERNSHIP]: 'Internship NOC & Academic Leave Application',
  [REQUEST_CATEGORIES.LEAVE]: 'Student Leave Application',
  [REQUEST_CATEGORIES.BONAFIDE]: 'Bonafide Certificate Request',
  [REQUEST_CATEGORIES.REIMBURSEMENT]: 'Event Expense & Travel Reimbursement Claim',
  [REQUEST_CATEGORIES.ATTENDANCE]: 'Attendance Correction & Exemption Claim',
  [REQUEST_CATEGORIES.OTHER]: 'General Administrative Request',
};

export function NewRequestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query param if navigated from Quick Launchpad (?type=leave or ?category=...)
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get('type') || queryParams.get('category');

  const getInitialCategory = () => {
    if (!typeParam) return REQUEST_CATEGORIES.HACKATHON;
    const lower = typeParam.toLowerCase();
    if (lower.includes('leave')) return REQUEST_CATEGORIES.LEAVE;
    if (lower.includes('cert') || lower.includes('bonafide')) return REQUEST_CATEGORIES.BONAFIDE;
    if (lower.includes('intern')) return REQUEST_CATEGORIES.INTERNSHIP;
    if (lower.includes('reimburse')) return REQUEST_CATEGORIES.REIMBURSEMENT;
    if (lower.includes('attend')) return REQUEST_CATEGORIES.ATTENDANCE;
    return REQUEST_CATEGORIES.HACKATHON;
  };

  const [category, setCategory] = useState(getInitialCategory());
  const [title, setTitle] = useState(DEFAULT_TITLES[getInitialCategory()] || '');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [requiredBy, setRequiredBy] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [priority, setPriority] = useState('NORMAL');
  const [files, setFiles] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedRequest, setSubmittedRequest] = useState(null);

  // Load draft if available on initial mount
  useEffect(() => {
    const draft = requestService.getDraft();
    if (draft && !typeParam) {
      if (draft.category) setCategory(draft.category);
      if (draft.title) setTitle(draft.title);
      if (draft.description) setDescription(draft.description);
      if (draft.department) setDepartment(draft.department);
      if (draft.requiredBy) setRequiredBy(draft.requiredBy);
      if (draft.priority) setPriority(draft.priority);
      if (draft.files) setFiles(draft.files);
    }
  }, []);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    // Auto-suggest title if student hasn't typed a custom one
    if (!title || Object.values(DEFAULT_TITLES).includes(title)) {
      setTitle(DEFAULT_TITLES[newCat] || `${newCat} Application`);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!category) newErrors.category = 'Please select a request category';
    if (!title.trim()) newErrors.title = 'Please enter a request title';
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Please provide a clear description (at least 10 characters)';
    }
    if (!requiredBy) newErrors.requiredBy = 'Please specify required-by date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    const draftPayload = {
      category,
      title,
      description,
      department,
      requiredBy,
      priority,
      files,
      savedAt: new Date().toISOString(),
    };
    requestService.saveDraft(draftPayload);
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        category,
        title,
        description,
        department,
        requiredBy,
        priority,
        attachments: files,
        studentId: 'STU001',
        studentName: 'Shiva Kumar',
      };

      const newRequest = await requestService.createRequest(payload);
      requestService.clearDraft();
      setSubmittedRequest(newRequest);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="c360-new-request-page">
      {/* Page Header */}
      <div className="c360-page-header">
        <div className="c360-page-header__left">
          <Link to="/student/requests" className="c360-page-back-link">
            <ArrowLeft size={16} />
            <span>My Requests</span>
          </Link>
          <div className="c360-page-header__title-wrap">
            <h1 className="c360-page-title">Submit New Campus Request</h1>
            <p className="c360-page-subtitle">
              Universal institutional submission with automatic governance routing and continuous tracking.
            </p>
          </div>
        </div>

        <div className="c360-page-header__right">
          <span className="c360-inst-badge">
            <Sparkles size={13} />
            <span>Garden City University • Academic Portal</span>
          </span>
        </div>
      </div>

      {draftSaved && (
        <div className="c360-toast-banner">
          <CheckCircle2 size={16} className="text-success" />
          <span>Draft saved successfully to this browser session.</span>
        </div>
      )}

      {/* Main 2-Column Form Layout */}
      <form className="c360-request-form-grid" onSubmit={handleSubmit}>
        {/* Left Form Column */}
        <div className="c360-form-main-card">
          <div className="c360-form-card-header">
            <div className="c360-form-card-header__icon">
              <FilePlus size={18} />
            </div>
            <div>
              <h2 className="c360-form-card-title">Request Information</h2>
              <p className="c360-form-card-subtitle">
                Provide comprehensive application details for authority clearance.
              </p>
            </div>
          </div>

          <div className="c360-form-fields">
            {/* Request Category */}
            <div className="c360-form-group">
              <label className="c360-form-label" htmlFor="request-category">
                Request Category <span className="text-danger">*</span>
              </label>
              <div className="c360-select-wrap">
                <select
                  id="request-category"
                  className={`c360-form-input ${errors.category ? 'c360-form-input--error' : ''}`}
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <span className="c360-form-error">{errors.category}</span>
              )}
            </div>

            {/* Request Title */}
            <div className="c360-form-group">
              <label className="c360-form-label" htmlFor="request-title">
                Request Title <span className="text-danger">*</span>
              </label>
              <input
                id="request-title"
                type="text"
                className={`c360-form-input ${errors.title ? 'c360-form-input--error' : ''}`}
                placeholder="e.g., Hackathon Permission & Attendance Exemption"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <span className="c360-form-error">{errors.title}</span>}
            </div>

            {/* Department & Required By (2-col) */}
            <div className="c360-form-row">
              <div className="c360-form-group">
                <label className="c360-form-label" htmlFor="request-dept">
                  Department / Branch
                </label>
                <div className="c360-input-with-icon">
                  <Building2 size={16} className="c360-field-icon" />
                  <input
                    id="request-dept"
                    type="text"
                    className="c360-form-input c360-form-input--has-icon"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>

              <div className="c360-form-group">
                <label className="c360-form-label" htmlFor="request-date">
                  Required By Date <span className="text-danger">*</span>
                </label>
                <div className="c360-input-with-icon">
                  <Calendar size={16} className="c360-field-icon" />
                  <input
                    id="request-date"
                    type="date"
                    className={`c360-form-input c360-form-input--has-icon ${
                      errors.requiredBy ? 'c360-form-input--error' : ''
                    }`}
                    value={requiredBy}
                    onChange={(e) => setRequiredBy(e.target.value)}
                  />
                </div>
                {errors.requiredBy && (
                  <span className="c360-form-error">{errors.requiredBy}</span>
                )}
              </div>
            </div>

            {/* Description / Reason */}
            <div className="c360-form-group">
              <label className="c360-form-label" htmlFor="request-desc">
                Description / Purpose & Justification <span className="text-danger">*</span>
              </label>
              <textarea
                id="request-desc"
                className={`c360-form-textarea ${errors.description ? 'c360-form-textarea--error' : ''}`}
                rows={4}
                placeholder="Explain the reason, context, dates, and expected campus permissions required..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <span className="c360-form-error">{errors.description}</span>
              )}
            </div>

            {/* Supporting Document Upload UI */}
            <div className="c360-form-group">
              <DocumentUpload
                files={files}
                onFilesChange={setFiles}
                label="Supporting Document & Proof"
                hint="Attach registration confirmation, medical note, or offer letter (PDF, JPG, PNG)"
              />
            </div>
          </div>
        </div>

        {/* Right Preview & Action Column */}
        <div className="c360-form-side-col">
          {/* Smart Routing Preview */}
          <RoutingPreview category={category} />

          {/* Form Action Controls Card */}
          <div className="c360-form-action-card">
            <h3 className="c360-form-action-title">Submission Actions</h3>
            <p className="c360-form-action-desc">
              On submission, CampusOne assigns a permanent Universal Request ID and dispatches it directly to the designated first-stage reviewer.
            </p>

            <div className="c360-form-action-buttons">
              <button
                type="submit"
                className="c360-submit-btn"
                disabled={isSubmitting}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Submitting Request...' : 'Submit Request'}</span>
              </button>

              <button
                type="button"
                className="c360-draft-btn"
                onClick={handleSaveDraft}
              >
                <Save size={16} />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Submission Success Modal */}
      {submittedRequest && (
        <SubmissionSuccessModal
          request={submittedRequest}
          onClose={() => setSubmittedRequest(null)}
        />
      )}
    </div>
  );
}
