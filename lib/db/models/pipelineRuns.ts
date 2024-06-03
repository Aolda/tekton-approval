import mongoose from 'mongoose';

export const pipelineRunSchema = new mongoose.Schema(
  {
    image: { type: String, default: '' },
    project: { type: String, default: '' },
    tag: { type: String, default: '' },
    applicationRepositoryUrl: { type: String, default: '' },
    commitMessage: { type: String, default: '' },
    commitUrl: { type: String, default: '' },
    pipelineRun: { type: String, default: '' },
    workerDiscord: { type: String, default: '' },
    workerGithub: { type: String, default: '' },
    workerIcon: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const pipelineRuns =
  mongoose.models['pipelineRuns'] ||
  mongoose.model('pipelineRuns', pipelineRunSchema, 'pipelineRuns');

export default pipelineRuns;
