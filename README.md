# ActiveCampaign MCP Server

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</div>

Um servidor MCP (Model Context Protocol) para integração com a API do ActiveCampaign, permitindo consultas e análises de contatos e eventos de tracking através de ferramentas AI-friendly.

## ✨ Funcionalidades

### 🔍 Gerenciamento de Contatos
- **Busca por email**: Encontre contatos usando endereço de email
- **Busca por ID**: Recupere contatos específicos pelo ID
- **Pesquisa avançada**: Busque contatos com filtros e paginação
- **Dados enriquecidos**: Inclui campos customizados, tags e listas

### 📊 Tracking e Analytics
- **Logs de eventos**: Acesse histórico completo de eventos por contato
- **Filtros avançados**: Filtre por tipo de evento, data e outros critérios
- **Busca por email**: Obtenha tracking logs usando apenas o email do contato
- **Dados estruturados**: Eventos formatados com timestamps, descrições e metadata

### 🛠️ Tipos de Eventos Suportados
- **Email**: `open`, `click`, `sent`, `bounce`, `reply`, `forward`
- **Gerenciamento**: `subscribe`, `unsubscribe`, `update`
- **Vendas**: `deal_add`, `deal_update`, `deal_delete`
- **Produtividade**: `note_add`, `task_add`
- **Automação**: `automation_start`, `automation_complete`

## 🚀 Instalação

### Pré-requisitos
- Node.js 18 ou superior
- NPM ou PNPM
- Conta no ActiveCampaign com acesso à API

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/mmarqueti/activecampaign-mcp-server.git
cd activecampaign-mcp-server
```

2. **Instale as dependências**
```bash
# Com npm
npm install

# Com pnpm
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
ACTIVECAMPAIGN_API_URL=https://seuaccount.api-us1.com
ACTIVECAMPAIGN_API_KEY=sua-api-key-aqui
```

4. **Compile o projeto**
```bash
# Com npm
npm run build

# Com pnpm
pnpm build
```

## ⚙️ Configuração

### Obtendo Credenciais do ActiveCampaign

1. Acesse sua conta do ActiveCampaign
2. Vá para **Settings > Developer**
3. Copie sua **API URL** e **API Key**
4. Cole as credenciais no arquivo `.env`

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ACTIVECAMPAIGN_API_URL` | URL base da API | `https://seuaccount.api-us1.com` |
| `ACTIVECAMPAIGN_API_KEY` | Chave da API | `your-api-key-here` |

## 🔧 Uso

### Iniciando o Servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

### Ferramentas Disponíveis

#### 1. Buscar Contato por Email
```typescript
{
  "name": "get_contact_by_email",
  "arguments": {
    "email": "usuario@exemplo.com"
  }
}
```

#### 2. Buscar Contato por ID
```typescript
{
  "name": "get_contact_by_id",
  "arguments": {
    "contactId": "123"
  }
}
```

#### 3. Pesquisar Contatos
```typescript
{
  "name": "search_contacts",
  "arguments": {
    "query": "João Silva",
    "limit": 10
  }
}
```

#### 4. Logs de Tracking por ID
```typescript
{
  "name": "get_contact_tracking_logs",
  "arguments": {
    "contactId": "123",
    "limit": 50,
    "offset": 0,
    "eventType": "open",
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  }
}
```

#### 5. Logs de Tracking por Email
```typescript
{
  "name": "get_contact_tracking_logs_by_email",
  "arguments": {
    "email": "usuario@exemplo.com",
    "limit": 100,
    "eventType": "click"
  }
}
```

## 📁 Estrutura do Projeto

```
src/
├── index.ts              # Servidor MCP principal
├── types/
│   └── index.ts          # Interfaces e tipos TypeScript
└── tools/
    ├── index.ts          # Exportações das ferramentas
    ├── contacts.ts       # Ferramentas de contatos
    └── tracking.ts       # Ferramentas de tracking
```

### Arquitetura

- **Modular**: Cada conjunto de ferramentas está em seu próprio arquivo
- **Tipada**: Interfaces TypeScript para todos os dados
- **Escalável**: Fácil adicionar novas ferramentas
- **Testável**: Classes isoladas para facilitar testes

## 📋 Exemplo de Resposta

### Dados de Contato
```json
{
  "id": "123",
  "email": "usuario@exemplo.com",
  "firstName": "João",
  "lastName": "Silva",
  "phone": "+55 11 99999-9999",
  "fieldValues": [
    {
      "field": "Empresa",
      "value": "Exemplo Corp"
    }
  ],
  "tags": ["Cliente VIP", "Newsletter"],
  "lists": [
    {
      "list": "Newsletter Mensal",
      "status": "active"
    }
  ],
  "cdate": "2024-01-15T10:30:00Z",
  "udate": "2024-01-20T14:45:00Z"
}
```

### Logs de Tracking
```json
{
  "summary": {
    "total": 25,
    "count": 25,
    "limit": 100,
    "offset": 0,
    "eventTypes": {
      "open": 15,
      "click": 8,
      "sent": 2
    }
  },
  "events": [
    {
      "id": "456",
      "type": "open",
      "timestamp": "2024-01-15T10:30:00-03:00",
      "date": "2024-01-15T13:30:00.000Z",
      "contact": "123",
      "subscriberId": "123",
      "hash": "abc123",
      "description": "Email foi aberto",
      "campaign": {
        "id": "789",
        "name": "Newsletter Janeiro"
      }
    }
  ]
}
```

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Verificar linting
pnpm lint

# Build para produção
pnpm build
```

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Documentação da API do ActiveCampaign](https://developers.activecampaign.com/reference/overview)
- [Model Context Protocol](https://github.com/modelcontextprotocol/specification)
- [Issues](https://github.com/seu-usuario/activecampaign-mcp-server/issues)

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se existe uma [issue](https://github.com/seu-usuario/activecampaign-mcp-server/issues) similar
2. Crie uma nova issue com detalhes do problema
3. Entre em contato através das issues do GitHub

---

<div align="center">
  Feito com ❤️ para a comunidade de desenvolvedores
</div> 