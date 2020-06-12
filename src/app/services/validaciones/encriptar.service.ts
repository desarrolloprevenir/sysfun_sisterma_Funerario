import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {

  constructor() { }

  // Metodo para encriptar
  encriptar(pssw) {
    return CryptoJS.SHA512(pssw).toString(CryptoJS.enc.Hex);
  }

}
