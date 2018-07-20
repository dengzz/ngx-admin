import { Injectable } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable()
export class SignalRService {
   private _hubConnection: HubConnection | undefined;

   constructor() {
      this._hubConnection = new signalR.HubConnectionBuilder()
         .withUrl(environment.signalrUrl)
         .configureLogging(environment.production ? signalR.LogLevel.Error : signalR.LogLevel.Debug)
         .build();
   }

   on(methodName: string, newMethod: (...args: any[]) => void): void {
      this._hubConnection.on(methodName, newMethod);
   }

   off(methodName: string): void {
      this._hubConnection.off(methodName);
   }

   start(): Promise<void>{
      return this._hubConnection.start();
   }

   stop(): Promise<void>{
      return this._hubConnection.stop();
   }

   invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
      return this._hubConnection.invoke(methodName, args);
   }
}
