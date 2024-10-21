console.log("[detectorino] Content script loaded");

interface InjectMessage {
  command: "inject";
}

chrome.runtime.onMessage.addListener(
  (
    message: InjectMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log("[detectorino] Message received in content script:", message);
    if (message.command === "inject") {
      console.log("[detectorino] Attempting to inject script");
      const script = document.createElement("script");
      const src = chrome.runtime.getURL("dist/injected.js");
      if (document.querySelector(`script[src="${src}"]`)) {
        console.log("[detectorino] Detectorino already injected");
        return;
      }
      script.src = src;
      (document.head || document.documentElement).appendChild(script);
      script.onload = () => {
        console.log("[detectorino] Injected script loaded successfully");
        script.remove();
      };
    }
  }
);
