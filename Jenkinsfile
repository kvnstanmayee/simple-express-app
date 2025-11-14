pipeline {
  agent any
  environment {
    IMAGE="kvnstanmayee/simple-express-app"
    TAG="1.0"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install & Test') { steps { sh 'npm ci'; sh 'npm test' } }
    stage('Build') { steps { sh 'docker build -t $IMAGE:$TAG .' } }
    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh "echo $PASS | docker login -u $USER --password-stdin"
          sh "docker push $IMAGE:$TAG"
        }
      }
    }
  }
}
