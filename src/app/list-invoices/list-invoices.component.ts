import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../invoice/create-invoice/invoice.service';
import { Invoice } from '../invoice/create-invoice/invoice.model';
import { ModifyInvoiceComponent } from "../modify-invoice/modify-invoice.component";
import { MatDialog } from '@angular/material/dialog'; // Importer MatDialog
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-invoices',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss']
})
export class ListInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  selectedStatus: string = ''; // Pour le filtre

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.invoiceService.getAllFactures().subscribe({
      next: (data) => {
        this.invoices = data;
        this.filterInvoices(); // Appliquer le filtre dès le chargement
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des factures', err);
      }
    });
  }

  filterInvoices(): void {
    if (this.selectedStatus) {
      this.filteredInvoices = this.invoices.filter(
        (invoice) => invoice.status === this.selectedStatus
      );
    } else {
      this.filteredInvoices = [...this.invoices];
    }
  }

  deleteFacture(id: string | undefined): void {
    if (id) {
      this.invoiceService.deleteFacture(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(invoice => invoice.id !== id);
          this.filterInvoices(); // Mettre à jour le filtre après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la facture', err);
        }
      });
    } else {
      console.error('ID de la facture manquant');
    }
  }

  openModifyModal(invoice: Invoice): void {
    const dialogRef = this.dialog.open(ModifyInvoiceComponent, {
      data: { invoice: invoice },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invoiceService.getAllFactures().subscribe({
          next: (data) => {
            this.invoices = data;
            this.filterInvoices(); // Appliquer le filtre à nouveau
          },
          error: (err) => {
            console.error('❌ Erreur lors de la récupération des factures après modification', err);
          }
        });
      }
    });
  }
}
