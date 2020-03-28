const modalHTML = `<div class="modal fade" id="navigation-modal" tabindex="-1" role="dialog"
aria-labelledby="navigation-modalTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Welcome to Cyber Campus!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            ...
        </div>
    </div>
</div>
</div>`;

$('#parent-navigation-modal').html(modalHTML);

$('#navigation-modal').modal('show');
