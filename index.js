function values(el){
    let x = document.getElementById("answer");
    var old = x.value;
    if (!parseInt(el.value) && parseInt(el.value) !== 0){
        x.value = old + " " + el.value + " ";
    }
    else{
        x.value = old + el.value
    }
}
