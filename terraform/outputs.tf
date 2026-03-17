output "ec2_public_ip" {
  description = "EC2 Public IP"
  value       = aws_instance.medicalbot_ec2.public_ip
}

output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = aws_ecr_repository.medical_chatbot.repository_url
}