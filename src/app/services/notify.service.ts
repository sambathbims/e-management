import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  public notifyConfig: any = {
    position: ["top", "right"],
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private notiService: NotificationsService) { }

  showWarn(title, message){
    this.notiService.warn(title, message, this.notifyConfig);
  }

  showSuccess(title, message){
    this.notiService.success(title, message, this.notifyConfig);
  }

  showDanger(title, message){
    this.notiService.error(title, message, this.notifyConfig);
  }
}
