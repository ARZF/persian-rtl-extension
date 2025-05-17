// Get all checkbox elements
const enabledCheckbox = document.getElementById('enabled');
const detectMixedCheckbox = document.getElementById('detectMixed');
const persianNumbersCheckbox = document.getElementById('persianNumbers');

// Load saved settings
chrome.storage.sync.get(['enabled', 'detectMixed', 'persianNumbers'], (result) => {
    enabledCheckbox.checked = result.enabled ?? true;
    detectMixedCheckbox.checked = result.detectMixed ?? true;
    persianNumbersCheckbox.checked = result.persianNumbers ?? true;
});

// Save settings when changed
enabledCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ enabled: e.target.checked });
});

detectMixedCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ detectMixed: e.target.checked });
});

persianNumbersCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ persianNumbers: e.target.checked });
}); 