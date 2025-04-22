import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { Invoice } from '../invoice/create-invoice/invoice.model';
import { InvoiceService } from '../invoice/create-invoice/invoice.service';  // Import du service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-invoice',
  imports: [CommonModule, FormsModule, MatDialogActions, MatDialogContent],
  templateUrl: './modify-invoice.component.html',
  standalone: true,
  styleUrls: ['./modify-invoice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifyInvoiceComponent {
  invoice: Invoice;

  constructor(
    private dialogRef: MatDialogRef<ModifyInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice },
    private invoiceService: InvoiceService  // Injection du service
  ) {
    this.invoice = { ...data.invoice }; // Initialiser l'invoice avec les données du modal
  }

  // Méthode appelée lors de la soumission du formulaire
  submitForm(invoiceForm: any): void {
    if (invoiceForm.valid) {
      if (this.invoice.id) {
        this.invoiceService.updateFacture(this.invoice.id, this.invoice).subscribe({
          next: (updatedInvoice) => {
            this.dialogRef.close(updatedInvoice);  // Ferme la modale avec la facture mise à jour
          },
          error: (err) => {
            // Vous pouvez gérer l'erreur ici sans afficher les logs dans la console
            // Par exemple, afficher un message d'erreur dans l'interface utilisateur
            // Gérer le cas d'erreur
          }
        });
      } else {
        // Gérer le cas où l'ID est manquant (afficher un message d'erreur ou autre)
      }
    } else {
      // Gérer le cas où le formulaire est invalide (afficher un message d'erreur ou autre)
    }
  }


}
