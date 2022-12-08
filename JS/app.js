//The URIs of the REST endpoint
POSTV = "https://prod-22.northeurope.logic.azure.com:443/workflows/a061d2fb8e844dd79beee1b79f0834a8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hfh_q9udHCnhNbBBNNgURVxxP838rZM1MSGW5tAN5Rw";
GETRAI = "https://prod-03.northeurope.logic.azure.com:443/workflows/bc5858ae11fa429fa748c9a9b403d2b2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U9XYKYdE0lVX2iABJetq8HxIrYUlqiY0k-Shb2-taAk";
UUPS ="https://prod-05.northeurope.logic.azure.com/workflows/cebfa884b8384ff5a2489be3f376024d/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Oghyjq_YXUYJgy4flOEmEh--PJFwET0U-qp3P_Wf3WA"; 
USERRAA= "https://prod-27.northeurope.logic.azure.com/workflows/783d502f41694a6ea488766be308380d/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nXB_gBUq4QC5GWHrJxoPFhJQR9_cb8hXZKoFoqysOa4";
CIA="https://prod-54.northeurope.logic.azure.com:443/workflows/108b04a37936442184eee2e71463e7e7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gn78070T-u6IJc6ORiLld7acq8HbfAjNmK_o4Nnwd1I";

UIAV1="https://prod-26.centralus.logic.azure.com/workflows/89321a6a1afb484d942678cc319929c2/triggers/manual/paths/invoke/rest/v1/videos/";
UIAV2="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5zO3sz62EAcRKXKdcTkMrmgi3ZFBcz7AxdC9pii3qog"



//delete users
DIA1="https://prod-27.centralus.logic.azure.com/workflows/4d1523c1463e4f76a465e979e75b782e/triggers/manual/paths/invoke/rest/v1/users/";
DIA2="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pUyET2eAYcgtYNRqrmHp5KaTmiA4WwZIO15WjIQhCOg";

BLOB_ACCOUNT = "https://blob1storageb00785180.blob.core.windows.net";



//Handlers for button clicks
$(document).ready(function() { 

  $("#Videos").click(function(){

    //Run the get asset list function
    getVideos();


});

  $("#Users").click(function(){

    //Run the get asset list function
    getUsers();

  }); 


  $("#subNewUser").click(function(){

    submitNewUser();});

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 


});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
//Create a form data object
submitData = new FormData();
//Get form variables and append them to the form data object
submitData.append('Title', $('#title').val());
submitData.append('Publisher', $('#publisher').val());
submitData.append('Producer', $('#producer').val());
submitData.append('Genre', $('#genre').val());
submitData.append('Age', $('#age').val());
submitData.append('File', $("#UpFile")[0].files[0]);

//Post the form data to the endpoint, note the need to set the content type header
$.ajax({
url: POSTV,
data: submitData,
cache: false,
enctype: 'multipart/form-data',
contentType: false,
processData: false,
type: 'POST',
success: function(data){} 

});
}

function submitNewCommet(id){
  
  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('Comment', $('#Comment').val());

  
  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
  url: UIAV1 + id + UIAV2,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'PUT',
  success: function(data){} 
  
  });
}

function submitNewUser(){
  //Construct JSON Object for new item
  var subObj= {
    UserName: $('#UserName').val(),
    UserPassword: $('#UserPassword').val(),
    UserRole: $('#UserRole').val(),
     }
  

  //Convert to a JSON String
     subObj = JSON.stringify(subObj);


  //Post the JSON string to the endpoint, note the need to set the content type header
$.post({
  url: CIA,
  data: subObj,
  contentType: 'application/json; charset=utf-8'
});
}
  
  
//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

//Replace the current HTML in that div with a loading message
$('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(GETRAI, function(data) {
 //Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
  items.push( "<hr />");
  items.push("<div><video controls src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400' type='video/mp4' autoplay muted /></div>")
  items.push( "Title : " + val["Title"] + "<br />");
  items.push( "Publisher: " + val["Publisher"]+ "<br />");
  items.push( "Producer: " + val["Producer"]+ "<br />");
  items.push( "Age Rating: " + val["Age"]+ "<br />");
  items.push( "Genre: " + val["Genre"]+ "<br />");
  items.push( "<hr />");
  // items.push('<label for="Comment">Comment</label><input type="text" id="Comment"></input><div id="content"></div><button type="button" class="btn btn-danger" id="submitNewComment" onclick="submitNewComment(\''+val["id"]+'\')">Submit Comment</button><br/>')
  
  
 });
 //Clear the assetlist div
 $('#VideoList').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
  "class" : "my-new-list",
  html: items.join( "" )
 }).appendTo( "#VideoList" );
 });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getUsers(){

  //Replace the current HTML in that div with a loading message
  $('#UserList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(USERRAA, function(data) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
    items.push( "<hr />");
    items.push( "UserName : " + val["UserName"] + "<br />");
    items.push( "UserRole: " + val["UserRole"]+ "<br />");
    items.push( "<hr />");
    // items.push('<button type="button" id="deleteUser" class="btn btn-danger" onclick="deleteUser(\''+val["userID"]+'\')">Delete</button><br/>');
    
    
   });
   //Clear the assetlist div
   $('#UserList').empty();
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
    "class" : "my-new-list",
    html: items.join( "" )
   }).appendTo( "#UserList" );
   });
  }
 

   //A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteUser(id){
  $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIA1 + id + DIA2,
    }).done(function( msg ) {
    //On success, update the videolist.
    getUsers();
    });
    

}

