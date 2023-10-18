# Hackathon

[Info](https://gist.github.com/batyshkaLenin/47df0766b564789634af1859a24b1d3e#%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B5-%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8)

# Stack

- [pnpm](https://pnpm.io/)
- [Svelte](https://svelte.dev/docs/introduction)
- [SvelteKit](https://kit.svelte.dev/docs/introduction)
- [trpc](https://trpc.io/docs)
- [@tanstack/svelte-query - V4](https://tanstack.com/query/v4/docs/svelte/overview) - внимание, что юзаем версию 4.0, не 5.0
  - доки по [Реакту](https://tanstack.com/query/v4/docs/react/overview) куда более полные, но многие идеи между фреймворкам аналогичные
- [trpc-svelte-query](https://github.com/ottomated/trpc-svelte-query)
- [tailwindcss](https://tailwindcss.com/docs/utility-first)
- [drizzle-orm](https://orm.drizzle.team/docs/overview)

# Scripts

## Dev

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open

# To create a production version of your app:
pnpm build

# Start a server to preview build
pnpm preview
```

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Database

```bash
# Push schema changes to database
pnpm db-push

# Run a visual interface for database data
pnpm db-studio

# Seed database with fake data. WILL DELETE ALL PREVIOUSLY EXISTING DATA IN DATABASE
pnpm db-seed

# Generate and apply migration to database after schema changes
pnpm db-migrate
```
