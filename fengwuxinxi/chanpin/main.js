var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var content1 = document.getElementById('content1');
var content2 = document.getElementById('content2');
var content3 = document.getElementById('content3');
btn1.onclick = function(){
	content1.style.display = "block";
	content2.style.display = "none";
	content3.style.display = "none";
	btn1.style.background = "black"
	btn2.style.background = "none";
	btn3.style.background = "none";
}
btn2.onclick = function(){
	content1.style.display = "none";
	content2.style.display = "block";
	content3.style.display = "none";
	btn2.style.background = "black"
	btn1.style.background = "none";
	btn3.style.background = "none";
}
btn3.onclick = function(){
	content1.style.display = "none";
	content2.style.display = "none";
	content3.style.display = "block";
	btn3.style.background = "black"
	btn1.style.background = "none";
	btn2.style.background = "none";
}