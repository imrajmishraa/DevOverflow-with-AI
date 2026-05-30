import Pagination from "@/components/Pagination";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases } from "@/models/server/config";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ userId: string; userSlug: string }>;
  searchParams: Promise<{ page?: string; voteStatus?: "upvoted" | "downvoted" }>;
}) => {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const pageNumber = searchParams.page || "1";

  const query = [
    Query.equal("votedById", params.userId),
    Query.orderDesc("$createdAt"),
    Query.offset((+pageNumber - 1) * 25),
    Query.limit(25),
  ];

  if (searchParams.voteStatus)
    query.push(Query.equal("voteStatus", searchParams.voteStatus));

  const votes = await databases.listDocuments(db, voteCollection, query);

  const votesWithDetails = await Promise.all(
    votes.documents.map(async (vote) => {
      try {
        if (vote.type === "question") {
          const response = await databases.listDocuments(db, questionCollection, [
            Query.equal("$id", vote.typeId),
            Query.select(["title"]),
            Query.limit(1),
          ]);
          if (response.documents.length === 0) return null;
          const question = response.documents[0];
          return {
            ...vote,
            question,
          };
        } else {
          const ansResponse = await databases.listDocuments(db, answerCollection, [
            Query.equal("$id", vote.typeId),
            Query.limit(1),
          ]);
          if (ansResponse.documents.length === 0) return null;
          const answer = ansResponse.documents[0];

          const quesResponse = await databases.listDocuments(db, questionCollection, [
            Query.equal("$id", answer.questionId),
            Query.select(["title"]),
            Query.limit(1),
          ]);
          if (quesResponse.documents.length === 0) return null;
          const question = quesResponse.documents[0];

          return {
            ...vote,
            question,
          };
        }
      } catch (error) {
        console.error(`Orphaned vote reference detected for voteId ${vote.$id}:`, error);
        return null;
      }
    }),
  );

  votes.documents = votesWithDetails.filter(Boolean) as any;

  return (
    <div className="px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
        <p className="text-sm font-mono text-gray-500 font-bold">{votes.total} votes recorded</p>
        <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
          <li>
            <Link
              href={`/users/${params.userId}/${params.userSlug}/votes`}
              className={`block rounded-full px-3 py-1 duration-200 border border-white/10 ${
                !searchParams.voteStatus ? "bg-white/10 text-white font-bold" : "hover:bg-white/10 text-gray-400"
              }`}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              href={`/users/${params.userId}/${params.userSlug}/votes?voteStatus=upvoted`}
              className={`block rounded-full px-3 py-1 duration-200 border border-white/10 ${
                searchParams?.voteStatus === "upvoted"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold"
                  : "hover:bg-white/10 text-gray-400"
              }`}
            >
              Upvotes
            </Link>
          </li>
          <li>
            <Link
              href={`/users/${params.userId}/${params.userSlug}/votes?voteStatus=downvoted`}
              className={`block rounded-full px-3 py-1 duration-200 border border-white/10 ${
                searchParams?.voteStatus === "downvoted"
                  ? "bg-red-500/10 text-red-400 border-red-500/20 font-bold"
                  : "hover:bg-white/10 text-gray-400"
              }`}
            >
              Downvotes
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-3xl space-y-4">
        {votes.documents.map((vote) => (
          <div
            key={vote.$id}
            className="rounded-xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-md hover:bg-white/5 hover:border-white/20 transition-all duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                vote.voteStatus === "upvoted"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}>
                {vote.voteStatus.toUpperCase()}
              </span>
              <p className="text-sm font-medium">
                <Link
                  href={`/questions/${vote.question.$id}/${slugify(vote.question.title)}`}
                  className="text-orange-500 hover:text-orange-600 line-clamp-1 hover:underline"
                >
                  {vote.question.title}
                </Link>
              </p>
            </div>
            <p className="text-xs font-mono text-gray-500 shrink-0 self-end sm:self-center">
              {convertDateToRelativeTime(new Date(vote.$createdAt))}
            </p>
          </div>
        ))}
      </div>
      <Pagination total={votes.total} limit={25} />
    </div>
  );
};

export default Page;
