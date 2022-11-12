import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CustomTitles } from '../models/response-handler.models';

@Injectable()
export class ResponseHandlerService {
  constructor(private notify: NotificationService) {}

  public handleResponse(status: number, msg: string) {
    let message: string;
    let title: string;

    switch (status) {
      case 200:
        title = CustomTitles.Success;
        message = msg;
        break;
      case 400:
        title = CustomTitles.BadRequest;
        message = msg;
        break;
      case 401:
        title = CustomTitles.Authorization;
        message = msg;
        break;
      case 403:
        title = CustomTitles.Forbidden;
        message = msg;
        break;
      case 409:
        title = CustomTitles.Conflict;
        message = msg;
        break;

      default:
        title = CustomTitles.Default;
        message = msg;
        break;
    }

    if (status < 200) {
      return this.notify.showInfo(message, title);
    }

    if (status < 300) {
      return this.notify.showSuccess(message, title);
    }

    if (status < 400) {
      return this.notify.showWarning(message, title);
    }

    this.notify.showError(message, title);
  }
}
