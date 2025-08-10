// EVM Address Highlighter Content Script

class EVMAddressHighlighter {
  constructor() {
    this.evmAddressRegex = /0x[a-fA-F0-9]{40}/g;
    this.highlightedAddresses = new Set();
    this.currentHoverElement = null;
    this.chatPopup = null;
    this.init();
  }

  init() {
    this.highlightAddresses();
    this.setupMutationObserver();
  }

  // Detect and highlight EVM addresses on the page
  highlightAddresses() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script and style elements
          const parent = node.parentElement;
          if (
            parent &&
            (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          // Only process text nodes that contain potential EVM addresses
          return this.evmAddressRegex.test(node.textContent)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => this.processTextNode(textNode));
  }

  processTextNode(textNode) {
    const text = textNode.textContent;
    const matches = [...text.matchAll(this.evmAddressRegex)];

    if (matches.length === 0) return;

    const parent = textNode.parentElement;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    matches.forEach((match) => {
      const address = match[0];
      const startIndex = match.index;
      const endIndex = startIndex + address.length;

      // Add text before the address
      if (startIndex > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, startIndex))
        );
      }

      // Create highlighted span for the address
      const span = document.createElement("span");
      span.className = "evm-address-highlight";
      span.textContent = address;
      span.dataset.address = address;

      // Add hover event listeners
      span.addEventListener("mouseenter", (e) => this.handleMouseEnter(e));
      span.addEventListener("mouseleave", (e) => this.handleMouseLeave(e));

      fragment.appendChild(span);
      lastIndex = endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }

  handleMouseEnter(event) {
    const span = event.target;
    const address = span.dataset.address;

    // Clear any existing popup
    this.removeChatPopup();

    this.currentHoverElement = span;

    // Create chat popup after a short delay
    setTimeout(() => {
      if (this.currentHoverElement === span) {
        this.showChatPopup(span, address);
      }
    }, 300);
  }

  handleMouseLeave(event) {
    const span = event.target;
    this.currentHoverElement = null;

    // Remove popup after a delay to allow moving to the popup
    setTimeout(() => {
      if (
        !this.currentHoverElement &&
        this.chatPopup &&
        !this.chatPopup.matches(":hover")
      ) {
        this.removeChatPopup();
      }
    }, 200);
  }

  showChatPopup(element, address) {
    const popup = document.createElement("div");
    popup.className = "evm-chat-popup";
    popup.innerHTML = `
      <div class="evm-chat-header">
        <span class="evm-address-label">EVM Address:</span>
        <span class="evm-address-value">${this.truncateAddress(address)}</span>
        <button class="evm-chat-close">×</button>
      </div>
      <div class="evm-chat-actions">
        <button class="evm-chat-button" data-address="${address}">
          🚀 Analyze Portfolio
        </button>
        <button class="evm-copy-button" data-address="${address}">
          📋 Copy Address
        </button>
      </div>
    `;

    // Position the popup
    const rect = element.getBoundingClientRect();
    popup.style.position = "fixed";
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + 5}px`;
    popup.style.zIndex = "10000";

    // Add event listeners
    popup.querySelector(".evm-chat-button").addEventListener("click", () => {
      this.openChatInterface(address);
    });

    popup.querySelector(".evm-copy-button").addEventListener("click", () => {
      this.copyAddress(address);
    });

    popup.querySelector(".evm-chat-close").addEventListener("click", () => {
      this.removeChatPopup();
    });

    // Keep popup open when hovering over it
    popup.addEventListener("mouseenter", () => {
      this.currentHoverElement = popup;
    });

    popup.addEventListener("mouseleave", () => {
      this.currentHoverElement = null;
      setTimeout(() => {
        if (!this.currentHoverElement) {
          this.removeChatPopup();
        }
      }, 200);
    });

    document.body.appendChild(popup);
    this.chatPopup = popup;
  }

  openChatInterface(address) {
    // Create the prompt with the address
    const prompt = `portfolio of ${address} on base chain`;

    // Copy prompt to clipboard
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        // Show temporary success message
        this.showCopySuccess("Prompt copied to clipboard!");

        // Open chat URL in new tab
        window.open("http://localhost:3001/", "_blank");

        // Remove the popup
        this.removeChatPopup();
      })
      .catch((err) => {
        console.error("Failed to copy prompt:", err);
        // Still open the chat even if copy fails
        window.open("http://localhost:3001/", "_blank");
        this.removeChatPopup();
      });
  }

  showCopySuccess(message) {
    // Create a temporary success notification
    const notification = document.createElement("div");
    notification.className = "evm-copy-notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 10002;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.3s ease-out";
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }

  copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
      // Show temporary success message
      const popup = this.chatPopup;
      if (popup) {
        const copyBtn = popup.querySelector(".evm-copy-button");
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 1500);
      }
    });
  }

  truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  removeChatPopup() {
    if (this.chatPopup) {
      document.body.removeChild(this.chatPopup);
      this.chatPopup = null;
    }
  }

  // Set up mutation observer to handle dynamically added content
  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added element contains EVM addresses
            const walker = document.createTreeWalker(
              node,
              NodeFilter.SHOW_TEXT,
              {
                acceptNode: (textNode) => {
                  const parent = textNode.parentElement;
                  if (
                    parent &&
                    (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")
                  ) {
                    return NodeFilter.FILTER_REJECT;
                  }
                  return this.evmAddressRegex.test(textNode.textContent)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
                },
              }
            );

            const textNodes = [];
            let textNode;
            while ((textNode = walker.nextNode())) {
              textNodes.push(textNode);
            }

            textNodes.forEach((tn) => this.processTextNode(tn));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

// Initialize the highlighter when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new EVMAddressHighlighter();
  });
} else {
  new EVMAddressHighlighter();
}
