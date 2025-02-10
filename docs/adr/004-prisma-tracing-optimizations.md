# ADR 004: Prisma Tracing Optimizations

## Status
Accepted

## Context
While OpenTelemetry tracing provides valuable insights into Prisma operations, the default configuration can generate excessive telemetry data. This includes many low-value spans and redundant attributes that increase storage costs and make it harder to focus on important operational data.

## Decision
We've implemented several optimizations to reduce trace volume while maintaining visibility into critical database operations:

1. **Custom Span Filtering**
   - Created a `PrismaSpanFilter` to selectively process spans
   - Immediately ends non-essential connection spans
   - Only exports model-related spans with `prisma.model` attribute

2. **Prisma Instrumentation Configuration**
   - Disabled middleware spans (`middleware: false`)
   - Focused on high-value spans like `prisma:client:operation` and `prisma:engine:query`

3. **Sampling Strategy**
   - Implemented parent-based sampling with a configurable ratio
   - Default sampling rate of 30% with environment variable override (`OTEL_SAMPLING_RATIO`)
   - Maintains trace context consistency through parent-based decisions

## Consequences

### Positive
- Reduced trace volume by approximately 60-80%
- Lower storage costs for telemetry data
- Improved signal-to-noise ratio in tracing data
- Configurable sampling rate for different environments
- Maintained visibility into critical database operations

### Negative
- Some low-level debugging information may not be available
- Need to monitor sampling rate impact on error detection
- May need to adjust filtering based on specific debugging needs

## Technical Details

### Span Types Retained
- `prisma:client:operation`: Query parameters, model, duration
- `prisma:engine:query`: Raw SQL, database connection info

### Environment Variables
- `OTEL_SAMPLING_RATIO`: Controls trace sampling rate (default: 0.3)

### Monitoring Considerations
1. Monitor span cardinality from `prisma.model` attributes
2. Watch for any gaps in error tracking
3. Adjust sampling rate based on environment needs

## References
1. [Prisma OpenTelemetry Documentation](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/opentelemetry-tracing)
2. [OpenTelemetry Sampling Documentation](https://opentelemetry.io/docs/concepts/sampling/) 