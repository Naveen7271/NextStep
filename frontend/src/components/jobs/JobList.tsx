import React, { useState, useEffect } from 'react';
import type { Job, CreateJobData, UpdateJobData } from './api';
import { jobApi } from './api';
import JobCard from './JobCard';
import JobForm from './JobForm';
import styles from './jobs.module.css';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedJobs = await jobApi.getJobs();
      setJobs(fetchedJobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (jobData: CreateJobData) => {
    try {
      setIsSubmitting(true);
      const newJob = await jobApi.createJob(jobData);
      setJobs(prev => [newJob, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add job. Please try again.');
      console.error('Error adding job:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditJob = async (jobData: UpdateJobData) => {
    if (!editingJob) return;

    try {
      setIsSubmitting(true);
      const updatedJob = await jobApi.updateJob(editingJob._id, jobData);
      setJobs(prev => prev.map(job => 
        job._id === editingJob._id ? updatedJob : job
      ));
      setEditingJob(null);
    } catch (err) {
      setError('Failed to update job. Please try again.');
      console.error('Error updating job:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await jobApi.deleteJob(jobId);
      setJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error('Error deleting job:', err);
    }
  };

  const openEditForm = (job: Job) => {
    setEditingJob(job);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleFormSubmit = async (data: CreateJobData | UpdateJobData) => {
    if (editingJob) {
      await handleEditJob(data as UpdateJobData);
    } else {
      await handleAddJob(data as CreateJobData);
    }
  };

  if (loading) {
    return (
      <div className={styles.jobsContainer}>
        <div className={styles.loading}>Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className={styles.jobsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Job Applications</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowForm(true)}
        >
          + Add New Job
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#721c24',
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>💼</div>
          <h3 className={styles.emptyStateTitle}>No jobs yet</h3>
          <p className={styles.emptyStateText}>
            Start tracking your job applications by adding your first job.
          </p>
          <button
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className={styles.jobsGrid}>
          {jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={openEditForm}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}

      {(showForm || editingJob) && (
        <JobForm
          job={editingJob || undefined}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default JobList; 