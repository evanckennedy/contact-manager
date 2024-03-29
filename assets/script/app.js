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
const savedContacts = utils.select('.saved-contacts span')
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
  return newContact
}

function updateContactCount() {
  savedContacts.textContent = contactCount;
}

function createContact() {
  if (contactCount > 9) {
    return;
  }

  let newContact = createContactObj(getInputArr());

  let contactContainer = document.createElement('div');
  const contactContent = `
  <div>
    <p>Name: ${newContact.name}</p>
    <p>City: ${newContact.city}</p>
    <p>Email: ${newContact.email}</p>
  </div>
  `; 
  contactContainer.innerHTML = contactContent;
  contactsContainer.prepend(contactContainer);

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
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listners                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('click', addButton, createContact)
