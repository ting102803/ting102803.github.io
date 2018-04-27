/*menu start*/
var state =0;
function Drop() {
    if(state===0){
document.getElementById('dropimg').src = "js/img/x.png"
      state=1;
    }
    else{
      state=0;
      document.getElementById('dropimg').src = "js/img/nomal.png"
    }/*클릭한 이미지 상태에 따라서 이미지 변화*/
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropbtn[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }/*dropbtn 클래스가 클릭되었을경우 show라는 클래스 생성과 삭제를 한다*/
    }
  }
}
/*menu end*/



/*slider start*/
var imageslider;
var div_items;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;/*슬라이더 구현시 필요한 변수 선언*/

function init(){
	imageslider = document.getElementById('image_slider');
	div_items = imageslider.children;
	imageNumber = div_items.length;
	imageWidth = div_items[0].children[0].clientWidth;/*이미지 넓이는 통일되었음으로 여기서 이미지당 넓이를 알수있다.*/
	imageslider.style.width = parseInt(imageWidth * imageNumber + 2*(window.outerWidth/2-imageWidth/2)*imageNumber) + 'px';

  for(var i =0 ;i<imageNumber;i++){
  div_items[i].style.marginLeft = window.outerWidth/2-imageWidth/2+'px';
  div_items[i].style.marginRight = window.outerWidth/2-imageWidth/2+'px';
}
/*이미지  한 행에 다 나타내기위한 총 길이를 선언해야하는데 reponsive하게 중앙정렬로 나타내기위해
  margind을 넣어 (window.outerWidth/2-imageWidth/2)를 넣어서 화면크기에 반응하도록 하였다.*/
	prev = document.getElementById("prev");
	next = document.getElementById("next");
	prev.onclick = function(){ onClickPrev();};
	next.onclick = function(){ onClickNext();};
/*이전버튼과 이후버튼*/
}

function slideTo(imageToGo){
  timerclear();/*만약 이동이 일어났을 경우에는 autonext의 timer를 reset해준다*/
	var direction;
	var numOfImageToGo = Math.abs(imageToGo - currentImage);
	direction = currentImage > imageToGo ? 1 : -1;
  /*현재 가야할 방향과 얼마나 가야할지를 판단해준다*/
  /*얼마나 가야할진느 현 이미지와 갈방향의 차를 절대값으로 방향은 대소 비교로한다.*/
	currentPostion = -1 * currentImage *  (imageWidth+2*(window.outerWidth/2-imageWidth/2));
    /*현재의 위치를 나타낸다*/
	var opts = {
		duration:150,
		delta:function(p){return p;},
		step:function(delta){
			imageslider.style.left = parseInt(currentPostion + direction * delta * (imageWidth+2*(window.outerWidth/2-imageWidth/2)) * numOfImageToGo) + 'px';
		},
		callback:function(){currentImage = imageToGo;}
	};
  /*animate효과를 구현하기위한 현재 슬라이더의 정보와 어디로 가야할지를 나타내는 배열이다.*/
	animate(opts);/*이동하기*/
  autonext();/*이동이 끝난뒤 자동이동 타이머 작동*/
  dothover(imageToGo);/*이동이 끝난뒤  dot 색상 변경*/
}



function animate(opts){
	var start = new Date;
	var gess = setInterval(function(){
		var timePassed = new Date - start;  /*언제 시작했는지 알기위한  변수*/
		var progress = timePassed / opts.duration;  /*얼마나 이동했는지 알기위한 변수*/
		if (progress > 1){
			progress = 1;
		}
		var delta = opts.delta(progress);
		opts.step(delta);/*현재위치에서 방향과 진행량에따라 이동한다.*/
		if (progress == 1){
			clearInterval(gess);
			opts.callback();
		}/*도착을 했다면 타이머를 끄고 현재의 이미지인덱스 변수를 바꿔준다.*/
	},  opts.delay||15);/*도착할때까지 함수를 반복실행시켜서  도착시  타이머가 꺼지도록한다*/
}


function timerclear() {
    clearTimeout(myslider);
};
/*도착할때까지 함수를 반복실행시켜서  도착시  타이머가 꺼지도록한다*/
function onClickPrev(){
	if (currentImage == 0){
		slideTo(imageNumber - 1);
	}
	else{
		slideTo(currentImage - 1);
	}
}/*이전 이미지로 이동하는 함수인데 만약 현재이미지가 0이라면 총이미지수-1 즉 마지막 배열
마지막 이미지로 그외에는 현재 이미지의 -1만큼 이동한다.*/

function onClickNext(){
	if (currentImage == imageNumber - 1){
		slideTo(0);
	}
	else{
		slideTo(currentImage + 1);
	}
}/*prev와 같은 구조로 마지막 이미지면 제일처음 이미지로 아니라면 다음 이미지로 간다*/

function autonext() {
   myslider = setTimeout(function(){ onClickNext(); }, 5000);
};
autonext();
/*5초마다 자동으로 다음이미지로 넘기는 함수를 실행한다*/


window.onload = init;/*load가 끝나면 현 슬라이드를 생성한다. 이렇게하는 이유는 이미지의 크기를 받아야하기때문이다.*/
window.onresize=function(event){
  init();
  slideTo(currentImage);
  document.getElementById("myChart").style.width='100%';
}/*화면크기에 reponsive하기위해서 onersize를 이용해서 브라우저의 크기에 따라 margin을 바꾸어 항상 중앙에 있도록하였다.*/
/*script로 선언된 mycahrt의 넓이도 onresize로 변경함*/


var A =document.getElementsByClassName("dot");
function dothover(n){
    for(var i=0;i<A.length;i++){
      A[i].style.backgroundColor = "gray";
    }
    A[n].style.backgroundColor = "lightblue";
}/*slideto 하였을경우 dot의 그에 맞게 색깔도 움직이기위한 함수이다*/


function onImg(x) {
    x.style.backgroundColor ="lightblue";
}
/*dot에 마우스를 올렸을 경우 색깔을 바뀌는걸 나타내기위해 구현*/
function outImg(x) {
  for(var i=0;i<A.length;i++){
    if (A[i] === x)
    {if(i===currentImage){
      x.style.backgroundColor ="lightblue";}
      else
  {x.style.backgroundColor = "gray";}
}}}/*dot에 마우스를  out할 경우 색깔을 바뀌는걸  현 이미지와 상태를 비교하여서
현이미지와 같다면 hover상태를 유지 그외는 다시 gray로 돌아오도록한다.*/

/*slider end*/

/*Introduce start*/

document.addEventListener("DOMContentLoaded", function(event) {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Twice", "IOI", "RedVelvet", "TaeYean"],
          datasets: [{
              label: '걸그룹 가수부분 음반 판매량',
              data: [338000, 184000, 92000,84000],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 2,
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
});
/*외부 API인 chart.js를 이용해서 차트를 구현*/


/*Introduce end*/




/*Gallery start*/
var imgindex = document.getElementsByClassName("galleryimg");
var buttonindex = document.getElementsByClassName("delete");
var tool =  document.getElementsByClassName("tooltiptext");
/*이미지,버튼 그리고 text 클래스를 관리하기위한 변수 선언*/
function hovergall(x){
  x.style.opacity=0.5;
}
function outgall(x){
  x.style.opacity=1;
}
/*이미지위에 마우스를 올릴경우 투명해지는 효과 구현*/
var blocknumber = [];
/*localStorage에 삭제된 이미지 인덱스를 저장을 위해 필요한 배열 선언*/

function imgblock(x){/*버튼 클릭시 이미지가 사라지도록하기위한 함수*/

  for(var i=0;i<buttonindex.length;i++){
    if (buttonindex[i] === x){
  imgindex[i].style.display="none";
  tool[i].style.display="none";/*클릭한 버튼과 인덱스가 같은 이미지와 text를 none상태로 변환*/
  if (localStorage.blocknum) {
    var output = localStorage.getItem("blocknum");
    var numarr = JSON.parse(output);
      numarr.push(i);
      localStorage.setItem("blocknum", JSON.stringify(numarr));
}/*localStorage가 이미 있다면 있는걸 꺼내서 배열로 바꾸준후 해당 인덱스를 배열에 추가한뒤 다시 저장한다 */
else {
blocknumber.push(i);
localStorage.setItem("blocknum", JSON.stringify(blocknumber));
/*비여있을 경우에는 해당인덱스를 배열에 추가한뒤에 저장한다.*/
}}}
  x.style.display="none";/*버튼 안보이게 전환*/
}

document.addEventListener("DOMContentLoaded", function(event) {
  var output = localStorage.getItem("blocknum");
  var numarr = JSON.parse(output);
  for(var i =0;i<numarr.length;i++){
   buttonindex[numarr[i]].style.display="none";
  imgindex[numarr[i]].style.display="none";
  tool[numarr[i]].style.display="none";
  }
})/*페이지를 새로고침할때 저장한 이미지 인덱스를 이용해서 해당 이미지를 block시킨다*/

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}
/*모달창을 키고 끌때 block none 전환이다.*/
var slideIndex = 1;
  var godirection;
function plusSlides(n) {
  if (n<0) {godirection =-1;}
  else godirection =1;
  showSlides(slideIndex += n);
}

function modalcurrentSlide(n) {
  showSlides(slideIndex = n);}
/*모달창을 킬때 실행되는 이미지이다*/
function showSlides(n) {/*모달창의 화면을 담당하는 함수이다.*/
  var i;
  var j= 0;
  var k=0;
  var slides = document.getElementsByClassName("myMSlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}/*모달창이 처음과 끝을 넘어가는  슬라이드 이동하는지 판단한다*/
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }/*일단 모든 이미지를 안보이게한다*/
  if(godirection!=-1){
  if(buttonindex[slideIndex-1].style.display==="none"){/*만약  내가 요청한 모달창이 삭제된 상태라면*/
    for(i=slideIndex-1;i<slides.length;i++){
      if(buttonindex[i].style.display==="none")
      {j++;}
      else break;
    }/*요청한 모달창부터 얼마나 삭제됬는지  확인하기위해 j변수를 이용해서 저장한다
    중간에 없으면 break를 통해 나온다.*/
    if(slideIndex+j>slides.length){
      for(i=0;i<slides.length;i++){/*만약 맨끝까지 삭제되었다면 처음이미지로가야하는데*/
        if(buttonindex[i].style.display==="none")
        {k++;}
        else break;
      }/*첫 이미지도 삭제되었을 가능성을 생각해서 첫이미지부터 얼마나 삭제됬는지 확인하기위해
      k변수를 써서 저장한다 똑같이 중간에 없으면 break를 통해 나온다.*/
      slides[k].style.display = "block"
      slideIndex =k+1;
    }/*이제 최악의 경우일경우의 이동을 하면된다(끝과 처음이 삭제된경우)*/
  else {slides[slideIndex-1+j].style.display = "block"
  slideIndex  = slideIndex+j}
}/*그 외 끝이미지가 삭제가 안된경우라면  현상태에서 삭제된만큼만 이동한다*/
  else{
  slides[slideIndex-1].style.display = "block";

}/*다음 이미지가  삭제가 안됬다면 바로 넘어가면된다.*/
}
/*역방향을 요청하였을경우*/
  else{
    if(buttonindex[slideIndex-1].style.display==="none"){/*만약  내가 요청한 모달창이 삭제된 상태라면*/
      for(i=slideIndex-1;i>0;i--){
        if(buttonindex[i].style.display==="none")
        {j++;}
        else break;
      }/*요청한 모달창부터 얼마나 삭제됬는지  확인하기위해 j변수를 이용해서 저장한다
      중간에 없으면 break를 통해 나온다. 이번에는 방향이 역방향이다*/
      if(slideIndex-1-j===0){
          k=slides.length;
        for(i=slides.length-1;i>0;i--){/*만약 처음까지 삭제되었다면 마지막이미지로가야하는데*/
          if(buttonindex[i].style.display==="none")
          {k--;}
          else break;
        }/*마지막도 삭제되었을 가능성을 생각해서 마지막부터 얼마나 삭제됬는지 확인하기위해
        k변수를 써서 저장한다 똑같이 중간에 없으면 break를 통해 나온다.*/
        slides[k-1].style.display = "block"
        slideIndex =k;
      }/*이제 최악의 경우일경우의 이동을 하면된다(끝과 처음이 삭제된경우)*/
    else {slides[slideIndex-1-j].style.display = "block"
    slideIndex  = slideIndex-j}
  }/*그 외 첫이미지가 삭제가 안된경우라면  현상태에서 삭제된만큼만 이동한다*/
    else{
    slides[slideIndex-1].style.display = "block";
    }/*다음 이미지가  삭제가 안됬다면 바로 넘어가면된다.*/
  }
}

function reset(){/*localStorage 초기화를 위한 함수이다.*/
  localStorage.clear();
  for(var i =0;i<buttonindex.length;i++){
   buttonindex[i].style.display="inline";
  imgindex[i].style.display="inline";
  tool[i].style.display="inline";
  }
}
/*Gallery end */

/*Guestbook start */
function fncAddRow()
{ document.getElementById("tbob").style.visibility ="visible"
document.getElementById("tbl").style.visibility ="visible"
    var fm  = document.frm;
    var ary = new Array();

    ary.push(fm.writter.value);
    ary.push(fm.comments.value);
    /*숨겨있던 테이블을 활성화 시키고 추가할 값들을 배열에 추가한다.*/
    var tb  = document.getElementById('tbl');
    fncAddRows(tb, ary);/*추가될 테이블과 추가할 배열 선택*/
    fncAddbutton(tb);/*답글버튼 추가*/
    fncReset(fm);/*추가했음으로 작성자와 내용 초기화*/
}

function fncReset(fm)
{
    fm.writter.value      = '';
    fm.comments.value     = '';
}/*작성자와 내용 초기화*/

function fncAddRows(tbID, ary)/*테이블에 배열을 추가하는 함수*/
{
    var newCell;
    var newRow  = tbID.insertRow();
    var colsCnt = tbID.rows[0].cells.length;/*셀의 갯수확인*/

    if( colsCnt < 1) colsCnt = 1;
    for(var i=0; i<colsCnt; i++ )
    {
        var newCell         = newRow.insertCell();
        newCell.width       = '100';
        newCell.height      = '30';
        newCell.align       = 'left';
        newCell.style.borderStyle = "solid";
        newCell.style.borderWidth = "1px";
        if(i===0){
        newCell.innerHTML   ="작성자 : "+ ary[i];
        newCell.style.backgroundColor = '#FBCEB1'}
        if(i===1){newCell.innerHTML   = ary[i];
        newCell.style.backgroundColor = 'lightblue'}
    }/*작성자 테이블과 내용테이블에 맞는 내용을 추가하면된다.*/
}
  function fncAddbutton(tbID){
        var newCell;
        var newRow  = tbID.insertRow();
        var newCell         = newRow.insertCell();
        newCell.width       = '100';
        newCell.height      = '30';
        newCell.align       = 'left';
        newCell.colSpan='2';
        newCell.style.borderWidth = "1px";
        newCell.style.borderStyle = "solid";
        newCell.className = "cel"
        newCell.innerHTML ="<input type='button' value='답글' class='reple' onclick=reply(this)>";
        newCell.style.backgroundColor = 'lightgray'
/*답글 버튼을 생성화는 과정이다 관리하기 편하게 클래스로 선언하였고 답글을위해 onclick도 넣었다.*/
}

function reply(x){
var txt = prompt("답글을 입려해주세요");
var cellindex = document.getElementsByClassName('cel');
var repleindex = document.getElementsByClassName('reple');
/*클릭한 답글과 셀의 인덱스 비교를 위해 변수선언*/
for(var i=0;i<repleindex.length;i++){
  if (repleindex[i] === x){
cellindex[i].innerHTML ="<input type='hidden'  class='reple' onclick=reply(this)> " +"<div class='txt'>"+txt+'</div>'
/*계속 버튼의 클래스를 남겨두어 계산하기 편하게 구현*/
}
}
autolink('txt');
}
function autolink(clasna) {
        var container = document.getElementsByClassName(clasna);
        for(var i = 0 ; i<container.length;i++){
        var doc = container[i].innerHTML;
        var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi");

        container[i].innerHTML = doc.replace(regURL,"<a href='$1://$2' target='_blank'>$1://$2</a>"+"<div> </div>");
        if(container[i].innerHTML.indexOf("<a")!=-1){
          container[i].className="link";
          }
      }
}/*답글에 URL가 달릴시  hyperLink로 전환*/


/*Guestbook end*/
