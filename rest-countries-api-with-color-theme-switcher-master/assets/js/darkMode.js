// saving preference using local storage
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

// check if darkMode is enabled
const enableDarkMode = () => {
  // add darkmode class to the body
  document.body.classList.add("darkmode");
  //   update darkMode to local storage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // add darkmode class to the body
  document.body.classList.remove("darkmode");
  // update darkMode to local storage
  localStorage.setItem("darkMode", "disabled");
};

// when page is refreshed mode selected will still be on
if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
