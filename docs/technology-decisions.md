# Technology Decision Record (TDR)

## Overview

This document explains the major technology decisions made for Page Pulse, the alternatives considered, and the reasons for selecting the final solution.

---

# Decision 1: Next.js App Router

## Selected

- Next.js 16 (App Router)

## Alternatives Considered

- Express.js
- Fastify

## Why Next.js?

- Single codebase for frontend and backend
- API Routes eliminate the need for a separate backend service
- Easy deployment on Vercel
- Built-in TypeScript support
- Excellent developer experience

## Why Not Express?

Express is lightweight but requires maintaining a separate backend application, deployment pipeline, and project structure. For this project, Next.js provides a simpler architecture with fewer moving parts.

---

# Decision 2: TypeScript

## Selected

- TypeScript

## Alternative

- JavaScript

## Why TypeScript?

- Strong type safety
- Better IDE support
- Fewer runtime errors
- Easier maintenance as the project grows

## Why Not JavaScript?

JavaScript allows faster prototyping but increases the risk of runtime bugs and inconsistent data structures.

---

# Decision 3: Redis (Upstash)

## Selected

- Upstash Redis

## Alternatives

- In-memory cache
- Self-hosted Redis

## Why Upstash?

- Serverless
- Managed infrastructure
- Global availability
- No operational overhead

## Why Not In-Memory Cache?

In-memory caching only works within a single application instance. Cached data is lost on restart and cannot be shared across multiple servers.

## Why Not Self-Hosted Redis?

Managing Redis servers adds operational complexity and infrastructure costs that are unnecessary for this project.

---

# Decision 4: Cheerio

## Selected

- Cheerio

## Alternative

- JSDOM

## Why Cheerio?

- Lightweight
- Fast HTML parsing
- Low memory usage
- Perfect for server-side scraping

## Why Not JSDOM?

JSDOM simulates a browser environment, making it significantly heavier and slower for simple HTML parsing.

---

# Decision 5: Pino Logger

## Selected

- Pino

## Alternative

- Winston

## Why Pino?

- Extremely fast
- Structured JSON logs
- Low overhead
- Well suited for production services

## Why Not Winston?

Winston provides many features but has higher runtime overhead than Pino.

---

# Decision 6: p-limit

## Selected

- p-limit

## Alternatives

- BullMQ
- Custom queue implementation

## Why p-limit?

- Very lightweight
- Easy to integrate
- Prevents resource exhaustion
- Sufficient for current synchronous request processing

## Why Not BullMQ?

BullMQ is designed for asynchronous background jobs. Since audits are processed immediately and users expect an instant response, introducing a distributed queue would add unnecessary complexity.

---

# Decision 7: Vitest

## Selected

- Vitest

## Alternative

- Jest

## Why Vitest?

- Fast execution
- Native TypeScript support
- Excellent integration with modern tooling
- Similar API to Jest

## Why Not Jest?

Jest is mature but generally slower and requires additional configuration for modern TypeScript projects.

---

# Decision 8: Serverless Deployment

## Selected

- Vercel

## Alternatives

- Docker on VPS
- AWS EC2

## Why Vercel?

- Zero infrastructure management
- Automatic deployments
- Built-in HTTPS
- Global CDN
- Easy rollbacks

---

# Summary

| Decision | Selected Technology | Alternative Rejected | Reason |
|----------|---------------------|----------------------|--------|
| Web Framework | Next.js | Express | Unified frontend and backend |
| Language | TypeScript | JavaScript | Better type safety |
| Cache | Upstash Redis | In-Memory Cache | Shared across instances |
| HTML Parser | Cheerio | JSDOM | Faster and lighter |
| Logger | Pino | Winston | Better performance |
| Concurrency Control | p-limit | BullMQ | Simpler for synchronous workloads |
| Testing | Vitest | Jest | Faster execution |
| Deployment | Vercel | EC2/VPS | Managed infrastructure |