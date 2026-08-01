import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appProductImage]',
    standalone: true
})
export class ProductImageDirective {

  private skeleton!: HTMLElement;
  @Input() fallbackImage:string = 'assets/images/no_img.jpg';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    console.log("Directive Created")
    console.log(this.elementRef.nativeElement);
    this.createSkeleton();
    this.renderer.setAttribute(this.elementRef.nativeElement, 'loading', 'lazy');
   }

@HostBinding('class.loaded')
isLoaded =false;

@HostListener('load')
onLoad(): void {

  const image = this.elementRef.nativeElement;

  // Fade in image
  this.isLoaded =true;
  // Remove skeleton
  if (this.skeleton) {

    const parent = this.renderer.parentNode(image);

    this.renderer.removeChild(parent, this.skeleton);

  }

}

@HostListener('error')
onError(): void {

  const image = this.elementRef.nativeElement as HTMLImageElement;

  if (!image.src.includes('no_img.jpg')) {

    this.renderer.setAttribute(
      image,
      'src',
      this.fallbackImage
    );

  }

  if (this.skeleton) {

    const parent = this.renderer.parentNode(image);

    this.renderer.removeChild(parent, this.skeleton);

  }

  this.isLoaded=true;

}

private createSkeleton(){
  this.skeleton=this.renderer.createElement('div');
  this.renderer.addClass(this.skeleton,'image-skeleton');
  const parent=this.renderer.parentNode(this.elementRef.nativeElement);
  this.renderer.insertBefore(parent,this.skeleton,this.elementRef.nativeElement);
}

}
