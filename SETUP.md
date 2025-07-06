# Configuração do Projeto

Este arquivo contém instruções detalhadas para configurar o projeto ActiveCampaign MCP Server.

## 📋 Arquivos Necessários

### 1. Criar .env.example

Crie um arquivo `.env.example` na raiz do projeto:

```bash
# ActiveCampaign API Configuration
# Copie este arquivo para .env e preencha com suas credenciais

# URL da API do ActiveCampaign
# Exemplo: https://seuaccount.api-us1.com
ACTIVECAMPAIGN_API_URL=

# Chave da API do ActiveCampaign
# Encontre em: Settings > Developer > API Access
ACTIVECAMPAIGN_API_KEY=
```

### 2. Criar .env

Copie o arquivo `env.example` para `.env` e preencha com suas credenciais:

```bash
cp env.example .env
```

## 🔧 Configuração do ActiveCampaign

### 1. Obter Credenciais

1. **Acesse sua conta do ActiveCampaign**
2. **Vá para Settings > Developer**
3. **Copie os seguintes dados**:
   - **API URL**: Formato `https://seuaccount.api-us1.com`
   - **API Key**: Sua chave privada de API

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
ACTIVECAMPAIGN_API_URL=https://seuaccount.api-us1.com
ACTIVECAMPAIGN_API_KEY=sua-api-key-aqui
```

## 🚀 Instalação e Execução

### 1. Instalar Dependências

```bash
# Com npm
npm install

# Com pnpm (recomendado)
pnpm install
```

### 2. Compilar o Projeto

```bash
# Com npm
npm run build

# Com pnpm
pnpm build
```

### 3. Executar o Servidor

```bash
# Modo desenvolvimento
npm run dev
# ou
pnpm dev

# Modo produção
npm start
# ou
pnpm start
```

### 4. Testar com Inspector

```bash
# Modo desenvolvimento
npm run inspect-dev
# ou
pnpm inspect-dev

# Modo produção
npm run inspect
# ou
pnpm inspect
```

## ✅ Verificação

### 1. Testar Conexão

Execute o servidor e verifique se não há erros de conexão:

```bash
pnpm dev
```

Você deve ver:
```
ActiveCampaign MCP Server rodando no stdio
```

### 2. Testar Ferramentas

Use o inspector MCP para testar as ferramentas:

```bash
pnpm inspect-dev
```

## 🔒 Segurança

### 1. Proteger Credenciais

- **Nunca** commite o arquivo `.env`
- Use variáveis de ambiente em produção
- Mantenha suas API keys seguras

### 2. Configurar .gitignore

O arquivo `.gitignore` já está configurado para ignorar:
- `.env`
- `node_modules/`
- Arquivos de build

## 🛠️ Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `build` | `pnpm build` | Compila o projeto |
| `start` | `pnpm start` | Executa em produção |
| `dev` | `pnpm dev` | Executa em desenvolvimento |
| `inspect` | `pnpm inspect` | Inspector MCP (produção) |
| `inspect-dev` | `pnpm inspect-dev` | Inspector MCP (desenvolvimento) |
| `clean` | `pnpm clean` | Limpa arquivos de build |
| `type-check` | `pnpm type-check` | Verifica tipos TypeScript |

## 📁 Estrutura Esperada

Após a configuração, seu projeto deve ter:

```
activecampaign-mcp-server/
├── .env                    # Suas credenciais (não versionado)
├── .env.example           # Template de variáveis
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Configuração do NPM
├── tsconfig.json          # Configuração TypeScript
├── README.md              # Documentação principal
├── LICENSE                # Licença MIT
├── CHANGELOG.md           # Histórico de mudanças
├── CONTRIBUTING.md        # Guia de contribuição
├── SECURITY.md            # Política de segurança
├── src/                   # Código fonte
│   ├── index.ts           # Servidor principal
│   ├── types/             # Tipos TypeScript
│   └── tools/             # Ferramentas MCP
└── dist/                  # Arquivos compilados
```

## 🚨 Problemas Comuns

### 1. Erro de Autenticação

```
Error: Request failed with status code 401
```

**Solução**: Verifique suas credenciais no arquivo `.env`

### 2. Erro de URL

```
Error: Request failed with status code 404
```

**Solução**: Verifique se a URL da API está correta

### 3. Erro de Rede

```
Error: connect ECONNREFUSED
```

**Solução**: Verifique sua conexão com a internet

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** para mensagens de erro
2. **Consulte a documentação** do ActiveCampaign
3. **Abra uma issue** no GitHub com detalhes

---

**Pronto para usar!** 🚀 