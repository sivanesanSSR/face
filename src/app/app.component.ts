import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  }

}
