pipeline {
    agent any
    
    tools {
        maven "mvn" 
        jdk "jdk" 
    }

    environment {
        DOCKER_IMAGE_NAME = 'calculator'
        GITHUB_REPO_URL = 'https://github.com/coldnights1/ScientificCalculator'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('mvn build') {
            steps {
                script {
                    mvnHome = tool 'mvn'
                    sh "${mvnHome}/bin/mvn clean package"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Building Docker image
                    docker.build("${DOCKER_IMAGE_NAME}", '.')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script{
                    docker.withRegistry('', 'docker-hub-credentials') {
                    sh 'docker tag calculator prajit1999/calculator:latest'
                    sh 'docker push prajit1999/calculator'
                    }
                 }
            }
        }

   stage('Ansible') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory'
                     )
                }
            }
        }

    }
}
