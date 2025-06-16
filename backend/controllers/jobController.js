import Job from '../models/Job.js';

// Create a new job
export const createJob = async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            createdBy: req.user.userId
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.userId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

// Update a job
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.userId },
            req.body,
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.userId
        });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};