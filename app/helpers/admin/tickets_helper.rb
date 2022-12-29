# frozen_string_literal: true

module Admin
  module TicketsHelper
    def human_attribute_ticket_category
      Ticket.categories.map { |k, _v| [Ticket.human_attribute_name("category.#{k}"), k] }
    end
  end
end
