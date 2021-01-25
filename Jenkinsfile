node {
    docker.image('docker:19.03.12-dind').withRun('-e "TEST=test"') { c ->
        docker.image('docker:19.03.12-dind').inside("--link ${c.id}:dind") {
            /* Wait until mysql service is up */
            //sh 'while ! mysqladmin ping -hdb --silent; do sleep 1; done'
            sh 'pwd'
        }
        docker.image('node:15.6.0-alpine3.10').inside("--link ${c.id}:dind") {
            sh 'whoami ||true'
            sh 'uname -a'
            sh 'npm install'
            sh 'npm run lint'
            sh 'npm run test'
        }
    }
}


/*pipeline {
  agent none

  stages {
    stage('Install packages & lint & run tests') {
      agent {
        docker {
          image 'docker:19.03.12-dind'
          args '-e DOCKER_HOST=$DOCKER_HOST'
        }
      }

      steps {
        script {
            docker.image('node:15.6.0-alpine3.10').withRun('-e DOCKER_HOST=tcp://docker:2375') {
              sh 'npm install'
              sh 'npm run lint'
              sh 'npm run test'
            }
        }
      }

      post {
        always {
          deleteDir() 
        }
      }
    }
  }
}*/

// pipeline{
//    agent{
//      docker{
//        image "node:10-buster"
//        args "-v /var/run/docker.sock:/var/run/docker.sock -v /etc/passwd:/etc/passwd:ro"
//      }
//    }
//    stages{
//      stage("test"){
//        steps{
//          sh 'whoami || true'
//          sh 'pwd || true'
//          sh 'ls -ail || true'
//          sh 'uname -a || true'
//         sh 'npm install'
//         sh 'npm run lint'
//         sh 'npm run test'
//        }
//      }
//    }
// }
