import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides = [
    {
      src: 'assets/img/carousel_1.svg',
    },
    {
      src: 'assets/img/carousel_2.svg',
    },
    {
      src: 'assets/img/carousel_3.svg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
