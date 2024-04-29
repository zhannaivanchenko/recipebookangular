import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from "@angular/core";

@Directive({
    selector: "[appDropDown]"
})
export class DropdownDirective implements OnInit {
    @HostBinding("class.show")  isOpened = false;
    @HostBinding("attr.aria-expanded")  isExpanded = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {}

    @HostListener("click") toggleOpen(eventData: Event) {
        console.log("this.elRef=", this.elRef);
        this.isOpened = !this.isOpened;
        this.isExpanded = !this.isExpanded;
    }
}
