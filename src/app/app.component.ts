import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'webrtc';
  // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   // Not adding `{ audio: true }` since we only want video now
  //   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  //     //video.src = window.URL.createObjectURL(stream);
  //     video.srcObject = stream;
  //     video.play();
  //   });

  // }

  @ViewChild('video') private video!:ElementRef;
  @ViewChild('canvas') private canvas!:ElementRef;
  ctx:any
    constructor(private zone:NgZone)
  {  
    
  this.zone.runOutsideAngular(() => {
      if(navigator.mediaDevices )
        {
          console.log("true to display media")
        }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream:any) => {

        // this is outside a zone
        // const myBlob = new Blob(stream);
        this.zone.run(() => {
          this.video.nativeElement.srcObject = stream;

          // Create URL for the MediaStream object
          // const streamUrl = URL.createObjectURL(stream);
          // console.log(streamUrl); // This should output the URL
           // and again inside a zone
          //  this.video.nativeElement.src =stream;
           this.video.nativeElement.load();
           this.video.nativeElement.play();
        });
      })
      .catch(err => console.error(err));


      
  });

    // this.video
  }

  vidoeEnable()
  {
    this.zone.runOutsideAngular(() => {
      if(navigator.mediaDevices )
        {
          console.log("true to display media")
        }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream:any) => {

        // this is outside a zone
        // const myBlob = new Blob(stream);
        this.zone.run(() => {
          this.video.nativeElement.srcObject = stream;

          // Create URL for the MediaStream object
          // const streamUrl = URL.createObjectURL(stream);
          // console.log(streamUrl); // This should output the URL
           // and again inside a zone
          //  this.video.nativeElement.src =stream;
           this.video.nativeElement.load();
           this.video.nativeElement.play();
        });
      })
      .catch(err => console.error(err));
  });

  navigator.mediaDevices.getUserMedia({ video: false, audio: true })
  .then((stream) => {
      //  this.localStream = stream;
       // Do something with the stream
     })
  .catch((error) => {
       console.error('Error accessing media devices.', error);
     });
  }

  vidoeDisable()
  {
    if (this.video.nativeElement.srcObject) {
      this.video.nativeElement.srcObject.getVideoTracks()[0].stop();
      this.video.nativeElement.srcObject = null;
    }
  }

  ngOnInit()
  {
    console.log(this.canvas.nativeElement)
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  imageCapture:any = null;
  takeSnapshot()
  {
    
   
    console.log(this.ctx)
    this.ctx.drawImage(this.video, 0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  // requestPermission()
  // { this.zone.runOutsideAngular(() => {
  
  //     navigator.mediaDevices
  //       .getUserMedia({ video: false, audio: true })
  //       .then((stream) => {
  //         this.localStream = stream // A
  //         // window.localAudio.srcObject = stream; // B
  //         // window.localAudio.autoplay = true; // C
  //       })
  //       .catch((err) => {
  //         console.error(`you got an error: ${err}`);
  //       });
  // });
 
  // }
  // localStream!: MediaStream;
}
