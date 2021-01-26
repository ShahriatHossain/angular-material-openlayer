import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

/**
 * Notification service
 */
export class NotifyService {
  /**
   * Create instance of NotifyService
   * @param toastr 
   */
  constructor(private toastr: ToastrService) { }

  /**
   * Show success message
   * @param title 
   * @param msg 
   */
  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title);
  }

  /**
   * Show warning message
   * @param msg 
   * @param title 
   */
  showWarning(msg: string, title: string) {
    this.toastr.warning(msg, title);
  }

  /**
   * Show error message
   * @param msg 
   * @param title 
   */
  showError(msg: string, title: string) {
    this.toastr.error(msg, title);
  }
}
