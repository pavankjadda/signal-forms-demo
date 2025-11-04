import { Component, signal } from '@angular/core';
import { apply, email, Field, form, required, schema, submit } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { Address, AddressModel, addressSchema } from './address/address';

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  address: AddressModel;
}

export const userSchema = schema<UserModel>((fieldPath) => {
  required(fieldPath.firstName, { message: 'First name is required' });
  required(fieldPath.lastName, { message: 'Last name is required' });
  required(fieldPath.email, { message: 'Email is required' });
  email(fieldPath.email, { message: 'Email must be a valid email address' });
  required(fieldPath.phone, { message: 'Phone is required' });
  required(fieldPath.age, { message: 'Age is required' });
  // apply child schema for identity checks
  apply(fieldPath.address, addressSchema);
});

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Field, Address],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  userModel = signal<UserModel>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 0,
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  userForm = form(this.userModel, userSchema);

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.userForm, async () => {
      // Perform login logic here
      const user = this.userModel();
      console.log('User:', user);
      // e.g., await this.userService.createUser(user);
    });
  }
}
