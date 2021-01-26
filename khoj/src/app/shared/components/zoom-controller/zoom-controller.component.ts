import { Component, OnInit } from '@angular/core';
import { MatToolTipPosition } from 'src/app/core/constants/index.constant';

@Component({
  selector: 'zoom-controller',
  templateUrl: './zoom-controller.component.html',
  styleUrls: ['./zoom-controller.component.scss']
})
export class ZoomControllerComponent implements OnInit {

  toolPosition: string = MatToolTipPosition.Above;

  constructor() { }

  ngOnInit(): void {
  }

}
