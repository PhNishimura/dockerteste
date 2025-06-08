/*
[CR 7].Mudança de esquema de cores.
Botão para alternância de esquema de cores do website.
As cores devem ser mantidas ao reabrir o site em outra aba.
Para atender ao critério, utilizar o localStorage do navegador.
*/

// Alterna o tema com localStorage
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Carrega o tema salvo
    const savedTheme = localStorage.getItem("theme") || "light";
    root.setAttribute("data-theme", savedTheme);

    //Aciona com o botão
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
});



