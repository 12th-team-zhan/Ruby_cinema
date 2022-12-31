# frozen_string_literal: true

module Admin
  module TheatersHelper
    def human_attribute_areas
      Theater.areas.map { |k, _v| [Theater.human_attribute_name("area.#{k}"), k] }
    end
  end
end
