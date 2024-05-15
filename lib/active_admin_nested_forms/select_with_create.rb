module ActiveAdmin
  module Views
    class SelectWithCreate < FormtasticProxy
      def build(_, *args, &_block)
        @model, @collection, @selectize, @class_name, @label, @link_label, @next_id, @instance = *args
      end

      def to_s
        options = generate_options(@collection)
        selectize_class = ""
        if @selectize
          selectize_class = "class='#{@selectize}'"
        end
        nid = ""
        if @next_id
          nid = @next_id.to_s
        end
        new_path = Rails.application.routes.url_helpers.send("new_admin_#{@model.to_s}_path")

        kl = @model.to_s.classify
        create_path = ""
        begin
          kl = kl.constantize
          create_path = Rails.application.routes.url_helpers.send("admin_#{kl.name.underscore.pluralize}_path")
        rescue
        end

        return '<li class="select input optional" id="' + @class_name + '_' + @model.to_s + '_input">
          <label for="' + @class_name + '_' + @model.to_s + '_id" class="label">' + @label + '</label>
          <select ' + selectize_class + ' name="' + @class_name + '[' + @model.to_s + '_id]" id="' + @class_name + '_' + @model.to_s + '_id">
          <option value="" label=" "></option> \ ' + options.join(" ") +'</select>
          <a href="#" class="create_new ' + @model.to_s + '"> ' + @link_label + '</a>
          <input type="hidden" value="'+ nid +'" id="next_id" />
          <input type="hidden" value="' + new_path + '" id="new_path" />
          <input type="hidden" value="' + create_path + '" id="create_path" />
          </li>'
      end

      private
      def generate_options(collection)
        available_labels = %w[to_label display_name full_name name title username login value]
        return [] if collection.blank?
        result = []

        collection.each do |item|
          name = ""
          id = item.id.nil? ? "" : item.id.to_s
          available_labels.each do |label|
            begin
              t = item.send(label.to_s)
              name = t unless t.blank?
            rescue
            end
          end
          isSelected = @instance.send("#{@model}_id").to_s == id ? "selected" : ""
          option = "<option value='" + id + " '#{isSelected} >" + name + "</option>"
          result << option
        end
        return result
      end
    end
  end
end
