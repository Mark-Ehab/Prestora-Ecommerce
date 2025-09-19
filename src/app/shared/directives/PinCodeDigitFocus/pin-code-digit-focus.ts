import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[PinCodeDigitFocus]',
})
export class PinCodeDigitFocus {
  /* Dependency Injection */
  /* Inject target element on which this directive will be applied through function injection */
  private readonly el = inject(ElementRef);

  /* Properties */
  @Input() nextDigit!: HTMLInputElement;
  @Input() prevDigit!: HTMLInputElement;
  numericDigitRegex: RegExp = /^\d{1}$/;

  /* Event Handlers */
  /*-----------------------------------------------------------------------------
  # Description: A function to focus on and jump to the next verification code 
  # digit after current verification code digit is filled with numeric value on
  # input event
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('input')
  onInput() {
    if (this.numericDigitRegex.test(this.el.nativeElement.value)) {
      if (this.el.nativeElement.value && this.nextDigit) {
        this.nextDigit.focus();
      }
    } else {
      this.el.nativeElement.value = '';
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to focus on and jump to the previous verification code 
  # digit after current verification code digit is deleted on keydown -> backspace 
  # event
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('keydown.backspace')
  onBackspace() {
    if (!this.el.nativeElement.value && this.prevDigit) {
      this.prevDigit.focus();
    } else if (
      this.el.nativeElement.value &&
      !this.nextDigit &&
      this.prevDigit
    ) {
      this.el.nativeElement.value = '';
      this.prevDigit.focus();
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to focus on and jump to the next verification code 
  # digit on keydown -> arrowright event 
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('keydown.arrowright')
  onArrowright() {
    if (this.nextDigit) {
      this.nextDigit.focus();
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to focus on and jump to the previous verification code 
  # digit on keydown -> arrowleft event 
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('keydown.arrowleft')
  onArrowleft() {
    if (this.prevDigit) {
      this.prevDigit.focus();
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to always move the caret (cursor) to the right of the
  # content on focus event 
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('focus')
  onFocus() {
    const input = this.el.nativeElement;
    const len = input.value.length;
    setTimeout(() => input.setSelectionRange(len, len), 0);
  }
}
