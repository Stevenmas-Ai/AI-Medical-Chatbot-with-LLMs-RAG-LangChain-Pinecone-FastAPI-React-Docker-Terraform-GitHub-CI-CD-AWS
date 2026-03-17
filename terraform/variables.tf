variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "ecr_repo_name" {
  description = "ECR repository name"
  default     = "medical-chatbot"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.large"
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID for us-east-1"
  default     = "ami-0c7217cdde317cfec"
}