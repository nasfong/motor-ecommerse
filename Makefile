# Docker configuration
IMAGE_NAME = nasfong/motor-frontend
TAG ?= latest
PLATFORM ?= linux/amd64,linux/arm64

stats:
	docker stats car-product

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Build multi-platform image
build-multi:
	docker buildx build --platform $(PLATFORM) -t $(IMAGE_NAME):$(TAG) .

# Run the container locally
run:
	docker run -p 3000:3000 $(IMAGE_NAME):$(TAG)

run-prod:
	docker compose -f docker/docker-compose-prod.yml up

# Build and run
build-run: build run

# Push to DockerHub
push:
	docker push $(IMAGE_NAME):$(TAG)

# Build and push
build-push: build push

# Build multi-platform and push
build-push-multi:
	docker buildx build --platform $(PLATFORM) -t $(IMAGE_NAME):$(TAG) --push .

# Login to DockerHub
login:
	docker login

# Tag with version
tag:
	@read -p "Enter version tag: " version; \
	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):$$version; \
	docker push $(IMAGE_NAME):$$version

# Clean up Docker images
clean:
	docker rmi $(IMAGE_NAME):$(TAG) || true

# Show help
help:
	@echo "Available commands:"
	@echo "  make build           - Build the Docker image"
	@echo "  make build-multi     - Build multi-platform image (amd64, arm64)"
	@echo "  make run             - Run the container locally"
	@echo "  make build-run       - Build and run the container"
	@echo "  make push            - Push image to DockerHub"
	@echo "  make build-push      - Build and push to DockerHub"
	@echo "  make build-push-multi - Build multi-platform and push to DockerHub"
	@echo "  make login           - Login to DockerHub"
	@echo "  make tag             - Tag and push a versioned image"
	@echo "  make clean           - Remove local Docker images"
	@echo ""
	@echo "Variables:"
	@echo "  TAG=<tag>            - Set image tag (default: latest)"
	@echo "  PLATFORM=<platforms> - Set build platforms (default: linux/amd64,linux/arm64)"

.PHONY: build build-multi run build-run push build-push build-push-multi login tag clean help
