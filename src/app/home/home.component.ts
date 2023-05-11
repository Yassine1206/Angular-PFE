import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides = [
    {
      src: 'assets/img/pc.jpg',
    },
    {
      src: 'assets/img/pc.jpg',
    },
    {
      src: 'assets/img/pc.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
