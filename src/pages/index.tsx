import { Inter } from "next/font/google";
import {useEffect, useState} from "react";
import Link from "next/link"

export default function Home() {
    const [pipelineRuns, setPipelineRuns] = useState([]);

  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold my-8">Pipeline Runs</h1>
          <ul>
            {pipelineRuns.map((run, index) => (
                // <li key={index} className="my-4">
                //   <Link href={`/pipeline/${run.pipelineRun}`}>
                //     <a className="text-blue-500 hover:underline">
                //       {run.pipelineRun}
                //     </a>
                //   </Link>
                //   <p className="text-gray-500">
                //     Commit Message: {run.commitMessage}
                //   </p>
                //   <p className="text-gray-500">
                //     Worker: {run.worker}
                //   </p>
                // </li>
                <></>
            ))}
          </ul>
        </div>
      </main>
  );
}
