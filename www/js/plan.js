const finalActions = document.getElementById('finalActions');
const actions = JSON.parse(localStorage.getItem('listOfActions'));

var coll = document.getElementsByClassName("collapsible");
var i;

finalActions.innerHTML = actions
    .map(action => {
        return `<li class="action"><pre>${action}</pre></li>`;
    })
    .join("");

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = "550px";
      }
    });
  }
