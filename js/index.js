$(function(){
	
var t;	
var shiwu;
var she;
var shebiao=[] ;
var scores=0; //分数	
//加载游戏界面
function loadView(){
	for(var i=0;i<20;i++){
	for(var j=0;j<20;j++){
		$("<div>").attr("id",i+"_"+j)
				.addClass("block")
				.css("background-color",'white')
				.appendTo(".scence");
	}
}	
}


function finddiv(x,y){
		return $('#'+x+'_'+y);
	}	
function eatShe(){
	
	she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	
	$.each(she,function(i,v){
		finddiv(v.x,v.y).addClass("she");
	})
	shiwu=fangshiwu();
	t=setInterval(move,200);
	$(document).on('keydown',function(e){
			var fanbiao={'zuo':37,'you':39,'shang':38,'xia':40}
			var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
			if(Math.abs(e.keyCode-fanbiao[direction])==2){
	     	return
	     }else{
	     	direction=biao[e.keyCode];
	     }
		})

}
//moveh函数
var direction='you';
function move(){
		var jiutou=she[she.length-1];
		if(direction==='you'){
			var  xintou={x:jiutou.x,y:jiutou.y+1};
		}
		if(direction==='zuo'){
			var xintou={x:jiutou.x,y:jiutou.y-1};
		}
		if(direction==='shang'){
			var xintou={x:jiutou.x-1,y:jiutou.y};
		}
		if(direction==='xia'){
			var xintou={x:jiutou.x+1,y:jiutou.y};
		}
			
		 if(shebiao[xintou.x+"_"+xintou.y]){
		//if(shebiao[xintou.x+"_"+xintou.y]==shebiao[xintou.x+"_"+xintou.y].nextAll()){
	   	 	var audioa=document.getElementById("audioa");
			audioa.play();
			clearInterval(t);
	   	 	alert("撞到自己了");
	   	 	return;
	   	 }
	   	 if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			var audioa=document.getElementById("audioa");
			audioa.play();
	   	 	clearInterval(t);
	   	 	alert("撞墙了");
	   	 	return;
	   	 }

		she.push(xintou);
		finddiv(xintou.x,xintou.y).addClass("she");
		if(xintou.x===shiwu.x&&xintou.y===shiwu.y){
			var audio=document.getElementById("audio");
			audio.play();
			scores+=10;
			finddiv(shiwu.x,shiwu.y).removeClass("food");
			shiwu=fangshiwu();
		}else{
			var  weiba=she.shift();//移除第一个；
			finddiv(weiba.x,weiba.y).removeClass("she");
		}
		$('.score').text(scores);	
	}
	
//随机放食物
function fangshiwu(){
		do{
		  	var x=Math.floor(Math.random()*19);
			var y=Math.floor(Math.random()*19);
		}while(shebiao[x+"_"+y]){
			finddiv(x,y).addClass("food");
			return {x:x,y:y};
		}
		
	}
$('.resert').on('click',function(){		
		clearInterval(t);
		finddiv(shiwu.x,shiwu.y).removeClass("food");
		finddiv(she[0].x,she[0].y).removeClass("she");
		finddiv(she[0].x,she[0].y).nextAll().removeClass("she");
		direction='you';
		scores=0;
		eatShe();
	})

var a=true;
$('.start').hide();
$('.resert').hide();
$('.score').hide();
$('#stop').hide();
$('.yes').on('click',function(){
		loadView();
		eatShe();
		a=false;
		$('.button').hide();
		$('.start').show();
		$('.resert').show();
		$('.score').show();
		$('#stop').show();
	
})
$('.no').on('click',function(){
		$('.button').hide();
		$('.stop').hide();
		$('.start').show();
		$('#stop').show();
		return;
		
})

$('.start').on('click',function(){		
	if(a){
		loadView();
		eatShe();
		a=false;
		$('.button').hide();
		$('.start').show();
		$('.resert').show();
		$('.score').show();
		$('#stop').show();
	}
	
})
var stopvalue=document.getElementById("stop");
$('#stop').on('click',function(){		
		if(stopvalue.innerHTML=="暂停"){
			clearInterval(t);
			stopvalue.innerHTML="继续";
		}
		else{
			t=setInterval(move,200);
			stopvalue.innerHTML="暂停";
		}
			
})

	})