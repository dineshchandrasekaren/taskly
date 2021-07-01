const taskContainer = document.querySelector(".task__container");

function loadCard(card) {
  const createNewCard = createCard(card);
  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(card);
}

let globalStore = [];


const createCard = ({
  id,
  url,
  title,
  type,
  description
}) => ` <div class="col-lg-3 col-md-5 mb-2" id=${id} >
<div class="card shadow">
  <div class="card-header">
    <button class="btn btn-outline-success" onclick="editCard()">
      <i class="fas fa-edit" onclick="editCard()"></i>&nbsp; Edit
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
    <h5 class="card-title fw-bold" id="edittitle">${title}</h5>
    <p class="card-text" id="editdesc">
     ${description}
    </p>
    <span class="badge bg-primary" id="edittype">${type}</span>
  </div>
  <div class="card-footer text-muted">
    <button class="btn btn-outline-primary float-end" id="footer-btn" onclick="saveEdit()">
      <i class="fas fa-expand-alt"></i>&nbsp; Open Task
    </button>
  </div>
</div>
</div>`;

const loadInitialCard = () => {
  const getCard = localStorage.getItem("tasky");
  const {
    cards
  } = JSON.parse(getCard);
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

  if (tagname == "BUTTON") {
    return taskContainer.removeChild(e.target.parentNode.parentNode.parentNode);
  } else {

    return taskContainer.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);

  }






};

const editCard = () => {
  let editElement = [document.getElementById("editdesc"), document.getElementById("edittype"), document.getElementById("edittitle")];
  editElement.map((element) => {
    element.contentEditable = true;
    element.style.border = "thin solid rgb(128, 128, 128)";
    element.style.outlineColor = "rgb(128, 128, 128)";
  });

  const footerBtn = document.getElementById("footer-btn");
  footerBtn.innerHTML = `<i class="fas fa-save"></i>&nbsp; Save Changes`;
  footerBtn.className = "btn btn-primary float-end";
};

const saveEdit = () => {
  let editElement = [document.getElementById("editdesc"), document.getElementById("edittype"), document.getElementById("edittitle")];

  editElement.map((element) => {
    element.contentEditable = "false";
    element.style.border = "none";
    element.style.outlineColor = "none";
    element.value = element.textContent;
  });
  globalStore.map((e) => {
    e.title = document.getElementById("edittitle").value;
    e.type = document.getElementById("edittype").value;
    e.description = document.getElementById("editdesc").value;
  });
  localStorage.setItem("tasky", JSON.stringify({
    cards: globalStore
  }))
  const footerBtn = document.getElementById("footer-btn");
  footerBtn.innerHTML = `<i class="fas fa-expand-alt"></i>&nbsp; Open Task`;
  footerBtn.className = "btn btn-outline-primary float-end";
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
  localStorage.setItem("tasky", JSON.stringify({
    cards: globalStore
  }));

}