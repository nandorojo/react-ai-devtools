console.log("[detectorino] Background script loaded");

chrome.action.onClicked.addListener((tab) => {
  console.log("[detectorino] Extension icon clicked");
  const tabId = tab.id;
  if (!tabId) {
    console.error("[detectorino] No tab ID found");
    return;
  }
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ["content.js"],
    },
    () => {
      chrome.tabs.sendMessage(tabId, { command: "inject" });
    }
  );
});
