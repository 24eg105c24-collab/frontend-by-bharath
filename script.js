const typingText = "AI Powered Experiences • Futuristic Design • Smart Automation";
let typingIndex = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return;
    typingElement.textContent = typingText.slice(0, typingIndex);
    typingIndex += 1;

    if (typingIndex <= typingText.length) {
        setTimeout(typeEffect, 60);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initUserCards();
    initCounter();
    initForm();
});

function scrollToSection() {
    const target = document.getElementById("services");
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function initUserCards() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            const usersContainer = document.getElementById("users");
            if (!usersContainer) return;

            usersContainer.innerHTML = data.slice(0, 6).map((user) => {
                return `
                <article class="user-card">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <p>${user.company.name}</p>
                </article>`;
            }).join("");
        })
        .catch(() => {
            const usersContainer = document.getElementById("users");
            if (usersContainer) {
                usersContainer.innerHTML = "<p class=\"error-text\">Unable to load community members right now.</p>";
            }
        });
}

function initCounter() {
    const counterElement = document.getElementById("counter");
    if (!counterElement) return;

    let count = 0;
    const target = 250;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 6);

    const interval = setInterval(() => {
        count += 1;
        counterElement.textContent = count;
        if (count >= target) {
            clearInterval(interval);
        }
    }, stepTime);
}

function initForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameValue = document.getElementById("name").value.trim();
        const emailValue = document.getElementById("email").value.trim();
        const messageValue = document.getElementById("messageText").value.trim();

        if (!nameValue || !emailValue || !messageValue) {
            status.textContent = "Please complete all fields before sending.";
            status.style.color = "#ff6b6b";
            return;
        }

        status.textContent = "Message sent successfully. We’ll get back to you soon.";
        status.style.color = "#4fffb5";
        form.reset();
    });
}
