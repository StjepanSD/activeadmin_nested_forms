module ActiveAdmin
  module Views
    class ActiveAdminForm
      def select_with_create **args
        class_name = form_builder.object.class.model_name.element
        instance = form_builder.object
        model = args[:model]
        collection = args[:collection] || get_collection(model)
        label = args[:label] || I18n.t('activerecord.models.'+model.to_s+'.one')
        selectize = args[:selectize] || false
        link_label  = args[:link_label] || "Novi #{label.downcase}"
        next_id = get_next_id(model)
        insert_tag(SelectWithCreate, form_builder, model, collection, selectize, class_name, label, link_label, next_id, instance)
      end

      private

      def get_next_id(model)
        kl = model.to_s.classify
        begin
          kl = kl.constantize
          return kl.connection.select_value("SELECT NEXTVAL('#{model.name.underscore.pluralize}_id_seq')")
        rescue
          return nil
        end
      end

      def get_collection(model)
        kl = model.to_s.classify
        begin
          kl = kl.constantize
          return kl.send(:all)#.send("order(:id)")
        rescue
          return nil
        end
      end
    end
  end
end
