window.__detectorino_prevLog = null;
function log(string) {
  if (window.__detectorino_prevLog === string) {
    return;
  }
  window.__detectorino_prevLog = string;
  console.log(`[detectorino]`, string);
}

log(`injected.js loaded`);

function getReactFiber(element) {
  // Try to get the React internal fiber from the element
  const fiberKey = Object.keys(element).find((key) =>
    key.startsWith("__reactFiber$")
  );

  log(`fiberKey: ${fiberKey}`);

  return fiberKey ? element[fiberKey] : null;
}

function getInnermostReactComponent(element) {
  let fiber = getReactFiber(element);
  while (fiber && fiber.child) {
    fiber = fiber.child;
  }
  return fiber;
}

function getComponentName(fiber) {
  return fiber && fiber.type
    ? fiber.type.name || "Anonymous Component"
    : "Unknown";
}

function getInnermostReactComponent(element) {
  let fiber = getReactFiber(element);

  // Traverse down to the deepest child in the fiber tree
  while (fiber && fiber.child) {
    fiber = fiber.child;
    while (fiber.sibling) {
      fiber = fiber.sibling; // Move to the sibling if it exists to find the deepest one
    }
  }

  return fiber;
}

function getComponentSource(fiber) {
  return fiber && fiber._debugSource
    ? `${fiber._debugSource.fileName}:${fiber._debugSource.lineNumber}`
    : "Unknown Source";
}

document.addEventListener("mouseover", (event) => {
  const fiber = getInnermostReactComponent(event.target);
  if (fiber) {
    const componentName = getComponentName(fiber);
    log(`Component: ${componentName}`);
  } else {
    log(`No Fiber Found`);
  }
});

document.addEventListener("click", (event) => {
  const fiber = getInnermostReactComponent(event.target);
  if (fiber) {
    const componentSource = getComponentSource(fiber);
    log(`Component Source: ${componentSource}`);
  } else {
    log(`No Fiber Found`);
  }
});
