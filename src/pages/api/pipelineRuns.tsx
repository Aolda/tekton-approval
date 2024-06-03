import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db/dbConnect';
import PipelineRuns from '../../../types/PipelineRuns';
import pipelineRuns from '../../../lib/db/models/pipelineRuns';

type ResponseData = {
  data?: PipelineRuns[];
  message?: string;
};

type Filter = {
  workerGithub?: string;
  project?: string;
  image?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query } = req;

  let filter: Filter = {};

  if (query.worker) {
    filter.workerGithub = query.workerGithub as string;
  }

  if (query.project) {
    filter.project = query.project as string;
  }

  if (query.image) {
    filter.image = query.image as string;
  }

  try {
    await dbConnect();
    const pipelineRunsList = await pipelineRuns.find(filter);
    return res.status(200).json({ data: pipelineRunsList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'error on server' });
  }
}
