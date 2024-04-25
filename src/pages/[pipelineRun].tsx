import {fetchApprove, fetchDeny, fetchPipelineRun} from "@/api/pipelineRuns"
import {useEffect, useMemo, useState} from "react";
import Link from "next/link"
import {useRouter} from "next/router";
import PipelineRuns from "../../types/PipelineRuns";

export default function Page() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState("");
    const [pipelineRun, setPipelineRun] = useState<PipelineRuns>();
    const router = useRouter();
    const path = router.asPath.replace("/", "");

    // const path = useMemo(() => {
    //     if(!recentPipeline) {
    //         const pathname = router.asPath.replace("/", "");
    //         cookieStore.set('recentPipeline', pathname);
    //         return pathname;
    //     }
    //     return recentPipeline.value;
    // }, [])

    const worker = useMemo(() => (
        pipelineRun?.workerGithub || ""
    ), [pipelineRun?.workerGithub]);

    const commitUrl = useMemo(() => (
        pipelineRun?.commitUrl || ""
    ), [pipelineRun?.commitUrl]);

    const handleApprove = () => {
        fetchApprove(path, worker, message).then((res) => setResult(res));
    };

    const handleDeny = () => {
        fetchDeny(path, worker, message).then((res) => setResult(res));
    };

    useEffect(() => {
        fetchPipelineRun(path).then((res) => setPipelineRun(res));
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-semibold mb-8 text-black">Approval / Deny</h1>
                <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-black">{pipelineRun?.pipelineRun}</h2>
                    <Link href={commitUrl} className="text-gray-500 mb-2">Commit
                        Message: {pipelineRun?.commitMessage}</Link>
                    <p className="text-gray-500 mb-2">Worker Discord: {pipelineRun?.workerDiscord}</p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={pipelineRun?.workerIcon || ""} alt="Profile"/>
                        </div>
                        <p className="ml-4 text-lg font-semibold text-black">{worker}</p>
                    </div>
                    <p className="text-gray-500 mb-2">Tag: {pipelineRun?.tag}</p>
                    <p className="text-gray-500 mb-2">Image: {pipelineRun?.Image}</p>
                    <p className="text-gray-500 mb-2">Project: {pipelineRun?.Project}</p>
                    <p className="text-gray-500 mb-2">Repository URL: {pipelineRun?.RepositoryUrl}</p>
                </div>

                <input
                    type="text"
                    placeholder="Leave a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mb-4 text-black"
                />
                <div className="flex space-x-4">
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
            <p className={"text-3xl font-semibold mb-8"}>{result}</p>
        </main>
    );
}
