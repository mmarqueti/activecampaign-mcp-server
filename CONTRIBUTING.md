# Contribuindo para o ActiveCampaign MCP Server

Obrigado por seu interesse em contribuir! Este documento contém diretrizes para ajudar você a contribuir de forma efetiva.

## 📋 Índice
- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Diretrizes de Desenvolvimento](#diretrizes-de-desenvolvimento)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 🤝 Código de Conduta

Este projeto segue um código de conduta para garantir um ambiente acolhedor para todos. Ao participar, você concorda em seguir estas diretrizes:

- Use linguagem acolhedora e inclusiva
- Respeite diferentes pontos de vista e experiências
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade

## 🚀 Como Contribuir

### Tipos de Contribuições

Valorizamos todos os tipos de contribuições:

- 🐛 **Correção de bugs**
- ✨ **Novas funcionalidades**
- 📚 **Documentação**
- 🧪 **Testes**
- 🎨 **Melhorias de UX/UI**
- 🔧 **Refatoração de código**

### Configuração do Ambiente

1. **Fork o repositório**
2. **Clone seu fork**
   ```bash
   git clone https://github.com/mmarqueti/activecampaign-mcp-server.git
   cd activecampaign-mcp-server
   ```

3. **Instale as dependências**
   ```bash
   pnpm install
   ```

4. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   # Preencha com suas credenciais do ActiveCampaign
   ```

5. **Verifique se tudo está funcionando**
   ```bash
   pnpm build
   pnpm dev
   ```

## 🛠️ Diretrizes de Desenvolvimento

### Estrutura do Código

- Use **TypeScript** para tipagem estática
- Siga a estrutura modular existente
- Mantenha as classes focadas em uma responsabilidade
- Use interfaces para tipagem de dados

### Padrões de Código

- Use nomes descritivos para variáveis e funções
- Escreva comentários para lógica complexa
- Mantenha funções pequenas e focadas
- Use async/await em vez de Promises

### Exemplo de Código
```typescript
// ✅ Bom
async function getContactById(contactId: string): Promise<ContactResponse> {
  try {
    const response = await this.apiClient.get(`/api/3/contacts/${contactId}`);
    return this.formatContactData(response.data.contact);
  } catch (error) {
    throw new Error(`Erro ao buscar contato: ${error.message}`);
  }
}

// ❌ Evite
function getContact(id) {
  return this.apiClient.get(`/api/3/contacts/${id}`).then(r => r.data.contact);
}
```

### Tratamento de Erros

- Sempre trate erros de forma apropriada
- Use mensagens de erro descritivas
- Adicione logs para debugging quando necessário
- Valide dados de entrada

### Testes

- Escreva testes para novas funcionalidades
- Mantenha a cobertura de testes alta
- Use nomes descritivos para testes
- Teste casos de sucesso e falha

## 📝 Processo de Pull Request

1. **Crie uma branch**
   ```bash
   git checkout -b feature/nova-funcionalidade
   # ou
   git checkout -b fix/correcao-bug
   ```

2. **Faça suas alterações**
   - Siga as diretrizes de código
   - Adicione testes se necessário
   - Atualize a documentação

3. **Commit suas mudanças**
   ```bash
   git commit -m "feat: adiciona nova funcionalidade de busca"
   ```

4. **Push para sua branch**
   ```bash
   git push origin feature/nova-funcionalidade
   ```

5. **Abra um Pull Request**
   - Use um título descritivo
   - Explique as mudanças realizadas
   - Referencie issues relacionadas

### Convenções de Commit

Use o formato [Conventional Commits](https://conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de manutenção

### Checklist do Pull Request

- [ ] Código segue as diretrizes do projeto
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Commit messages seguem convenções
- [ ] Não há conflitos com a branch principal

## 🐛 Reportando Bugs

Use o template de issue para reportar bugs:

**Título**: Descrição clara do problema

**Descrição**:
- Descreva o comportamento esperado
- Descreva o comportamento atual
- Passos para reproduzir
- Versão do Node.js e sistema operacional

**Exemplo**:
```
Erro ao buscar contato inexistente

**Comportamento esperado**: Retornar mensagem informativa
**Comportamento atual**: Aplicação trava
**Passos para reproduzir**: 
1. Chamar get_contact_by_id com ID inexistente
2. Observar erro

**Ambiente**: Node.js 18.0.0, macOS 13.0
```

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. **Verifique se já existe uma issue similar**
2. **Crie uma nova issue** com:
   - Título descritivo
   - Descrição detalhada da melhoria
   - Justificativa dos benefícios
   - Possível implementação (se aplicável)

## 📞 Dúvidas

Se tiver dúvidas sobre como contribuir:

- Abra uma issue com a label `question`
- Descreva sua dúvida claramente
- Forneça contexto se necessário

## 🙏 Reconhecimentos

Agradecemos a todos os contribuidores que ajudam a melhorar este projeto!

---

**Obrigado por contribuir!** 🚀 