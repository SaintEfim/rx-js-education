//Test
// Импортируем необходимые модули и функции из библиотек
import { AfterViewInit, Component } from '@angular/core';
import './rx-js-code'; // Импортируем дополнительный код из другого файла
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs'; // Импортируем функции и классы из RxJS

@Component({
  selector: 'app-rx-js', // Селектор, который определяет, какой элемент DOM будет управлять компонентом
  templateUrl: './rx-js.component.html', // Шаблон компонента
  styleUrls: ['./rx-js.component.css'] // Стили для компонента
})

// Компонент RxJsComponent, который будет отображать информацию по RXJS
export class RxJsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Создаем новый Observable (наблюдаемый объект) search$ и передаем ему функцию обратного вызова (observer)
    const search$ = new Observable<Event>(observer => {
      // Находим элемент input с идентификатором 'search'
      const search = document.getElementById('search');
      if (!search) {
        observer.error('not find'); // Если элемент не найден, то вызываем ошибку
        return;
      }
      search?.addEventListener('input', event => {
        observer.next(event); // Когда происходит событие ввода, мы вызываем метод next нашего наблюдаемого объекта
        // observer.complete(); // Вызываем метод complete, если хотим завершить наблюдаемый объект
      });
    });

    // Используем операторы RxJS для обработки событий ввода
    search$
      .pipe(
        map(event => {
          return (event.target as HTMLInputElement).value; // Извлекаем значение из события ввода
        }),
        debounceTime(500), // Игнорируем события ввода, которые происходят быстрее, чем раз в 500 миллисекунд
        distinctUntilChanged() // Игнорируем повторяющиеся значения
      )
      .subscribe({
        next: value => {
          console.log(value); // Выводим значения в консоль
        },
        error: err => {
          console.log(err); // Обрабатываем ошибки
        },
        complete: () => {
          console.log('finish'); // Вызываем, когда наблюдаемый объект завершен
        }
      });
  }
}
