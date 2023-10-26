import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5000/api" });

export const agentCompanyApiSlice = createApi({
  reducerPath: "agentCompanyApi",
  baseQuery,
  endpoints: (builder) => ({
    addAgent: builder.mutation({
      query: (agentData) => ({
        url: "/agents/add-agent",
        method: "POST",
        body: agentData,
      }),
    }),
    getMyAgents: builder.query({
      query: () => "/agents/myagents",
    }),
  }),
});

export const { useAddAgentMutation, useGetMyAgentsQuery } =
  agentCompanyApiSlice;
