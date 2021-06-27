
const taskContainer=document.querySelector(".task__container");
const createCard =({id,url,title,type,description})=> ` <div class="col-lg-3 col-md-5 mb-2" id=${id}>
<div class="card shadow">
  <div class="card-header">
    <button class="btn btn-outline-success">
      <i class="fas fa-edit"></i>&nbsp; Edit
    </button>
    <button class="btn btn-outline-danger float-end">
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
const saveChanges=()=>{
    const taskDetails={
        id:`${Date.now}`,
        url: document.getElementById("url").value,
        title:document.getElementById("title").value,
        type:document.getElementById("type").value,
        description:document.getElementById("description").value
    }

    const createNewCard=createCard(taskDetails);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
}