const finalActions = document.getElementById('finalActions');
const actions = JSON.parse(localStorage.getItem('listOfActions'));

finalActions.innerHTML = actions
    .map(action => {
        return `<li class="action">${action}</li>`;
    })
    .join("");

// finalActions.innerText = actions;
