     // Wait for the header to be loaded before initializing the menu
     document.addEventListener("headerLoaded", function () {
      console.log("Header loaded, initializing menu functionality");
  
      const hamburger = document.querySelector(".hamburger");
      const mobileMenu = document.querySelector(".mobile-menu");
      const closeMenu = document.querySelector(".close-menu");
      const menuOverlay = document.querySelector(".menu-overlay");
  
      // Debugging: Log the elements to ensure they are found
      console.log({
        hamburger,
        mobileMenu,
        closeMenu,
        menuOverlay,
      });
  
      if (!hamburger || !mobileMenu || !closeMenu || !menuOverlay) {
        console.error("One or more elements not found:", { hamburger, mobileMenu, closeMenu, menuOverlay });
        return; // Exit if any of the elements are missing
      }
  
      console.log("Menu elements found, adding event listeners");
  
      // Function to open the menu
      function openMenu() {
        console.log("Opening menu");
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scrolling
      }
  
      // Function to close the menu
      function closeMenuFunction() {
        console.log("Closing menu");
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling
      }
  
      // Attach event listeners
      hamburger.addEventListener("click", openMenu);
      closeMenu.addEventListener("click", closeMenuFunction);
      menuOverlay.addEventListener("click", closeMenuFunction);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeMenuFunction();
        }
      });
  
      // Close menu when resizing to desktop
      window.addEventListener("resize", function () {
        if (window.innerWidth > 920) {
          closeMenuFunction();
        }
      });
  
      console.log("Menu script initialized");
    });
  