import mongoose from 'mongoose';

export const logsSchema = new mongoose.Schema(
  {
    Worker: { type: String, default: '' },
    Message: { type: String, default: '' },
    Time: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const pipelineRuns =
  mongoose.models['logs'] || mongoose.model('logs', logsSchema, 'logs');

export default pipelineRuns;
