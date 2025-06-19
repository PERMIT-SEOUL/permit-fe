"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { sampleOptions } from "@/data/sample/getTodoItem/queries";

export const ClientTest = () => {
  const { data: sample1Data } = useSuspenseQuery(sampleOptions());

  return (
    <div>
      <h3>Sample1 데이터</h3>
      <h1>{sample1Data.id}</h1>
      <pre>{sample1Data.title}</pre>
      <pre>{sample1Data.completed ? "완료" : "미완료"}</pre>
    </div>
  );
};
