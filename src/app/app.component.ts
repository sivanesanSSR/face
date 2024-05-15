import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'webrtc';
  ctx;
  imageCapture: any = null;
  @ViewChild('video') private video: ElementRef;
  @ViewChild('canvas') private canvas: ElementRef;
 
  constructor(private zone: NgZone,private elRef: ElementRef) {
    // this.zone.runOutsideAngular(() => {
    //   if (navigator.mediaDevices) {
    //     console.log("true to display media")
    //   }
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream: any) => {

    //       // this is outside a zone
    //       // const myBlob = new Blob(stream);
    //       this.zone.run(() => {
    //         this.video.nativeElement.srcObject = stream;

    //         // Create URL for the MediaStream object
    //         // const streamUrl = URL.createObjectURL(stream);
    //         // console.log(streamUrl); // This should output the URL
    //         // and again inside a zone
    //         //  this.video.nativeElement.src =stream;
    //         this.video.nativeElement.load();
    //         this.video.nativeElement.play();
    //       });
    //     })
    //     .catch(err => console.error(err));
    // });
  }

  ngOnInit() {
    // console.log(this.canvas.nativeElement)
    // this.ctx = this.canvas.nativeElement.getContext('2d');
    this.loadModels();
  }

  vidoeEnable() {
    this.zone.runOutsideAngular(() => {
      if (navigator.mediaDevices) {
        console.log("true to display media")
      }
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream: any) => {
          this.zone.run(() => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.load();
            this.video.nativeElement.play();
          });
        })
        .catch(err => console.error(err));
    });

    // navigator.mediaDevices.getUserMedia({ video: false, audio: false })
    //   .then((stream) => {
    //   })
    //   .catch((error) => {
    //     console.error('Error accessing media devices.', error);
    //   });
  }

  vidoeDisable() {
    if (this.video.nativeElement.srcObject) {
      this.video.nativeElement.srcObject.getVideoTracks()[0].stop();
      this.video.nativeElement.srcObject = null;
    }
  }

  takeSnapshot() {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }


  async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  }
  
  // Detect faces in an image
  async detectFaces(imageElement) {
    const detections = await faceapi.detectAllFaces(imageElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    return detections;
  }
  
  // Example usage
  async processImage(imageElement) {
    await this.loadModels();
    const detections = await this.detectFaces(imageElement);
    // Process detections as needed
  }
  // captureImage() {
  //   this.imageCapture = this.canvas.nativeElement.toDataURL('image/png');
  //   this.zone.run(() => {
  //     this.image.nativeElement.src = this.imageCapture;
  //   });
  // }

  // ====== > tensorflow <======
  getevents(){
    console.log(faceapi);
  }

  mtcnnForwardParams:any = {
    // number of scaled versions of the input image passed through the CNN
    // of the first stage, lower numbers will result in lower inference time,
    // but will also be less accurate
    maxNumScales: 10,
    // scale factor used to calculate the scale steps of the image
    // pyramid used in stage 1
    scaleFactor: 0.709,
    // the score threshold values used to filter the bounding
    // boxes of stage 1, 2 and 3
    scoreThresholds: [0.6, 0.7, 0.7],
    // mininum face size to expect, the higher the faster processing will be,
    // but smaller faces won't be detected
    minFaceSize: 200
  }

  mtcnnResults:any;
  async  ngAfterViewInit() {
    this.mtcnnResults = await faceapi.mtcnn(this.video.nativeElement, this.mtcnnForwardParams)
    let data= { withScore: false }
    faceapi.draw.drawDetections('overlay', this.mtcnnResults.map(res => res.faceDetection))
    faceapi.draw.drawFaceLandmarks('overlay', this.mtcnnResults.map(res => res.faceLandmarks))

  }

//   WIDTH = 440;
// HEIGHT = 280;
// @ViewChild('video',{ static: true })
// public video: ElementRef;
// @ViewChild('canvas',{ static: true })
// public canvasRef: ElementRef;
// stream: any;
// detection: any;
// resizedDetections: any;
// canvas: any;
// canvasEl: any;
// displaySize: any;
// videoInput: any;


// async ngOnInit() {
//   await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
//   await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
//   await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
//   await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),]).then(() => this.startVideo());
//   }

//   startVideo() {
//     this.videoInput = this.video.nativeElement;
//     navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//       .then((stream) => {
//         this.videoInput.srcObject = stream
//         this.videoInput.load();
//         this.videoInput.play();
//         // this.detect_Faces();
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices.', error);
//       });
 
//     }
//     onMediaLoad()
//     {
//       this.detect_Faces();
//     }
//     mediaLoaded:boolean=false;
//     async detect_Faces() {
//       this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
//        this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);
//        this.canvasEl = this.canvasRef.nativeElement;
//        this.canvasEl.appendChild(this.canvas);
//        this.canvas.setAttribute('id', 'canvass');
//        this.canvas.setAttribute(
//           'style',`position: fixed;
//           top: 0;
//           left: 0;`
//        );
//        this.displaySize = {
//           width: this.videoInput.width,
//           height: this.videoInput.height,
//        };
//        faceapi.matchDimensions(this.canvas, this.displaySize);
//        setInterval(async () => {
//          this.detection = await faceapi.detectAllFaces(this.videoInput,  new  faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//          this.mediaLoaded = true;
//          this.resizedDetections = faceapi.resizeResults(
//             this.detection,
//             this.displaySize
//           );
//          this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width,this.canvas.height);
//          faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
//          faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
//          faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
//       }, 100);
//       });
//       }
}
