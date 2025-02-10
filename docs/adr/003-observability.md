# ADR: Observability and Structured Logging Support

**Date:** 2023-10-11

**Status:** Accepted

## Context

As the application scales, robust observability becomes critical for monitoring performance, diagnosing issues, and ensuring reliability. The current state of the application needed enhanced tracing and logging capabilities to support distributed systems and Kubernetes deployments. Key requirements were:

- **Distributed Tracing:** Gain visibility across service boundaries using OpenTelemetry for tracing with an OTLP exporter.
- **Structured Logging:** Implement structured logging (using Winston) to enable easier log aggregation, filterability, and integration with external log management tools.
- **Global Error Handling:** Capture unhandled promise rejections and uncaught exceptions, ensuring critical error logs are flushed before exit.
- **Contextual Logging:** Provide context (e.g., using UserIdInterceptor and async local storage) to log requests with user-scoped information.

## Decision

The following approach was adopted:

1. **OpenTelemetry Integration:**
   - Integrate OpenTelemetry to collect distributed traces.
   - Start the OTEL SDK during application bootstrap to initialize tracing.

2. **Structured Logging Implementation:**
   - Create a `StructuredLogger` service that uses a logger library (e.g., Winston) to provide structured logs.
   - Utilize this logger in both the NestJS application setup and global error handlers.

3. **Global Error Handlers and Graceful Shutdown:**
   - Implement global error handlers for `unhandledRejection` and `uncaughtException` to catch and log errors.
   - Use a centralized shutdown mechanism (`gracefulShutdown`) to ensure that if an error occurs, the logger is given time (or explicitly flushed if supported) before the process exits.

4. **Context Propagation:**
   - Use middleware/interceptors (e.g., `UserIdInterceptor`) and async local storage to attach user context to logs for better traceability.

5. **Environment Configuration:**
   - Incorporate configuration validation to ensure that all required environment variables are present and valid during startup.

## Implementation Details

- The **main.ts** file has been updated to:
  - Initialize OpenTelemetry with `otelSDK.start()`.
  - Create and use a global instance of `StructuredLogger` for logging.
  - Set up the NestJS application with the structured logger, enabling CORS (with plans to configure for production).
  - Add global handlers for unhandled promise rejections and uncaught exceptions, now using a graceful shutdown mechanism to flush logs before exiting.

- The new `gracefulShutdown` function checks if a flush method is available on the logger. If available, it utilizes it; otherwise, it falls back to a quick exit via `process.nextTick`.

- Kubernetes metadata integration is supported to enrich both trace and log data, ensuring that logs can be correlated with the correct deployment namespaces (as seen in the k8s overlay changes).

## Consequences

- **Advantages:**
  - Improved observability and diagnostics across distributed systems.
  - More reliable error logging due to global handlers and graceful shutdown procedures.
  - Enhanced context for logs, aiding in debugging and monitoring.

- **Disadvantages:**
  - Additional complexity in the bootstrapping process.
  - Reliance on third-party libraries for tracing and logging introduces extra dependencies.

## Future Considerations

- **Logger Enhancements:** Once a flush method is implemented in `StructuredLogger`, further refine the graceful shutdown process.
- **User Context:** Expand the use of interceptors to capture and log more user-specific information in requests.
- **Performance Monitoring:** Leverage the trace and logging data for automated anomaly detection and performance alerts.

## Conclusion

This ADR documents the implementation of a robust observability framework within the NestJS application. By integrating OpenTelemetry for distributed tracing and implementing structured logging, the application is now better equipped for debugging, monitoring, and scaling. This approach aligns with modern best practices for cloud-native applications, particularly in Kubernetes environments. 