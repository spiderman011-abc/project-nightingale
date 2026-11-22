
/* =================================
   NIGHTINGALE v1.0.0
   Developed by SpiderGigi
   ================================= */

// APPLICATION INITIALIZATION

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    app.classList.remove("hidden");

    showDashboard();
});


// DASHBOARD

function showDashboard() {
    navigate("Dashboard");
}


// NAVIGATION

function navigate(page) {
    const pageTitle = document.getElementById("page-title");
    const currentPage = document.getElementById("current-page");
    const pageContent = document.getElementById("page-content");

    pageTitle.textContent = page === "Dashboard"
        ? "Good day, Gigi."
        : page;

    currentPage.textContent = page.toUpperCase();

    const pages = {
        "Dashboard": `
            <div class="welcome-card">
                <h2>Welcome to NIGHTINGALE.</h2>
                <p>Your workspace. Your system. Your rules.</p>
            </div>

            <div class="dashboard-grid">
                <div class="widget">
                    <h3>Study Center</h3>
                    <p>Your academic workspace.</p>
                </div>

                <div class="widget">
                    <h3>Research Library</h3>
                    <p>Your personal knowledge archive.</p>
                </div>

                <div class="widget">
                    <h3>Pomodoro</h3>
                    <p id="timer">25:00</p>
                </div>

                <div class="widget">
                    <h3>Daily Goals</h3>
                    <p>Make today productive.</p>
                </div>
            </div>
        `,

        "Study Center": `
            <div class="welcome-card">
                <h2>Study Center</h2>
                <p>Your academic workspace starts here.</p>
            </div>
        `,

        "Research Library": `
            <div class="welcome-card">
                <h2>Research Library</h2>
                <p>Organize your knowledge and research.</p>
            </div>
        `,

        "Privacy Center": `
            <div class="welcome-card">
                <h2>Privacy Center</h2>
                <p>Manage your workspace privacy preferences.</p>
            </div>
        `,

        "Activity Log": `
            <div class="welcome-card">
                <h2>Activity Log</h2>
                <p>Your workspace activity will appear here.</p>
            </div>
        `,

        "Settings": `
            <div class="welcome-card">
                <h2>Settings</h2>
                <p>Customize your NIGHTINGALE experience.</p>
            </div>
        `,

        "About NIGHTINGALE": `
            <div class="welcome-card">
                <h2>NIGHTINGALE</h2>
                <p>Version 1.0.0</p>
                <p>Developed by SpiderGigi.</p>
            </div>
        `
    };

    pageContent.innerHTML = pages[page] || `
        <div class="welcome-card">
            <h2>Page not found.</h2>
            <p>This workspace section does not exist yet.</p>
        </div>
    `;
}


// APPLICATION CONSOLE

console.log("NIGHTINGALE v1.0.0 initialized.");
console.log("Developed by SpiderGigi.");
console.log("System status: ONLINE.");
