import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";

const BASE_URL = "https://api.haloscan.com/api";

async function makeHaloscanRequest(
  endpoint: string,
  params: Record<string, unknown> = {},
  method: "GET" | "POST",
  apiKey: string
): Promise<unknown> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "haloscan-api-key": apiKey,
    };

    const response =
      method === "GET"
        ? await axios.get(url, { headers, params })
        : await axios.post(url, params, { headers });

    return response.data;
  } catch (error) {
    console.error("Error making Haloscan request:", error);
    throw error;
  }
}

// Zod schemas
const ToolsParams = z.object({
  lineCount: z.number().optional().describe("Max number of returned results."),
  order_by: z.string().optional().describe("Field used for sorting results."),
  order: z.string().optional().describe("Sort order: asc or desc."),
  volume_min: z.number().optional(),
  volume_max: z.number().optional(),
  cpc_min: z.number().optional(),
  cpc_max: z.number().optional(),
  competition_min: z.number().optional(),
  competition_max: z.number().optional(),
  kgr_min: z.number().optional(),
  kgr_max: z.number().optional(),
  kvi_min: z.number().optional(),
  kvi_max: z.number().optional(),
  kvi_keep_na: z.boolean().optional(),
  allintitle_min: z.number().optional(),
  allintitle_max: z.number().optional(),
  word_count_min: z.number().optional(),
  word_count_max: z.number().optional(),
  include: z.string().optional(),
  exclude: z.string().optional(),
});

const getKeywordsOverview = z.object({
  keyword: z.string().describe("Seed keyword"),
  requested_data: z
    .array(z.string())
    .describe("Specific data fields to request")
    .default([
      "keyword_match",
      "related_search",
      "related_question",
      "similar_category",
      "similar_serp",
      "top_sites",
      "similar_highlight",
      "categories",
      "synonyms",
      "metrics",
      "volume_history",
      "serp",
    ]),
  lang: z.string().optional().describe("Language code"),
});

const getKeywordsMatch = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  exact_match: z.boolean().optional(),
});

const getKeywordsSimilar = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  similarity_min: z.number().optional(),
  similarity_max: z.number().optional(),
  score_min: z.number().optional(),
  score_max: z.number().optional(),
  p1_score_min: z.number().optional(),
  p1_score_max: z.number().optional(),
});

const getKeywordsHighlights = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  exact_match: z.boolean().optional(),
  similarity_min: z.number().optional(),
  similarity_max: z.number().optional(),
});

const getKeywordsRelated = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  exact_match: z.boolean().optional(),
  depth_min: z.number().optional(),
  depth_max: z.number().optional(),
});

const getKeywordsQuestions = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  exact_match: z.boolean().optional(),
  question_types: z.array(z.string()).optional(),
  keep_only_paa: z.boolean().optional(),
  depth_min: z.number().optional(),
  depth_max: z.number().optional(),
});

const getKeywordsSynonyms = ToolsParams.extend({
  keyword: z.string().describe("Seed keyword"),
  exact_match: z.boolean().optional(),
});

const getKeywordsFind = ToolsParams.extend({
  keyword: z.string().optional().describe("Seed keyword"),
  keywords: z.array(z.string()).optional(),
  keywords_sources: z.array(z.string()).optional(),
  keep_seed: z.boolean().optional(),
  exact_match: z.boolean().optional(),
});

const getKeywordsSiteStructure = z.object({
  keyword: z.string().optional().describe("Seed keyword"),
  keywords: z.array(z.string()).optional(),
  exact_match: z.boolean().optional(),
  neighbours_sources: z.array(z.string()).optional(),
  multipartite_modes: z.array(z.string()).optional(),
  neighbours_sample_max_size: z.number().optional(),
  mode: z.string().optional(),
  granularity: z.number().optional(),
  manual_common_10: z.number().optional(),
  manual_common_100: z.number().optional(),
});

const getKeywordsBulk = ToolsParams.extend({
  keywords: z.array(z.string()).describe("List of keywords"),
  exact_match: z.boolean().optional(),
});

const DomainsToolsParams = z.object({
  mode: z.string().optional(),
  lineCount: z.number().optional().describe("Max number of returned results."),
  order_by: z.string().optional().describe("Field used for sorting results."),
  order: z.string().optional().describe("Sort order: asc or desc."),
  volume_min: z.number().optional(),
  volume_max: z.number().optional(),
  cpc_min: z.number().optional(),
  cpc_max: z.number().optional(),
  competition_min: z.number().optional(),
  competition_max: z.number().optional(),
  kgr_min: z.number().optional(),
  kgr_max: z.number().optional(),
  kvi_min: z.number().optional(),
  kvi_max: z.number().optional(),
  kvi_keep_na: z.boolean().optional(),
  allintitle_min: z.number().optional(),
  allintitle_max: z.number().optional(),
});

const getDomainsOverview = z.object({
  input: z.string().describe("Domain or URL to analyze"),
  mode: z.string().optional(),
  requested_data: z
    .array(z.string())
    .describe("Specific data fields to request")
    .default([
      "metrics",
      "positions_breakdown",
      "traffic_value",
      "categories",
      "best_keywords",
      "best_pages",
      "gmb_backlinks",
      "visibility_index_history",
      "positions_breakdown_history",
      "positions_and_pages_history",
    ]),
  lang: z.string().optional(),
});

const getDomainsPositions = DomainsToolsParams.extend({
  input: z.string().describe("Domain or URL"),
  traffic_min: z.number().optional(),
  traffic_max: z.number().optional(),
  position_min: z.number().optional(),
  position_max: z.number().optional(),
  keyword_word_count_min: z.number().optional(),
  keyword_word_count_max: z.number().optional(),
  serp_date_min: z.string().optional(),
  serp_date_max: z.string().optional(),
  keyword_include: z.string().optional(),
  keyword_exclude: z.string().optional(),
  title_include: z.string().optional(),
  title_exclude: z.string().optional(),
});

const getDomainsTopPages = z.object({
  input: z.string().describe("Domain or URL"),
  mode: z.string().optional(),
  lineCount: z.number().optional(),
  order_by: z.string().optional(),
  order: z.string().optional(),
  total_traffic_min: z.number().optional(),
  total_traffic_max: z.number().optional(),
  unique_keywords_min: z.number().optional(),
  unique_keywords_max: z.number().optional(),
});

const getDomainsCompetitors = z.object({
  input: z.string().describe("Domain or URL"),
  mode: z.string().optional(),
  lineCount: z.number().optional(),
  page: z.string().optional(),
});

const getDomainsCompetitorsKeywordsDiff = DomainsToolsParams.extend({
  input: z.string().describe("Domain or URL"),
  competitors: z.array(z.string()).optional(),
  exclusive: z.boolean().optional(),
  missing: z.boolean().optional(),
  besting: z.boolean().optional(),
  bested: z.boolean().optional(),
});

// Configure all Haloscan tools on the server
export function configureHaloscanTools(server: McpServer, apiKey: string) {
  // Tool to get user credits
  server.tool("get_user_credit", "Obtenir les crédits utilisateur HaloScan.", async () => {
    try {
      const data = await makeHaloscanRequest("/user/credit", {}, "GET", apiKey);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
      };
    }
  });

  // Keywords Overview
  server.tool(
    "get_keywords_overview",
    "Obtenir un aperçu complet d'un mot-clé (volume, SERP, questions, etc.)",
    getKeywordsOverview.shape,
    async (params: z.infer<typeof getKeywordsOverview>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/overview", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Match
  server.tool(
    "get_keywords_match",
    "Trouver des mots-clés correspondant à un mot-clé seed.",
    getKeywordsMatch.shape,
    async (params: z.infer<typeof getKeywordsMatch>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/match", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Similar
  server.tool(
    "get_keywords_similar",
    "Trouver des mots-clés similaires (sémantiquement proches).",
    getKeywordsSimilar.shape,
    async (params: z.infer<typeof getKeywordsSimilar>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/similar", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Highlights
  server.tool(
    "get_keywords_highlights",
    "Obtenir les points forts des mots-clés (opportunités faciles).",
    getKeywordsHighlights.shape,
    async (params: z.infer<typeof getKeywordsHighlights>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/highlights", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Related
  server.tool(
    "get_keywords_related",
    "Obtenir les mots-clés associés (recherches connexes).",
    getKeywordsRelated.shape,
    async (params: z.infer<typeof getKeywordsRelated>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/related", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Questions
  server.tool(
    "get_keywords_questions",
    "Obtenir les questions liées au mot-clé (People Also Ask).",
    getKeywordsQuestions.shape,
    async (params: z.infer<typeof getKeywordsQuestions>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/questions", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Synonyms
  server.tool(
    "get_keywords_synonyms",
    "Obtenir les synonymes du mot-clé.",
    getKeywordsSynonyms.shape,
    async (params: z.infer<typeof getKeywordsSynonyms>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/synonyms", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Find
  server.tool(
    "get_keywords_find",
    "Recherche avancée de mots-clés avec filtres.",
    getKeywordsFind.shape,
    async (params: z.infer<typeof getKeywordsFind>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/find", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Site Structure (Cocon sémantique)
  server.tool(
    "get_keywords_site_structure",
    "Générer une structure de site (cocon sémantique) à partir de mots-clés.",
    getKeywordsSiteStructure.shape,
    async (params: z.infer<typeof getKeywordsSiteStructure>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/siteStructure", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Keywords Bulk
  server.tool(
    "get_keywords_bulk",
    "Analyser plusieurs mots-clés en masse.",
    getKeywordsBulk.shape,
    async (params: z.infer<typeof getKeywordsBulk>) => {
      try {
        const data = await makeHaloscanRequest("/keywords/bulk", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Domains Overview
  server.tool(
    "get_domains_overview",
    "Obtenir un aperçu complet d'un domaine (trafic, positions, pages).",
    getDomainsOverview.shape,
    async (params: z.infer<typeof getDomainsOverview>) => {
      try {
        const data = await makeHaloscanRequest("/domains/overview", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Domains Positions
  server.tool(
    "get_domains_positions",
    "Obtenir les positions d'un domaine dans les SERP.",
    getDomainsPositions.shape,
    async (params: z.infer<typeof getDomainsPositions>) => {
      try {
        const data = await makeHaloscanRequest("/domains/positions", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Domains Top Pages
  server.tool(
    "get_domains_top_pages",
    "Obtenir les meilleures pages d'un domaine.",
    getDomainsTopPages.shape,
    async (params: z.infer<typeof getDomainsTopPages>) => {
      try {
        const data = await makeHaloscanRequest("/domains/topPages", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Domains Competitors
  server.tool(
    "get_domains_competitors",
    "Identifier les concurrents d'un domaine.",
    getDomainsCompetitors.shape,
    async (params: z.infer<typeof getDomainsCompetitors>) => {
      try {
        const data = await makeHaloscanRequest("/domains/siteCompetitors", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );

  // Domains Competitors Keywords Diff
  server.tool(
    "get_domains_competitors_keywords_diff",
    "Comparer les mots-clés entre un domaine et ses concurrents.",
    getDomainsCompetitorsKeywordsDiff.shape,
    async (params: z.infer<typeof getDomainsCompetitorsKeywordsDiff>) => {
      try {
        const data = await makeHaloscanRequest("/domains/siteCompetitors/keywordsDiff", params, "POST", apiKey);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    }
  );
}
