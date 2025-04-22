import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.model';

@Component({
  standalone: true,
  selector: 'app-create-invoice',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent {
  invoice: Invoice = {
    reference: '',
    amount: 0,
    description: '',
    status: 'UNPAID',
    dueDate: '',
    dateCreation: ''
  };

  constructor(private invoiceService: InvoiceService) {}
  onSubmit(form: any) {
    if (form.valid) {
      // ✅ Corrige le format de la date d'échéance si les secondes manquent
      if (this.invoice.dueDate && this.invoice.dueDate.length === 16) {
        this.invoice.dueDate += ':00';
      }

      // ✅ Assigne une date de création correcte
      this.invoice.dateCreation = new Date().toISOString();

      this.invoiceService.createInvoice(this.invoice).subscribe({
        next: () => {
          alert('✅ Facture envoyée au backend !');
          form.resetForm({ statut: 'UNPAID' });
        },
        error: (err) => {
          alert('❌ Erreur lors de la création de la facture.');
          console.error(err);
        }
      });
    } else {
      console.warn('🛑 Le formulaire est invalide. Veuillez remplir tous les champs.');
    }
  }


}
