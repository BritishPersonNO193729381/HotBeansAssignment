/* ============================
   HOT BEANS SETTINGS SYSTEM
   LOCALSTORAGE PERSISTENCE
   SIMPLIFIED VERSION
=============================== */

/* -------------------------
   DEFAULT SETTINGS
------------------------- */

const defaultSettings = {
    enableBeans: true
};

/* -------------------------
   LOAD SETTINGS
------------------------- */

function loadSettings() {
    const saved = localStorage.getItem("hotBeansSettings");

    if (!saved) return { ...defaultSettings };

    try {
        return {
            ...defaultSettings,
            ...JSON.parse(saved)
        };
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
   APPLY SETTINGS
------------------------- */

function applySettings(settings) {
    const beansToggle = document.getElementById("toggle-beans");

    if (beansToggle) {
        beansToggle.checked = settings.enableBeans;
    }

    // Global site flag (used by bean system elsewhere)
    document.body.dataset.beansEnabled = settings.enableBeans;
}

/* -------------------------
   INIT
------------------------- */

let settings = loadSettings();
applySettings(settings);

/* -------------------------
   TOGGLE HANDLER
------------------------- */

const beansToggle = document.getElementById("toggle-beans");

if (beansToggle) {
    beansToggle.addEventListener("change", (e) => {
        settings.enableBeans = e.target.checked;
        saveSettings(settings);
        applySettings(settings);
    });
}

/* -------------------------
   OPTIONAL SAVE BUTTON
   (Now just forces sync, no duplication)
------------------------- */

const saveButton = document.getElementById("save-settings");

if (saveButton) {
    saveButton.addEventListener("click", () => {
        saveSettings(settings);
        applySettings(settings);

        alert("Settings saved successfully!");
    });
}