#!/usr/bin/env bash

GIT_RAW_BASE_URL='https://raw.githubusercontent.com/mistweaverco'
ZANA_CLIENT_GIT_RAW_BASE_URL="${GIT_RAW_BASE_URL}/zana-client/refs/heads/main"

# Download the latest client config schema from the GitHub repository
curl -o static/client-config.schema.json "${ZANA_CLIENT_GIT_RAW_BASE_URL}/schemas/config.schema.json"
curl -o static/zana-lock.schema.json "${ZANA_CLIENT_GIT_RAW_BASE_URL}/schemas/lock.schema.json"

# Build the website
vp build
