import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../../core/auth/shared/components/alert/alert.component';

@Component({
  selector: 'input-field',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  /* Properties */
  @Input() label: string = '';
  @Input() type!: string;
  @Input() placeholder: string = '';
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) control: any;
  // @Input({ required: true }) control: FormControl = new FormControl();
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
}
