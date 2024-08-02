pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/coldnights1/Sudoku'
            }
        }
        stage('Build Image '){
            steps{
                echo 'Building docker Image'
                sh "docker build -t $DOCKERHUB_USER/sudoku -f Dockerfile .";   
            }
        }
        stage('Login into docker hub & Push Image to DockerHub'){
            steps{
                echo 'Pushing Images into DockerHub'
                script {
                    docker.withRegistry('', 'prajit1999') {
                        sh 'docker push $DOCKERHUB_USER/sudoku';
                    }
                }
            }
        }
        stage('Delete Image from localsystem'){
            steps{
                echo 'Deleting Docker Image in docker'
                sh 'docker rmi $DOCKERHUB_USER/sudoku';
            }
        }
        stage('Run ansible playbook'){
            steps{
                script {
                    ansiblePlaybook(
                        playbook: 'playbook.yml',
                        inventory: 'inventory'
                    )
                }
            }
        }
    }
}
