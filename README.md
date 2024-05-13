# IMPORTANT

This gem is still under heavy development and testing. It is not recommended to use it until we relase a stable version.

# ActiveAdminNestedForms

This gem reorganizes nested resources and forms in [ActiveAdmin](https://activeadmin.info/) gem. It creates collapsible forms and shows dialogs on creation of new resources.

## Installation

Install the gem and add to the application's Gemfile by executing:

    $ bundle add active_admin_nested_forms

If bundler is not being used to manage dependencies, install the gem by executing:

    $ gem install active_admin_nested_forms

## Usage

Add javascript to your application.js file:

    $ //= require activeadmin_nested_forms

and add the following css to your application.css file:

    $ *= require activeadmin_nested_forms

If you're using selectize.js, you will need to use `select-beast` class on the selectize input in order for it to be initialized in the dialog.

This gem has datetime picker support while using [active_adminv_datetimepicker](https://github.com/activeadmin-plugins/active_admin_datetimepicker) gem.


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_nested_forms. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/active_admin_nested_forms/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the ActiveAdminNestedForms project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/active_admin_nested_forms/blob/master/CODE_OF_CONDUCT.md).
