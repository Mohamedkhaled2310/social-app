
document.addEventListener("DOMContentLoaded", function () {
  const buttonToggle = document.getElementById("buttonToggle");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebar = document.getElementById("sidebar");

  // Function to toggle the mobile sidebar
  function toggleSidebar() {
    mobileSidebar.classList.toggle("-translate-x-full");
  }

  // Add click event to the toggle button
  buttonToggle.addEventListener("click", toggleSidebar);

  // Optional: Close sidebar when clicking outside on small screens
  document.addEventListener("click", function (event) {
    const isClickInsideSidebar =
      mobileSidebar.contains(event.target) ||
      buttonToggle.contains(event.target);

    if (
      !isClickInsideSidebar &&
      !mobileSidebar.classList.contains("-translate-x-full")
    ) {
      mobileSidebar.classList.add("-translate-x-full");
    }
  });
});
