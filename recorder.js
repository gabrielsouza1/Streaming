var { desktopCapturer } = require('electron');
var fs = require('fs');

var videoElement = document.querySelector('video');
var listElement = document.querySelector('ul');
var outputElement = document.querySelector('#output');

var Rec = {
    recorder: null,
    blobs:[],
    start(){
       if (this.recorder === null && ScreenManager.selectedSource) {
              outputElement.innerHTML = 'Recording . . .';
              navigator.webkitGetUserMedia({
              	video:{
              		chromeMediaSource: 'desktop',
              		chromeMediaSourceId: ScreenManager.selectedSource.id,
              		minWidth: 800,
              		maxWith: 1280,
              		minHeight: 600,
              		maxHeight: 720
              	}
              },this.handleStrem, this.handleUserMediaError)
       }
    },
    stop(){
      if (Rec.recorder.state !== null) {
      	 Rec.recorder.onstop = function(){
              videoElement.src = '';
              Rec.toArrayBuffer(new Blob(Rec.blobs,{type: 'video/webm'}), function(arrayBuffer){

              })
              Rec.recorder=null;
      	 }
      	 Rec.recorder.stop();
      }
    },
    handleStrem(stream){
    	Rec.recorder = new MediaRecorder(steam);
    	Rec.blobs
     videoElement.poster = '';
     videoElement.src = URL.createObjectURL(stream);
     Rec.recorder.ondataavailable = function(event){
     	Rec.blobs.push(event.data);
     }
     Rec.recorder.start();
    },
    handleUserMediaError(e){
    	console.error('handleUserMediaError', e);
    },
    toArrayBuffer(blob, callback){
    	let fileReader = new fileReader();
    	fileReader.onload = function(){
    		let arrayBuffer = this.result;
    		callback(arrayBuffer);
    	}
    	fileReader.readAsArrayBuffer(blobs);
    },
    toBuffer(arrayBuffer){
    	let buffer = new Buffer(arrayBuffer.byteLength);
    	let arr = new Uint8Array(arrayBuffer)
    	for(let 1 = 0; i < arr.byteLength; i++){
    		buffer[i] = arr[i];
    	}
    	return buffer;
    }
}

var ScreenManager = {
	sources: [],
	selectedSource: null;
	listScreens(){
		desktopCapturer.getSources({types:{'window', 'screen'}}, function(error,sources){
			var template = '';
			ScreenManager.source = sources;
			sourcers.forEach(source =>{
				template += `<li onclick="ScreenManager.setScreen('${sources.id}')">
				<img src="${source.thumbnail.toDataURL()}" />
				<h3>$(source.name)</h3>
				</li>`;
			})
			listElement.innerHTML = template;
		})
	},
	setScreen(sourceId){
		this.selectedSource = this.sources.find(source => source.id === sourceId);
		videoElement.poster = this.selectedSource.thumbnail.toDataURL();
		videoElement.src = '';
		videoElement.controls = false;
	}
}