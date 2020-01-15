import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'ion-icon',
})

export class IonicCustomIconDirective implements OnInit, OnChanges {

  @Input('custom') selectedIcon: string;

  private iconsPath: string = './assets/icons/';

  constructor(
      private elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.setIcon();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ( changes.selectedIcon.currentValue !== changes.selectedIcon.previousValue ) {
      this.setIcon();
    }
  }

  private setIcon(): void {
    if ( this.elementRef.nativeElement.tagName === 'ION-ICON' ) {
      if ( this.selectedIcon === undefined ) return;
      if ( this.selectedIcon.split('.').pop() === 'svg' ) {
        const temp = this.selectedIcon.split('.');
        temp.pop();
        this.selectedIcon = temp.join('');
      }

      if ( this.selectedIcon.split('/').length > 1 ) {
        this.elementRef.nativeElement.setAttribute('src', this.selectedIcon + '.svg');
      } else {
        this.elementRef.nativeElement.setAttribute('src', this.iconsPath + this.selectedIcon + '.svg');
      }
    }
  }


}
