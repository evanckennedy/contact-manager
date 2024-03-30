'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';
import Contact from './Contact.js';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors, Delcarartions                             */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const input = utils.select('.input');
const contactsContainer = utils.select('.contact-grid-container');
const addButton = utils.select('.add-button');
const savedContacts = utils.select('.saved-contacts span');
const errorMessage = utils.select('.error-message');
let contactArray = [];
let contactCount = 0;


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Add contact                                          */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getInputArr() {
  const inputArr = input.value.split(',').map(ele => ele.trim());
  return inputArr;
}

/* pass above as your argument */
function createContactObj(inputArr) {
  let newContact = new Contact(...inputArr);
  contactArray.push(newContact);
  contactCount++;
  return newContact;
}

function updateContactCount() {
  savedContacts.textContent = contactCount;
}

function createContact() {
  if (contactCount >= 9) {
    errorMessage.textContent = 'Storage is full';
    errorMessage.classList.remove('hidden');
    return;
  }

  let inputArray = getInputArr();
  
  if (!validateInput(inputArray)) {
    return;
  }
  errorMessage.classList.add('hidden');

  let newContact = createContactObj(inputArray);

  let contactContainer = document.createElement('div');
  const contactContent = `
  <p>Name: ${newContact.name}</p>
  <p>City: ${newContact.city}</p>
  <p>Email: ${newContact.email}</p>
  `; 
  contactContainer.innerHTML = contactContent;
  contactsContainer.prepend(contactContainer);

  utils.listen('click', contactContainer, () => {
    contactContainer.remove();
    contactArray = contactArray.filter(contact => contact !== newContact);

    contactCount --;
    updateContactCount()

    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  });

  input.value = '';
  updateContactCount();
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Validation                                           */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Return true if input array has 3 elements */
function hasThreeElements(inputArr) {
  return inputArr.length === 3;
}

/* returns true if email is valid */
function hasValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateInput(inputArr) {
  if (!hasThreeElements(inputArr)) {
    errorMessage.textContent = 'Please enter a valid name, city, and email, separated by commas';
    errorMessage.classList.remove('hidden');
    return false;
  }

  if (!hasValidEmail(inputArr[2])) {
    errorMessage.textContent = 'Please enter a valid email.';
    errorMessage.classList.remove('hidden');
    return false;
  }

  return true;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('click', addButton, createContact);
