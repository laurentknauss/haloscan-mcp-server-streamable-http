# 🔍 HaloScan MCP Server (Streamable HTTP)

[![MCP Protocol](https://img.shields.io/badge/MCP-Streamable_HTTP-blue)](https://modelcontextprotocol.io)
[![Alpic.ai Compatible](https://img.shields.io/badge/Alpic.ai-Compatible-green)](https://alpic.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made in France](https://img.shields.io/badge/Made_in-France_🇫🇷-blue)](https://haloscan.com)

> 🚀 **A Model Context Protocol (MCP) server for the HaloScan SEO API using Streamable HTTP transport.**
>
> This version uses the modern **Streamable HTTP** transport (single `/mcp` POST endpoint), making it compatible with remote MCP hosting platforms like [Alpic.ai](https://alpic.ai), Claude Code CLI, and other modern MCP clients.

---

## 🇫🇷 Made in France

Both **HaloScan** and **Alpic.ai** are French companies:
- 🔍 **[HaloScan](https://haloscan.com)** - French SEO tool with the largest French keyword database (275M+ keywords)
- ☁️ **[Alpic.ai](https://alpic.ai)** - French platform for hosting remote MCP servers

This makes the perfect combo for French SEO professionals using Claude! 🥐

---

## 🤔 Why Streamable HTTP?

The original HaloScan MCP server uses SSE (Server-Sent Events) transport which requires:
- ❌ Two separate endpoints (`/sse` + `/messages`)
- ❌ Long-lived connections
- ❌ Complex session management

**This Streamable HTTP version** provides:
- ✅ Single `/mcp` POST endpoint
- ✅ Stateless request/response model
- ✅ Easy deployment on serverless/remote platforms
- ✅ Full compatibility with [Alpic.ai](https://alpic.ai) MCP hosting

---

## ✨ Features

- 🛠️ **16 SEO tools** exposing the full HaloScan API
- 🇫🇷 **French SEO data** - Perfect for francophone keyword research
- 🔑 **Keyword Explorer** - Volume, competition, related keywords, SERP analysis
- 🌐 **Site Explorer** - Domain metrics, competitors, top pages, positions
- 📊 **Clustering** - Automatic keyword grouping for content strategy

---

## 🚀 Quick Start

### Option 1: ☁️ Deploy on Alpic.ai (Recommended)

1. 🍴 Fork this repository to your GitHub account
2. 🌐 Go to [Alpic.ai](https://alpic.ai) and create a new MCP server
3. 🔗 Connect your GitHub repo
4. 🔑 Set the `HALOSCAN_API_KEY` environment variable in Alpic dashboard
5. ✅ Use the provided Alpic URL in your Claude configuration

### Option 2: 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/laurentknauss/haloscan-mcp-server-streamable-http.git
cd haloscan-mcp-server-streamable-http

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your HALOSCAN_API_KEY

# Build and run
npm run build
npm run start:streamable
```

The server will start on `http://localhost:3000/mcp` 🎉

### Option 3: 🖥️ Use with Claude Code CLI

Add to your `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "haloscan": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

Or with Alpic.ai hosted URL:

```json
{
  "mcpServers": {
    "haloscan": {
      "type": "http",
      "url": "https://your-server.alpic.ai/mcp"
    }
  }
}
```

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HALOSCAN_API_KEY` | ✅ Yes* | - | Your HaloScan API key |
| `MCP_HTTP_PORT` | ❌ No | 3000 | HTTP server port |

*Required for API calls to work. Server will start without it but tools will fail.

---

## 📜 Available Scripts

```bash
npm run build            # 🔨 Compile TypeScript
npm run start:streamable # 🚀 Start Streamable HTTP server (production)
npm run dev:streamable   # 🔄 Start with hot reload (development)
npm run start            # 📟 Start stdio server (for Claude Desktop)
```

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp` | POST | 🔌 MCP Streamable HTTP endpoint |
| `/health` | GET | 💚 Health check |

---

## 🛠️ Tools Reference

### 👤 User Tools

| Tool | Description |
|------|-------------|
| `get_user_credit` | 💳 Check remaining API credits |

### 🔑 Keyword Explorer (10 tools)

| Tool | Description |
|------|-------------|
| `get_keywords_overview` | 📊 Comprehensive keyword data (volume, competition, SERP, trends) |
| `get_keywords_match` | 🔤 Keywords containing your query as substring |
| `get_keywords_similar` | 🔀 Keywords with similar SERP results |
| `get_keywords_highlights` | ✨ Keywords with highlighted terms in SERP |
| `get_keywords_related` | 🔗 Related searches from Google |
| `get_keywords_questions` | ❓ "People Also Ask" questions |
| `get_keywords_synonyms` | 📝 Synonym keywords |
| `get_keywords_find` | 🔍 Combined search across all keyword sources |
| `get_keywords_site_structure` | 🗂️ Keyword clustering for content strategy |
| `get_keywords_bulk` | 📦 Bulk keyword metrics (up to 100 keywords) |

### 🌐 Site Explorer (5 tools)

| Tool | Description |
|------|-------------|
| `get_domains_overview` | 📈 Complete domain SEO metrics |
| `get_domains_positions` | 📍 All ranking positions for a domain |
| `get_domains_top_pages` | 🏆 Best performing pages |
| `get_domains_competitors` | ⚔️ Organic search competitors |
| `get_domains_competitors_keywords_diff` | 🎯 Keyword gap analysis vs competitors |

---

## 💡 Usage Examples

### 💳 Check API Credits
```
Use get_user_credit to check my HaloScan balance
```

### 🔍 Keyword Research
```
Find all keywords related to "assurance auto" with search volume data
```

### 🏢 Competitor Analysis
```
Analyze the SEO of lemonde.fr and find their top pages
```

### 🎯 Keyword Gap Analysis
```
Compare my domain vs competitors and find missing keyword opportunities
```

---

## 🧪 Testing

Test with curl:

```bash
# 💚 Health check
curl http://localhost:3000/health

# 🔌 Initialize MCP
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}'

# 🛠️ List tools
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

---

## 📁 Project Structure

```
src/
├── config.ts           # ⚙️ Environment configuration with Zod validation
├── haloscan-tools.ts   # 🛠️ All HaloScan tools definition
├── streamable-http.ts  # 🚀 Streamable HTTP server entry point
├── index.ts            # 📟 Stdio server entry point (Claude Desktop)
└── http-server.ts      # 📦 Legacy SSE server (deprecated)
```

---

## 🔑 Get a HaloScan API Key

1. 📝 Sign up at [HaloScan](https://tool.haloscan.com/sign-up)
2. 💰 Choose a plan
3. 🔐 Generate your API key from [Configuration API page](https://tool.haloscan.com/user/api)

---

## 🙏 Credits

- 🔍 Original MCP server by [Occirank](https://github.com/occirank/Haloscan-mcp-server)
- 🔧 Streamable HTTP implementation based on [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)

---

## 📄 License

MIT

---

# 🇫🇷 Documentation Française

## Serveur MCP HaloScan avec transport Streamable HTTP

> 🚀 **Serveur MCP pour l'API SEO HaloScan utilisant le transport Streamable HTTP moderne.**

HaloScan est un outil SEO français permettant d'analyser les mots-clés, la concurrence et les positions Google.fr. Ce serveur MCP expose toutes les fonctionnalités de l'API HaloScan pour une utilisation avec Claude (Desktop, Code CLI) et d'autres clients MCP.

### 🇫🇷 100% Français

- 🔍 **HaloScan** est développé en France avec la plus grande base de données de mots-clés français (275M+)
- ☁️ **Alpic.ai** est une plateforme française d'hébergement de serveurs MCP distants

Le combo parfait pour les professionnels du SEO francophone ! 🥖

### 🤔 Pourquoi cette version ?

La version originale du serveur MCP HaloScan utilise le transport SSE (Server-Sent Events) qui n'est **pas compatible** avec les plateformes d'hébergement MCP distantes comme [Alpic.ai](https://alpic.ai).

Cette version utilise le transport **Streamable HTTP** :
- ✅ Un seul endpoint POST `/mcp`
- ✅ Compatible avec Alpic.ai, Claude Code CLI
- ✅ Déploiement facile sur serveurs distants

### 🚀 Démarrage rapide

#### Option 1 : ☁️ Hébergement sur Alpic.ai (Recommandé)

1. 🍴 Forkez ce repo sur votre compte GitHub
2. 🌐 Créez un serveur MCP sur [Alpic.ai](https://alpic.ai)
3. 🔗 Connectez votre repo GitHub
4. 🔑 Configurez `HALOSCAN_API_KEY` dans le dashboard Alpic
5. ✅ Utilisez l'URL Alpic dans votre configuration Claude

#### Option 2 : 💻 Installation locale

```bash
git clone https://github.com/laurentknauss/haloscan-mcp-server-streamable-http.git
cd haloscan-mcp-server-streamable-http

npm install
cp .env.example .env
# Éditez .env avec votre clé API HaloScan

npm run build
npm run start:streamable
```

### 🛠️ Outils disponibles

#### 🔑 Recherche de mots-clés (10 outils)

| Outil | Description |
|-------|-------------|
| `get_keywords_overview` | 📊 Données complètes : volume, concurrence, SERP, tendances |
| `get_keywords_match` | 🔤 Mots-clés contenant votre requête |
| `get_keywords_related` | 🔗 Recherches associées Google |
| `get_keywords_questions` | ❓ Questions "Autres questions posées" |
| `get_keywords_find` | 🔍 Recherche combinée multi-sources |
| `get_keywords_site_structure` | 🗂️ Clustering de mots-clés pour stratégie éditoriale |
| `get_keywords_bulk` | 📦 Métriques en masse (jusqu'à 100 mots-clés) |

#### 🌐 Analyse de domaines (5 outils)

| Outil | Description |
|-------|-------------|
| `get_domains_overview` | 📈 Métriques SEO complètes d'un domaine |
| `get_domains_positions` | 📍 Toutes les positions d'un domaine |
| `get_domains_top_pages` | 🏆 Pages les plus performantes |
| `get_domains_competitors` | ⚔️ Concurrents organiques |
| `get_domains_competitors_keywords_diff` | 🎯 Analyse de gap sémantique vs concurrents |

### 💡 Exemples d'utilisation avec Claude

```
🔍 Trouve tous les mots-clés liés à "assurance auto" avec les volumes de recherche
```

```
📈 Analyse le SEO de lemonde.fr et trouve leurs meilleures pages
```

```
🎯 Compare mon site avec mes concurrents et trouve les opportunités de mots-clés manquantes
```

### 🔑 Obtenir une clé API HaloScan

1. 📝 Inscrivez-vous sur [HaloScan](https://tool.haloscan.com/sign-up)
2. 💰 Choisissez un forfait
3. 🔐 Générez votre clé API depuis la [page Configuration API](https://tool.haloscan.com/user/api)

### 🏷️ Mots-clés SEO

*Serveur MCP HaloScan, API SEO française, recherche mots-clés français, analyse SERP Google.fr, outil SEO Claude, intégration Claude Desktop, Claude Code CLI, Alpic.ai MCP, analyse concurrence SEO, volumes de recherche France, clustering mots-clés, stratégie éditoriale SEO, Made in France 🇫🇷*
