# frozen_string_literal: true

class AddTicketdefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tickets, :status, 0
  end
end
