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

                    stage('Deploy') {
                        dockerImage = DOCKER_IMAGE_FRONTEND
                        sh "${kubectlCmd} apply -f /root/test.yaml"
                        sh "${kubectlCmd} set image deployment/basil-backend basil-ctn-backend=basil:backend"
                        sh "${kubectlCmd} set image deployment/basil-frontend basil-ctn-frontend=basil:frontend"
                    }
                }
            }
        }
    }
}
