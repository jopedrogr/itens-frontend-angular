import { Component, Input } from '@angular/core';

@Component({
    selector: 'fe-item',
    templateUrl: 'item.component.html'
})
export class ItemComponent {
    @Input() url='';
    @Input() name='';
}