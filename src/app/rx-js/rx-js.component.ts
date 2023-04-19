import { AfterViewInit, Component } from '@angular/core';
import './rx-js-code'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.css']
})
// Первое решение. Здесь мы выводим в консоль каждый введённый символ. Это решение более правильное
// export class RxJsComponent implements AfterViewInit {
//   ngAfterViewInit(): void {
//     const val = new Subject();

//     const search=document.getElementById('search');
//     console.log(search);
//     search?.addEventListener('input',event=>{
//       val.next(event);
//     })

//     val.subscribe(value=>{
//       console.log(value)
//     })
//   }

// }
// Второе решение.
export class RxJsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    const search$=new Observable(observer=>{
        const search=document.getElementById('search');
        search?.addEventListener('input',event=>{
          observer.next(event);
        })
    })

    search$.subscribe(value=>{
      console.log(value);
    })
  }
}
