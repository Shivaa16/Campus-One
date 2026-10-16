import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import './DocumentUpload.css';

export function DocumentUpload({
  files = [],
  onFilesChange,
  label = 'Supporting Documents & Proof',
  hint = 'Upload official invitation letter, medical certificate, fee receipt or NOC (PDF, JPG, PNG up to 10MB)',
  maxFiles = 3,
  required = false,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  const processFiles = (newFileList) => {
    setError(null);
    const valid = [];

    for (let i = 0; i < newFileList.length; i++) {
      const file = newFileList[i];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
        setError(`"${file.name}" is not a supported format. Please upload PDF, JPG, or PNG.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`"${file.name}" exceeds the 10MB limit.`);
        return;
      }

      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      valid.push({
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: sizeStr,
        type: file.type,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    if (files.length + valid.length > maxFiles) {
      setError(`Maximum of ${maxFiles} files allowed.`);
      return;
    }

    onFilesChange([...files, ...valid]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id) => {
    onFilesChange(files.filter((f) => f.id !== id));
    setError(null);
  };

  return (
    <div className="c360-doc-upload">
      <div className="c360-doc-upload__label-row">
        <label className="c360-doc-upload__label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <span className="c360-doc-upload__count">
          {files.length} / {maxFiles} attached
        </span>
      </div>

      <div
        className={`c360-doc-upload__dropzone ${isDragging ? 'c360-doc-upload__dropzone--active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />

        <div className="c360-doc-upload__icon-box">
          <UploadCloud size={24} className="c360-doc-upload__icon" />
        </div>

        <div className="c360-doc-upload__text">
          <span className="c360-doc-upload__prompt">
            <strong>Choose a file</strong> or drag & drop here
          </span>
          <span className="c360-doc-upload__hint">{hint}</span>
        </div>
      </div>

      {error && (
        <div className="c360-doc-upload__error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="c360-doc-upload__list">
          {files.map((file) => {
            const isPdf = file.name.endsWith('.pdf') || file.type === 'application/pdf';
            return (
              <div key={file.id} className="c360-doc-file-item">
                <div className="c360-doc-file-item__icon-wrap">
                  {isPdf ? <FileText size={18} /> : <ImageIcon size={18} />}
                </div>

                <div className="c360-doc-file-item__info">
                  <span className="c360-doc-file-item__name" title={file.name}>
                    {file.name}
                  </span>
                  <span className="c360-doc-file-item__meta">
                    {file.size} • Attached
                  </span>
                </div>

                <div className="c360-doc-file-item__status">
                  <CheckCircle size={14} className="text-success" />
                </div>

                <button
                  type="button"
                  className="c360-doc-file-item__remove-btn"
                  title="Remove file"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
