function fetchAdvice() {
  fetch("https://api.adviceslip.com/advice", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const id = document.getElementById("advice-id");
      const text = document.querySelector(".card-text");

      if (data && data.slip && data.slip.advice && data.slip.id) {
        const adviceId = data.slip.id;
        const adviceText = data.slip.advice;

        id.textContent = adviceId;
        text.textContent = `"${adviceText}"`;
      } else {
        console.error("Invalid data format");
      }
    })
    .catch((err) => {
      console.error("Error fetching advice:", err);
    });
}

const fetchButton = document.getElementById("fetchBtn");
fetchButton.addEventListener("click", fetchAdvice);

fetchAdvice();
