import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CustomTitles } from '../models/error-handler.models';

@Injectable()
export class ErrorHandlerService {
  constructor(private notify: NotificationService) {}

  public handleError({ status, error }: HttpErrorResponse) {
    let message: string;
    let title: string;

    switch (status) {
      case 400:
        title = CustomTitles.BadRequest;
        message = error.message;
        break;
      case 401:
        title = CustomTitles.Authorization;
        message = error.message;
        break;
      case 403:
        title = CustomTitles.Forbidden;
        message = error.message;
        break;
      case 409:
        title = CustomTitles.Conflict;
        message = error.message;
        break;

      default:
        title = CustomTitles.Default;
        message = error.message;
        break;
    }

    this.notify.showError(message, title);
  }
}
