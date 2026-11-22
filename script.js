
const SESSION_TIMEOUT = 15 * 60 * 1000;

const lockScreen = document.getElementById("lock-screen");
const app = document.getElementById("app");
const pinInput = document.getElementById("pin-input");

let activityTimer;
let isUnlocked = false;

async function hashPIN(pin) {
    const data = new TextEncoder().encode(pin);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function initializeApp() {
    const savedPIN = localStorage.getItem("nightingale_pin");

    if (!savedPIN) {
        const newPIN = prompt("Create your NIGHTINGALE access PIN:");

        if (!newPIN || !/^\d{4,12}$/.test(newPIN)) {
            alert("A PIN must contain 4–12 digits.");
            return;
        }

        const confirmation = prompt("Confirm your new PIN:");

        if (newPIN !== confirmation) {
            alert("PINs do not match. Reload to try again.");
            return;
        }

        localStorage.setItem("nightingale_pin", await hashPIN(newPIN));
        alert("NIGHTINGALE PIN successfully created.");
    }
}

async function unlockApp() {
    const enteredPIN = pinInput.value;
    const savedPIN = localStorage.getItem("nightingale_pin");

    if (!savedPIN || !/^\d{4,12}$/.test(enteredPIN)) {
        document.getElementById("lock-message").textContent =
            "Please enter a valid PIN.";
        return;
    }

    const enteredHash = await hashPIN(enteredPIN);

    if (enteredHash === savedPIN) {
        isUnlocked = true;
        lockScreen.classList.add("hidden");
        app.classList.remove("hidden");
        pinInput.value = "";
        resetSessionTimer();
    } else {
        document.getElementById("lock-message").textContent =
            "Incorrect PIN. Access denied.";
        pinInput.value = "";
    }
}

function lockApp() {
    isUnlocked = false;
    clearTimeout(activityTimer);

    app.classList.add("hidden");
    lockScreen.classList.remove("hidden");

    pinInput.value = "";
    document.getElementById("lock-message").textContent =
        "Your session has been locked.";
}

function resetSessionTimer() {
    if (!isUnlocked) return;

    clearTimeout(activityTimer);

    activityTimer = setTimeout(() => {
        lockApp();
    }, SESSION_TIMEOUT);
}

function navigate(page) {
    document.getElementById("page-title").textContent = page;
    document.getElementById("current-page").textContent =
        page.toUpperCase();

    document.getElementById("page-content").innerHTML =
        `<div class="welcome-card">
            <h2>${page}</h2>
            <p>Welcome to your ${page} workspace.</p>
        </div>`;

    resetSessionTimer();
}

["click", "keydown", "mousemove", "scroll", "touchstart"].forEach(event => {
    document.addEventListener(event, resetSessionTimer, {
        passive: true
    });
});

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetSessionTimer();
});

initializeApp();
