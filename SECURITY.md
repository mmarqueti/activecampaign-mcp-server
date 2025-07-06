# Política de Segurança

## 🔒 Versões Suportadas

Atualmente, oferecemos suporte de segurança para as seguintes versões:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | ✅ Sim             |
| < 1.0  | ❌ Não             |

## 🚨 Reportando Vulnerabilidades

A segurança é uma prioridade para nós. Se você descobrir uma vulnerabilidade de segurança, por favor:

### ⚠️ NÃO abra uma issue pública

Para proteger os usuários, **não** reporte vulnerabilidades através de issues públicas no GitHub.

### 📧 Reporte Privadamente

1. **Envie um email para**: [security@exemplo.com](mailto:security@exemplo.com)
2. **Inclua**:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Sugestões de correção (se aplicável)

### 📋 Processo de Resposta

1. **Confirmação**: Responderemos em até 48 horas
2. **Avaliação**: Avaliaremos o impacto e severidade
3. **Correção**: Desenvolveremos uma correção
4. **Lançamento**: Lançaremos uma versão corrigida
5. **Divulgação**: Divulgaremos após a correção

## 🛡️ Boas Práticas de Segurança

### Para Desenvolvedores

- **Nunca** commite credenciais (API keys, tokens, senhas)
- Use variáveis de ambiente para dados sensíveis
- Mantenha dependências atualizadas
- Valide todas as entradas de dados
- Use HTTPS sempre que possível

### Para Usuários

- **Proteja suas credenciais** do ActiveCampaign
- Use variáveis de ambiente para API keys
- Mantenha o servidor atualizado
- Monitore logs para atividades suspeitas
- Configure firewall adequadamente

## 🔐 Configuração Segura

### Variáveis de Ambiente

```bash
# ✅ Bom - Use variáveis de ambiente
ACTIVECAMPAIGN_API_KEY=sua-api-key-segura

# ❌ Evite - Nunca hardcode credenciais
const apiKey = "sua-api-key-aqui"; // NUNCA faça isso!
```

### Validação de Entrada

```typescript
// ✅ Bom - Sempre valide entradas
if (!email || !email.includes('@')) {
  throw new Error('Email inválido');
}

// ❌ Evite - Entrada não validada
const response = await api.get(`/contacts?email=${email}`);
```

### Logs Seguros

```typescript
// ✅ Bom - Não logue dados sensíveis
console.log('Buscando contato para email: [REDACTED]');

// ❌ Evite - Logar dados sensíveis
console.log('API Key:', process.env.ACTIVECAMPAIGN_API_KEY);
```

## 🚫 Vulnerabilidades Conhecidas

### Atualmente: Nenhuma

Não temos conhecimento de vulnerabilidades ativas no momento.

### Histórico

| Data | Versão | Severidade | Descrição | Status |
|------|---------|------------|-----------|--------|
| - | - | - | - | - |

## 🔍 Auditoria de Segurança

### Dependências

Utilizamos ferramentas para monitorar vulnerabilidades em dependências:

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix
```

### Análise de Código

- Code review obrigatório para todos os PRs
- Análise estática de código
- Verificação de credenciais hardcoded

## 📚 Recursos Adicionais

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [ActiveCampaign API Security](https://developers.activecampaign.com/reference/authentication)

## 🏆 Reconhecimentos

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Considere contribuir para a segurança da comunidade!

---

**Última atualização**: Janeiro 2024 