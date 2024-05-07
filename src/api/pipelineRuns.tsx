import axios from 'axios';
import PipelineRuns from '../../types/PipelineRuns';
import ResApproveDeny from '../../types/ResApproveDeny';
import reqApproveDeny from '../../types/ReqApproveDeny';
import querystring from 'querystring';

axios.defaults.paramsSerializer = (params) => {
  return querystring.stringify(params);
};

export const fetchPipelineRuns = async () => {
  try {
    return await axios
      .get<
        PipelineRuns[]
      >(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pipelineRuns`)
      .then((res) => res.data.reverse());
  } catch (error) {
    console.error('Error fetching pipelineRuns:', error);
    return [];
  }
};

export const fetchPipelineRunsByName = async (name: string) => {
  const params = { params: { worker: name } };

  try {
    return await axios
      .get<
        PipelineRuns[]
      >(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pipelineRuns`, params)
      .then((res) => res.data.reverse());
  } catch (error) {
    console.error('Error fetching pipelineRuns:', error);
    return [];
  }
};

export const fetchPipelineRun = async (pipelineRun: string) => {
  try {
    return await axios
      .get<PipelineRuns>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pipelineRuns/${pipelineRun}`
      )
      .then((res) => res.data);
  } catch (error) {
    console.error('Error fetching pipelineRun:', error);
  }
};

export const fetchApprove = async (
  pipelineRun: string,
  worker: string,
  message: string
) => {
  const req: reqApproveDeny = {
    worker,
    message,
  };

  try {
    return await axios
      .post<ResApproveDeny>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/approve/${pipelineRun}`,
        req
      )
      .then((res) => res.data.result);
  } catch (error) {
    console.error('Error fetching approve:', error);
    return '';
  }
};

export const fetchDeny = async (
  pipelineRun: string,
  worker: string,
  message: string
) => {
  const req: reqApproveDeny = {
    worker,
    message,
  };

  try {
    return await axios
      .post<ResApproveDeny>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/deny/${pipelineRun}`,
        req
      )
      .then((res) => res.data.result);
  } catch (error) {
    console.error('Error fetching deny:', error);
    return '';
  }
};
