const API_BASE_URL = 'http://localhost:4001';

export interface Job {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  link?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobData {
  company: string;
  position: string;
  location?: string;
  status?: 'applied' | 'interviewing' | 'offered' | 'rejected';
  link?: string;
  notes?: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const jobApi = {
  // Get all jobs
  getJobs: async (): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    return response.json();
  },

  // Create a new job
  createJob: async (jobData: CreateJobData): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/addjob`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    
    return response.json();
  },

  // Update a job
  updateJob: async (jobId: string, jobData: UpdateJobData): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/updatejob/${jobId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
    
    return response.json();
  },

  // Delete a job
  deleteJob: async (jobId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/deletejob/${jobId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
  }
}; 