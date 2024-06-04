import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db/dbConnect';
import PipelineRuns from '../../../../types/PipelineRuns';
import pipelineRuns from '../../../../lib/db/models/pipelineRuns';

type ResponseData = {
  data?: PipelineRuns[];
  message?: string;
};

type Filter = {
  pipelineRun?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { pipelineRun } = req.query;

  let filter: Filter = {};

  if (pipelineRun) {
    filter.pipelineRun = pipelineRun as string;
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
