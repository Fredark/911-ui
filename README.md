# 🚨 Dashboard de Emergências - 911 UI

Um dashboard moderno e responsivo para monitoramento de ocorrências de emergência em tempo real, desenvolvido com React, TypeScript e Tailwind CSS.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Este é apenas um dashboard para demonstrar a aplicação de triagem de chamados de emergência em ação. Um dashboard simples para mostrar de forma visual como as interações com o usuário pelo WhatsApp são transformadas em chamados para a polícia ou responsáveis legais, após o processamento dos dados.

### Características Principais

- **Demonstração Visual**: Interface que mostra o fluxo de dados do WhatsApp para chamados
- **Tempo Real**: Atualizações automáticas a cada 5 segundos simulando dados reais
- **Notificações**: Popups animados para novas emergências recebidas
- **Filtros Avançados**: Sistema de filtros por status, nível, responsável e localização
- **Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis

## ✨ Funcionalidades

### 📊 Dashboard Principal
- **Estatísticas em Tempo Real**: Contadores de emergências por status
- **Cards Informativos**: Exibição detalhada de cada ocorrência processada
- **Status Dinâmico**: Alteração de status com dropdown sticky
- **Layout Flexível**: Grid responsivo que se adapta ao conteúdo

### 🔍 Sistema de Filtros
- **Filtro por Status**: Ativo, Em Andamento, Resolvido, Finalizado
- **Filtro por Nível**: Crítico, Alto, Médio, Baixo
- **Filtro por Responsável**: Lista dinâmica de responsáveis
- **Filtro por Localização**: Filtro por área geográfica
- **Sidebar Fixa**: Filtros sempre visíveis na lateral esquerda

### 🔔 Notificações
- **Popups Animados**: Notificações deslizantes para novas emergências recebidas
- **Auto-remoção**: Popups desaparecem automaticamente após 5 segundos
- **Fade Animation**: Animações suaves de entrada e saída
- **Controle Manual**: Possibilidade de fechar popups manualmente

### 📱 Interface Responsiva
- **Design Adaptativo**: Layout que se ajusta a diferentes tamanhos de tela
- **Navegação Intuitiva**: Interface clara e fácil de usar
- **Performance Otimizada**: Carregamento rápido e atualizações eficientes

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Tipagem estática para maior segurança do código
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **Vite**: Build tool rápido para desenvolvimento moderno

### Desenvolvimento
- **ESLint**: Linter para manter qualidade do código
- **Prettier**: Formatador de código automático
- **pnpm**: Gerenciador de pacotes rápido e eficiente

### Estrutura de Dados
- **TypeScript Interfaces**: Tipagem forte para dados de emergência
- **Mock Data**: Dados simulados para demonstrar o fluxo WhatsApp → Processamento → Dashboard
- **Backend Integration**: Preparado para integração com backend que processa mensagens do WhatsApp

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- pnpm (recomendado) ou npm

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/911-ui.git
   cd 911-ui
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador
   - Acesse: `http://localhost:5174` (ou a porta indicada no terminal)

## 📖 Como Usar

### Navegação Principal
1. **Dashboard**: Visualize todas as emergências processadas
2. **Filtros**: Use a sidebar esquerda para filtrar ocorrências
3. **Estatísticas**: Acompanhe os números no topo da página
4. **Notificações**: Observe os popups para novas emergências recebidas

### Demonstração do Fluxo
1. **Visualizar Detalhes**: Clique em qualquer card para ver informações completas
2. **Alterar Status**: Use o dropdown no final de cada card
3. **Filtrar**: Utilize os filtros na sidebar para encontrar emergências específicas
4. **Monitorar**: Acompanhe as atualizações em tempo real simulando dados do WhatsApp

### Funcionalidades dos Filtros
- **Status**: Filtre por estado atual da emergência
- **Nível**: Filtre por prioridade (Crítico, Alto, Médio, Baixo)
- **Responsável**: Filtre por equipe ou pessoa responsável
- **Localização**: Filtre por área geográfica

## 📁 Estrutura do Projeto

```
911-ui/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── TicketCard.tsx          # Card de emergência
│   │   ├── TicketDashboard.tsx     # Dashboard principal
│   │   ├── TicketFilters.tsx       # Componente de filtros
│   │   └── EmergencyPopup.tsx      # Popup de notificação
│   ├── services/           # Serviços e APIs
│   │   └── ticketService.ts        # Serviço de dados (mock)
│   ├── types/              # Definições de tipos TypeScript
│   │   ├── ticket.ts              # Interfaces de dados
│   │   └── backend.ts             # Tipos para integração com backend
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind
└── README.md              # Este arquivo
```

## ⚙️ Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_UPDATE_INTERVAL=5000
VITE_WHATSAPP_WEBHOOK_URL=http://localhost:3000/webhook
```

### Personalização de Cores
As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Suas cores personalizadas aqui
      }
    }
  }
}
```

### Configuração de Animações
As animações dos popups podem ser ajustadas no arquivo `src/index.css`:

```css
.popup-enter {
  animation: slideIn 0.3s ease-out;
}

.popup-fade-out {
  animation: fadeOut 0.3s ease-out forwards;
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Gera build de produção
pnpm preview      # Visualiza build de produção

# Qualidade de Código
pnpm lint         # Executa ESLint
pnpm lint:fix     # Corrige problemas do ESLint

# Dependências
pnpm install      # Instala dependências
pnpm update       # Atualiza dependências
```

## 🎨 Design System

### Cores Utilizadas
- **Primária**: Tons de azul para elementos principais
- **Status**: 
  - Crítico: Vermelho
  - Alto: Laranja
  - Médio: Amarelo
  - Baixo: Azul
- **Background**: Dark mode com tons de cinza
- **Texto**: Branco e cinza claro para contraste

### Tipografia
- **Títulos**: Font-weight bold para hierarquia
- **Corpo**: Font-weight normal para legibilidade
- **Labels**: Font-weight semibold para destaque

### Componentes
- **Cards**: Bordas arredondadas com sombras
- **Botões**: Estados hover e focus bem definidos
- **Dropdowns**: Estilo consistente com o tema
- **Popups**: Animações suaves e posicionamento fixo

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para todo o código
- Siga as convenções do ESLint
- Mantenha componentes pequenos e focados
- Adicione testes para novas funcionalidades
- Documente mudanças importantes

### Fluxo de Desenvolvimento
- **Demonstração**: Mantenha o foco na demonstração visual do fluxo WhatsApp → Dashboard
- **Integração**: Prepare para integração com backend de processamento de mensagens
- **Testes**: Teste com dados simulados que representem mensagens reais do WhatsApp

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou corrige testes
```

## 🔄 Fluxo de Dados

### Demonstração do Processamento
Este dashboard demonstra como mensagens do WhatsApp são processadas:

1. **Recebimento**: Mensagem chega via WhatsApp
2. **Processamento**: Backend analisa e extrai informações
3. **Triagem**: Sistema classifica por urgência e responsável
4. **Dashboard**: Dados são exibidos em tempo real
5. **Acompanhamento**: Status é atualizado conforme progresso

### Integração Futura
- **Webhook**: Preparado para receber dados do backend
- **Real-time**: Atualizações automáticas simuladas
- **Escalabilidade**: Estrutura pronta para produção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento
- Consulte a documentação técnica

## 🔄 Changelog

### v1.0.0
- ✅ Dashboard principal com cards de emergência
- ✅ Sistema de filtros avançado
- ✅ Notificações em tempo real
- ✅ Animações suaves
- ✅ Design responsivo
- ✅ Interface dark mode
- ✅ Atualizações automáticas

---

**Desenvolvido com ❤️ para sistemas de emergência**
