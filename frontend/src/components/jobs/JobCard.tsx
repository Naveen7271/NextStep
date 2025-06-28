import React from 'react';
import type { Job } from './api';
import styles from './jobs.module.css';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  const getStatusClass = (status: Job['status']) => {
    switch (status) {
      case 'applied':
        return styles.statusApplied;
      case 'interviewing':
        return styles.statusInterviewing;
      case 'offered':
        return styles.statusOffered;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusApplied;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete(job._id);
    }
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div>
          <h3 className={styles.jobTitle}>{job.position}</h3>
          <p className={styles.companyName}>{job.company}</p>
        </div>
        <div className={styles.jobActions}>
          <button
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => onEdit(job)}
            title="Edit job"
          >
            ✏️
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={handleDelete}
            title="Delete job"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className={styles.jobDetails}>
        {job.location && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Location:</span>
            <span className={styles.detailValue}>{job.location}</span>
          </div>
        )}
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Status:</span>
          <span className={`${styles.status} ${getStatusClass(job.status)}`}>
            {job.status}
          </span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Applied:</span>
          <span className={styles.detailValue}>
            {formatDate(job.createdAt)}
          </span>
        </div>

        {job.link && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Link:</span>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.detailValue}
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              View Job Posting
            </a>
          </div>
        )}
      </div>

      {job.notes && (
        <div className={styles.jobNotes}>
          <strong>Notes:</strong> {job.notes}
        </div>
      )}
    </div>
  );
};

export default JobCard; 