import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomPosition]',
})
export class RandomPositionDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const top =
      Math.random() * (window.innerHeight - this.el.nativeElement.offsetHeight);
    const left =
      Math.random() * (window.innerWidth - this.el.nativeElement.offsetHeight);
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.top = top + 'px';
    this.el.nativeElement.style.left = left + 'px';
  }
}
