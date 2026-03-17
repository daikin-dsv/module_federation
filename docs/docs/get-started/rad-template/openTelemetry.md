---
sidebar_position: 5
---


# OpenTelemetry

The template includes built-in [OpenTelemetry](https://opentelemetry.io/) instrumentation for both the server and the browser.

## Server-Side Tracing

Server-side tracing is powered by [`@vercel/otel`](https://www.npmjs.com/package/@vercel/otel) and automatically captures traces for Next.js route handlers, server components, and middleware.

The Next.js [instrumentation hook](https://nextjs.org/docs/app/building-your-api-reference/file-conventions/instrumentation) in `instrumentation.ts` registers the OpenTelemetry SDK at startup:

```ts
import { registerOTel } from '@vercel/otel';

export function register() {
    registerOTel({ serviceName: 'rad-template-server' });
}
```

> **When you fork this template**, change `serviceName` to match your application name so traces are identifiable in your observability backend.

## Browser-Side Tracing

Client-side tracing runs in the browser via `app/components/OpenTelemetryProvider.tsx`, a `'use client'` component that wraps the application in `app/layout.tsx`. It initializes once on mount and automatically instruments:

- **Document loads** - page load timing and resource fetches
- **Fetch requests** - all `fetch()` calls made by the application
- **XMLHttpRequests** - legacy XHR calls, if any

Trace context is propagated on same-origin requests so browser spans can be correlated with server-side traces.

By default, traces are exported via OTLP HTTP to `/api/otel`. To point at a different collector, set `NEXT_PUBLIC_OTEL_COLLECTOR_URL` in `.env.local`:

```bash
NEXT_PUBLIC_OTEL_COLLECTOR_URL=http://localhost:4318
```

The browser service name is `rad-template-browser`. When you fork the template, update the `ATTR_SERVICE_NAME` value in `OpenTelemetryProvider.tsx` to match your application.

## Connecting a Collector

By default no collector is configured. Traces are generated but not exported to an external backend. To send telemetry to an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) or a compatible backend, set the appropriate environment variables in `.env.local` (or your deployment environment).

### Example: Local Collector with Jaeger

Run a local collector and Jaeger instance with Docker Compose:

```yaml
# docker-compose.otel.yml
services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    ports:
      - "4318:4318" # OTLP HTTP
    volumes:
      - ./otel-collector-config.yaml:/etc/otelcol-contrib/config.yaml

  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686" # Jaeger UI
      - "4317:4317"   # OTLP gRPC (used by collector)
```

Then set in `.env.local`:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

View traces at [http://localhost:16686](http://localhost:16686).

### Example: Grafana Cloud / Tempo

Point the exporter at your Grafana Cloud OTLP endpoint and authenticate with a token:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://<your-stack>.grafana.net/otlp
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64-encoded-credentials>
```

### Disabling Telemetry

To turn off trace and metric export entirely (e.g., in test environments):

```bash
OTEL_TRACES_EXPORTER=none
OTEL_METRICS_EXPORTER=none
```

## Dependencies

The following packages power the instrumentation:

### Server

| Package | Purpose |
|---|---|
| `@vercel/otel` | High-level wrapper that wires the OTel SDK into the Next.js instrumentation hook |
| `@opentelemetry/instrumentation` | Core instrumentation API used by `@vercel/otel` |
| `@opentelemetry/api-logs` | Logs API for structured log correlation |
| `@opentelemetry/sdk-logs` | Logs SDK implementation |

### Browser

| Package | Purpose |
|---|---|
| `@opentelemetry/sdk-trace-web` | Browser-optimized trace SDK |
| `@opentelemetry/sdk-trace-base` | Core trace SDK (span processors, exporters) |
| `@opentelemetry/exporter-trace-otlp-http` | OTLP/HTTP trace exporter |
| `@opentelemetry/resources` | Resource attribution (service name, etc.) |
| `@opentelemetry/semantic-conventions` | Standard attribute constants |
| `@opentelemetry/context-zone` | Zone.js-based async context propagation for the browser |
| `@opentelemetry/instrumentation-document-load` | Auto-instrumentation for page load performance |
| `@opentelemetry/instrumentation-fetch` | Auto-instrumentation for `fetch()` calls |
| `@opentelemetry/instrumentation-xml-http-request` | Auto-instrumentation for XMLHttpRequest |

# Learn More

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Next.js Instrumentation](https://nextjs.org/docs/app/building-your-api-reference/file-conventions/instrumentation)
