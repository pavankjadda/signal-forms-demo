import { Component, signal } from '@angular/core';
import { email, Field, form, required, submit } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Field],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  userModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 0,
  });

  userForm = form(this.userModel, (p) => {
    required(p.firstName, { message: 'First name is required' });
    required(p.lastName, { message: 'Last name is required' });
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Email must be a valid email address' });
    required(p.phone, { message: 'Phone is required' });
    required(p.age, { message: 'Age is required' });
  });

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
