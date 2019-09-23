var rootUrl = "http://localhost:8080/RicInterAppProject/ejb/fruits";
var userUrl = "http://localhost:8080/RicInterAppProject/ejb/user";

var findAllFruit=function(){
    $.ajax({type:'GET',
            url:rootUrl,
            dataType:"json",
            success:renderTable});

}
var findAllUser=function(){
    $.ajax({type:'GET',
            url:userUrl,
            dataType:"json",
            success:renderuserTable});

}

var findById=function(id){
	 $.ajax({type:'GET',
		 	url:rootUrl+'/'+id,
		 	dataType:"json",
		 	success: function(data){
		 		var u="http://localhost:8080/RicInterAppProject/info.html?id="+data.id;
		 			window.open(u,'newuserwindow','height=700,width=400 top=30% left=30% toolbar=no,scrollars=no,resizable=no,location=no,status=no,center=yes');
		 		$('#btndelete').show();
		 		
		 		console.log('findById success: '+ data.name);
		 		currentFruit = data;
		 		renderDetail(currentFruit);
		 	}});
};


var finduserById=function(id){
	 $.ajax({type:'GET',
		 	url:userUrl+'/'+id,
		 	dataType:"json",
		 	success: function(data){
		 		/*var u="http://localhost:8080/RicInterAppProject/userinfo.html?id="+data.id;
		 			window.open(u,'newwindow','height=700,width=400 top=30% left=30% toolbar=no,scrollars=no,resizable=no,location=no,status=no,center=yes');*/
		 		$('#btndelete').show();
		 		console.log('findById success: '+ data.user_name);
		 		currentUser = data;
		 		renderuserDetail(currentUser);
		 	}});
};

/*var changeusername=function(id){
	 $.ajax({type:'GET',
		 	url:userUrl+'/'+id,
		 	dataType:"json",
		 	success: function(data){
		 		console.log('change name success: '+ data.user_name);
		 		$('#displayname').text(user.user_name);
		 	}});
};*/

	var renderTable=function(data){
		console.log("response");
		$.each(data,function(index,fruit){
			$('#fruit_body').append(
					'<tr><td>'+fruit.name+'</td><td>'
					+fruit.price+'</td><td>'
					+fruit.unit+'</td><td>'
					+fruit.inventory+'</td><td>'
					+'<li><a href="#" id="'+fruit.id+'">'+"Edit"+'</a></li>'+'</td></tr>'
			);
		});
		$('#fruit_table').DataTable();
	}

	var renderuserTable=function(data){
		console.log("response");
		$.each(data,function(index,user){
			$('#user_body').append(
					'<tr><td>'+user.id+'</td><td>'+
					user.user_name+'</td><td>'
					+user.account+'</td><td>'
					+'<li><a href="#" id="'+user.id+'">'+"Edit"+'</a></li>'+'</td></tr>'
			);
		});
		$('#user_table').DataTable();
	}

var renderDetail=function(fruit){
	$('#fruitId').val(fruit.id);
	$('#name').val(fruit.name);
	$('#pic').attr('src','pics/'+fruit.picture);
	$('#price').val(fruit.price);
	$('#unit').val(fruit.unit);
	$('#inventory').val(fruit.inventory);
	
}

var formToJSON=function(){
	return JSON.stringify({
	"id":$('#fruitId').val(),
	"name":$('#name').val(),
	"price":$('#price').val(),
	"unit":$('#unit').val(),
	"inventory":$('#inventory').val(),
	"picture":""
		});
	
};



/*var addFruit = function(){
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
};*/

/*var newFruit = function(){
	console.log("newFruit");
	
	$('#fruitId').val("");
	$('#name').val("");
	$('#pic').attr('src','pics/'+"");
	$('#price').val("");
	$('#unit').val("");
	$('#inventory').val("");
};*/

/*var deleteFruit = function() {
	console.log('deletefruit');
	$.ajax({
		type:'DELETE',
		url: rootUrl + '/' + $('#fruitId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Fruit deleted successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Fruit Error');
		}
	});
};
*/
/*var updateFruit = function() {
	console.log('updateFruit');
	$.ajax({
		type:'PUT',
		contentType: 'application/json',
		url: rootUrl + '/ejb' + $('#fruitId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('fruit updated successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updatedfruit Error: '+textStatus);
		}
	});
}
*/

var renderuserDetail=function(User){
	$('#UserId').val(User.id);
	$('#name').val(User.user_name);
	$('#account').val(User.account);
	$('#mypassword').val(User.password);
	$('#mybank').val(User.bank_name);
	$('#mycard').val(User.card_number);
	$('#mybalance').val(User.balance);
	$('#userpic').attr('src','userpic/'+User.picture);
	$('#picture').val(User.picture);
	
}

var formUserupdateToJSON=function(){
	return JSON.stringify({
	"id":$('#UserId').val(),
	"user_name":$('#name').val(),
	"account":$('#account').val(),
	"password":$('#mypassword').val(),
	"bank_name":$('#mybank').val(),
	"card_number":$('#mycard').val(),
	"picture":$('#picture').val(),
	"balance":$('#mybalance').val()
		});
	
};

var formUserToJSON=function(){
	return JSON.stringify({
	"id":$('#UserId').val(),
	"user_name":$('#name').val(),
	"account":$('#account').val(),
	"password":$('#mypassword').val(),
	"bank_name":$('#mybank').val(),
	"card_number":$('#mycard').val(),
	"picture":$('#picture').val(),
	"balance":200.00
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
		data: formUserToJSON(),
		success: function(data, textStatus,jqXHR){
			alert('User created successfully');
			$('#UserId').val(data.id);
			$('#userModal').modal('hide');
			$('#user_table').dataTable().fnClearTable();
			$('#user_table').dataTable().fnAddData(findAllUser(),true);
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
	$('#userpic').attr('src','userpic/');
	$('#picture').val("");
	$('#mypassword').val("");
	$('#mybank').val("");
	$('#mycard').val("");
	$('#mybalance').val("");
	$("#mybank").prop('disabled', false);
	$("#mycard").prop('disabled', false);
	//$('#picture').val("");
	//$('#confirm').show();
	/*$('#btnChange').hide();*/
	$('#btndelete').hide();
	$('#mybalance').hide();
	$('#balancelable').hide();
	/*$('#oldpwd').hide();*/
};

var deleteUser = function() {
	console.log('delete User');
	$.ajax({
		type:'DELETE',
		url: userUrl + '/' + $('#UserId').val(),
		success: function(data, textStatus, jqXHR){
			
			alert('user deleted successfully');
			$('#userModal').modal('hide');
			$('#user_table').dataTable().fnClearTable();
			$('#user_table').dataTable().fnAddData(findAllUser(),true);
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
		data: formUserupdateToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('User updated successfully');
			$('#userModal').modal('hide');
			$('#displayname').text(data.user_name);
			$('#user_table').dataTable().fnClearTable();
			$('#user_table').dataTable().fnAddData(findAllUser(),true);
			//changeusername($('#uid').val(user.id));
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updated User Error: '+textStatus);
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


var showinformation=function(users){
	
	 $.each(users,function(index,user){
		 //$('#uact').val(user.account);
		// $('#upwd').val(user.password);
		 
		 $('#uid').val(user.id);
	      $('#displayname').text(user.user_name);
	      $('#picc').attr('src','userpic/'+user.picture);
	      $('#cardnumber').text(user.card_number);
	      $('#bankname').text(user.bank_name);
	      $('#Balance').text("€"+user.balance);
	 });
	$('#LoginModal').modal('hide');
	$('#loginlink').hide();
/*	$('#sectionone').show();
	$('#sectiontwo').show();*/
	$('#user_table').show();
	$('#fruit_table').show();
	findAllFruit();
	findAllUser();
	
}

var renderuserinformation=function(){
	
}

var login = function(account,password){
	console.log("start to Login");
	$.ajax({
		type:'GET',
		url: userUrl + '/acout/' + account +'/pwd/'+password,
		dataType: "json",
        success: showinformation,
		error: function(jqXHR, textStatus, errorThrown){
			alert('Login error: '+textStatus);
		}
	});
		
}
//DOM has loaded

var hiddentables=function(){
		$('#user_table').hide();
		$('#fruit_table').hide();
			
}


/*var showcards=function(id){
	console.log("start to Load card informations");
	
}
*/

$(document).ready(function(){
	hiddentables();
	$('#LoginModal').modal({backdrop: 'static', keyboard: false}) ;
	$('#LoginModal').modal('show');
	
});

$(document).on("click","#btnlogin",function(){
	
	login($('#Loginaccount').val(),$('#loginpwd').val());
});

$(document).on("click","#btnlogout",function(){
	 $('#displayname').text(" ");
     $('#picc').attr('src','userpic/');
	 $('#userinformation').hide();
	 $('#fruitinformation').hide();
	 $('#loginlink').show();
	 $('#bankname').text("");
	 $('#cardnumber').text("");
	 $('#Balance').text("");
	 
});



$(document).on("click","#fruit_body a", function(){findById(this.id);});
$(document).on("click","#user_body a", function(){
	$('#userModal').modal({backdrop: 'static', keyboard: false}) ;
	$('#userModal').modal('show');
	finduserById(this.id);
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


//---for user
$(document).on("click",'#btnUserAdd',function(){
	newUser();
	
});

$(document).on("click",'#btnUserSave',function(){if ($('#UserId').val == ''){
				//confirmpwd();
				addUser();
}
				else
				updateUser();
				return false;});

$(document).on("click",'#btnUserdelete',function(){
	deleteUser();
});

$(document).on("click",'#btnclose',function(){
	$('#userModal').modal('hide');
});

$(document).on("click",'#loginlink',function(){
	 location.reload();
});

$(document).on("click",'#displayname',function(){
	console.log($('#uid').val());
	$('#userModal').modal({backdrop: 'static', keyboard: false}) ;
	$('#userModal').modal('show');
	//$('#btnUserAdd').show();
	finduserById($('#uid').val());
});


$(document).on("click",'#btnUserChange',function(){
				$('#confirm').show();
});
