#!/bin/bash

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=us-east-1
IMAGE_NAME=signage-angular
CONTAINER_NAME=signage-angular

# Login to ECR
aws ecr get-login-password --region $REGION | \
docker login --username AWS --password-stdin \
${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com

# Stop old container if exists
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Run new container
docker run -d \
  --restart unless-stopped \
  --name $CONTAINER_NAME \
  -p 8080:80 \
  -e API_BASE_URL=http://backend.example.com/api \
  -e AUTH_URL=http://auth.example.com \
  ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${IMAGE_NAME}:latest
