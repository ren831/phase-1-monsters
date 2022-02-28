document.addEventListener("DOMContentLoaded", () => {
  fetchMonster();
  createForm();
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");
  const pageNum = 1;

  document.querySelector("#monster-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.querySelector("#monster-name").value;
    let age = document.querySelector("#monster-age").value;
    let description = document.querySelector("#monster-description").value;

    monsterObj = {
      name,
      age,
      description,
    };
    postMonster(monsterObj);

    backButton.addEventListener("click", () => {
      console.log("hi");
    });

    forwardButton.addEventListener("click", () => {});
  });
});

const createForm = () => {
  let formContainer = document.querySelector("#create-monster");
  let form = document.createElement("form");
  form.id = "monster-form";
  let nameInput = document.createElement("input");
  let nameLabel = document.createElement("label");
  let ageInput = document.createElement("input");
  let ageLabel = document.createElement("label");
  let descriptionInput = document.createElement("input");
  let descriptionLabel = document.createElement("label");
  let h2 = document.createElement("h2");
  let button = document.createElement("button");
  button.innerText = "Make Monster";
  nameInput.id = "monster-name";
  ageInput.id = "monster-age";
  descriptionInput.id = "monster-description";

  h2.innerHTML = "Create Monster";
  nameLabel.innerText = "name";
  ageLabel.innerText = "age";
  descriptionLabel.innerText = "description";

  form.append(
    nameLabel,
    nameInput,
    ageLabel,
    ageInput,
    descriptionLabel,
    descriptionInput,
    button
  );
  formContainer.append(h2, form);
};

const postMonster = (name, age, description) => {
  fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, age, description }),
  })
    .then((response) => response.json())
    .then((data) => console.log);
};

const fetchMonster = () => {
  const pageNum = 1;
  let monsterContainer = document.querySelector("#monster-container");
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then((response) => response.json())
    .then((monsterData) => {
      monsterData.forEach((monster) => {
        let card = document.createElement("div");
        let name = document.createElement("h2");
        let age = document.createElement("h4");
        let description = document.createElement("p");
        name.innerText = monster.name;
        age.innerText = `Age: ${monster.age}`;
        description.innerText = `Bio: ${monster.description}`;

        card.append(name, age, description);
        monsterContainer.append(card);
      });
    });
};

//- Above your list of monsters, you should have a form to create a new monster.  You should have fields for name, age, and description, and a 'Create Monster  Button'. When you click the button, the monster should be added to the list and saved in the API.

//- At the end of the list of monsters, show a button. When clicked, the buttonshould load the next 50 monsters and show them
