import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'offered', 'rejected'],
        default: 'applied'
    },
    link: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;