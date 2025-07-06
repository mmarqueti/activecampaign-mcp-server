import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { ContactTools, TrackingTools } from './tools/index.js';

dotenv.config();

class ActiveCampaignMCPServer {
  private server: Server;
  private apiClient: AxiosInstance;
  private contactTools: ContactTools;
  private trackingTools: TrackingTools;

  constructor() {
    this.server = new Server({
      name: 'activecampaign-mcp-server',
      version: '1.0.0',
      capabilities: {
        tools: {},
      },
    });

    // Configurar cliente da API do ActiveCampaign
    this.apiClient = axios.create({
      baseURL: process.env.ACTIVECAMPAIGN_API_URL,
      headers: {
        'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    // Inicializar ferramentas
    this.contactTools = new ContactTools(this.apiClient);
    this.trackingTools = new TrackingTools(this.apiClient);

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // Listar ferramentas disponíveis
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const contactTools = this.contactTools.getTools();
      const trackingTools = this.trackingTools.getTools();
      
      return {
        tools: [...contactTools, ...trackingTools] as Tool[],
      };
    });

    // Executar ferramentas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Verificar se é uma ferramenta de contato
        const contactToolNames = ['get_contact_by_email', 'get_contact_by_id', 'search_contacts'];
        if (contactToolNames.includes(name)) {
          return await this.contactTools.executeTool(name, args);
        }

        // Verificar se é uma ferramenta de tracking
        const trackingToolNames = ['get_contact_tracking_logs', 'get_contact_tracking_logs_by_email'];
        if (trackingToolNames.includes(name)) {
          return await this.trackingTools.executeTool(name, args);
        }

        throw new Error(`Ferramenta desconhecida: ${name}`);
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Erro ao executar ${name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
            },
          ],
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ActiveCampaign MCP Server rodando no stdio');
  }
}

// Inicializar o servidor
const server = new ActiveCampaignMCPServer();
server.run().catch(console.error);