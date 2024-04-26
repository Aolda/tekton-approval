import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPipelineRuns } from '@/api/pipelineRuns';
import PipelineRuns from '../../types/PipelineRuns';

export default function Home() {
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRuns[]>([]);

  useEffect(() => {
    fetchPipelineRuns().then((res) => setPipelineRuns(res));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-semibold my-8 text-black">PipelineRuns</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pipelineRuns.map((run: PipelineRuns, index: number) => (
          <li
            key={index}
            className="bg-white hover:bg-gray-100 border border-gray-200 rounded-md shadow-md aspect-video flex"
          >
            <Link
              href={`/${run.pipelineRun}`}
              className={'w-full h-full flex flex-col justify-between p-4'}
            >
              <h2 className="text-xl font-semibold mb-2 text-black">
                {run.pipelineRun}
              </h2>
              <p className="text-gray-500">{run.commitMessage}</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={run?.workerIcon || ''}
                    alt="Profile"
                  />
                </div>
                <p className="ml-4 text-lg font-semibold text-black">
                  {run?.workerGithub || ''}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
