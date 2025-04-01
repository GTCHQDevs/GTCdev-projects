// Function to load HTML components (header & footer)
function loadComponent(elementId, filePath) {
  fetch(filePath) // Get the file
    .then(response => response.text()) // Convert response to text
    .then(data => {
      document.getElementById(elementId).innerHTML = data; // Insert into the page
    })
    .catch(error => console.log("Error loading " + filePath, error)); // Handle errors
}

// Run this when the page loads
window.onload = function() {
  loadComponent("header", "../components/header.html"); // Load header
  loadComponent("footer", "../components/footer.html"); // Load footer
};
