const prices = {
  Capsule: 1.0,
  Filter: 2.0,
  Espresso: 3.0,
  'Single origin': 1.5,
  Decaf: 1.75,
  Blended: 2.1,
  '250g': 1.5,
  '500g': 2.75,
  '1000g': 4.2,
  Wholebean: 0.6,
  Filter: 0.8,
  Cafetiére: 1.05,
  'Every week': 14.0,
  'Every 2 weeks': 17.25,
  'Every month': 22.5,
};

let modalWrap = document.getElementsByClassName('modal-wrapper')[0];
let modal = document.getElementById('modal');
let checkout = document.getElementById('checkout');
let close = document.getElementById('close');
let final_options = document
  .getElementById('checkout-text')
  .getElementsByTagName('span');
let error_msg = document.getElementById('error');

let header = document.getElementsByClassName('accordion-item-header');

let summary = document
  .getElementById('summary-text')
  .getElementsByTagName('span');

let modal_summary = document
  .getElementById('checkout-text')
  .getElementsByTagName('span');

let nums = document.getElementsByClassName('nums');
let options = document.getElementsByClassName('options');

for (i = 0; i < header.length; i++) {
  header[i].addEventListener('click', function () {
    let panel = this.nextElementSibling;

    this.classList.toggle('active');

    let idx = Array.prototype.indexOf.call(header, this);
    nums[idx].classList.toggle('active');
    options[idx].classList.toggle('active');

    if (panel.style.display === 'flex') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'flex';
    }
  });

  let content = header[i].nextElementSibling.children;

  for (j = 0; j < content.length; j++) {
    content[j].addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        for (k = 0; k < content.length; k++) {
          content[k].classList.remove('active');
        }
      }
      let child = this.parentElement.previousElementSibling;
      let idx = Array.prototype.indexOf.call(header, child);

      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        text = this.children[0].innerHTML;
        summary[idx].innerHTML = text;
        summary[idx].style.color = '#0e8784';
        error_msg.style.display = 'none';
        modal_summary[idx].innerHTML = text;
        nums[idx].classList.add('checked');
      } else {
        summary[idx].innerHTML = '_____';
        modal_summary[idx].innerHTML = '_____';
        nums[idx].classList.remove('checked');
      }
    });
  }
}

let boxes = document.getElementsByClassName('shortcut-box');

for (i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let idx = Array.prototype.indexOf.call(boxes, this);
    header[idx].classList.toggle('active');
    nums[idx].classList.toggle('active');
    options[idx].classList.toggle('active');

    let panel = header[idx].nextElementSibling;

    if (panel.style.display === 'flex') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'flex';
    }
  });
}

checkout.addEventListener('click', function () {
  let incomplete = 0;
  for (el of summary) {
    if (el.innerHTML === '_____') {
      incomplete++;
      el.style.color = 'rgb(235, 81, 81)';
    }
  }
  if (incomplete > 0) {
    error_msg.style.display = 'block';
  } else {
    error_msg.style.display = 'none';
    for (el of summary) {
      el.style.color = '#0e8784';
    }
    let price = 0;

    for (el of final_options) {
      if (Object.keys(prices).includes(el.innerHTML)) {
        price = price + prices[el.innerHTML];
      }
    }
    document.getElementById('price').innerHTML = price;
    modal.classList.toggle('hide');
    modalWrap.classList.toggle('hide');
    body.classList.toggle('stop-scrolling');
  }
});

close.addEventListener('click', function () {
  modal.classList.toggle('hide');
  modalWrap.classList.toggle('hide');
  body.classList.toggle('stop-scrolling');
});
