const taskContainer = document.querySelector(".task__container");
const full=document.querySelector("#lolo");



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
    <button class="btn btn-outline-success" id=${id} onclick="editCard.apply(this,arguments)">
      <i class="fas fa-edit" id=${id} onclick="editCard.apply(this,arguments)"></i>&nbsp; Edit
    </button>
    <button class="btn btn-outline-danger float-end" id=${id} onclick="deleteCard.apply(this,arguments)">
      <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)"></i> &nbsp; Delete
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
    <button class="btn btn-outline-primary float-end"  id=${id} onclick="saveEdit.apply(this,arguments)">
      <i class="fas fa-expand-alt" id=${id} onclick="saveEdit.apply(this,arguments)"></i>&nbsp; Open Task
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

const searchCard=()=>{
  const search=document.getElementById("#search").value;
  globalStore.filter((card)=>{
    card.includes(search)
  });
}

const editCard = (e) => {
  e = window.event;
  const getID = e.target.id;

  const tagname = e.target.tagName;
let parentElement;
  if (tagname == "BUTTON") {
    parentElement=e.target.parentNode.parentNode;
   
  } else {

    parentElement=e.target.parentNode.parentNode.parentNode;
  

  }

  let tasktitle=parentElement.childNodes[5].childNodes[1];
  let taskdesc=parentElement.childNodes[5].childNodes[3];
  let tasktype=parentElement.childNodes[5].childNodes[5];
  let footerBtn = parentElement.childNodes[7].childNodes[1];

  let editElement = [tasktitle, taskdesc,tasktype];
  editElement.map((element) => {
    element.contentEditable = true;
    element.style.border = "thin solid rgb(128, 128, 128)";
    element.style.outlineColor = "rgb(128, 128, 128)";
  });

  footerBtn.innerHTML = `<i class="fas fa-save"></i>&nbsp; Save Changes`;
  footerBtn.className = "btn btn-primary float-end";
};

const saveEdit = (e) => {
  e = window.event;
  const getID = e.target.id;
   
  const tagname = e.target.tagName;
let parentElement;
  if (tagname == "BUTTON") {
    parentElement=e.target.parentNode.parentNode;
  } else {
    parentElement=e.target.parentNode.parentNode.parentNode;
  }

  let tasktitle=parentElement.childNodes[5].childNodes[1];
  let taskdesc=parentElement.childNodes[5].childNodes[3];
  let tasktype=parentElement.childNodes[5].childNodes[5];
  let footerBtn = parentElement.childNodes[7].childNodes[1];

  let editElement = [tasktitle, taskdesc,tasktype];
  editElement.map((element) => {
    element.contentEditable = "false";
    element.style.border = "none";
    element.style.outlineColor = "none";

  });
  globalStore= globalStore.map((task) => {
    if(task.id === getID){
      return {
        id: task.id,
        url: task.url,
        title: tasktitle.innerHTML,
        type: tasktype.innerHTML,
        description: taskdesc.innerHTML
      }
    }
      return task;
  });
  localStorage.setItem("tasky", JSON.stringify({
    cards: globalStore
  }));
 
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