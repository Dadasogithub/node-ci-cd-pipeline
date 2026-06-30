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
                    script {
                        def scannerHome = tool 'sonar-scanner'
                        withSonarQubeEnv('sonar') {
                            sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=node-cicd-app \
                            -Dsonar.sources=. \
                            -Dsonar.projectName=node-cicd-app
                            """
                        }
                    }
                }
            }
         
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-cicd-app:${BUILD_NUMBER} .'
            }
        }
    



        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                //  waitForQualityGate abortPipeline: true
                waitForQualityGate abortPipeline: false
              }
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

stage('Push Docker Image') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {

            sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

            docker tag node-cicd-app:${BUILD_NUMBER} \
            $DOCKER_USER/node-cicd-app:${BUILD_NUMBER}

            docker push $DOCKER_USER/node-cicd-app:${BUILD_NUMBER}
            '''
        }
    }
    }
}

stage('Deploy to Kubernetes') {
    steps {
        sh 'kubectl apply -f k8s/'
        sh 'kubectl rollout status deployment/node-app'
    }
}
}