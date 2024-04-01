pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = 'sorrykim/basil:frontend'
        DOCKER_IMAGE_BACKEND = 'sorrykim/basil:backend'
        KUBERNETES_NAMESPACE = 'default'
    }

    stages {
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    dockerImage = ''
                    kubectlCmd = "sudo kubectl -n ${KUBERNETES_NAMESPACE}"

                    stage('Deploy Frontend') {
                        dockerImage = DOCKER_IMAGE_FRONTEND
                        sh "${kubectlCmd} set image deployment/frontend-deployment frontend=${dockerImage}"
                    }

                    stage('Deploy Backend') {
                        dockerImage = DOCKER_IMAGE_BACKEND
                        sh "${kubectlCmd} set image deployment/backend-deployment backend=${dockerImage}"
                    }
                }
            }
        }
    }
}
