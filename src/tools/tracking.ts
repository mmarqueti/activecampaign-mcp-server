import { AxiosInstance } from 'axios';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { TrackingOptions } from '../types/index.js';

export class TrackingTools {
  constructor(private apiClient: AxiosInstance) {}

  // Definir as ferramentas de tracking
  getTools(): Tool[] {
    return [
      {
        name: 'get_contact_tracking_logs',
        description: 'Busca os logs de eventos/tracking de um contato específico',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'ID do contato para buscar os logs de eventos',
            },
            limit: {
              type: 'number',
              description: 'Limite de resultados (padrão: 100, máximo: 100)',
              default: 100,
              maximum: 100,
            },
            offset: {
              type: 'number',
              description: 'Offset para paginação (padrão: 0)',
              default: 0,
            },
            eventType: {
              type: 'string',
              description: 'Filtrar por tipo de evento específico (opcional)',
              enum: [
                'open',
                'click',
                'sent',
                'bounce',
                'unsubscribe',
                'subscribe',
                'reply',
                'forward',
                'update',
                'deal_add',
                'deal_update',
                'deal_delete',
                'note_add',
                'task_add',
                'automation_start',
                'automation_complete'
              ]
            },
            dateRange: {
              type: 'object',
              description: 'Filtrar por intervalo de datas',
              properties: {
                start: {
                  type: 'string',
                  description: 'Data de início (formato: YYYY-MM-DD)',
                },
                end: {
                  type: 'string',
                  description: 'Data de fim (formato: YYYY-MM-DD)',
                },
              },
            },
          },
          required: ['contactId'],
        },
      },
      {
        name: 'get_contact_tracking_logs_by_email',
        description: 'Busca os logs de eventos/tracking de um contato pelo email',
        inputSchema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'Email do contato para buscar os logs de eventos',
            },
            limit: {
              type: 'number',
              description: 'Limite de resultados (padrão: 100)',
              default: 100,
            },
            offset: {
              type: 'number',
              description: 'Offset para paginação (padrão: 0)',
              default: 0,
            },
            eventType: {
              type: 'string',
              description: 'Filtrar por tipo de evento específico (opcional)',
            },
          },
          required: ['email'],
        },
      },
    ];
  }

  // Executar ferramenta de tracking
  async executeTool(name: string, args: any) {
    switch (name) {
      case 'get_contact_tracking_logs':
        return await this.getContactTrackingLogs(
          args?.contactId as string,
          {
            limit: args?.limit as number,
            offset: args?.offset as number,
            eventType: args?.eventType as string,
            dateRange: args?.dateRange as { start?: string; end?: string },
          }
        );
      case 'get_contact_tracking_logs_by_email':
        return await this.getContactTrackingLogsByEmail(
          args?.email as string,
          {
            limit: args?.limit as number,
            offset: args?.offset as number,
            eventType: args?.eventType as string,
          }
        );
      default:
        throw new Error(`Ferramenta de tracking desconhecida: ${name}`);
    }
  }

  private async getContactTrackingLogs(
    contactId: string,
    options: TrackingOptions = {}
  ) {
    try {
      console.error(`[DEBUG] Buscando tracking logs para contato ID: ${contactId}`);

      const params: any = {
        limit: options.limit || 100,
        offset: options.offset || 0,
      };

      // Adicionar filtros opcionais
      if (options.eventType) {
        params.type = options.eventType;
      }

      if (options.dateRange?.start) {
        params.after = options.dateRange.start;
      }

      if (options.dateRange?.end) {
        params.before = options.dateRange.end;
      }

      const response = await this.apiClient.get(
        `/api/3/contacts/${contactId}/trackingLogs`,
        { params }
      );

      const trackingData = await this.formatTrackingLogs(response.data);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(trackingData, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(`[ERROR] Erro ao buscar tracking logs:`, error);
      throw new Error(
        `Erro ao buscar logs de tracking: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  private async getContactTrackingLogsByEmail(
    email: string,
    options: Omit<TrackingOptions, 'dateRange'> = {}
  ) {
    try {
      // Primeiro, buscar o contato pelo email
      const contactResponse = await this.apiClient.get('/api/3/contacts', {
        params: { email: email },
      });

      const contacts = contactResponse.data.contacts;
      
      if (!contacts || contacts.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Nenhum contato encontrado com o email: ${email}`,
            },
          ],
        };
      }

      const contactId = contacts[0].id;

      // Agora buscar os tracking logs
      return await this.getContactTrackingLogs(contactId, options);
    } catch (error) {
      throw new Error(
        `Erro ao buscar logs por email: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  private async formatTrackingLogs(rawData: any): Promise<any> {
    const trackingLogs = rawData.trackingLogs || [];
    const meta = rawData.meta || {};

    // Buscar informações adicionais para enriquecer os dados
    const enrichedLogs = await Promise.all(
      trackingLogs.map(async (log: any) => {
        const enrichedLog: any = {
          id: log.id,
          type: log.type,
          timestamp: log.tstamp,
          date: this.formatTimestamp(log.tstamp),
          contact: log.contact,
          subscriberId: log.subscriberid,
          hash: log.hash,
          description: this.getEventDescription(log.type),
        };

        // Adicionar valor se existir
        if (log.value) {
          enrichedLog.value = log.value;
        }

        // Adicionar links se existirem
        if (log.links) {
          enrichedLog.links = log.links;
        }

        // Adicionar dados específicos baseados no tipo de evento (apenas se existirem)
        if (log.campaign) {
          try {
            const campaignResponse = await this.apiClient.get(`/api/3/campaigns/${log.campaign}`);
            enrichedLog.campaign = {
              id: log.campaign,
              name: campaignResponse.data.campaign?.name || 'N/A',
            };
          } catch (error) {
            enrichedLog.campaign = { id: log.campaign, name: 'N/A' };
          }
        }

        if (log.automation) {
          enrichedLog.automation = { id: log.automation };
        }

        if (log.email) {
          enrichedLog.email = { id: log.email };
        }

        if (log.link) {
          enrichedLog.link = { id: log.link };
        }

        if (log.eventdata) {
          enrichedLog.eventData = log.eventdata;
        }

        return enrichedLog;
      })
    );

    return {
      summary: {
        total: meta.total || trackingLogs.length,
        count: meta.count || trackingLogs.length,
        limit: meta.limit || 100,
        offset: meta.offset || 0,
        eventTypes: this.getEventTypeSummary(trackingLogs),
      },
      events: enrichedLogs,
    };
  }

  private getEventDescription(eventType: string): string {
    const descriptions: { [key: string]: string } = {
      open: 'Email foi aberto',
      click: 'Link no email foi clicado',
      sent: 'Email foi enviado',
      bounce: 'Email retornou (bounce)',
      unsubscribe: 'Contato se descadastrou',
      subscribe: 'Contato se inscreveu',
      reply: 'Contato respondeu o email',
      forward: 'Email foi encaminhado',
      update: 'Dados do contato foram atualizados',
      deal_add: 'Deal foi adicionado',
      deal_update: 'Deal foi atualizado',
      deal_delete: 'Deal foi deletado',
      note_add: 'Nota foi adicionada',
      task_add: 'Tarefa foi adicionada',
      automation_start: 'Automação foi iniciada',
      automation_complete: 'Automação foi completada',
    };

    // Verificar se há uma tradução específica, senão retornar o tipo original
    const lowerEventType = eventType.toLowerCase();
    return descriptions[lowerEventType] || eventType;
  }

  private getEventTypeSummary(logs: any[]): { [key: string]: number } {
    const summary: { [key: string]: number } = {};
    
    logs.forEach(log => {
      const type = log.type;
      summary[type] = (summary[type] || 0) + 1;
    });

    return summary;
  }

  private formatTimestamp(timestamp: any): string {
    try {
      // Verificar se o timestamp é válido
      if (!timestamp) {
        return 'N/A';
      }
      
      // Se já for uma string ISO, tentar criar a data diretamente
      if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        
        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
          return 'N/A';
        }
        
        return date.toISOString();
      }
      
      // Se for número, assumir que é timestamp Unix
      const numericTimestamp = Number(timestamp);
      
      // Verificar se é um número válido
      if (isNaN(numericTimestamp) || numericTimestamp <= 0) {
        return 'N/A';
      }
      
      // Criar a data (timestamp em segundos, então multiplicar por 1000)
      const date = new Date(numericTimestamp * 1000);
      
      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        return 'N/A';
      }
      
      return date.toISOString();
    } catch (error) {
      console.error('Erro ao formatar timestamp:', timestamp, error);
      return 'N/A';
    }
  }
} 