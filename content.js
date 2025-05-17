// Configuration and state management
let config = {
    enabled: true,
    detectMixed: true,
    persianNumbers: true
};

// Load configuration from storage
chrome.storage.sync.get(['enabled', 'detectMixed', 'persianNumbers'], (result) => {
    config = { ...config, ...result };
    document.body.dataset.persianRtlEnabled = config.enabled;
});

// Listen for configuration changes
chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
        config[key] = newValue;
    }
    document.body.dataset.persianRtlEnabled = config.enabled;
    applyRTL();
});

function isCodeBlock(element) {
    // Check if element is a code block or inside a code block
    const isPreOrCode = element.tagName === 'PRE' || element.tagName === 'CODE';
    const hasCodeParent = element.closest('pre, code');
    const hasCodeClass = element.classList.contains('code') || 
                        element.classList.contains('hljs') || 
                        element.classList.contains('language-') ||
                        element.classList.contains('prism-');
    
    return isPreOrCode || hasCodeParent || hasCodeClass;
}

function isPersian(text) {
    // Enhanced Persian detection
    const persianRegex = /[\u0600-\u06FF]/;
    const persianNumberRegex = /[۰-۹]/;
    const englishRegex = /[a-zA-Z]/;
    
    // Count characters
    const persianCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const englishCount = (text.match(/[a-zA-Z]/g) || []).length;
    const totalCount = text.replace(/\s/g, '').length;
    
    // If text is mostly English (more than 70% English characters), return false
    if (totalCount > 0 && (englishCount / totalCount) > 0.7) {
        return false;
    }
    
    // Check if text has any Persian characters
    const hasPersian = persianRegex.test(text);
    const hasPersianNumbers = persianNumberRegex.test(text);
    const hasEnglish = englishRegex.test(text);

    if (!hasPersian && !hasPersianNumbers) return false;
    
    return {
        isPersian: true,
        isMixed: hasEnglish,
        hasNumbers: hasPersianNumbers
    };
}

// Debounce function to limit processing frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function applyRTL() {
    if (!config.enabled) return;

    // More specific selectors for chat interfaces
    const chatElements = document.querySelectorAll([
        '.chat-message',
        '.message-content',
        '[role="dialog"] p',
        '[role="main"] p',
        '.conversation-content p, div, span'
    ].join(', '));

    chatElements.forEach(element => {
        // Skip code blocks
        if (isCodeBlock(element)) {
            element.classList.remove('persian-rtl', 'mixed-content', 'persian-numbers');
            return;
        }

        // Remove existing classes first
        element.classList.remove('persian-rtl', 'mixed-content', 'persian-numbers');
        
        const persianCheck = isPersian(element.textContent);
        if (persianCheck.isPersian) {
            element.classList.add('persian-rtl');
            
            if (persianCheck.isMixed && config.detectMixed) {
                element.classList.add('mixed-content');
            }
            
            if (persianCheck.hasNumbers && config.persianNumbers) {
                element.classList.add('persian-numbers');
            }
        }
    });
}

// Create a debounced version of applyRTL
const debouncedApplyRTL = debounce(applyRTL, 100);

// Set up the mutation observer with the debounced function
const observer = new MutationObserver(debouncedApplyRTL);

// Start observing with specific configuration
observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});

// Initial application
applyRTL();