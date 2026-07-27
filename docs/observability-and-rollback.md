# Observability and Rollback Plan

## Overview

To maintain a customer-facing SLA while handling approximately **10,000 audits per day** and bursts of **500 concurrent requests**, the service must be continuously monitored. Observability helps detect issues early, while a well-defined rollback strategy minimizes downtime during failed deployments.

---

# Monitoring

The following metrics should be collected and monitored.

## API Performance

Monitor:

- Requests per second (RPS)
- Average response time
- P95 response time
- P99 response time
- Request duration
- Active requests

Purpose:

- Ensure the service meets the response time SLA.
- Detect slowdowns before users are affected.

---

## Error Rate

Monitor:

- HTTP 4xx responses
- HTTP 5xx responses
- Timeout errors
- Validation failures
- Failed audits

Purpose:

- Detect application bugs.
- Identify failing dependencies.
- Monitor user-facing reliability.

---

## Cache Performance

Monitor:

- Cache hit rate
- Cache miss rate
- Redis latency
- Redis availability

Purpose:

- Verify the cache is reducing workload.
- Detect Redis issues quickly.

---

## Rate Limiting

Monitor:

- Requests blocked by rate limiting
- Top client IPs
- Requests per IP

Purpose:

- Detect abuse.
- Identify traffic spikes.
- Protect service availability.

---

## Infrastructure

Monitor:

- CPU usage
- Memory usage
- Network utilization
- Instance health
- Concurrent requests

Purpose:

- Prevent resource exhaustion.
- Support capacity planning.

---

## External Website Performance

Monitor:

- Average fetch duration
- Website timeout rate
- External HTTP error rate

Purpose:

- Differentiate between application problems and failures caused by external websites.

---

# Alerts

Alerts should notify the team when critical thresholds are exceeded.

| Metric | Alert Threshold |
|---------|-----------------|
| HTTP 5xx Error Rate | > 5% for 5 minutes |
| P95 Response Time | > 2 seconds |
| Redis Unavailable | Immediate |
| Cache Hit Rate | < 60% |
| API Health Check Failure | Immediate |
| CPU Usage | > 80% for 10 minutes |
| Memory Usage | > 85% for 10 minutes |
| Request Timeout Rate | > 2% |

---

# Logging

Every request should include:

- Request ID
- Timestamp
- Client IP
- Requested URL
- Response status
- Response time
- Error details (if applicable)

Structured JSON logging makes searching and debugging easier.

---

# Health Checks

The `/api/health` endpoint should verify:

- Application is running
- Redis connectivity
- API availability

Load balancers and monitoring systems can use this endpoint to determine if an instance is healthy.

---

# Rollback Plan

If a deployment introduces failures:

1. Stop routing traffic to the new deployment.
2. Roll back to the previous stable deployment using the hosting platform (e.g., Vercel).
3. Verify the rollback by checking the `/api/health` endpoint.
4. Confirm that error rates and response times have returned to normal.
5. Investigate the failed deployment before attempting another release.

---

# Deployment Strategy

To reduce deployment risk:

- Run automated tests before deployment.
- Use Continuous Integration (CI) to validate every commit.
- Deploy only after successful builds and tests.
- Monitor the application immediately after deployment.
- Roll back immediately if SLA metrics degrade.

---

# Recommended Monitoring Stack

| Purpose | Tool |
|---------|------|
| Metrics | Prometheus |
| Dashboards | Grafana |
| Logs | Pino + Log Aggregation |
| Health Checks | `/api/health` |
| Uptime Monitoring | UptimeRobot or Better Stack |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

# Summary

The observability strategy focuses on monitoring application performance, infrastructure health, cache efficiency, and external dependencies. Combined with structured logging, automated health checks, and a clear rollback process, these practices help maintain reliability, quickly detect issues, and restore service with minimal downtime.