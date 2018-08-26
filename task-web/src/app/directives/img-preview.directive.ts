import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: 'img[imgPreview]'
})

export class ImgPreviewDirective {

    @Input() image: any;

    constructor(private element: ElementRef, private renderer: Renderer, private ref: ChangeDetectorRef, private domSanitization: DomSanitizer
    ) { }

    getImgfromUrl(url: string) {
        return Observable.create(observer => {
            let req = new XMLHttpRequest();
            req.open('get', url);
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    observer.next(req.response);
                    observer.complete();
                }
            };
            req.send();
        });
    }

    ngOnChanges(changes: SimpleChanges, ) {
        let element = this.element;
        if (this.image) {
            if (typeof this.image === 'string') {
                this.getImgfromUrl(this.image).subscribe(imageData => {
                    let src = URL.createObjectURL(new Blob([imageData]));
                    element.nativeElement.src = src;
                    return this.ref.detectChanges();
                });
            } else {
                let reader = new FileReader();
                reader.onloadend = (e) => {
                    element.nativeElement.src = reader.result;
                    return this.ref.detectChanges();
                };
                reader.readAsDataURL(this.image);
            }
        }

    }



}
