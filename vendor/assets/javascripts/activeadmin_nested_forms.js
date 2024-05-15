$(document).ready(function () {

  // jQuery clone fix
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


  // Replacing existing ActiveAdmin nested resources display with collapsibles
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

  function toggleCollapsible() {
    $(this).toggleClass('active');
    const content = $(this).next('.collapsible-content');
    const selectizeElement = content.find('.selectize-forms');
    const datetimepickerElement = content.find('.datetimepicker');

    // Check if the collapsible is being opened
    if ($(this).hasClass('active')) {
      // Initialize Selectize only if it's not already initialized
      if (!selectizeElement.hasClass('selectized')) {
        const selectedValue = selectizeElement.val(); // Store selected value
        selectizeElement.selectize();
        if (selectedValue) {
          selectizeElement[0].selectize.setValue(selectedValue); // Restore selected value
        }
      }
    } else {
      // Destroy Selectize instance if the collapsible is being closed
      if (selectizeElement.hasClass('selectized')) {
        const selectedValue = selectizeElement.val(); // Store selected value
        const selectizeInstance = selectizeElement[0].selectize;
        if (selectizeInstance) {
          selectizeInstance.destroy();
        }
        if (selectedValue) {
          selectizeElement.val(selectedValue); // Restore selected value
        }
      }
    }

    // Adjust max-height
    content.css('max-height', content.css('max-height') !== '0px' ? '0px' : content.prop('scrollHeight') + 'px');

    // Check if the collapsible is being opened and has datetimepicker element
    if ($(this).hasClass('active') && datetimepickerElement.length > 0) {
      // Initialize datetimepicker after a short delay to ensure the collapsible is fully expanded and visible
      setTimeout(function () {
        if (datetimepickerElement.attr("value")) {
          const defaultDate = new Date(datetimepickerElement.attr("value")); // You can set any default date here
          datetimepickerElement.val(`${('0' + defaultDate.getDate()).slice(-2)}.${('0' + (defaultDate.getMonth() + 1)).slice(-2)}.${defaultDate.getFullYear()} ${defaultDate.getHours()}:${('0' + defaultDate.getMinutes()).slice(-2)}`);
        }

        datetimepickerElement.datetimepicker();
      }, 100); // You may adjust the delay as needed
    } else {
      // Destroy datetimepicker instance if the collapsible is being closed

      datetimepickerElement.datetimepicker('destroy');

    }
  }

  // Event delegation for existing and dynamically added collapsible elements
  $(document).on("click", ".collapsible-element", toggleCollapsible);


  // Event for dialog loading
  $(".has_many_container").on("click", "a.button.has_many_add", function (e) {
    $(document).off("click", "a.button.has_many_add");

    const $target = $(e.target);
    const $parentLi = $target.closest("li");
    const model = $parentLi.attr("class").split(/\s+/)[1];
    const inputData = $target.attr("data-html");
    const parent = $target.parent();
    let index = parseInt(parent.data("has_many_index") || ($(`div.${model}`).length - 1), 10);
    parent.data("has_many_index", ++index);
    const regex = new RegExp($target.data("placeholder"), 'g');
    const html = inputData.replace(regex, index);

    const dialogContent = `<div style='display:none' id='dialog-form' title='Napravi novi'>
        <form id="${model}_${index}">${html}
            <input type='hidden' name='model' value="${model}">
        </form>
    </div>`;
    $("body").append(dialogContent);

    $("#dialog-form a.has_many_remove").remove();
    const dialog = $("#dialog-form").dialog({
      autoOpen: false,
      modal: true,
      width: "fit-content",
      buttons: {
        "Spremi": function () {
          const $form = $(`#${model}_${index} fieldset`).clone(true);
          const collapseButton = `<button type="button" class="collapsible-element button_${model}_${index}"></button>`;
          const collapseContent = `<div id="div_${model}_${index}" class="collapsible-content"></div>`;
          $(parent.parent().parent()).after(collapseButton + collapseContent);
          $(`#div_${model}_${index}`).append($form).append("</div>");
          dialog.dialog("close");
        },
        "Cancel": function () {
          dialog.dialog("close");
        }
      },
      close: function () {
        $("#dialog-form").remove();
      },
      open: function () {
        $(`#${model}_${index} fieldset ol li .selectize-forms`).selectize();
        const options = {
          formatDate: 'd.m.Y',
          format: 'd.m.Y H:i',
          allowBlank: true,
          defaultSelect: false,
          validateOnBlur: false
        };
        $(`#${model}_${index} fieldset ol li .datetimepicker`).datetimepicker(options);
      }
    });

    dialog.dialog("open");
    $(document).off("click", `.collapsible-element.button_${model}_${index}`).on("click", `.collapsible-element.button_${model}_${index}`, toggleCollapsible);
  });

  $(".create_new").on("click", function (e) {
    e.preventDefault();

    const $target = $(e.target);
    const $parentLi = $target.closest("li");
    const model = $target.attr("class").split(/\s+/)[1];

    // Function to handle AJAX success
    const handleSuccess = function (data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const $body = $(doc.getElementById('active_admin_content'));

      // Hide first child and add class
      $body.children().eq(0).hide().addClass("hidden-dialog-form");

      // Append HTML to body
      $("body").append($body.html());

      // Remove unnecessary elements
      $(".hidden-dialog-form fieldset ol li.has_many_container").closest("fieldset").remove();
      $(".hidden-dialog-form input[type=submit]").remove();

      // Initialize dialog
      const dialog = $(".hidden-dialog-form").dialog({
        autoOpen: false,
        modal: true,
        width: "fit-content",
        dialogClass: "select-with-create",
        buttons: {
          "Spremi": function () {
            const form = $(`#new_${model}`).serialize();
            const availableNames = ["title", "name", "first_name", "name", "username"];
            let label = "";

            // Find label
            for (let i = 0; i < availableNames.length; i++) {
              if ($(`input#${model}_${availableNames[i]}`).length) {
                label = $(`input#${model}_${availableNames[i]}`).val();
                break;
              }
            }

            // AJAX POST request
            $.ajax({
              url: `${$("#create_path").val()}`,
              method: "POST",
              data: form
            }).done(function () {
              const parent = window.location.pathname.split("/")[2].slice(0, -1);
              const id = parseInt($("#next_id").val()) + 1;
              $(`select#${parent}_${model}_id`).append(`<option value='${id}' selected>${label}</option>`);
              dialog.dialog("close");
            }).fail(function (data) {
              console.log(data);
            });
          },
          "Cancel": function () {
            dialog.dialog("close");
          }
        },
        close: function () {
          $(".hidden-dialog-form").remove();
        },
        open: function () {
          $(`#new_${model}`).find("select.selectize-forms").selectize() 
          const options = {
            formatDate: 'd.m.Y',
            format: 'd.m.Y H:i',
            allowBlank: true,
            defaultSelect: false,
            validateOnBlur: false
          };
          $(`#new_${model}`).find("input.datetimepicker").datetimepicker(options);
          if (tinymce) {
            tinymce.init({
              selector: '.editor',
              menubar: false,
              height: 300,
              quickbars_insert_toolbar: false,
              quickbars_image_toolbar: false,
              plugins: 'link code lists advlist help',
              toolbar: 'undo redo | cut copy paste | bold italic | bullist numlist | link | code help'
            });
          }
        }
      });

      // Open dialog
      dialog.dialog("open");
    };

    // AJAX GET request
    $.ajax({
      url: `${$("#new_path").val()}`,
      method: "GET"
    }).done(handleSuccess).fail(function (data) {
      // Handle failure
    });
  });

});

