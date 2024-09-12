## Intruktioner för körning

1. Starta utvecklingsservern:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

2. Docker & databas-config

Applikationer använder Docker, se till att Docker finns installerat på din dator.
Konfigurera ev filen docker-compose.yml för att ställa in porter och andra configs du önskar

Kör sedan

```bash
docker compose up -d

```

för att starta upp en container för projektet

3. pgAdmin

Gå till [http://localhost:5050](http://localhost:5050) för att få åtkomst till pgAdmin
