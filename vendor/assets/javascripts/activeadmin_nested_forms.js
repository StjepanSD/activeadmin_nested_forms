$(document).ready(function () {
  (function (original) {
    jQuery.fn.clone = function () {
      var result = original.apply(this, arguments),
        my_textareas = this.find('textarea').add(this.filter('textarea')),
        result_textareas = result.find('textarea').add(result.filter('textarea')),
        my_selects = this.find('select').add(this.filter('select')),
        result_selects = result.find('select').add(result.filter('select'));

      for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
      for (var i = 0, l = my_selects.length; i < l; ++i) {
        for (var j = 0, m = my_selects[i].options.length; j < m; ++j) {
          if (my_selects[i].options[j].selected === true) {
            result_selects[i].options[j].selected = true;
          }
        }
      }
      return result;
    };
  })(jQuery.fn.clone);


  $(".has_many_container").children("fieldset").each(function (i) {
    var form = $(this).clone(true)
    var model = $(this).parent()[0].className.split(/\s+/)[1]
    var index = i
    var name = ""
    var collapse = '<button type="button" class="collapsible-element">' + name + '</button><div id="div_' + model + '_' + index + '" class="' + model + ' collapsible-content">';
    $($(this).parent().parent().parent()).after(collapse)
    $(`#div_${model}_${index}`).append(form)
    $(`#div_${model}_${index}`).append("</div>")
    $(this).remove()
    

  });

  initCollapse()
  $(".has_many_container a.button.has_many_add").on("click", (e) => {
    var dialog, form;
    $(document).off("click", "a.button.has_many_add")
    var model = $(e.target).parent("li")[0].className.split(/\s+/)[1]
    var inputData = e.target.getAttribute("data-html")
    const parent = e.target.parentElement

    let index = parseInt(parent.dataset.has_many_index || (document.querySelectorAll(`div.${model}`).length - 1), 10)
    parent.dataset.has_many_index = ++index
    const regex = new RegExp(e.target.dataset.placeholder, 'g')
    const html = inputData.replace(regex, index)

    $("body").append("<div style='display:none' id='dialog-form' title='Napravi novi'> \
    <form id="+ model + "_" + index + ">" + html + "\
    <input type='hidden' name='model' value="+ model + "\
    </form>\
    </div>")
    $("#dialog-form a.has_many_remove").remove()
    dialog = $("#dialog-form").dialog({
      autoOpen: false,
      modal: true,
      width: "fit-content",
      buttons: {
        "Spremi": function () {
          var form = $(`#${model}_${index} fieldset`).clone(true)
          var name = ""
          var collapse = '<button type="button" class="collapsible-element">' + name + '</button><div id="div_' + model + '_' + index + '" class="collapsible-content">';
          $(parent.parentElement.parentElement).after(collapse)
          $(`#div_${model}_${index}`).append(form)
          $(`#div_${model}_${index}`).append("</div>")
          dialog.dialog("close")
        },
        Cancel: function () {
          dialog.dialog("close");
        }
      },
      close: function () {
        $("#dialog-form").remove()
        initCollapse()
      },
      open: function () {
        $(`#${model}_${index} fieldset ol li .select-beast`).selectize();
        var options = {
          formatDate: 'd.m.Y',
          format: 'd.m.Y H:i',
          allowBlank: true,
          defaultSelect: false,
          validateOnBlur: false
        }
        $(`#${model}_${index} fieldset ol li .datetimepicker`).datetimepicker(options);
      }
    });

    dialog.dialog("open");
  })

});



function initCollapse() {
  var coll = document.getElementsByClassName("collapsible-element");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
       $('.select-beast').selectize();
       var options = {
        formatDate: 'd.m.Y',
        format: 'd.m.Y H:i',
        allowBlank: true,
        defaultSelect: false,
        validateOnBlur: false
      }
      $(".datetimepicker").datetimepicker(options);
    });
  }
}