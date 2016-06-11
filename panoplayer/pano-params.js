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
		
		// if(window.XMLHttpRequest){
  //              var xhttp = new XMLHttpRequest();
  //           }else{
  //              var xhttp = new ActiveXObject('Microsoft.XMLHTTP');
  //           };


		// xhttp.open("GET", loadurl, true);
		// xhttp.responseType = 'json';
		// xhttp.setRequestHeader('Accept', 'application/json');
	 //    xhttp.send();
	 //    xhttp.onreadystatechange = function() {
	 //    if (xhttp.status == 200) {
	 //      	console.log(xhttp.response);
	 //      	player.setupPanorama(JSON.parse(xhttp.response));
	 //   	 }

		// };
		player.setupPanorama(JSON.parse(jsonstring));
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
			panoramas[allpano].position.set( 	Math.floor((Math.random() * 10)), 0, 0 );
			viewer.add( panoramas[allpano]);
			
			
			//panoramas[1].position.set( -54.00, -58.00, 31.10 );
		}
		if(Object.size(screenaddedlater) != 0)
		{
			for(var i in screenaddedlater)
			{
				if(linkadded.indexOf(i) == -1)
				{
					linkadded.push(screenaddedlater[i]);
					panoramas[screenaddedlater[i]].link(panoramas[i]);
					panoramas[i].linkedSpots[0].position.set(screenaddedlaterpos[i].x,screenaddedlaterpos[i].y,screenaddedlaterpos[i].z);
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
		document.getElementById("desc-container").innerHTML="";
		var type=screenData.type;
		if(screenData.type=="video")
		{
			
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			document.getElementById("desc-container").innerHTML=player.getVideoHtml(screenData.name,screenData.typevalue);
			iid.addHoverElement(document.getElementById("desc-container"));
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="audio")
		{
			
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
			document.getElementById("desc-container").innerHTML=player.getAudioHtml(screenData.name,screenData.typevalue);
			iid.addHoverElement(document.getElementById("desc-container"));
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="image")
		{
			
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage[type]);
			
			document.getElementById("desc-container").innerHTML=player.getImageHtml(screenData.name,screenData.typevalue);
			iid.addHoverElement(document.getElementById("desc-container"));
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );
		}
		else if(screenData.type=="text")
		{
			var  iid = new PANOLENS.Infospot( 350, PANOLENS.DataImage["Info"]);
			iid.addHoverText(screenData.typevalue);
			iid.position.set( screenData.position.x, screenData.position.y, screenData.position.z );
		 	panoramas[current].add( iid );	
		}
		else if(screenData.type=="screen")
		{
			
				screenaddedlater[current]="p"+screenData.typevalue;
				screenaddedlaterpos[current]=screenData.position;
				//panoramas[current].position.set( 0,0,0 );

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
player.loadFile("http://192.168.5.196/panolence/panolens.js-master/build/test.json");
     