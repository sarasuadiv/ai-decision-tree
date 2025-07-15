// Decision Tree State Management
class DecisionTree {
    constructor() {
        this.currentStep = 'start';
        this.answers = {};
        this.history = [];
        this.totalSteps = 6;
        this.init();
    }

    init() {
        this.updateProgress();
        this.updateNavigation();
    }

    startAssessment() {
        this.currentStep = 'q1';
        this.history.push('start');
        this.showScreen('q1-screen');
        this.updateProgress();
        this.updateNavigation();
    }

    answerQuestion(questionId, answer) {
        this.answers[questionId] = answer;
        this.history.push(this.currentStep);
        
        const nextStep = this.getNextStep(questionId, answer);
        this.currentStep = nextStep;
        
        if (nextStep.startsWith('result-')) {
            this.showResult(nextStep);
        } else {
            this.showScreen(nextStep + '-screen');
        }
        
        this.updateProgress();
        this.updateNavigation();
    }

    getNextStep(questionId, answer) {
        const flowMap = {
            'q1': {
                'yes': 'q2',
                'no': 'result-no-ai'
            },
            'q2': {
                'yes': 'result-traditional',
                'no': 'q3'
            },
            'q3': {
                'specific': 'result-narrow-ai',
                'broad': 'q4'
            },
            'q4': {
                'automation': 'q5',
                'augmentation': 'q5'
            },
            'q5': {
                'yes': 'result-address-concerns',
                'no': 'q6'
            },
            'q6': {
                'yes': this.answers.q4 === 'automation' ? 'result-automation' : 'result-augmentation',
                'no': 'result-build-readiness'
            }
        };

        // Special handling for Q6 based on Q4 answer
        if (questionId === 'q6' && answer === 'yes') {
            if (this.answers.q4 === 'automation') {
                return 'result-automation';
            } else if (this.answers.q4 === 'augmentation') {
                return 'result-augmentation';
            } else {
                return 'result-proceed';
            }
        }

        return flowMap[questionId] ? flowMap[questionId][answer] : 'result-proceed';
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showResult(resultId) {
        this.showScreen(resultId);
        this.currentStep = resultId;
    }

    goBack() {
        if (this.history.length > 0) {
            const previousStep = this.history.pop();
            
            // Remove the last answer if going back from a question
            if (this.currentStep.startsWith('q') && this.currentStep !== 'start') {
                const currentQuestionId = this.currentStep.replace('-screen', '');
                delete this.answers[currentQuestionId];
            }
            
            this.currentStep = previousStep;
            
            if (previousStep === 'start') {
                this.showScreen('start-screen');
            } else if (previousStep.startsWith('result-')) {
                this.showScreen(previousStep);
            } else {
                this.showScreen(previousStep + '-screen');
            }
            
            this.updateProgress();
            this.updateNavigation();
        }
    }

    restart() {
        this.currentStep = 'start';
        this.answers = {};
        this.history = [];
        this.showScreen('start-screen');
        this.updateProgress();
        this.updateNavigation();
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        let currentStepNumber = 0;
        let progressPercentage = 0;
        
        if (this.currentStep === 'start') {
            currentStepNumber = 0;
            progressPercentage = 0;
        } else if (this.currentStep.startsWith('result-')) {
            currentStepNumber = this.totalSteps;
            progressPercentage = 100;
        } else {
            // Extract question number
            const questionMatch = this.currentStep.match(/q(\d+)/);
            if (questionMatch) {
                currentStepNumber = parseInt(questionMatch[1]);
                progressPercentage = (currentStepNumber / this.totalSteps) * 100;
            }
        }
        
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }
        
        if (progressText) {
            if (this.currentStep.startsWith('result-')) {
                progressText.textContent = 'Assessment Complete';
            } else if (this.currentStep === 'start') {
                progressText.textContent = 'Ready to Begin';
            } else {
                progressText.textContent = `Step ${currentStepNumber} of ${this.totalSteps}`;
            }
        }
    }

    updateNavigation() {
        const backBtn = document.getElementById('backBtn');
        
        if (backBtn) {
            if (this.history.length > 0 && this.currentStep !== 'start') {
                backBtn.style.display = 'inline-block';
            } else {
                backBtn.style.display = 'none';
            }
        }
    }

    // Analytics and tracking (placeholder for future implementation)
    trackAnswer(questionId, answer) {
        // This could be used to track user paths for analytics
        console.log(`Question ${questionId}: ${answer}`);
    }

    // Export results for sharing or saving
    exportResults() {
        const result = {
            answers: this.answers,
            finalResult: this.currentStep,
            timestamp: new Date().toISOString(),
            path: this.history.concat([this.currentStep])
        };
        
        return JSON.stringify(result, null, 2);
    }
}

// Global instance
let decisionTree;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    decisionTree = new DecisionTree();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            decisionTree.restart();
        } else if (e.key === 'Backspace' && e.ctrlKey) {
            e.preventDefault();
            decisionTree.goBack();
        }
    });
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Global functions for HTML onclick handlers
function startAssessment() {
    decisionTree.startAssessment();
}

function answerQuestion(questionId, answer) {
    decisionTree.answerQuestion(questionId, answer);
}

function goBack() {
    decisionTree.goBack();
}

function restart() {
    decisionTree.restart();
}

// Utility functions
function copyResults() {
    const results = decisionTree.exportResults();
    navigator.clipboard.writeText(results).then(function() {
        showNotification('Results copied to clipboard!');
    }).catch(function() {
        console.log('Could not copy results to clipboard');
    });
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Could send error reports to analytics service
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels and roles where needed
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add focus management
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.setAttribute('tabindex', '-1');
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DecisionTree };
}

