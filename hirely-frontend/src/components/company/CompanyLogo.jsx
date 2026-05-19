import { useRef } from 'react';
import { Upload } from 'lucide-react';

/**
 * Company Logo upload card with drag-and-drop styling and preview.
 *
 * @param {{ logoPreview: string|null, onLogoChange: (file: File) => void, readonly?: boolean }} props
 */
export function CompanyLogo({ logoPreview, onLogoChange, readonly = false }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) onLogoChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) onLogoChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sidebar-card">
      <h4 className="sidebar-card-title">Company Logo</h4>
      <p className="sidebar-card-subtitle">Display your brand to candidates</p>

      <div
        className={`logo-upload-zone ${logoPreview ? 'has-image' : ''}`}
        onClick={() => !readonly && fileInputRef.current?.click()}
        onDrop={(e) => !readonly && handleDrop(e)}
        onDragOver={(e) => !readonly && handleDragOver(e)}
        role="button"
        tabIndex={readonly ? -1 : 0}
        aria-label="Upload company logo"
        style={{ cursor: readonly ? 'default' : 'pointer' }}
      >
        {logoPreview ? (
          <img src={logoPreview} alt="Company logo preview" className="logo-preview" />
        ) : (
          <>
            <div className="logo-upload-icon">
              <Upload style={{ width: 22, height: 22 }} />
            </div>
            <p className="logo-upload-text">Click to upload</p>
            <p className="logo-upload-hint">SVG, PNG, JPG (max 800×800px)</p>
          </>
        )}
      </div>

      {!readonly && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/svg+xml,image/png,image/jpeg"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      )}
    </div>
  );
}
