const taskContainer = document.querySelector(".task__container");

function  loadCard(card) {
  const createNewCard = createCard(card);
  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(card);
}

let globalStore = [];

const createCard = ({ id, url, title, type, description }) => ` <div class="col-lg-3 col-md-5 mb-2" id=${id} onclick="deleteCard.apply()">
<div class="card shadow">
  <div class="card-header">
    <button class="btn btn-outline-success">
      <i class="fas fa-edit"></i>&nbsp; Edit
    </button>
    <button class="btn btn-outline-danger float-end" id=${id} onclick="deleteCard.apply(this,arguments)">
      <i class="fas fa-trash-alt"></i> &nbsp; Delete
    </button>
  </div>
  <img
    src=${url}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title fw-bold">${title}</h5>
    <p class="card-text">
     ${description}
    </p>
    <span class="badge bg-primary">${type}</span>
  </div>
  <div class="card-footer text-muted">
    <button class="btn btn-outline-primary float-end">
      <i class="fas fa-expand-alt"></i>&nbsp; Open Task
    </button>
  </div>
</div>
</div>`;

const loadInitialCard = () => {
  const getCard = localStorage.getItem("tasky");
  const { cards } = JSON.parse(getCard);
  cards.map((card) => {
   loadCard(card);
  });
}

const deleteCard = (e) => {
  e = window.event;
  const getID = e.target.id;

  const tagname = e.target.tagName;
  globalStore = globalStore.filter((obj) => obj.id !== getID);

  
  localStorage.setItem("tasky", JSON.stringify({
    cards: globalStore
  }));
  
  if (tagname === "BUTTON") {
    return taskContainer.removeChild(e.target.parentNode.parentNode.parentNode);
  }



    return taskContainer.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
 
 

}




const saveChanges = () => {
  const taskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("url").value,
    title: document.getElementById("title").value,
    type: document.getElementById("type").value,
    description: document.getElementById("description").value
  }

  loadCard(taskDetails);
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

}