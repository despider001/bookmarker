
// fetch data upon page load

fetchData();

// set an Array for bookmark

if (localStorage.getItem("bookmarks") === null){
	var Arr = [];
} else {
	var Arr = JSON.parse (localStorage.getItem("bookmarks"));
}

// set data to local storage upon the click event
document.getElementById("button").addEventListener("click", addSite);

function addSite(e){
var siteName = document.getElementById("siteName").value;
var siteURL = document.getElementById("siteURL").value;

// if url == valid, set the input to storage

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteName || !siteURL || !siteURL.match(regex)){
	document.getElementById("alert").innerHTML = '<div class=\"alert alert-danger\" role=\"alert\"><b>Please fill in the form with valid url!</b> </div>'
}else{
var obj = {"siteName": siteName, "siteURL": siteURL}
	Arr.push(obj);
var JSONObj = JSON.stringify(Arr)
localStorage.setItem("bookmarks", JSONObj);

}

// emptify input
document.getElementById("siteName").value = "";
document.getElementById("siteURL").value = "";

//fetch data upon new input
fetchData();

//prevent disappering of alert text
e.preventDefault();
}

// to chcek the stored Arr
console.dir(Arr);


// fetch data and put them in div

function fetchData(){
	var data = JSON.parse(localStorage.getItem("bookmarks"));
	document.getElementById("divTwo").innerHTML = "";

if (data !== null){
	data.reverse();

	var text = "";	

	for(var i = 0; i < data.length ; i++){

	text += '<div class = \"bookmark-list jumbotron text-center mx-auto p-4\"> <h3 class=\"text-capitalize\">' + 
	data[i].siteName + '</h3> <a href =\"' + data[i].siteURL+ '\"target = \"_blank\"> <button class = \"btn btn-info mx-3\"> Visit</button></a><button class = \"btn btn-danger mx-2\" onclick = \'deleteData(\"'+ data[i].siteName + "\")\'>Delete</button></div>";

	}

	document.getElementById("divTwo").innerHTML += text;
}

}


//reset function

document.getElementById("reset").addEventListener("click", reset);
function reset(){
	localStorage.removeItem("bookmarks");
	fetchData();
}

// delete individual info

function deleteData(data){
		var Data = JSON.parse(localStorage.getItem("bookmarks"));
		for (var i = 0; i < Data.length; i ++){
			if (Data[i].siteName === data){
				Data.splice (i, 1);
				break;
			}
		}
		var newData = JSON.stringify(Data);
		localStorage.setItem("bookmarks", newData);
		
	// update page after deletion
	fetchData();
}

