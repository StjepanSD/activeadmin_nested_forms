# frozen_string_literal: true

require_relative "lib/active_admin_nested_forms/version"

Gem::Specification.new do |spec|
  spec.name = "active_admin_nested_forms"
  spec.version = ActiveAdminNestedForms::VERSION
  spec.authors = ["Slobodna Domena Zadruga za otverni kod i dizajn"]
  spec.email = ["stjepan_vrljicak@yahoo.co.uk"]

  spec.summary = "Gem that overrides normal active admin nested forms behaviour."
  spec.homepage = "https://slobodnadomena.hr/"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.4.0"

  spec.metadata["allowed_push_host"] = "https://slobodnadomena.hr/"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://slobodnadomena.hr/"
  spec.metadata["changelog_uri"] = "https://slobodnadomena.hr/"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (f == __FILE__) || f.match(%r{\A(?:(?:bin|test|spec|features)/|\.(?:git|travis|circleci)|appveyor)})
    end
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # Uncomment to register a new dependency of your gem
  spec.add_dependency "activeadmin"
  spec.add_development_dependency "rspec"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end