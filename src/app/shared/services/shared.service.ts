import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public showSidebarSubject = new BehaviorSubject<boolean>(false);
  showSidebar$ = this.showSidebarSubject.asObservable();

  showSidebar: boolean = false;

  constructor() { }

  setShowSidebar(value: boolean) {
    this.showSidebarSubject.next(value);
  }
  
}
