const modalBodyText = `
<p>
    This game pays homage to club penguin. It serves as a novelty that allows you to connect with your classmates and try to feel somewhat at home while doing so.
</p>`;

const modalHTML = `
  <div class="modal fade" id="navigation-modal" tabindex="-1" role="dialog"
    aria-labelledby="navigation-modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalLongTitle">Welcome to Cyber Campus!</h5>
                <h5 class="text-center">We currently support Swarthmore College, and that's it!</h5>
            </div>
            <div class="modal-body">
                ${modalBodyText}
                <p>What's your name?</p>
                <input type="text" onchange="changeName(this.value)">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="hideModal()">Save username</button>
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
  </div>`;

function showModal() {
  // maybe check if user is already logged in first...
  $('#navigation-modal').modal({ backdrop: 'static', keyboard: false });
}

function hideModal() {
  if (validateName(username)) {
    $('#navigation-modal').modal('hide');
    loggedIn = true;
    tellMainToCheckLogin();
  } else return;
}

function changeName(newName) {
  username = newName.trim();
}

function validateName(name) {
  if (name.replace(/\s/g, '').length) return true;
  return false;
}

function modalMain(modalHTML) {
  $('#parent-navigation-modal').html(modalHTML);
  showModal();
}

modalMain(modalHTML);