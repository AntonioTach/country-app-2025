import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  query = output<string>();
  placeholder = input<string>('Search');

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.query.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
