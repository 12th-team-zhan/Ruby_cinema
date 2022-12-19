# frozen_string_literal: true

class AddTicketAmountToCinemas < ActiveRecord::Migration[6.1]
  def change
    add_column :cinemas, :ticket_amount, :decimal, precision: 7, scale: 2
  end
end
