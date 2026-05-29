import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

const Page = async ({
  params: paramsPromise,
}: {
  params: Promise<{ quesId: string; quesName: string }>;
}) => {
  const params = await paramsPromise;
  const question = await databases.getDocument(
    db,
    questionCollection,
    params.quesId,
  );

  return <EditQues question={question} />;
};

export default Page;
