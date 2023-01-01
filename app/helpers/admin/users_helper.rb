# frozen_string_literal: true

module Admin
  module UsersHelper
    def human_attribute_roles
      User.roles.map { |k, _v| [User.human_attribute_name("role.#{k}"), k] }
    end
  end
end
