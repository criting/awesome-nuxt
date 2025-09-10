<template>
  <section class="relative">
    <div
      class="absolute inset-0 bg-linear-to-b from-gray-100 to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:from-primary-900 dark:to-gray-900 rounded-lg dark:opacity-50"
    />

    <div
      class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 lg:max-w-6xl lg:mx-auto pt-20"
    >
      <aside class="order-last lg:order-first lg:sticky lg:top-6 h-fit">
        <nav class="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p class="text-md font-semibold mb-2">On this page</p>
          <ul class="space-y-1 text-sm mt-4">
            <li v-for="s in sections" :key="s.id">
              <button
                type="button"
                class="w-full text-left px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                @click="go(s.id)"
              >
                <UIcon
                  :name="s.icon"
                  class="mr-2 text-secondary dark:text-primary group:hover:text-white"
                />
                {{ s.label }}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Content -->
      <section class="space-y-10">
        <!-- Why Nuxt -->
        <div id="why-nuxt" class="scroll-mt-24 relative group">
          <h2 class="text-2xl md:text-3xl font-bold flex gap-2 items-center">
            <a href="#why-nuxt" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-rocket'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Why Nuxt Is Popular
            </a>
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Nuxt gives you modern rendering, clean DX, and an ecosystem that scales with your app.
          </p>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-medium">Universal rendering</span> (SSR, SSG, Hybrid, SPA) without
              extra config
            </li>
            <li>• <span class="font-medium">File-based routing</span> and auto imports</li>
            <li>
              • <span class="font-medium">Performance-first</span> (Vite + Nitro under the hood)
            </li>
            <li>
              • <span class="font-medium">Edge-ready deployment</span> (Cloudflare, Vercel, Netlify,
              Bun, etc.)
            </li>
            <li>
              • <span class="font-medium">Strong ecosystem</span> of official & community modules
            </li>
          </ul>
          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60" />
        </div>

        <!-- Auth -->
        <div id="auth" class="scroll-mt-24 relative group">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#auth" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-lock'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Authentication
            </a>
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Nuxt doesn’t ship with built-in auth. Use one of these:
          </p>
          <h3 class="mt-6 text-lg md:text-xl font-semibold">
            Nuxt Auth Utils (community favorite)
          </h3>
          <ul class="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Secure cookie-based sessions with encryption</li>
            <li>• 40+ OAuth providers out of the box</li>
            <li>• Typed session helpers (<code class="font-mono">useUserSession()</code>)</li>
            <li>• Works with SSR, ISR, and SPA</li>
          </ul>

          <h3 class="mt-6 text-lg md:text-xl font-semibold">BetterAuth (Logto, Lucia, etc.)</h3>
          <ul class="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Lightweight and flexible token/session flows</li>
            <li>• Great for enterprise-grade identity and custom rules</li>
          </ul>

          <p class="mt-3 text-gray-600 dark:text-gray-300">
            <span class="font-semibold">Tip:</span> Start with
            <span class="font-semibold">Nuxt Auth Utils</span>, switch to BetterAuth/Lucia when you
            need more control.
          </p>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- DB -->
        <div id="db" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#db" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon
                  :name="'i-lucide-database'"
                  class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Database Providers
            </a>
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Nuxt leaves persistence to you. Great options:
          </p>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-semibold">Cloudflare D1</span> – SQLite-compatible DB on the edge
              (cheap, fast, NuxtHub-friendly)
            </li>
            <li>
              • <span class="font-semibold">Supabase</span> – Postgres + Auth + Storage + Realtime,
              great DX
            </li>
            <li>
              • <span class="font-semibold">Turso (libSQL)</span> – Distributed SQLite with sync &
              vector support
            </li>
            <li>
              • <span class="font-semibold">PocketBase</span> – OSS backend (DB + auth + files) for
              small apps
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Modules -->
        <div id="modules" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#modules" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-puzzle'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Must-Have Modules
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <code class="font-mono">@nuxt/image</code> – Optimized, responsive images</li>
            <li>• <code class="font-mono">@nuxtjs/sitemap</code> – SEO-ready sitemap generation</li>
            <li>
              • <code class="font-mono">@nuxt/icon</code> – Iconify-powered, no manual SVG imports
            </li>
            <li>• <code class="font-mono">@nuxt/fonts</code> – Optimized font loading</li>
            <li>
              • <code class="font-mono">@nuxt/devtools</code> – Inspect routes, payloads, server,
              and Vue tree live
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Validation -->
        <div id="validation" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#validation" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon
                  :name="'i-lucide-check-circle'"
                  class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Form Validation
            </a>
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Schema validators that work great with Nuxt:
          </p>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-semibold">Zod</span> – TypeScript-first schemas (great in server
              routes & components)
            </li>
            <li>• <span class="font-semibold">Joi</span> – Mature validator with rich rules</li>
          </ul>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            <span class="font-semibold">Tip:</span> Choose <span class="font-semibold">Zod</span> if
            you want type inference inside your Vue components.
          </p>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- UI -->
        <div id="ui" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#ui" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-palette'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              UI Libraries
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-semibold">Nuxt UI</span> – First-party, Tailwind-based, excellent
              DX
            </li>
            <li>
              • <span class="font-semibold">Shadcn Vue</span> – Headless & highly customizable
            </li>
            <li>• <span class="font-semibold">PrimeVue</span> – 90+ rich, styled components</li>
            <li>
              • <span class="font-semibold">Radix Vue</span> – Accessible, headless primitives
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- ORM -->
        <div id="orm" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#orm" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon
                  :name="'i-lucide-database'"
                  class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              ORM Choices (Databases Made Easy)
            </a>
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            ORMs simplify migrations, relations, and typing:
          </p>

          <h3 class="mt-6 text-lg md:text-xl font-semibold">Drizzle ORM (best TS support)</h3>
          <ul class="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Edge-friendly (Cloudflare D1, Turso, Neon, etc.)</li>
            <li>• Strongly-typed queries, lightweight migrations</li>
            <li>• Popular in Nuxt full-stack templates</li>
          </ul>

          <h3 class="mt-6 text-lg md:text-xl font-semibold">Prisma</h3>
          <ul class="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Feature-rich ORM (relations, migrations, studio)</li>
            <li>• Best for Postgres/MySQL; not for D1; limited on Turso</li>
          </ul>

          <h3 class="mt-6 text-lg md:text-xl font-semibold">Kysely</h3>
          <ul class="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Lightweight, type-safe query builder</li>
            <li>• Good choice where Prisma isn’t supported</li>
          </ul>

          <p class="mt-3 text-gray-600 dark:text-gray-300">
            <span class="font-semibold">Rule of thumb:</span> Deploying to
            <span class="font-semibold">Cloudflare</span> → use
            <span class="font-semibold">Drizzle</span>. On
            <span class="font-semibold">Supabase/Postgres</span> →
            <span class="font-semibold">Prisma</span> or
            <span class="font-semibold">Drizzle</span> both shine.
          </p>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Testing -->
        <div id="testing" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#testing" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon
                  :name="'i-lucide-book-open-check'"
                  class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Testing & Quality
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <span class="font-semibold">Vitest</span> – Vite-native unit testing</li>
            <li>
              • <span class="font-semibold">Playwright</span> – E2E browser tests (fast, resilient)
            </li>
            <li>• <span class="font-semibold">Cypress</span> – Popular E2E choice, rich tooling</li>
            <li>
              • <span class="font-semibold">ESLint + Prettier</span> – via
              <code class="font-mono">@nuxt/eslint</code> for consistent code
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Deployment -->
        <div id="deploy" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#deploy" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-cloud'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Deployment Options
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-semibold">NuxtHub</span> – Cloudflare Workers + D1 + KV + Blob
            </li>
            <li>
              • <span class="font-semibold">Vercel</span> – Simple deploys, great edge support
            </li>
            <li>• <span class="font-semibold">Netlify</span> – Similar to Vercel, excellent DX</li>
            <li>• <span class="font-semibold">GitHub Pages</span> – Static-only (SSG)</li>
            <li>
              • <span class="font-semibold">Cloudflare Pages + Workers</span> – Edge SSR + databases
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Analytics -->
        <div id="analytics" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#analytics" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon
                  :name="'i-lucide-bar-chart'"
                  class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Analytics & Monitoring
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <span class="font-semibold">Plausible / Umami</span> – Lightweight, privacy-friendly
              analytics
            </li>
            <li>
              • <span class="font-semibold">PostHog</span> – Product analytics (replay, funnels)
            </li>
            <li>
              • <span class="font-semibold">Sentry</span> – Error monitoring (client + server)
            </li>
            <li>
              • <span class="font-semibold">OpenPanel / LogRocket</span> – Session replay & heatmaps
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Email -->
        <div id="email" class="scroll-mt-24 relative group">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#email" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-mail'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Email & Notifications
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <span class="font-semibold">Resend</span> – DX-focused email API</li>
            <li>• <span class="font-semibold">Postmark</span> – Reliable transactional email</li>
            <li>
              • <span class="font-semibold">Frontegg / Clerk</span> – Identity + notifications suite
            </li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- Security -->
        <div id="security" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#security" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-lock'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              Security Hardening
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Add rate limiting in Nitro middleware</li>
            <li>• Set security headers (CSP, HSTS, no-sniff, referrer-policy)</li>
            <li>• Add <code class="font-mono">/.well-known/security.txt</code></li>
            <li>• Force HTTPS everywhere (Cloudflare “Always Use HTTPS” + HSTS)</li>
          </ul>

          <div class="my-8 border-t border-gray-200/60 dark:border-gray-800/60"></div>
        </div>

        <!-- AI -->
        <div id="ai" class="scroll-mt-24 group relative">
          <h2 class="text-2xl md:text-3xl font-bold">
            <a href="#ai" class="flex gap-2 items-center">
              <span
                class="absolute top-0 -left-7 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-md"
                >#</span
              ><span
                class="dark:bg-white bg-primary rounded-full w-7 h-7 flex justify-center items-center"
                ><UIcon :name="'i-lucide-brain'" class="dark:text-primary p-0 m-0 w-3 text-white"
              /></span>
              AI
            </a>
          </h2>
          <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <span class="font-semibold">Vercel AI SDK</span> – Streaming AI in Nuxt UIs</li>
            <li>• <span class="font-semibold">LangChain.js</span> – LLM chains & tools</li>
            <li>
              • <span class="font-semibold">Nuxt AI utils</span> – Simple wrappers for common AI
              tasks
            </li>
          </ul>

          <div
            class="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900"
          >
            <p class="text-gray-800 dark:text-gray-200">
              <span class="font-semibold">Takeaway:</span> Nuxt gives you the best
              “batteries-included” dev experience, and this ecosystem fills in the rest—auth, DB +
              ORM, UI, validation, testing, deploys, and security. Start simple, evolve as you go.
              💚
            </p>
          </div>
        </div>

        <div class="max-w-md">
          <FeedbackWidget
            :page="{
              title: 'Guide'
            }"
            class="mt-20"
          />
        </div>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
const sections = [
  { id: 'why-nuxt', label: 'Why Nuxt Is Popular', icon: 'i-lucide-rocket' },
  { id: 'auth', label: 'Authentication', icon: 'i-lucide-fingerprint' },
  { id: 'db', label: 'Database Providers', icon: 'i-lucide-database' },
  { id: 'modules', label: 'Must-Have Modules', icon: 'i-lucide-package' },
  { id: 'validation', label: 'Form Validation', icon: 'i-lucide-shield-check' },
  { id: 'ui', label: 'UI Libraries', icon: 'i-lucide-layout-list' },
  { id: 'orm', label: 'ORM Choices', icon: 'i-lucide-bubbles' },
  { id: 'testing', label: 'Testing & Quality', icon: 'i-lucide-book-open-check' },
  { id: 'deploy', label: 'Deployment', icon: 'i-lucide-server-crash' },
  {
    id: 'analytics',
    label: 'Analytics & Monitoring',
    icon: 'i-lucide-chart-no-axes-combined'
  },
  { id: 'email', label: 'Email & Notifications', icon: 'i-lucide-mail' },
  { id: 'security', label: 'Security Hardening', icon: 'i-lucide-lock-keyhole' },
  { id: 'ai', label: 'AI / Modern Enhancements', icon: 'i-lucide-brain-circuit' }
];

function go(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, '', `#${id}`);
  }
}
</script>
