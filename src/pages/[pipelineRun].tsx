import { fetchApprove, fetchDeny, fetchPipelineRun } from '@/api/pipelineRuns';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PipelineRuns from '../../types/PipelineRuns';
import { GetServerSidePropsContext } from 'next';

export default function Page(pipelineRun: PipelineRuns) {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const router = useRouter();

  const worker = useMemo(
    () => pipelineRun?.workerGithub || '',
    [pipelineRun?.workerGithub]
  );

  const commitUrl = useMemo(
    () => pipelineRun?.commitUrl || '',
    [pipelineRun?.commitUrl]
  );

  const repositoryUrl = useMemo(
    () => pipelineRun?.applicationRepositoryUrl || '',
    [pipelineRun?.applicationRepositoryUrl]
  );

  const handleBack = () => {
    router.push('/');
  };

  const displayResult = (res: string) => {
    setResult(res);
    setTimeout(() => setResult(''), 3000);
  };

  const handleApprove = () => {
    setMessage('');
    fetchApprove(pipelineRun.pipelineRun, worker, message).then((res) =>
      displayResult(res)
    );
  };

  const handleDeny = () => {
    setMessage('');
    fetchDeny(pipelineRun.pipelineRun, worker, message).then((res) =>
      displayResult(res)
    );
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between lg:p-24 p-4">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start mb-4"
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className="text-3xl font-semibold mb-8 text-black">
          Approve / Deny
        </h1>
        <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 mb-4 flex flex-col gap-8 w-full">
          <h2 className="text-xl font-semibold text-black">
            {pipelineRun?.pipelineRun}
          </h2>
          <Link
            href={commitUrl}
            target={'_blank'}
            className="text-blue-400 hover:underline"
          >
            {pipelineRun?.commitMessage}
          </Link>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={pipelineRun?.workerIcon || ''}
                alt="Profile"
              />
            </div>
            <p className="ml-4 text-lg font-semibold text-black">{worker}</p>
          </div>
          <div className={'flex flex-col gap-3'}>
            <p className="text-gray-500">Project: {pipelineRun?.project}</p>
            <p className="text-gray-500">Tag: {pipelineRun?.tag}</p>
            <p className="text-gray-500">Image: {pipelineRun?.image}</p>
            <p className="text-gray-500">
              <Link
                href={repositoryUrl}
                target={'_blank'}
                className="text-blue-400 hover:underline"
              >
                Repository
              </Link>
            </p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Leave a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-2 text-black"
        />
        <p className="text-gray-500 mb-2">{result}</p>
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDeny}
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const path = ctx.resolvedUrl.replace('/', '') || '';
  const data = await fetchPipelineRun(path);
  return { props: data };
}
