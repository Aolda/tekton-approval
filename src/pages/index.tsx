import {useEffect, useState} from "react";
import Link from "next/link"
import { fetchPipelineRuns } from "@/api/pipelineRuns"
import PipelineRuns from "../../types/PipelineRuns";

export default function Home() {
    const [pipelineRuns, setPipelineRuns] = useState<PipelineRuns[]>([]);

    useEffect(() => {
        fetchPipelineRuns().then((res) => setPipelineRuns(res));
    }, []);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="container mx-auto">
              <h1 className="text-3xl font-semibold my-8 text-black">Pipeline Runs</h1>
              <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Pipeline Runs List</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pipelineRuns.map((run: PipelineRuns, index: number) => (
                          <li key={index} className="bg-white border border-gray-200 rounded-md shadow-md p-4">
                              <Link href={`/${run.pipelineRun}`}>
                                  <h1 className="text-blue-500 hover:underline">{run.pipelineRun}</h1>
                              </Link>
                              <p className="text-gray-500">Commit Message: {run.commitMessage}</p>
                              <p className="text-gray-500">Worker: {run.workerGithub}</p>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </main>
  );
}
