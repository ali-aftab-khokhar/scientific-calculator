function displayHistory(description){
    let ul = document.getElementById("list")
    let li = document.createElement("li")
    li.id = description
    li.addEventListener("click", EditData, false)
    li.appendChild(document.createTextNode(description))
    ul.appendChild(li)
}

function EditData(){
    let foo = prompt("Type 1 for edit, 2 for delete")
    if (foo === "1"){
        let x = document.getElementById("answer");
        x.value = this.id
    }
    if (foo === "2"){
        this.remove()
    }
}