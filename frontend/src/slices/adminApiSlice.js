import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  endpoints: (builder) => ({
    banAgent: builder.mutation({
      query: (agentId) => ({
        url: `/agents/${agentId}/ban`,
        method: "PUT",
      }),
    }),
    banAgentCompany: builder.mutation({
      query: (companyId) => ({
        url: `/agentCompanies/${companyId}/ban`,
        method: "PUT",
      }),
    }),
    getAllAgents: builder.query({
      query: () => "/agents",
    }),
    getAllAgentCompanies: builder.query({
      query: () => "/agentCompanies",
    }),
    getAllMoneyLendingEntities: builder.query({
      query: () => "/moneyLendingEntities",
    }),
    getAllBannedEntities: builder.query({
      query: () => "/bannedEntities",
    }),
  }),
});

export const {
  useBanAgentMutation,
  useBanAgentCompanyMutation,
  useGetAllAgentsQuery,
  useGetAllAgentCompaniesQuery,
  useGetAllMoneyLendingEntitiesQuery,
  useGetAllBannedEntitiesQuery,
} = adminApi;
