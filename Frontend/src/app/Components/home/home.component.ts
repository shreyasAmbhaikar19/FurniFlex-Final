import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faqs = [
    {
      question: 'How does furniture renting work?',
      answer: 'Renting furniture is simple! Choose your favorite furniture or packages, decide on the rental tenure, and make the payment. We’ll deliver and set up everything at your home, hassle-free.',
      open: false
    },
    {
      question: 'Can I change the furniture during my subscription?',
      answer: 'Absolutely! Our flexible subscription plans allow you to swap furniture if your needs change. Just let us know, and we’ll arrange for the swap as per the terms of your subscription.',
      open: false
    },
    {
      question: 'What if the furniture gets damaged during my rental period?',
      answer: 'We understand that wear and tear can happen. For minor damages, we offer free maintenance. For more significant issues, we’ll assess the damage and may charge a minimal repair fee.',
      open: false
    },
    {
      question: 'Do you offer any insurance or protection plans for the rented furniture?',
      answer: 'Yes, we offer a Damage Waiver Program that covers accidental damages to your rented furniture, giving you peace of mind throughout your subscription period.',
      open: false
    },
    {
      question: 'What are the delivery charges for renting furniture?',
      answer: 'We provide free delivery and setup for all our furniture rentals. Our team will ensure a seamless installation of your chosen furniture at your home.',
      open: false
    }
  ];
  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
