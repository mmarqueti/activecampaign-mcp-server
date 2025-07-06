# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-01-15

### ✨ Adicionado
- Servidor MCP para integração com ActiveCampaign
- Ferramentas para gerenciamento de contatos:
  - `get_contact_by_email` - Busca contato por email
  - `get_contact_by_id` - Busca contato por ID
  - `search_contacts` - Pesquisa contatos com filtros
- Ferramentas para tracking de eventos:
  - `get_contact_tracking_logs` - Logs de eventos por ID do contato
  - `get_contact_tracking_logs_by_email` - Logs de eventos por email
- Suporte completo para tipos de eventos do ActiveCampaign
- Formatação e enriquecimento de dados
- Tratamento robusto de erros
- Validação de timestamps com fallback para dados inválidos
- Arquitetura modular e tipada em TypeScript

### 🛠️ Técnico
- Configuração completa do TypeScript
- Estrutura modular com separação de responsabilidades
- Classes isoladas para facilitar testes
- Interfaces TypeScript para todos os dados
- Documentação completa com README profissional
- Licença MIT

### 📁 Estrutura
```
src/
├── index.ts              # Servidor MCP principal
├── types/index.ts        # Interfaces e tipos
└── tools/
    ├── index.ts          # Exportações das ferramentas
    ├── contacts.ts       # Ferramentas de contatos
    └── tracking.ts       # Ferramentas de tracking
```

### 🔧 Configuração
- Suporte para variáveis de ambiente
- Scripts de build e desenvolvimento
- Inspetor MCP para debug
- Configuração de deploy 