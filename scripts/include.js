document.addEventListener("DOMContentLoaded", function () {
  const includeElements = document.querySelectorAll("[id='header'], [id='footer']");

  includeElements.forEach((el) => {
    const file = `./components/${el.getAttribute("id")}.html`; // Add './' to correctly reference the components directory
    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then((html) => {
        el.innerHTML = html;

        // Dispatch a custom event after the content is loaded
        if (el.id === "header") {
          console.log("Dispatching headerLoaded event");
          document.dispatchEvent(new Event("headerLoaded"));
        }
        if (el.id === "footer") {
          console.log("Dispatching footerLoaded event");
          document.dispatchEvent(new Event("footerLoaded"));
        }
      })
      .catch((error) => console.error(error));
  });
});
