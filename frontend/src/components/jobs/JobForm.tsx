import React, { useState, useEffect } from 'react';
import type { Job, CreateJobData, UpdateJobData } from './api';
import { jobApi } from './api';
import styles from './jobs.module.css';

interface JobFormProps {
  job?: Job;
  onSubmit: (data: CreateJobData | UpdateJobData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState<CreateJobData>({
    company: '',
    position: '',
    location: '',
    status: 'applied',
    link: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        position: job.position,
        location: job.location || '',
        status: job.status,
        link: job.link || '',
        notes: job.notes || ''
      });
    }
  }, [job]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.formLabel}>
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="Enter company name"
              disabled={isSubmitting}
            />
            {errors.company && (
              <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>
                {errors.company}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position" className={styles.formLabel}>
              Position *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="Enter job position"
              disabled={isSubmitting}
            />
            {errors.position && (
              <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>
                {errors.position}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="Enter job location"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.formLabel}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.formSelect}
              disabled={isSubmitting}
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="link" className={styles.formLabel}>
              Job Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="https://example.com/job-posting"
              disabled={isSubmitting}
            />
            {errors.link && (
              <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>
                {errors.link}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.formLabel}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={styles.formTextarea}
              placeholder="Add any additional notes about this job application..."
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (job ? 'Update Job' : 'Add Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm; 