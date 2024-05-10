$(".has_many_container a.button.has_many_add").on("click", (e) => {
    var dialog, form;
    $(document).off("click", "a.button.has_many_add")
    var model = $(e.target).parent("li")[0].className.split(/\s+/)[1]
    var inputData = e.target.getAttribute("data-html")
    const parent = e.target.parentElement

    let index = parseInt(parent.dataset.has_many_index || (parent.querySelectorAll('fieldset').length - 1), 10)
    parent.dataset.has_many_index = ++index

    const regex = new RegExp(e.target.dataset.placeholder, 'g')
    const html = inputData.replace(regex, index)
    
    $("body").append("<div style='display:none' id='dialog-form' title='Create new user'> \
    <form>"+ html + "\
    <input type='hidden' name='model' value="+ model + "\
    </form>\
    </div>")
    $("#dialog-form a.has_many_remove").remove()
    dialog = $("#dialog-form").dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        "Create an account": function () {

          $("#edit_event").append(html)
          dialog.dialog("close")
        },
        Cancel: function () {
          dialog.dialog("close");
        }
      },
      close: function () {
        $("#dialog-form").remove()
      }
    });

    form = dialog.find("form").on("submit", function (event) {
      event.preventDefault();

      $("#edit_event").append(html)

      dialog.dialog("close")
    });

    dialog.dialog("open");
  })
