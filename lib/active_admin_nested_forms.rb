# frozen_string_literal: true
require 'activeadmin'
require 'active_admin_nested_forms/activeadmin_form'
require 'active_admin_nested_forms/select_with_create'
require 'rails'
require_relative "active_admin_nested_forms/version"

module ActiveAdminNestedForms
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end
