/* ============================
   HOT BEANS SETTINGS SYSTEM
   LOCALSTORAGE PERSISTENCE

   DO NOT TOUCH AT ALL. ITS HYPERSENSITIVE 
   CODE THAT CAN BREAK THE ENTIRE WEBSITE 
   IF YOU CHANGE EVEN A SINGLE CHARACTER.

   THIS TOOK ME A WEEK TO MAKE.

   ONLY GOD, CHATGPT AND I KNOWS HOW 
   THIS WORKS.
=============================== */

/* -------------------------
   DEFAULT SETTINGS
------------------------- */

const defaultSettings = {
    enableBeans: true,
    enableInteraction: true,
    beanStyle: "BrownBeansCurrent.png"
};

/* -------------------------
   LOAD SETTINGS
------------------------- */

function loadSettings() {
    const saved = localStorage.getItem("hotBeansSettings");

    if (!saved) {
        return { ...defaultSettings };
    }

    try {
        return { ...defaultSettings, ...JSON.parse(saved) };
    } catch (e) {
        console.error("Settings corrupted. Resetting to defaults.");
        return { ...defaultSettings };
    }
}

/* -------------------------
   SAVE SETTINGS
------------------------- */

function saveSettings(settings) {
    localStorage.setItem("hotBeansSettings", JSON.stringify(settings));
}

/* -------------------------
   APPLY SETTINGS TO UI
------------------------- */

function applySettings(settings) {

    // Checkbox: Enable Beans
    const beansToggle = document.getElementById("toggle-beans");
    if (beansToggle) {
        beansToggle.checked = settings.enableBeans;
    }

    // Checkbox: Interaction
    const interactionToggle = document.getElementById("toggle-interaction");
    if (interactionToggle) {
        interactionToggle.checked = settings.enableInteraction;
    }

    // Dropdown: Bean Style
    const beanStyleSelect = document.getElementById("bean-style");
    if (beanStyleSelect) {
        beanStyleSelect.value = settings.beanStyle;
    }

    // OPTIONAL: apply to actual site visuals if present
    document.body.dataset.beansEnabled = settings.enableBeans;
    document.body.dataset.beanInteraction = settings.enableInteraction;
    document.body.dataset.beanStyle = settings.beanStyle;
}

/* -------------------------
   INIT
------------------------- */

let settings = loadSettings();
applySettings(settings);

/* -------------------------
   EVENT LISTENERS
------------------------- */

// Toggle Beans
document.getElementById("toggle-beans").addEventListener("change", (e) => {
    settings.enableBeans = e.target.checked;
    saveSettings(settings);
    applySettings(settings);
});

// Toggle Interaction
document.getElementById("toggle-interaction").addEventListener("change", (e) => {
    settings.enableInteraction = e.target.checked;
    saveSettings(settings);
    applySettings(settings);
});

// Bean Style Dropdown
document.getElementById("bean-style").addEventListener("change", (e) => {
    settings.beanStyle = e.target.value;
    saveSettings(settings);
    applySettings(settings);
});

/* -------------------------
   SAVE BUTTON HANDLER
------------------------- */

document.getElementById("save-settings").addEventListener("click", () => {

    // Re-read values directly from UI (safe + reliable)

    settings.enableBeans = document.getElementById("toggle-beans").checked;
    settings.enableInteraction = document.getElementById("toggle-interaction").checked;
    settings.beanStyle = document.getElementById("bean-style").value;

    // Save to localStorage
    saveSettings(settings);

    // Re-apply (optional but keeps everything synced)
    applySettings(settings);

    // Feedback
    alert("Settings saved successfully!");
});