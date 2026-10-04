// ═══════════════════════════════════════════════════════════════
// Jenkinsfile — Master CI/CD Pipeline (Docker)
// Playwright TypeScript Framework
// Tests run inside Docker containers
// Naveen Automation Labs
// ═══════════════════════════════════════════════════════════════

pipeline {
    agent any

    tools {
        maven 'Maven-3.9'
        jdk 'JDK-17'
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['QA', 'dev', 'stage', 'Prod'],
            description: 'Select environment to run tests'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'regression', 'api-smoke'],
            description: 'Select test suite'
        )
    }

    environment {
        SLACK_CHANNEL  = '#general'
        DOCKER_IMAGE   = 'pw-framework'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }

    stages {

        // ═════════════════════════════════════════════════
        // STAGE 1: BUILD APP + UNIT TESTS
        // ═════════════════════════════════════════════════
        stage('Build & Unit Tests') {
            steps {
                echo "========================================="
                echo "  Building App + Running Unit Tests"
                echo "========================================="
                dir('dev-app') {
                    git url: 'https://github.com/jglick/simple-maven-project-with-tests.git',
                        branch: 'master'
                    sh 'mvn clean install -Dmaven.test.failure.ignore=true'
                }
            }
            post {
                always {
                    junit 'dev-app/target/surefire-reports/*.xml'
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 2: BUILD DOCKER IMAGE
        // ═════════════════════════════════════════════════
        stage('Build Docker Image') {
            steps {
                echo "========================================="
                echo "  Building Playwright Docker Image"
                echo "========================================="
                dir('qa-tests') {
                    git url: 'https://github.com/naveenanimation20/OpenCartWebAPIFramework.git',
                        branch: 'main'
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
                sh "docker images | grep ${DOCKER_IMAGE}"
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 3: DEPLOY DEV + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to DEV') {
            steps {
                echo "Deploying to DEV... ✅"
            }
        }

        stage('DEV - Sanity Tests') {
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on DEV (Docker)"
                echo "========================================="
                sh 'mkdir -p reports-dev/html allure-results-dev'
                withCredentials([
                    usernamePassword(credentialsId: 'dev-credentials',
                        usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'dev-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    sh """
                        docker run --rm \
                            -e CI=true \
                            -e ENV=dev \
                            -e BASE_URL=${BASE_URL} \
                            -e USERNAME=${USERNAME} \
                            -e PASSWORD=${PASSWORD} \
                            -e API_BASE_URL=${API_BASE_URL} \
                            -e API_TOKEN=${API_TOKEN} \
                            -e OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID} \
                            -e OAUTH_CLIENT_SECRET=${OAUTH_CLIENT_SECRET} \
                            -e GRANT_TYPE=client_credentials \
                            -v \${WORKSPACE}/reports-dev/html:/app/reports/html-report \
                            -v \${WORKSPACE}/allure-results-dev:/app/allure-results \
                            ${DOCKER_IMAGE} \
                            npx playwright test --project=chromium --grep @smoke
                    """
                }
            }
            post {
                always {
                    sh 'mkdir -p reports-dev/allure'
                    sh 'npx allure generate allure-results-dev --clean -o reports-dev/allure || true'
                    publishHTML(target: [
                        reportName: 'DEV Sanity - PW HTML Report',
                        reportDir: 'reports-dev/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'DEV Sanity - Allure Report',
                        reportDir: 'reports-dev/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 4: DEPLOY QA + REGRESSION
        // ═════════════════════════════════════════════════
        stage('Deploy to QA') {
            steps {
                echo "Deploying to QA... ✅"
            }
        }

        stage('QA - Regression Tests') {
            steps {
                echo "========================================="
                echo "  Running REGRESSION on QA (Docker)"
                echo "========================================="
                sh 'mkdir -p reports-qa/html allure-results-qa'
                withCredentials([
                    usernamePassword(credentialsId: 'qa-credentials',
                        usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'qa-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    sh """
                        docker run --rm \
                            -e CI=true \
                            -e ENV=qa \
                            -e BASE_URL=${BASE_URL} \
                            -e USERNAME=${USERNAME} \
                            -e PASSWORD=${PASSWORD} \
                            -e API_BASE_URL=${API_BASE_URL} \
                            -e API_TOKEN=${API_TOKEN} \
                            -e OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID} \
                            -e OAUTH_CLIENT_SECRET=${OAUTH_CLIENT_SECRET} \
                            -e GRANT_TYPE=client_credentials \
                            -v \${WORKSPACE}/reports-qa/html:/app/reports/html-report \
                            -v \${WORKSPACE}/allure-results-qa:/app/allure-results \
                            ${DOCKER_IMAGE} \
                            npx playwright test --project=chromium
                    """
                }
            }
            post {
                always {
                    sh 'mkdir -p reports-qa/allure'
                    sh 'npx allure generate allure-results-qa --clean -o reports-qa/allure || true'
                    publishHTML(target: [
                        reportName: 'QA Regression - PW HTML Report',
                        reportDir: 'reports-qa/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'QA Regression - Allure Report',
                        reportDir: 'reports-qa/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 5: DEPLOY STAGE + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to STAGE') {
            steps {
                echo "Deploying to STAGE... ✅"
            }
        }

        stage('STAGE - Sanity Tests') {
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on STAGE (Docker)"
                echo "========================================="
                sh 'mkdir -p reports-stage/html allure-results-stage'
                withCredentials([
                    usernamePassword(credentialsId: 'stage-credentials',
                        usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'stage-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    sh """
                        docker run --rm \
                            -e CI=true \
                            -e ENV=stage \
                            -e BASE_URL=${BASE_URL} \
                            -e USERNAME=${USERNAME} \
                            -e PASSWORD=${PASSWORD} \
                            -e API_BASE_URL=${API_BASE_URL} \
                            -e API_TOKEN=${API_TOKEN} \
                            -e OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID} \
                            -e OAUTH_CLIENT_SECRET=${OAUTH_CLIENT_SECRET} \
                            -e GRANT_TYPE=client_credentials \
                            -v \${WORKSPACE}/reports-stage/html:/app/reports/html-report \
                            -v \${WORKSPACE}/allure-results-stage:/app/allure-results \
                            ${DOCKER_IMAGE} \
                            npx playwright test --project=chromium --grep @smoke
                    """
                }
            }
            post {
                always {
                    sh 'mkdir -p reports-stage/allure'
                    sh 'npx allure generate allure-results-stage --clean -o reports-stage/allure || true'
                    publishHTML(target: [
                        reportName: 'STAGE Sanity - PW HTML Report',
                        reportDir: 'reports-stage/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'STAGE Sanity - Allure Report',
                        reportDir: 'reports-stage/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 6: DEPLOY PROD + SMOKE (with approval)
        // ═════════════════════════════════════════════════
        stage('Approval for PROD') {
            steps {
                input message: 'Deploy to PROD?',
                    ok: 'Yes, Deploy!',
                    submitter: 'admin,naveen'
            }
        }

        stage('Deploy to PROD') {
            steps {
                echo "Deploying to PROD... ✅"
            }
        }

        stage('PROD - Smoke Tests') {
            steps {
                echo "========================================="
                echo "  Running SMOKE @smoke on PROD (Docker)"
                echo "========================================="
                sh 'mkdir -p reports-prod/html allure-results-prod'
                withCredentials([
                    usernamePassword(credentialsId: 'prod-credentials',
                        usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'prod-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    sh """
                        docker run --rm \
                            -e CI=true \
                            -e ENV=prod \
                            -e BASE_URL=${BASE_URL} \
                            -e USERNAME=${USERNAME} \
                            -e PASSWORD=${PASSWORD} \
                            -e API_BASE_URL=${API_BASE_URL} \
                            -e API_TOKEN=${API_TOKEN} \
                            -e OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID} \
                            -e OAUTH_CLIENT_SECRET=${OAUTH_CLIENT_SECRET} \
                            -e GRANT_TYPE=client_credentials \
                            -v \${WORKSPACE}/reports-prod/html:/app/reports/html-report \
                            -v \${WORKSPACE}/allure-results-prod:/app/allure-results \
                            ${DOCKER_IMAGE} \
                            npx playwright test --project=chromium --grep @smoke
                    """
                }
            }
            post {
                always {
                    sh 'mkdir -p reports-prod/allure'
                    sh 'npx allure generate allure-results-prod --clean -o reports-prod/allure || true'
                    publishHTML(target: [
                        reportName: 'PROD Smoke - PW HTML Report',
                        reportDir: 'reports-prod/html',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                    publishHTML(target: [
                        reportName: 'PROD Smoke - Allure Report',
                        reportDir: 'reports-prod/allure',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }
    }

    // ═════════════════════════════════════════════════════
    // POST — CLEANUP + EMAIL + SLACK
    // ═════════════════════════════════════════════════════
    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult
                def statusEmoji = buildStatus == 'SUCCESS' ? '✅' : '❌'
                def statusColor = buildStatus == 'SUCCESS' ? 'good' : 'danger'

                // Slack Notification
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: statusColor,
                    message: """
🎭 *Playwright CI/CD Pipeline Report* 🐳

*Overall: ${statusEmoji} ${buildStatus}*
*Mode:* `Docker Containers`
*Environment:* `${params.ENVIRONMENT}`
*Build:* #${env.BUILD_NUMBER}
*Duration:* ${currentBuild.durationString.replace(' and counting', '')}

📊 <${env.BUILD_URL}|View Reports in Jenkins>
🔍 <${env.BUILD_URL}console|View Console Logs>
                    """
                )

                // Email Notification
                emailext(
                    to: 'naveenanimation20@gmail.com,training@naveenautomationlabs.com',
                    subject: "🎭 CI/CD (Docker) — ${statusEmoji} ${buildStatus} — Build #${env.BUILD_NUMBER}",
                    mimeType: 'text/html',
                    body: """
                        <html>
                        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
                            <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 30px; text-align: center;">
                                    <h1 style="margin: 0; font-size: 24px;">🎭 Playwright CI/CD Dashboard 🐳</h1>
                                    <p style="margin: 8px 0 0; opacity: 0.8;">Docker Pipeline Report</p>
                                    <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 12px; background: ${buildStatus == 'SUCCESS' ? '#28a745' : '#dc3545'}; color: white;">
                                        ${statusEmoji} ${buildStatus}
                                    </span>
                                </div>
                                <div style="padding: 24px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 10px; color: #666;">Mode</td><td style="padding: 10px; font-weight: bold;">🐳 Docker Containers</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Environment</td><td style="padding: 10px; font-weight: bold;">${params.ENVIRONMENT}</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Build</td><td style="padding: 10px; font-weight: bold;">#${env.BUILD_NUMBER}</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Duration</td><td style="padding: 10px; font-weight: bold;">${currentBuild.durationString.replace(' and counting', '')}</td></tr>
                                    </table>
                                </div>
                                <div style="background: #f8f9fa; padding: 20px 24px; border-top: 1px solid #eee;">
                                    <h3 style="margin: 0 0 12px;">📊 Reports</h3>
                                    <a href="${env.BUILD_URL}" style="display: inline-block; padding: 10px 20px; background: #1a1a2e; color: white; text-decoration: none; border-radius: 6px; margin: 4px;">📁 Open Jenkins Build</a>
                                    <a href="${env.BUILD_URL}console" style="display: inline-block; padding: 10px 20px; background: #6c757d; color: white; text-decoration: none; border-radius: 6px; margin: 4px;">🔍 Console Logs</a>
                                </div>
                                <div style="text-align: center; padding: 16px; color: #999; font-size: 12px;">
                                    Naveen Automation Labs | Playwright Framework
                                </div>
                            </div>
                        </body>
                        </html>
                    """
                )
            }

            // Cleanup Docker image after pipeline
            sh "docker rmi ${DOCKER_IMAGE} || true"
        }
        success {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ✅ SUCCESS (Docker)'
            echo '═══════════════════════════════════════════'
        }
        failure {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ❌ FAILED (Docker)'
            echo '═══════════════════════════════════════════'
        }
    }
}