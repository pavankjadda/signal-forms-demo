import { Component, input } from '@angular/core';
import { Field, FieldTree, required, schema } from '@angular/forms/signals';

export interface AddressModel {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const addressSchema = schema<AddressModel>((fieldPath) => {
  required(fieldPath.street, { message: 'Street is required' });
  required(fieldPath.city, { message: 'City is required' });
  required(fieldPath.state, { message: 'State is required' });
  required(fieldPath.zip, { message: 'Zip is required' });
});

@Component({
  selector: 'app-address',
  imports: [Field],
  templateUrl: './address.html',
  styleUrl: '../app.css',
})
export class Address {
  address = input.required<FieldTree<AddressModel>>();
}
