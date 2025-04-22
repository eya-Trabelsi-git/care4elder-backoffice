import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import du HttpClient
import { Observable } from 'rxjs';
import { Invoice } from './invoice.model'; // Assure-toi que ton modèle Invoice est bien importé

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private baseUrl = 'http://localhost:8081/api/factures';

  constructor(private http: HttpClient) {} // Injection du HttpClient dans le constructeur

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl, invoice); // Utilisation de http pour envoyer la requête POST
  }
  getAllFactures(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl);
  }
  // invoice.service.ts
  deleteFacture(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // Dans le service
  updateFacture(id: string, invoice: Invoice): Observable<Invoice> {
    if (!id) {
      throw new Error("ID de la facture manquant");
    }
    return this.http.put<Invoice>(`${this.baseUrl}/${id}`, invoice);
  }


}
