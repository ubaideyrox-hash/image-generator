#!/bin/bash
set -e

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws ecr get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin \
${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

docker stop signage-angular || true
docker rm signage-angular || true

docker run -d \
--name signage-angular \
-p 8080:80 \
-e API_BASE_URL=http://backend.example.com/api \
-e AUTH_URL=http://auth.example.com \
${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/signage-angular:latest
