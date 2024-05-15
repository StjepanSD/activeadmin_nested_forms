# ActiveAdminNestedForms

This gem reorganizes nested resources and forms in [ActiveAdmin](https://activeadmin.info/) gem. It creates collapsible forms and shows dialogs on creation of new resources.

## Installation

Install the gem and add to the application's Gemfile by executing:

    $ bundle add active_admin_nested_forms

If bundler is not being used to manage dependencies, install the gem by executing:

    $ gem install active_admin_nested_forms

You need to have jQuery support in your project in order for this gem to work.

## Usage

Add javascript to your application.js file:

    $ //= require activeadmin_nested_forms

and add the following css to your application.css file:

    $ *= require activeadmin_nested_forms

If you're using selectize.js, you will need to use `selectize-forms` class on the selectize input in order for it to be initialized in the dialog and the collapsibles. Do not use this class for any other purposes in your project.

    $ f.input :field, input_html: { class: "selectize-forms"}

You can use your own selectize class for forms used by ActiveAdmin but make sure you add `selectize-forms` to the class list if you want the field to be shown as selectize in the dialogs. The following code will make the input selectizeable for your own class in normal ActiveAdmin forms and it will make the inputs selectizeable for dialogs presented by the gem.

    $ f.input :field, input_html: { class: "your-selectize-class selectize-forms"}

This gem has datetime picker support while using input fields with class `datetimepicker`. The following example shows how to use it:

    $ f.input :field, type: string, input_html: { class: "datetimepicker"}

Same as with selectize, you can use your own datetimepicker class for ActiveAdmin forms but make sure you add `datetimepicker` class to the class list for the dialogs.

It is very recommended that you use different classes for your own forms so that you don't initialize selectize or datetimepicker before dialog loads with your own code.

TinyMCE editor is also available for fields with `editor` class like:

    $ f.input :field, type: string, input_html: { class: "editor"}.

Future updates might expose some tinymce initialization methods so that you're not restricted to the current ones.

## Select with create usage

You can use `select_with_create` Formtastic class to create a select field with create link next to it by adding the following code:

    $ f.select_with_create model: :your_model, collection: :your_collection, selectize: :your_selectize_class, label: :field_label, link_label: :text_on_create_new_link

1. model: symbol of the model (:user, :article, :post, :author etc.)
2. collection: collection for the select element (defaults to Model.all)
3. selectize: class string, defines the select element as selectize (you need to manually initialize selectize for this class). Defaults to false
4. label: label for the field. Defaults to `I18n.t('activerecord.models.'+model.to_s+'.one')`
5. link_label: label for the link, defaults to "Novi ${label}". 

This field acts same as normal ActiveAdmin select with the option to add the record through dialog. The new record is automatically added to the list and selected. 

## Limitations and bugs

1. There's currently no support for date formatting. All date formats are in the format of `dd.mm.yyyy HH:MM`
2. `select_with_create` currently removes all has_many containers from the form. This is something that we might change in the future updates.
3. Images are currently not supported inside dialogs. They will not be packed with the form. This will most likely be fixed in the future updates.
4. `select_with_create` doesn't work properly with selectize right now (selectize: :string option is not functional completely)
5. tinyMCE initialization seems to be breaking if the create form is called more than once (tinyMCE doesn't initialize after the first time dialog has been opened)

## Future development

1. CSS is all over the place and more complicated dialogs will most likely fall apart. We are planning on fixing this so that the structure of dialologs is consistent.
2. We are planning on removing dependancy on jQuery, however the gem might lose some of its functionality.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_nested_forms. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/active_admin_nested_forms/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the ActiveAdminNestedForms project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/active_admin_nested_forms/blob/master/CODE_OF_CONDUCT.md).
