import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db/dbConnect';
import PipelineRuns from '../../../../types/PipelineRuns';
import logs from '../../../../lib/db/models/logs';
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
  const approvalLog = req.body;

  let filter: Filter = {};

  if (pipelineRun) {
    filter.pipelineRun = pipelineRun as string;
  }

  try {
    await dbConnect();
    const pipelineRunsList = await pipelineRuns.find(filter);

    if (!pipelineRunsList) {
      res.status(404).json({ message: 'There is no such pipelineRun' });
      return;
    }

    const webhookResponse = await sendProdWebhook(pipelineRunsList[0]);

    if (!webhookResponse.ok) {
      res.status(500).json({ message: 'error on server' });
      return;
    }

    await logs.insertMany(approvalLog);

    res.status(200).json({ message: 'denied' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error on server' });
  }
}

async function sendProdWebhook(payload: PipelineRuns) {
  const webhookUri = process.env.WEBHOOK_URI || '';
  return await fetch(webhookUri, {
    method: 'POST',
    headers: {
      'User-Agent': 'Prod-Webhook',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
