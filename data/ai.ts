import type { Project } from "../types/project";

export const ai: Project[] = [
  {
    name: 'Nuxt UI Chat',
    description: 'A modern, full-featured AI chatbot application built with Nuxt 3, Nuxt UI Pro, and the Vercel AI SDK v5. Features real-time streaming, multiple AI models support via AI Gateway, persistent chat history with PostgreSQL, and a beautiful responsive interface.',
    url: 'https://github.com/HugoRCD/nuxt-ui-chat',
    demo: 'https://nuxt-ui-chat.hrcd.fr/',
    tags: ['auth', 'nuxt 3', 'nuxt ui pro', 'vercel', 'drizzle'],
    category: 'ai',
    image: 'https://nuxt-ui-chat.hrcd.fr/og.jpg',
  },
  {
    name: 'Nuxt AI Chatbot Template',
    description: 'Full-featured AI Chatbot Nuxt application with authentication, chat history, multiple pages, collapsible sidebar, keyboard shortcuts, light & dark mode, command palette and more. Built using Nuxt UI Pro components and integrated with Workers AI for a complete chat experience.',
    url: 'https://github.com/nuxt-ui-pro/chat',
    demo: 'https://chat-template.nuxt.dev/',
    tags: ['auth', 'nuxt 3', 'nuxt ui pro', 'nuxthub', 'drizzle', 'auth'],
    category: 'ai',
    image: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2NoYXQtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3NDI4NDY2ODB9.n4YCsoNz8xatox7UMoYZFNo7iS1mC_DT0h0A9cKRoTw.jpg?theme=dark',
  },
  {
    name: 'Chat with PDF',
    description: 'Chat with PDF is a full-stack AI-powered application that lets you to ask questions to PDF documents.',
    url: 'https://github.com/RihanArfan/chat-with-pdf',
    demo: 'https://chat-with-pdf.nuxt.dev/',
    tags: ['nuxt 3', 'nuxt ui', 'nuxthub', 'ai', 'pdf', 'drizzle'],
    category: 'ai',
    image: 'https://github.com/RihanArfan/chat-with-pdf/raw/main/.github/hybrid-rag.png'
  },
  {
    name: 'Nuxt Chatgpt + Image Generator',
    description: 'ChatGPT integration for Nuxt 3',
    url: 'https://github.com/SchnapsterDog/nuxt-chatgpt',
    demo: 'https://nuxtchatgpt.com/',
    tags: ['nuxt 3', 'chatgpt', 'image generator'],
    category: 'ai',
  },
];