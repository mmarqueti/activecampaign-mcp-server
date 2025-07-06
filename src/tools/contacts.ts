import { AxiosInstance } from 'axios';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ActiveCampaignContact } from '../types/index.js';

export class ContactTools {
  constructor(private apiClient: AxiosInstance) {}

  // Definir as ferramentas de contatos
  getTools(): Tool[] {
    return [
      {
        name: 'get_contact_by_email',
        description: 'Busca um contato no ActiveCampaign pelo email',
        inputSchema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'Email do contato a ser buscado',
            },
          },
          required: ['email'],
        },
      },
      {
        name: 'get_contact_by_id',
        description: 'Busca um contato no ActiveCampaign pelo ID',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'ID do contato a ser buscado',
            },
          },
          required: ['contactId'],
        },
      },
      {
        name: 'search_contacts',
        description: 'Busca contatos no ActiveCampaign com filtros',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Termo de busca (nome, email, etc.)',
            },
            limit: {
              type: 'number',
              description: 'Limite de resultados (padrão: 20)',
              default: 20,
            },
          },
          required: ['query'],
        },
      },
    ];
  }

  // Executar ferramenta de contato
  async executeTool(name: string, args: any) {
    switch (name) {
      case 'get_contact_by_email':
        return await this.getContactByEmail(args?.email as string);
      case 'get_contact_by_id':
        return await this.getContactById(args?.contactId as string);
      case 'search_contacts':
        return await this.searchContacts(args?.query as string, args?.limit as number);
      default:
        throw new Error(`Ferramenta de contato desconhecida: ${name}`);
    }
  }

  private async getContactByEmail(email: string) {
    try {
      const response = await this.apiClient.get('/api/3/contacts', {
        params: {
          email: email,
          include: 'fieldValues,tags,contactLists',
        },
      });

      const contacts = response.data.contacts;
      
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

      const contact = await this.formatContactData(contacts[0]);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(contact, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Erro ao buscar contato por email: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private async getContactById(contactId: string) {
    try {
      const response = await this.apiClient.get(`/api/3/contacts/${contactId}`, {
        params: {
          include: 'fieldValues,tags,contactLists',
        },
      });

      const contact = await this.formatContactData(response.data.contact);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(contact, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Erro ao buscar contato por ID: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private async searchContacts(query: string, limit: number = 20) {
    try {
      const response = await this.apiClient.get('/api/3/contacts', {
        params: {
          search: query,
          limit: limit,
          include: 'fieldValues,tags,contactLists',
        },
      });

      const contacts = response.data.contacts || [];
      const formattedContacts = await Promise.all(
        contacts.map((contact: any) => this.formatContactData(contact))
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              total: contacts.length,
              contacts: formattedContacts,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Erro ao buscar contatos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private async formatContactData(rawContact: any): Promise<ActiveCampaignContact> {
    const contact: ActiveCampaignContact = {
      id: rawContact.id,
      email: rawContact.email,
      firstName: rawContact.firstName || '',
      lastName: rawContact.lastName || '',
      phone: rawContact.phone || '',
      cdate: rawContact.cdate,
      udate: rawContact.udate,
    };

    // Buscar valores de campos customizados
    if (rawContact.fieldValues) {
      try {
        const fieldsResponse = await this.apiClient.get('/api/3/fields');
        const fields = fieldsResponse.data.fields || [];
        
        contact.fieldValues = rawContact.fieldValues.map((fv: any) => {
          const field = fields.find((f: any) => f.id === fv.field);
          return {
            field: field ? field.title : fv.field,
            value: fv.value,
          };
        });
      } catch (error) {
        console.error('Erro ao buscar campos customizados:', error);
      }
    }

    // Buscar tags
    if (rawContact.tags) {
      try {
        const tagsResponse = await this.apiClient.get('/api/3/tags');
        const allTags = tagsResponse.data.tags || [];
        
        contact.tags = rawContact.tags.map((tagId: string) => {
          const tag = allTags.find((t: any) => t.id === tagId);
          return tag ? tag.tag : tagId;
        });
      } catch (error) {
        console.error('Erro ao buscar tags:', error);
      }
    }

    // Buscar listas
    if (rawContact.contactLists) {
      try {
        const listsResponse = await this.apiClient.get('/api/3/lists');
        const allLists = listsResponse.data.lists || [];
        
        contact.lists = rawContact.contactLists.map((cl: any) => {
          const list = allLists.find((l: any) => l.id === cl.list);
          return {
            list: list ? list.name : cl.list,
            status: cl.status,
          };
        });
      } catch (error) {
        console.error('Erro ao buscar listas:', error);
      }
    }

    return contact;
  }
} 