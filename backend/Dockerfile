# =========================
# Stage 1 - Builder
# =========================

FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /build

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests=true

RUN rm -rf /root/.m2

# =========================
# Stage 2 - Runtime
# =========================

FROM eclipse-temurin:21-jre-jammy AS runtime

WORKDIR /app

COPY --from=builder /build/target/admin-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
