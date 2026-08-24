import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-validate-button',
  imports: [],
  templateUrl: './validate-button.html',
  styleUrl: './validate-button.css',
})
export class ValidateButton {
  action = output<void>();
  disabled = input<boolean>(false);

  onValidate(): void {
    this.action.emit();
  }
}
