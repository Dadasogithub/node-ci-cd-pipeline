pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh '''
            sonar-scanner \
            -Dsonar.projectKey=node-cicd-app \
            -Dsonar.sources=. \
            -Dsonar.host.url=$SONAR_HOST_URL
            '''
        }
    }
}

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-cicd-app:${BUILD_NUMBER} .'
            }
        }
         stage('Deploy') {
            steps {
                sh '''
                docker rm -f node-app || true

                docker run -d \
                -p 3000:3000 \
                --name node-app \
                node-cicd-app:${BUILD_NUMBER}
                '''
            }
        }
    }
}