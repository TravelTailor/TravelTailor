function limpa() {
    if(document.getElementById('search-field').value!="") {
    document.getElementById('search-field').value="";
    document.getElementById('botao-limpa').style.display = 'none';
    document.getElementById("search-field").focus();
    document.getElementById("search-field").click();
    }
}