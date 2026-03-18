terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ECR Repository
resource "aws_ecr_repository" "medical_chatbot" {
  name                 = var.ecr_repo_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Key Pair
resource "aws_key_pair" "medicalbot_key" {
  key_name   = "medicalbot-key"
  public_key = file("C:/Users/mark1/.ssh/medicalbot.pub")
}

# Security Group
resource "aws_security_group" "medicalbot_sg" {
  name        = "medicalbot-sg"
  description = "Security group for medical chatbot"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "medicalbot_ec2" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.medicalbot_key.key_name
  vpc_security_group_ids = [aws_security_group.medicalbot_sg.id]

  root_block_device {
    volume_size = 30
  }

  tags = {
    Name = "medical-chatbot"
  }
}