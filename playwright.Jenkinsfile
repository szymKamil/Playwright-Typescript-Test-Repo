pipeline {
    agent {
        label 'playwright_docker'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/szymKamil/Playwright-Typescript-Test-Repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Results') {
            steps {
                script{
                try {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
                }
            } catch (Exception e) {
                echo "Błąd podczas publikowania raportu HTML: ${e.getMessage()}"
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true, allowEmptyArchive: true
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
         archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true  // screenshoty, wideo
        }
        failure {
            echo 'Testy Playwright zakończyły się niepowodzeniem!'
        }
        success {
            echo 'Wszystkie testy Playwright przeszły pomyślnie!'
        }
    }
}
