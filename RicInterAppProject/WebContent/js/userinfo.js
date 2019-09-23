var userUrl = "http://localhost:8080/RicInterAppProject/ejb/user";
var findAll=function(){
    $.ajax({type:'GET',
            url:userUrl,
            dataType:"json",
            success:renderList});

}

var findById=function(id){
	
	 $.ajax({type:'GET',
		 	url:userUrl+'/'+id,
		 	dataType:"json",
		 	success: function(data){
		 		$('#btndelete').show();
		 		console.log('findById success: '+ data.user_name);
		 		currentUser = data;
		 		renderDetail(currentUser);
		 	}});
};

var renderList=function(fruits){
	$('#fruitList li').remove();
    $.each(fruits,function(index,fruit){
      $('#fruitList').append('<li><a href="#" id="'+fruit.id+'">' +fruit.name+'</a></li>');
      $('#btndelete').hide();
    });

}
/*
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
	}*/
	

var renderDetail=function(User){
	$('#UserId').val(User.id);
	$('#name').val(User.user_name);
	$('#account').val(User.account);
	$('#mypassword').val(User.password);
	$('#pic').attr('src','pics/'+User.picture);
	$('#picture').val(User.picture);
	
}

var formToJSON=function(){
	return JSON.stringify({
	"id":$('#UserId').val(),
	"user_name":$('#name').val(),
	"account":$('#account').val(),
	"password":$('#mypassword').val(),
	"picture":$('#picture').val()
		});
	
};

var addUser = function(){
	//confirmpwd();
	console.log("addUser");
	
	//$('#newpassword').val();
	
	
	$.ajax({
		type:'POST',
		contentType:'application/json',
		url: userUrl,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus,jqXHR){
			alert('User created successfully');
			$('#UserId').val(data.id);
			//findAll();
		},
		error: function(jqXHR,textStatus,errorThrown){
			alert('add User error: '+ textStatus);
		}
		
	});
};

var newUser = function(){
	console.log("new User");	
	$('#UserId').val("");
	$('#name').val("");
	$('#account').val("");
	//$('#mypassword').val("");
	$('#pic').attr('src','pics/'+"");
	$('#price').val("");
	$('#picture').val("");
	$('#confirm').show();
	$('#btnChange').hide();
	$('#btndelete').hide();
	$('#oldpwd').hide();
};

var deleteUser = function() {
	console.log('delete User');
	$.ajax({
		type:'DELETE',
		url: userUrl + '/' + $('#UserId').val(),
		success: function(data, textStatus, jqXHR){
			alert('user deleted successfully');
			window.opener.location.reload();
			window.close();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete User Error');
		}
	});
};

var updateUser = function() {
	console.log('updateUser');
	$.ajax({
		type:'PUT',
		contentType: 'application/json',
		url: userUrl + '/ejb' + $('#UserId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('User updated successfully');
			window.opener.location.reload();
			window.close();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updated User Error: '+textStatus);
		}
	});
}

/*
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
};*/
var confirmpwd=function(){
		console.log("start to confirm passwrod");
		
		/*var pwd=$('#newpassword').val();
		var conpwd=$('#confpassword').val();*/
		/*console.log(pwd);*/
		if( $('#newpassword').val() == $('#confpassword').val()) {
		
		/*event.preventDefalut();*/
		return true;
		}	else
			alert("Inconsistent password entered twice!");
		
}



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

$(document).on("click",'#btnAdd',function(){
	newUser();
	
});

$(document).on("click",'#btnSave',function(){if ($('#UserId').val == ''){
				//confirmpwd();
				addUser();
}
				else
				updateUser();
				return false;});

$(document).on("click",'#btndelete',function(){deleteUser();});

$(document).on("click",'#btnChange',function(){
				$('#confirm').show();
});


$(document).on("click",'#btnsearch',function(){search($('#searchKey').val());});
$('#searchKey').keypress(function(e){if(e.which == 13){search(
		 $('#searchKey').val()
		 ); }
});