# Architecture Document

## Overview

Page Pulse is a serverless website auditing service built with Next.js. It accepts a public website URL, downloads the HTML, extracts basic SEO information, measures response performance, caches the result, and returns a structured JSON response.

The system is designed to support approximately **10,000 audits per day**, handle bursts of **500 concurrent requests**, and maintain a customer-facing response time SLA.

---

# High-Level Architecture

```text
                        +--------------------+
                        |      Browser       |
                        +---------+----------+
                                  |
                                  |
                           HTTPS Request
                                  |
                                  v
                    +---------------------------+
                    | Next.js API (/api/audit)  |
                    +-------------+-------------+
                                  |
                    +-------------+-------------+
                    |                           |
          Rate Limiter                  Request Logger
          (Upstash Redis)                   (Pino)
                    |                           |
                    +-------------+-------------+
                                  |
                           Validate Request
                                  |
                                  v
                         Check Redis Cache
                                  |
                 +----------------+----------------+
                 |                                 |
            Cache Hit                        Cache Miss
                 |                                 |
                 |                          Concurrency
                 |                            Limiter
                 |                                 |
                 |                          Fetch Website
                 |                                 |
                 |                           Parse HTML
                 |                                 |
                 +---------------+-----------------+
                                 |
                          Store in Cache
                                 |
                                 v
                         Return JSON Result
```

---

# Components

## 1. Client

Responsible for:

- Accepting a website URL
- Displaying loading state
- Showing audit results
- Displaying friendly error messages

---

## 2. API Layer

Route:

```
POST /api/audit
```

Responsibilities:

- Validate input
- Apply rate limiting
- Generate request ID
- Call audit service
- Return standardized response

---

## 3. Audit Service

Coordinates the complete audit process.

Responsibilities:

- Check Redis cache
- Apply concurrency limit
- Download website HTML
- Parse SEO metadata
- Calculate performance metrics
- Cache successful results

---

## 4. Fetch Service

Responsible for:

- Downloading HTML
- Measuring response time
- Returning status code
- Returning HTML size

---

## 5. Parser Service

Extracts:

- Title
- Meta description
- H1 count

Uses Cheerio for lightweight HTML parsing.

---

## 6. Redis Cache

Stores completed audit results.

Benefits:

- Reduces duplicate work
- Improves response time
- Reduces outbound traffic
- Protects target websites

---

## 7. Rate Limiter

Uses Redis to limit requests from the same client.

Protects against:

- Abuse
- Bots
- Denial-of-service attempts

---

## 8. Logger

Every request receives a unique request ID.

Logs include:

- Request started
- Request completed
- Errors
- Rate-limit events

---

# Data Flow

1. User submits a URL.
2. API validates the request.
3. Rate limiter checks whether the request is allowed.
4. Redis cache is checked.
5. If cached, cached result is returned immediately.
6. Otherwise the concurrency limiter accepts the task.
7. Website HTML is downloaded.
8. HTML is parsed.
9. Performance metrics are calculated.
10. Result is cached.
11. JSON response is returned.

---

# Queueing Strategy

The current implementation uses an **in-memory concurrency limiter** (`p-limit`).

This allows:

- Maximum concurrent outbound fetches
- Prevents resource exhaustion
- Protects upstream websites

For higher traffic in production, the service can be extended with:

- Redis Queue
- BullMQ workers
- Background processing
- Auto-scaling workers

This allows thousands of queued audits without overwhelming application instances.

---

# Where State Lives

| State | Storage |
|--------|---------|
| Audit Results | Redis Cache |
| Rate Limit Counters | Redis |
| Request Logs | Log Aggregation Platform |
| Application Code | Next.js Server |
| Client UI State | React |

The API remains **stateless**, allowing multiple instances to serve requests behind a load balancer.

---

# Scalability

To support 10,000 audits/day:

- Horizontal scaling of API instances
- Shared Redis cache
- Shared Redis rate limiter
- Stateless application servers
- Concurrency limiting
- Request caching
- CDN for frontend assets

---

# Future Improvements

For significantly larger workloads:

- Message queue (BullMQ)
- Worker services
- Kubernetes autoscaling
- Distributed tracing
- Dedicated monitoring platform
- Circuit breakers for slow websites
- Retry policies with exponential backoff

---

# Summary

The architecture follows a stateless, cache-first design optimized for scalability and reliability. Redis is used for caching and rate limiting, while the API remains horizontally scalable. Concurrency limiting prevents resource exhaustion, and structured logging enables operational visibility. The design can be extended with background workers and message queues as traffic grows beyond current requirements.