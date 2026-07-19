# 💾 Naraa_Edx Portfólio

Um portfólio interativo para edição de vídeo e criação de conteúdo, construído com uma estética retrô inspirada em sistemas operacionais dos anos 90/2000 (Windows 98 / Y2K). O objetivo do projeto é fugir dos portfólios padrões de scroll vertical, oferecendo uma experiência imersiva, nostálgica e "gamificada".

## ✨ Premissa e Funcionalidades

- **Design Y2K / OS Retro:** A interface simula um desktop antigo. As seções do portfólio (Sobre, Serviços, Estatísticas, etc.) abrem como janelas clássicas.
- **Janelas Arrastáveis:** Usando `framer-motion`, o usuário pode clicar e arrastar as janelas livremente pela tela, trazendo interatividade imediata.
- **Stateless (Sem Banco de Dados):** Para manter o site extremamente rápido, barato de hospedar e livre de complexidade, as estatísticas de visualizações e inscritos são raspadas (scraped) em tempo real via rotas da API usando badges SVG públicas. Sem a necessidade de bancos como Prisma, Postgres ou chaves de API pesadas.
- **Design Responsivo:** A experiência do "desktop" se adapta para dispositivos móveis com um layout de dock (taskbar) na parte inferior e scroll horizontal para os vídeos.

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/) (App Router):** Framework principal (React) e rotas de API.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização, utilizando variáveis CSS customizadas para suportar o tema "Cozy Late Night".
- **[Framer Motion](https://www.framer.com/motion/):** Animações suaves de abertura/fechamento das janelas, drag-and-drop espacial e o carrossel dos vídeos.
- **[Lucide React](https://lucide.dev/):** Ícones minimalistas usados na Taskbar e janelas.

## 🚀 Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/WilsonTeofilo/EditorDevideoPortifolio.git
```
2. Entre na pasta e instale as dependências:
```bash
cd EditorDevideoPortifolio
npm install
```
3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---
*Criado com o foco de entregar vídeos claros, dinâmicos e que mantenham a atenção do público.*
