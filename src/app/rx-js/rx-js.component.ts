// Импортируем необходимые модули и функции из библиотек
import { AfterViewInit, Component } from '@angular/core';
import {ajax} from "rxjs/internal/ajax/ajax";
import './rx-js-code'; // Импортируем дополнительный код из другого файла
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  pairwise,
  switchMap,
  takeUntil,
  from
} from 'rxjs'; // Импортируем функции и классы из RxJS


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
      const stop=document.getElementById('stop');
      if (!search || !stop){
        observer.error('not find'); // Если элемент не найден, то вызываем ошибку
        return;
      }
      const onSearch=(event: any)=>{
        observer.next(event); // Когда происходит событие ввода, мы вызываем метод next нашего наблюдаемого объекта
      };

      const onStop = (event: any)=>{
        observer.complete(); // Вызываем метод complete, если хотим завершить наблюдаемый объект
        clear();
      }

      stop?.addEventListener('click', onStop);
      search?.addEventListener('input',onSearch);

      const clear =()=>{
        search?.removeEventListener('input',onSearch);
        stop?.removeEventListener('click',onStop);
      };

    });


    // Используем операторы RxJS для обработки событий ввода
    search$
      .pipe(
        map(event => {
          return (event.target as HTMLInputElement).value; // Извлекаем значение из события ввода
        }),
        debounceTime(500), // Игнорируем события ввода, которые происходят быстрее, чем раз в 500 миллисекунд
        distinctUntilChanged(), // Игнорируем повторяющиеся значения
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

      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      // Получаем контекст для рисования на холсте
      const cx =canvas.getContext('2d');
      // Если контекст не найден, то вызываем ошибку и прекращаем выполнение кода
      if (!cx){
        return;
      }
      // Устанавливаем толщину линии
      cx.lineWidth=4;

      // Интерфейс для представления координат x и y
  interface Position{
    x:number;
    y:number;
  }

  // Функция для рисования линии на холсте
  function drawLine([prev,next]:Position[]) {
    // Начинаем новый путь рисования
    cx?.beginPath();
    // Устанавливаем точку начала линии
    cx?.moveTo(prev.x, prev.y);
    // Рисуем линию до точки окончания
    cx?.lineTo(next.x, next.y);
    // Рисуем контур линии
    cx?.stroke();
  }
  // Создаем поток событий "mousemove" на холсте
  const mousemove$=fromEvent<MouseEvent>(canvas, 'mousemove');
  // Создаем поток событий "mousedown" на холсте
  const mousedown$ =fromEvent<MouseEvent>(canvas, 'mousedown');
  // Создаем поток событий "mouseup" на холсте
  const mouseup$ =fromEvent<MouseEvent>(canvas, 'mouseup');
  // Создаем поток событий "mouseout" на холсте
  const mouseout$ =fromEvent<MouseEvent>(canvas, 'mouseout');

  // Создаем поток координат мыши событий "mousemove" на холсте
  const points$=mousemove$.pipe(
    map<MouseEvent,Position>(({clientX,clientY})=>{
      // Получаем размеры и позицию холста на странице
      const {top,left} =canvas.getBoundingClientRect();
      // Вычисляем координаты относительно холста
      return {
        x: clientX-left,
        y: clientY-top
      };
    }),
    pairwise<Position>()
  )

  // Создаем поток событий "mousedown", который будет выдавать поток координат points$, пока не произойдет событие "mouseup" или "mouseout"
  mousedown$.pipe(
    switchMap(() => points$.pipe(takeUntil(mouseout$),takeUntil(mouseup$)
    ))
  ).subscribe(drawLine)
    const url = 'https://api.github.com/search/users?q='
  const search_GitHub_API:HTMLElement|null=document.getElementById('search_GitHub_API')!;

  const stream$=fromEvent(search_GitHub_API,'input')
    .pipe(
      map(event => { return (event.target as HTMLInputElement).value; }),
      debounceTime(500), // Игнорируем события ввода, которые происходят быстрее, чем раз в 500 миллисекунд
      distinctUntilChanged(), // Игнорируем повторяющиеся значения
      switchMap(y=>{return ajax.getJSON(url+y)}),
      map(result=>{
        return result.items;
      } )
    );
  stream$.subscribe(value => {
    console.log(value);
  })
  }
}

