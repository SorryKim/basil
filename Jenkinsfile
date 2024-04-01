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
                    }
                }
            }
        }
    }
}
