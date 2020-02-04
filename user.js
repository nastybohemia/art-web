var email;

function setup() {
    //email
    makeDisplay();
}

//email
function makeDisplay() {
    emailText = createDiv();
  emailText.id('EMAILS');
  emailInput = createDiv('Please enter the address you want to send a drawing to');
  emailInput.parent('EMAILS');
  input = createInput(email);
  input.parent('EMAILS');
  input.id = 'EMAIL';
  button = createButton('Submit');
  button.parent('EMAILS');
  button.mousePressed(submitButton);
}

function submitButton(){
  var linkURL = "http://computingant.com/testing/index.html";
  linkURL += "?email=" + input.value();
     Email.send({
      SecureToken : "8f3f3aff-06d2-493b-aa98-1d135b73a48b",
      To : input.value(),
      From : "sophie@post-production.team",
      Subject : "Your drawing",
      Body : "Hello,<br><br>The payment has been processed and completed, <br>please visit <a href='" + linkURL + "'>this link</a><br><br>Let me know if you have any questions.<br><br>Sincerely,<br>Walnut Creek Furniture<br>3473 OH-39, <br>Walnut Creek, OH 4468<br>+1 330-893-3383<br><br>walnutcreekfurniture.com"
  }); 
    Email.send({
      SecureToken : "8f3f3aff-06d2-493b-aa98-1d135b73a48b",
      To : "sophie@post-production.team", 
      From : "sophie@post-production.team",
      Subject : "New drawing was created!",
      Body : input.value()
  }).then(
        message => alert('Email was sent to ' + input.value())
    );
}