# Hackathon

[Info](https://gist.github.com/batyshkaLenin/47df0766b564789634af1859a24b1d3e#%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B5-%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8)

[Even more info](https://www.figma.com/file/q9rFkw4sxlbNu9CtzhzPC7/Flow-and-FAQ?type=whiteboard&node-id=0-1&t=ff0iS7TjEMDt1N8Y-0)

[Miro Board for team work](https://miro.com/welcomeonboard/RWpDaFRWdm52cHZKNE42RjFWemxDenBwc0owNmp2MFdjY0IzUGhscWwyTzlXbHBPN0xaTUszaGxTejlMV2M4bXwzNDU4NzY0NTQyMTA2MjM1NDk1fDI=?share_link_id=333278440706)

[Notion](https://www.notion.so/bab210af17544ead823023b30487dd6c)

[Figma](https://www.figma.com/file/EeKuVBPYqkbLLF943mW922/%D1%85%D0%B0%D0%BA%D0%B0%D1%82%D0%BE%D0%BD?type=design&node-id=0%3A1&mode=design&t=9SEhp6IpUqf76ujL-1)

# Stack

- [pnpm](https://pnpm.io/) - package manager
- [Svelte](https://svelte.dev/docs/introduction) - component framework
- [SvelteKit](https://kit.svelte.dev/docs/introduction) - web framework
- [melt-ui](https://www.melt-ui.com/docs/usage) - headless UI library for Svelte
- [trpc](https://trpc.io/docs) - typed server-to-client library
- [@tanstack/svelte-query - V5](https://tanstack.com/query/latest/docs/svelte/overview) - async state manager
  - доки по [Реакту](https://tanstack.com/query/latest/docs/react/overview) куда более полные, но многие идеи между фреймворкам аналогичные
- [trpc-svelte-query](https://github.com/ottomated/trpc-svelte-query) - sveltekit+trpc+tanstack-query-svelte adapter
- [drizzle-orm](https://orm.drizzle.team/docs/overview) - SQL ORM
- [libsql](https://github.com/tursodatabase/libsql) - SQLite fork

# Scripts

## How to start

```bash
# Initialize database
pnpm db-push
# Seed database
pnpm db-seed
# Start dev server
pnpm dev
```

## Dev

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open

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

# Toggle a role for selected user
pnpm db-role
```
