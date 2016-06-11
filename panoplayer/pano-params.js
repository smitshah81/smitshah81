window.PanoPlayer = {};
(function(){
 PanoPlayer= function(){
	var panoramas =new Array();
	var viewer;
	var screenaddedlater= new Array();
	var screenaddedlaterpos= new Array();
	var linkadded= new Array();
	var data,structureddata;
	this.loadFile = function(loadurl){
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", loadurl, true);
	    xhttp.send();
	    xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	      	
	      	player.setupPanorama(JSON.parse(xhttp.responseText));
	   	 }

		};
	};
	this.setupPanorama = function(data){
		viewer = new PANOLENS.Viewer();
		for(var i in data)
		{
			var singledata=data[i].reverse();
		//	console.log(singledata);
			for (var j in singledata)
			{
				if(singledata[j].image)
				{
					panoramas["p"+i] = new PANOLENS.ImagePanorama( singledata[j].image);
					
				}
				else
				{
					player.randerScreen(panoramas,singledata[j],"p"+i);
				}
			}

		}
		for(var allpano in panoramas)
		{
			viewer.add( panoramas[allpano]);
		}
		if(Object.size(screenaddedlater) != 0)
		{
			for(var i in screenaddedlater)
			{
				if(linkadded.indexOf(i) == -1)
				{
					linkadded.push(screenaddedlater[i]);
					console.log(linkadded);
					console.log(panoramas[i]);
					console.log(panoramas[screenaddedlater[i]]);
					panoramas[i].link(panoramas[screenaddedlater[i]]);
					console.log(panoramas[screenaddedlater[i]].linkedSpots);
				}

			}
		}
	};
	Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
	this.randerScreen = function(panoramas,screenData,current){
		
		var html="";
		var type=screenData.type;
		if(screenData.type=="video")
		{
			document.getElementById("desc-container").innerHTML =player.getVideoHtml(screenData.name,screenData.typevalue);
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="audio")
		{
			document.getElementById("desc-container").innerHTML=player.getAudioHtml(screenData.name,screenData.typevalue);
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="image")
		{
			document.getElementById("desc-container").innerHTML=player.getImageHtml(screenData.name,screenData.typevalue);
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="screen")
		{
			
				screenaddedlater[current]="p"+screenData.typevalue;
			//	panoramas[current].position.set( screenData.x, screenData.y, screenData.z );

		}
		 
		

	};
	this.getVideoHtml = function(videoname,videourl){
		var video ='<div class="leanback-player-video">';
       	video +='<video  preload="metadata" controls >';//poster="./folder/poster.jpg"
		video +='<source src="'+videourl+'" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'/>';
	    video+='</video>';
	    video+='</div>';
	    video+='<div class="title">';
	    video+=videoname;
	    video+='</div>';
	    video+='<div class="text">';
	    video+='</div>';
		return	video;
	};
	this.getAudioHtml = function(audioname,audiourl)
	{
		var audio ='<div class="leanback-player-audio">';
      	audio +='<audio  preload="metadata" controls >';//poster="./folder/poster.jpg"
		audio +='<source src="'+audiourl+'" type=\'audio/mpeg; codecs="vorbis"\'/>';
    	audio+='</audio>';
    	audio+='<div class="title">';
    	audio+=audioname;
    	audio+='</div>';
    	audio+='<div class="text">';
    	audio+='</div>';
    	audio+='</div>';
		return	audio;
	};
	this.getImageHtml = function(imagename,imageurl)
	{
    	var image ='<img src="'+imageurl+'" class="image" />';
    	image+='<div class="title">';
    	image+=imagename;
    	image+='</div>';
    	image+='<div class="text">';
    	image+='</div>';
    	image+='</div>';
		return	image;
	};
};


})(this);

var player = new PanoPlayer();
player.loadFile("http://smitshah81.github.io/panoplayer/test.json");
     