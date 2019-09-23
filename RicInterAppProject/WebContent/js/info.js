var rootUrl = "http://localhost:8080/RicInterAppProject/ejb/fruits";
var findAll=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderList});

}

var findById=function(id){
	 $.ajax({type:'GET',
		 	url:rootUrl+'/'+id,
		 	dataType:"json",
		 	success: function(data){
		 		$('#btndelete').show();
		 		console.log('findById success: '+ data.name);
		 		currentFruit = data;
		 		renderDetail(currentFruit);
		 	}});
};

var renderList=function(fruits){
	$('#fruitList li').remove();
    $.each(fruits,function(index,fruit){
      $('#fruitList').append('<li><a href="#" id="'+fruit.id+'">' +fruit.name+'</a></li>');
      $('#btndelete').hide();
    });

}

	var renderList=function(data){
		list=data.fruit;
		console.log("response");
		$each(list,function(index,fruit){
			$('#fruit_body').append(
					'<tr><td>'+fruit.name+'</td><td>'+
					fruit.price+'</td><td>'+
					fruit.unit+'</td><td>'+
					fruit.inventory+'</td></tr>'
			);
				
		});
		$('#fruit_table').DataTable();
	}
	

var renderDetail=function(fruit){
	$('#fruitId').val(fruit.id);
	$('#name').val(fruit.name);
	$('#pic').attr('src','pics/'+fruit.picture);
	$('#price').val(fruit.price);
	$('#unit').val(fruit.unit);
	$('#inventory').val(fruit.inventory);
	$('#picture').val(fruit.picture);
	
}
var formToJSON=function(){
	return JSON.stringify({
	"id":$('#fruitId').val(),
	"name":$('#name').val(),
	"price":$('#price').val(),
	"unit":$('#unit').val(),
	"inventory":$('#inventory').val(),
	"picture":$('#picture').val()
		});
	
};

var addFruit = function(){
	console.log("addfruit");
	$.ajax({
		type:'POST',
		contentType:'application/json',
		url: rootUrl,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus,jqXHR){
			alert('Fruit created successfully');
			$('#fruitId').val(data.id);
			findAll();
		},
		error: function(jqXHR,textStatus,errorThrown){
			alert('addfruit error: '+ textStatus);
		}
		
	});
};

var newFruit = function(){
	console.log("newFruit");
	
	$('#fruitId').val("");
	$('#name').val("");
	$('#pic').attr('src','pics/'+"");
	$('#price').val("");
	$('#unit').val("");
	$('#inventory').val("");
	$('#picture').val("");/*
	$('#year').val("");
	$('#description').val("");*/
};

var deleteFruit = function() {
	console.log('deletefruit');
	$.ajax({
		type:'DELETE',
		url: rootUrl + '/' + $('#fruitId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Fruit deleted successfully');
			window.opener.location.reload();
			window.close();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Fruit Error');
		}
	});
};

var updateFruit = function() {
	console.log('updateFruit');
	$.ajax({
		type:'PUT',
		contentType: 'application/json',
		url: rootUrl + '/ejb' + $('#fruitId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('fruit updated successfully');
			window.opener.location.reload();
			window.close();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updatedfruit Error: '+textStatus);
		}
	});
}


var search = function(searchKey){
	if(searchKey == '')
		findAll();
	else
		findByName(searchKey);
};

var findByName = function(searchKey){
	console.log('findByName: '+ searchKey);
	$.ajax({
		type:'GET',
		url: rootUrl + '/search/' + searchKey,
		dataType: "json",
        success: renderList,
		error: function(jqXHR, textStatus, errorThrown){
			alert('search: '+textStatus);
		}
	});
};
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
//DOM has loaded
$(document).ready(function(){
	var url_string=window.location.search;
	console.log(getUrlParameter('id'));
	findById(getUrlParameter('id'));
});
$(document).on("click",'#btnAdd',function(){newFruit();});
$(document).on("click",'#btnSave',function(){if ($('#fruitId').val == '')
	 			addFruit();
				else
				updateFruit();
				return false;});
$(document).on("click",'#btndelete',function(){deleteFruit();});

$(document).on("click",'#btnsearch',function(){search($('#searchKey').val());});
$('#searchKey').keypress(function(e){if(e.which == 13){search(
		 $('#searchKey').val()
		 ); }
});