#!/bin/bash
set -e

dnf update -y

# Install Docker
dnf install -y docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user

# Install AWS CLI (required for ECR login)
dnf install -y awscli

# Install CodeDeploy dependencies
dnf install -y ruby wget

cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x install
./install auto

systemctl start codedeploy-agent
systemctl enable codedeploy-agent
