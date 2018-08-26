import { Component } from '@angular/core';
@Component({
  selector: 'tm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tm';
  constructor() { }
  ngOnInit() {
    setTimeout(() => {
      window.clearInterval(window['randomLoader'])
    }, 10000)
  }

}
