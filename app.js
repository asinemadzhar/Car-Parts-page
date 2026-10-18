window.addEventListener("load", solve);

function solve() {
  const inputs = ["car-model", "car-year", "part-name", "part-number", "condition"].map((id) => document.getElementById(id));
  //vhodovete

  const nextButton = document.getElementById("next-btn");
  const infoList = document.querySelector(".info-list");
  const confirmList = document.querySelector(".confirm-list");

  const completeImg = document.getElementById("complete-img");
  const completeText = document.getElementById("complete-text");

  //1. next butona
  nextButton.addEventListener("click", function (event) {
    event.preventDefault();

    const values = inputs.map((input) => input.value);

    if (values.some((value) => value === "")) {
      return;
    }

    const [carModel, carYear, partName, partNumber, condition] = values;

    if (Number(carYear) < 1960 || Number(carYear) > 2025) {
      return;
    }

    const liElement = document.createElement("li");
    liElement.className = "part-content";

    const article = document.createElement("article");

    liElement.appendChild(article);

    const labels = ["Car Model", "Car Year", "Part Name", "Part Number", "Condition"];

    labels.forEach((label, index) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = `${label}: ${values[index]}`;
      article.appendChild(paragraph);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";

    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.className = "continue-btn";

    liElement.appendChild(editButton);
    liElement.appendChild(continueButton);
    infoList.appendChild(liElement);

    inputs.forEach((input) => {
      input.value = "";
    });

    nextButton.disabled = true;

    editButton.addEventListener("click", function () {
      inputs.forEach((input, index) => {
        input.value = values[index];
      });

      liElement.remove();

      nextButton.disabled = false;
    });

    continueButton.addEventListener("click", function () {
      const confirmLi = document.createElement("li");
      confirmLi.className = "part-content";

      const confirmArticle = article;

      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirm";
      confirmButton.className = "confirm-btn";

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.className = "cancel-btn";

      confirmLi.appendChild(confirmArticle);
      confirmLi.appendChild(confirmButton);
      confirmLi.appendChild(cancelButton);

      confirmList.appendChild(confirmLi);

      infoList.removeChild(liElement);

      confirmButton.addEventListener("click", function () {
        confirmLi.remove();
        nextButton.disabled = false;

        const img = document.getElementById("complete-img");
        img.style.visibility = "visible";

        let completeText = document.getElementById("complete-text");
        completeText.textContent = "Part is Ordered!";
      });

      cancelButton.addEventListener("click", function () {
        confirmLi.remove();

        nextButton.disabled = false;
      });
    });
  });
}
