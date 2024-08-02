pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = 'DockerHubCred'
        DOCKER_IMAGE_NAME = 'prajit1999/sudoku'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [[url: 'https://github.com/coldnights1/Sudoku.git']]
                ])
            }
        }

        stage('Build React App') {
            steps {
            
                    sh 'npm install'
                    sh 'CI=false npm run build'
                
            }
        }

        stage('Build Docker Image') {
            steps {
                
                    script {
                        docker.build("${DOCKER_IMAGE_NAME}", '.')
                    }    
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker tag ${DOCKER_IMAGE_NAME}:latest ${DOCKER_IMAGE_NAME}:latest"
                        sh "docker push ${DOCKER_IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'ansibledeploy/deploy.yml',
                        inventory: 'ansibledeploy/inventory',
                    )
                }
            }
        }
    }
}