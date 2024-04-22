import axios from 'axios';
import PipelineRuns from "../../types/PipelineRuns";

export const fetchPipelineRuns = async () => {
    try {
        return await axios.get<PipelineRuns[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pipelineRuns`).then((res) => res.data);
    } catch (error) {
        console.error('Error fetching pipeline-runs:', error);
        return [];
    }
};