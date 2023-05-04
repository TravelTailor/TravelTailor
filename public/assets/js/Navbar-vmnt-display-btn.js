$('#search-field').keyup(function(){
    var text = $(this).val();

if(text=="") {
     document.getElementById('botao-limpa').style.display = 'none';
 }else {
     document.getElementById('botao-limpa').style.display = 'block';
 }

});
