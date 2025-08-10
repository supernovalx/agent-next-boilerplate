# 🔍 EVM Address Highlighter Chrome Extension

A Chrome extension that automatically detects and highlights Ethereum Virtual Machine (EVM) addresses on any web page, providing an interactive chat interface when users hover over them.

## 🌟 Features

- **Automatic Detection**: Scans web pages for EVM addresses (0x followed by 40 hexadecimal characters)
- **Visual Highlighting**: Highlights detected addresses with a subtle yellow background
- **Interactive Hover**: Shows a popup with address details and action buttons on hover
- **Portfolio Analysis**: Click "🚀 Analyze Portfolio" to copy a portfolio analysis prompt and open chat in new tab
- **Copy Functionality**: Click "📋 Copy Address" to copy the address to clipboard
- **Responsive Design**: Works on desktop and mobile browsers
- **Real-time Updates**: Detects addresses added dynamically to the page

## 📦 Installation

### Option 1: Load as Unpacked Extension (Development)

1. **Clone or Download** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the `chrome_extension` folder
5. **Verify Installation** - you should see "EVM Address Highlighter" in your extensions list

### Option 2: Chrome Web Store (Coming Soon)
The extension will be published to the Chrome Web Store for easy installation.

## 🧪 Testing

1. **Open the test page**: Open `test.html` in your browser after installing the extension
2. **Verify highlighting**: All EVM addresses should be highlighted with a yellow background
3. **Test hover functionality**: Hover over any highlighted address to see the popup
4. **Test portfolio analysis**: Click "🚀 Analyze Portfolio" to copy the prompt and open localhost:3001 in new tab
5. **Test copy feature**: Click "📋 Copy Address" to copy addresses to clipboard

## 🚀 Usage

Once installed, the extension works automatically on any website:

1. **Browse any website** with EVM addresses (e.g., Etherscan, OpenSea, DeFi apps)
2. **Addresses are automatically highlighted** with a yellow background
3. **Hover over highlighted addresses** to see additional options
4. **Click buttons** to interact with the address (analyze portfolio or copy)

## 🔧 Customization

### Modifying the Chat Integration

The extension now opens your chat application in a new tab. To customize it:

1. Edit the `openChatInterface()` method in `content.js`
2. Change the URL from `http://localhost:3001/` to your chat service URL
3. Modify the prompt template `portfolio of ${address} on base chain` as needed

### Styling Customization

All styles are defined in `styles.css`:
- `.evm-address-highlight` - Controls address highlighting
- `.evm-chat-popup` - Controls hover popup appearance
- `.evm-chat-modal` - Controls chat modal appearance

### Address Detection

The extension uses this regex pattern to detect EVM addresses:
```javascript
/0x[a-fA-F0-9]{40}/g
```

To modify address detection (e.g., for other blockchain formats), edit the `evmAddressRegex` in `content.js`.

## 📁 Project Structure

```
chrome_extension/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── styles.css           # Styling for UI components
├── test.html           # Test page with sample addresses
├── README.md          # This file
└── icons/            # Extension icons (placeholder)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🔒 Permissions

The extension requires these permissions:
- `activeTab` - Access to the current tab for highlighting addresses
- `scripting` - Inject content scripts to detect addresses
- `tabs` - Open new tabs for the chat interface

## 🌐 Browser Compatibility

- **Chrome**: Version 88+ (Manifest V3)
- **Edge**: Version 88+ (Chromium-based)
- **Opera**: Version 74+
- **Brave**: Latest version

## 🛠️ Development

### Local Development

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh button on the extension card
4. Reload any test pages to see changes

### Adding New Features

1. **Content Script** (`content.js`): Add address detection and UI logic
2. **Styles** (`styles.css`): Add styling for new UI components
3. **Manifest** (`manifest.json`): Add new permissions if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Addresses in `<script>` or `<style>` tags are ignored (by design)
- Very long pages may have slight performance impact during initial scan
- Chat interface is currently a demo - integrate with your preferred chat service

## 🔮 Future Enhancements

- [ ] Support for other blockchain address formats (Bitcoin, Solana, etc.)
- [ ] Integration with popular wallet services
- [ ] Address validation and checksum verification
- [ ] Transaction history lookup
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Customizable highlighting colors

## 💡 Tips

- **Performance**: The extension is optimized for performance but may take a moment on very large pages
- **Compatibility**: Works with single-page applications (SPAs) and dynamically loaded content
- **Privacy**: All processing happens locally - no data is sent to external servers

## 📞 Support

If you encounter any issues or have questions:
1. Check the test page to verify basic functionality
2. Open browser developer tools to check for console errors
3. Create an issue in the repository with details about the problem

---

Made with ❤️ for the Web3 community
