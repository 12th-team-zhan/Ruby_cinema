# frozen_string_literal: true

class AddTicketQuantityToTickets < ActiveRecord::Migration[6.1]
  def change
    add_column :tickets, :regular_quantity, :integer, default: 0
    add_column :tickets, :concession_quantity, :integer, default: 0
    add_column :tickets, :elderly_quantity, :integer, default: 0
    add_column :tickets, :disability_quantity, :integer, default: 0
  end
end
