pipeline {
  agent any
  environment {
    IMAGE="kvnstanmayee/simple-express-app"
    TAG="1.0"
  }
  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        bat 'npm ci'
        bat 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        bat "docker build -t %IMAGE%:%TAG% ."
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat "echo %PASS% | docker login -u %USER% --password-stdin"
          bat "docker push %IMAGE%:%TAG%"
        }
      }
    }

  }
}
