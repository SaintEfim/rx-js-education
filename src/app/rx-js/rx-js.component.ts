import { AfterViewInit, Component } from '@angular/core';
import './rx-js-code' // импортируется внешний код из файла rx-js-code.js
import { Observable, Subject } from 'rxjs'; // импортируются классы Observable и Subject из пакета rxjs

@Component({
  selector: 'app-rx-js', // селектор компонента
  templateUrl: './rx-js.component.html', // шаблон компонента
  styleUrls: ['./rx-js.component.css'] // стили компонента
})
// Комментарий к первому решению
// export class RxJsComponent implements AfterViewInit {
//   ngAfterViewInit(): void {
//     const val = new Subject(); // создается новый Subject

//     const search=document.getElementById('search'); // получение элемента с id="search"
//     search?.addEventListener('input',event=>{ // добавление слушателя на событие ввода данных в поле ввода
//       val.next(event); // передача события в Subject
//     })

//     val.subscribe(value=>{ // подписка на значения Subject
//       console.log(value) // вывод каждого введенного символа в консоль
//     })
//   }
// }

// Комментарий ко второму решению
export class RxJsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    const search$=new Observable(observer=>{ // создание нового Observable
        const search=document.getElementById('search'); // получение элемента с id="search"
        search?.addEventListener('input',event=>{ // добавление слушателя на событие ввода данных в поле ввода
          observer.next(event); // передача события в Observable
        })
    })

    search$.subscribe(value=>{ // подписка на значения Observable
      console.log(value); // вывод каждого введенного символа в консоль
    })
  }
}
