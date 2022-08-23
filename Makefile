#!/usr/bin/make

include .env

.DEFAULT_GOAL := help
SHELL= /bin/sh
docker_bin= $(shell command -v docker 2> /dev/null)
docker_compose_bin= $(shell command -v docker-compose 2> /dev/null)
COMPOSE_CONFIG=--env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.$(MODE).yaml

help: ## Show this help
   @awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ ACTIONS ]---------
#Actions --------------------------------------------------
up: ## start all containers (in background) LOCAL
	$(docker_compose_bin) $(COMPOSE_CONFIG) up --no-recreate -d 
down: ## stop all started for development containers LOCAL
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
install: ## install deps
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p ${PORT}:${PORT} "node" npm install
shell-once: ## start node container
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p ${PORT}:${PORT} "node" bash
run-start: ## start node container and start app
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p ${PORT}:${PORT} "node" npm run start
run-dev: ## start node container and start app in development mode
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p ${PORT}:${PORT} "node" npm run dev
