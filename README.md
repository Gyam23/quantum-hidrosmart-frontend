# Quantum HidroSmart — Web e PWA cidadã

Aplicação Next.js para o piloto municipal. O painel interno consome a API FastAPI e a área cidadã funciona como uma PWA responsiva para registrar e acompanhar vazamentos.

## Executar localmente

Requer Node.js 20.9 ou superior.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Defina `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` em `.env.local` e mantenha essa origem liberada em `CORS_ORIGINS` no back-end. A API precisa estar disponível e migrada; cadastro de gestores/operadores e dados iniciais estão descritos no README do back-end.

Build de produção:

```powershell
npm run build
npm start
```

## Estrutura principal

```text
app/
  (app)/                painel de gestão: visão geral, mapa, leituras CSV, alertas,
                        cidadãos, relatórios e usuários
  (citizen)/            área PWA autenticada do cidadão e envio de denúncias
  cadastro-cidadao/     cadastro com consentimento
components/             mapa Leaflet, layout e componentes de autenticação
lib/api.ts              tipos, sessão e cliente HTTP da API
public/sw.js            cache restrito a assets estáticos do Next.js
```

O mapa usa tiles do OpenStreetMap. A PWA não armazena em cache respostas da API, dados pessoais, fotos ou telas autenticadas. Fotos de denúncias são carregadas com o token e permanecem privadas.

## Perfis e funcionalidades

- **Admin/Gestor:** painel, baseline de impacto e gerenciamento de usuários.
- **Operador:** mapa, alertas, validação de denúncias e ciclo de ordens de serviço.
- **Cidadão:** cadastro, consentimento, localização/foto opcional e acompanhamento do status.

Provedores Google/Apple, modo offline para envio de denúncias e notificações push não fazem parte deste MVP.
