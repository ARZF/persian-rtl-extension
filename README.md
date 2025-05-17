# Persian RTL Chat Extension

A Chrome extension that automatically detects and applies right-to-left (RTL) formatting to Persian text in chat interfaces while keeping English text and code blocks in their original format.

## Features

- 🔍 **Smart Persian Text Detection**
  - Automatically detects Persian text and applies RTL formatting
  - Preserves left-to-right formatting for English text
  - Maintains code blocks in their original format
  - Handles mixed Persian/English content intelligently

- ⚙️ **Customizable Settings**
  - Enable/disable the extension
  - Toggle mixed content detection
  - Enable Persian number styling

- 🎯 **Targeted Websites**
  - Works on specific LLM chat interfaces:
    - Deepseek Chat (chat.deepseek.com)
    - Deepseek (deepseek.com)
    - Grok (grok.com)
    - ChatGPT (chatgpt.com)

- 🎨 **Persian Font Support**
  - Uses Vazirmatn font for optimal Persian text display
  - Includes fallback to system fonts

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. **Enable the Extension**
   - Click the extension icon in Chrome
   - Use the toggle switch to enable/disable the extension

2. **Configure Settings**
   - Mixed Content Detection: Better handling of text containing both Persian and English
   - Persian Numbers: Apply Persian styling to numbers

3. **Automatic Detection**
   - The extension automatically detects Persian text and applies RTL
   - Code blocks and primarily English text remain unchanged
   - Mixed content is handled based on your settings

## How It Works

- Detects Persian text using Unicode character ranges
- Analyzes text content to determine the dominant language
- Preserves code blocks by detecting common code formatting
- Uses MutationObserver for real-time content updates
- Applies RTL formatting only when necessary

## Technical Details

The extension uses:
- Chrome Extension Manifest V3
- Custom font loading for Persian text
- Debounced DOM observation for performance
- Intelligent text direction handling

## Files Structure

```
persian-rtl-extension/
├── manifest.json        # Extension configuration
├── content.js          # Main functionality
├── popup.html          # Settings interface
├── popup.js           # Settings management
├── styles.css         # Styling rules
└── README.md          # Documentation
```

## Contributing

Feel free to submit issues and enhancement requests!
