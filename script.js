/* =========================================
   THE JOURNAL - JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENTS
    =============================== */

    const body = document.body;

    const themeBtn = document.getElementById("themeBtn");

    const menuBtn = document.getElementById("menuBtn");

    const navLinks = document.querySelector(".nav-links");

    const startWriting =
        document.getElementById("startWriting");

    const newEntryBtn =
        document.getElementById("newEntryBtn");

    const dashboardWrite =
        document.getElementById("dashboardWrite");

    const exploreBtn =
        document.getElementById("exploreBtn");

    const writeModal =
        document.getElementById("writeModal");

    const loginModal =
        document.getElementById("loginModal");

    const closeModal =
        document.getElementById("closeModal");

    const closeLogin =
        document.getElementById("closeLogin");

    const loginBtn =
        document.getElementById("loginBtn");

    const registerBtn =
        document.getElementById("registerBtn");

    const entryForm =
        document.getElementById("entryForm");

    const loginForm =
        document.getElementById("loginForm");

    const searchInput =
        document.getElementById("searchInput");

    const entriesGrid =
        document.getElementById("entriesGrid");

    const filters =
        document.querySelectorAll(".filter");


    /* ===============================
       THEME
    =============================== */

    const savedTheme =
        localStorage.getItem("journalTheme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeBtn.textContent = "☀";

    }


    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark");

        const darkMode =
            body.classList.contains("dark");

        themeBtn.textContent =
            darkMode ? "☀" : "☾";

        localStorage.setItem(
            "journalTheme",
            darkMode ? "dark" : "light"
        );

    });


    /* ===============================
       MOBILE MENU
    =============================== */

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });


    /* ===============================
       OPEN WRITE MODAL
    =============================== */

    function openWriteModal() {

        writeModal.classList.add("show");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            document.getElementById("entryTitle").focus();

        }, 100);

    }


    function closeWriteModal() {

        writeModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    startWriting.addEventListener(
        "click",
        openWriteModal
    );

    newEntryBtn.addEventListener(
        "click",
        openWriteModal
    );

    dashboardWrite.addEventListener(
        "click",
        openWriteModal
    );


    closeModal.addEventListener(
        "click",
        closeWriteModal
    );


    /* ===============================
       EXPLORE
    =============================== */

    exploreBtn.addEventListener("click", () => {

        document
            .getElementById("entries")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* ===============================
       LOGIN MODAL
    =============================== */

    loginBtn.addEventListener("click", () => {

        loginModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });


    closeLogin.addEventListener("click", () => {

        loginModal.classList.remove("show");

        document.body.style.overflow = "";

    });


    /* ===============================
       REGISTER BUTTON
    =============================== */

    registerBtn.addEventListener("click", () => {

        alert(
            "Registration page coming soon! ✦"
        );

    });


    /* ===============================
       LOGIN
    =============================== */

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        alert(
            "Demo login successful! Welcome back ✦"
        );

        loginModal.classList.remove("show");

        document.body.style.overflow = "";

        loginForm.reset();

    });


    /* ===============================
       FAVORITES
    =============================== */

    function updateStats() {

        const cards =
            document.querySelectorAll(".entry-card");

        const favorites =
            document.querySelectorAll(
                ".favorite-btn.active"
            );

        let words = 0;

        cards.forEach(card => {

            const text =
                card.querySelector("p");

            if (text) {

                words += text.innerText
                    .trim()
                    .split(/\s+/)
                    .length;

            }

        });


        document.getElementById(
            "totalEntries"
        ).textContent = cards.length;


        document.getElementById(
            "favoriteCount"
        ).textContent = favorites.length;


        document.getElementById(
            "wordCount"
        ).textContent = words;


        document.getElementById(
            "monthEntries"
        ).textContent = cards.length;

    }


    document.addEventListener(
        "click",
        (event) => {

            if (
                event.target.classList.contains(
                    "favorite-btn"
                )
            ) {

                event.target.classList.toggle(
                    "active"
                );

                event.target.textContent =
                    event.target.classList.contains(
                        "active"
                    )
                        ? "♥"
                        : "♡";

                updateStats();

            }

        }
    );


    /* ===============================
       FILTER SYSTEM
    =============================== */

    let currentFilter = "all";


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                filter.classList.add("active");

                currentFilter =
                    filter.dataset.filter;

                filterEntries();

            }
        );

    });


    /* ===============================
       SEARCH
    =============================== */

    searchInput.addEventListener(
        "input",
        filterEntries
    );


    function filterEntries() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const cards =
            document.querySelectorAll(
                ".entry-card"
            );


        cards.forEach(card => {

            const title =
                card.dataset.title
                    .toLowerCase();

            const category =
                card.dataset.category
                    .toLowerCase();

            const isFavorite =
                card.querySelector(
                    ".favorite-btn"
                ).classList.contains(
                    "active"
                );


            const matchesSearch =
                title.includes(search);


            let matchesFilter = true;


            if (
                currentFilter !== "all"
            ) {

                if (
                    currentFilter ===
                    "favorites"
                ) {

                    matchesFilter =
                        isFavorite;

                } else {

                    matchesFilter =
                        category ===
                        currentFilter;

                }

            }


            card.style.display =
                matchesSearch &&
                matchesFilter
                    ? "flex"
                    : "none";

        });

    }


    /* ===============================
       CREATE NEW ENTRY
    =============================== */

    entryForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const title =
                document.getElementById(
                    "entryTitle"
                ).value.trim();


            const category =
                document.getElementById(
                    "entryCategory"
                ).value;


            const text =
                document.getElementById(
                    "entryText"
                ).value.trim();


            if (!title || !text) {

                alert(
                    "Please enter a title and some text."
                );

                return;

            }


            const card =
                createEntryCard(
                    title,
                    category,
                    text
                );


            entriesGrid.prepend(card);


            entryForm.reset();

            closeWriteModal();

            updateStats();

            alert(
                "Your entry has been saved ✦"
            );

        }
    );


    /* ===============================
       CREATE CARD
    =============================== */

    function createEntryCard(
        title,
        category,
        text
    ) {

        const article =
            document.createElement("article");


        article.className =
            "entry-card";


        article.dataset.category =
            category;


        article.dataset.title =
            title;


        const today =
            new Date();


        const formattedDate =
            today.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }
            );


        const categoryData = {

            notes: {
                letter: "N",
                color: "purple"
            },

            ideas: {
                letter: "I",
                color: "orange"
            },

            memories: {
                letter: "M",
                color: "pink"
            }

        };


        const data =
            categoryData[category];


        const preview =
            text.length > 130
                ? text.substring(0, 130) + "..."
                : text;


        article.innerHTML = `

            <div class="card-top">

                <span class="category-icon ${data.color}">
                    ${data.letter}
                </span>

                <span class="entry-date">
                    ${formattedDate}
                </span>

            </div>

            <h3>${escapeHTML(title)}</h3>

            <p>
                ${escapeHTML(preview)}
            </p>

            <div class="card-bottom">

                <span>
                    The Journal
                </span>

                <button
                    class="favorite-btn"
                    title="Favorite"
                >
                    ♡
                </button>

            </div>

        `;


        return article;

    }


    /* ===============================
       HTML SAFETY
    =============================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    /* ===============================
       CLOSE MODAL ON BACKDROP
    =============================== */

    [writeModal, loginModal].forEach(
        modal => {

            modal.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                        document.body.style.overflow =
                            "";

                    }

                }
            );

        }
    );


    /* ===============================
       ESCAPE KEY
    =============================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                writeModal.classList.remove(
                    "show"
                );

                loginModal.classList.remove(
                    "show"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    /* ===============================
       INITIAL STATS
    =============================== */

    updateStats();

});