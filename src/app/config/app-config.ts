import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export abstract class AppStorefrontConfig {
  login?: {
    isGoogleAuthEnabled?: boolean;
    adminEmail:string;
  };
}