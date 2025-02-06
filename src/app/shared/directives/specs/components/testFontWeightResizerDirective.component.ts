import { Component } from "@angular/core";
import { FontWeightResizerDirective } from "../../fontWeightResizer.directive";

@Component({
  imports: [FontWeightResizerDirective],
  standalone: true,
  template: ` <h2 fontWeightResizer="bold">Teste Directive</h2> `,
})
export class TestFontWeightResizerDirectiveComponent {}
