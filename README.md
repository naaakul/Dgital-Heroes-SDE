# Page Pulse

A lightweight website auditing service built with **Next.js 16** that analyzes public web pages for basic SEO and performance metrics.

Built for the **Digital Heroes Training Task**.

---

## Features

- Website SEO audit
- Performance metrics
- URL validation
- Redis caching
- Rate limiting
- Concurrency limiting
- Structured logging
- Health endpoint
- Unit tests
- GitHub Actions CI

---

# Tech Stack

- Next.js 16
- TypeScript
- React 19
- Cheerio
- Upstash Redis
- Pino
- Vitest

---

# Getting Started

## Clone

```bash
git clone https://github.com/naaakul/Digital-Heroes-SDE
cd page-pulse
```

## Install

```bash
npm install
```

## Environment Variables

Create a `.env.local` file.

```env
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## Development

```bash
npm run dev
```

Application:

```
http://localhost:3000
```

---

# API Contract

## POST `/api/audit`

Audits a public website.

### Request

```http
POST /api/audit
Content-Type: application/json
```

### Body

```json
{
  "url": "https://example.com"
}
```

---

### Successful Response

**Status:** `200 OK`

```json
{
  "success": true,
  "requestId": "req_abc123",
  "timestamp": "2026-07-28T12:34:56.789Z",
  "data": {
    "url": "https://example.com",
    "status": 200,
    "cached": false,
    "seo": {
      "title": "Example Domain",
      "description": "Example description",
      "h1Count": 1
    },
    "performance": {
      "responseTime": 182,
      "htmlSize": 12564
    }
  }
}
```

---

### Validation Error

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "requestId": "req_xyz123",
  "timestamp": "2026-07-28T12:35:12.102Z",
  "error": {
    "code": "INVALID_URL",
    "message": "Invalid URL."
  }
}
```

---

### Rate Limited

**Status:** `429 Too Many Requests`

```json
{
  "success": false,
  "requestId": "req_xyz123",
  "timestamp": "2026-07-28T12:35:12.102Z",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests."
  }
}
```

---

## GET `/api/health`

Checks service availability.

### Successful Response

```json
{
  "status": "healthy"
}
```

---

# Running Tests

```bash
npm test
```

or

```bash
npm run test
```

---

# Project Structure

```
app/
components/
lib/
services/
tests/
types/
utils/
validators/
docs/
```

---

# CI/CD

GitHub Actions automatically:

- Installs dependencies
- Runs tests
- Verifies the project builds successfully

---

# Documentation

Additional design documents are available in the `docs` directory.

- Architecture Document
- Technology Decision Record
- Failure Mode Analysis
- Observability & Rollback Plan

---

# Live Demo

```
https://digitalheroes.nakul.rest/
```

---

# License

This project was created for the **Digital Heroes Training Task** by **Nakul Chouksey**.