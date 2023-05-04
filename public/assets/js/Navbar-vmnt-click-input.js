$(document).ready(function(){
	$("#search-field").on("click",function(){
		$("#search-field").animate({
            "width": "200px"
        }); 
        $("#search-field").css({ 
            color: '#000'
        }); 
        $("#form").css({
            backgroundColor: '#fff'
        });
        $("#icon-busca").css({
            color: '#56aa1c'
        }); 
        $("#search-field::-webkit-input-placeholder").css(
            { color: '#ccc'
        });
        $("#search-field:-moz-placeholder").css(
            { color: '#ccc'
        });
        $("#search-field::-moz-placeholder").css(
            { color: '#ccc'
        });
        $("#search-field:-ms-input-placeholder").css(
            { color: '#ccc'
        });
    })

    $('#search-field, #botao-limpa').blur(function(){
        setTimeout(function(){
            if(!$('#search-field, #botao-limpa').is(':focus')){
                $("#search-field").animate({
                    "width": "172px"
                }); 
            }
        },10);
        $("#form").css({
            backgroundColor: '#36752d' 
        }); 
        $("#search-field").css({
            color: '#fff'
        });
        $("#icon-busca").css({
            color: '#fff'
        }); 
    });;    
});