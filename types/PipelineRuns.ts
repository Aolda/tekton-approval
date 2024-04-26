export type PipelineRuns = {
    pipelineRun: string,
    commitMessage: string,
    commitUrl: string,
    workerDiscord: string,
    workerGithub: string,
    workerIcon: string,
    tag: string,
    image: string,
    project: string,
    applicationRepositoryUrl: string
};

export default PipelineRuns;