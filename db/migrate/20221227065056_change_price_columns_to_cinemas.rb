# frozen_string_literal: true

class ChangePriceColumnsToCinemas < ActiveRecord::Migration[6.1]
  def change
    remove_column :cinemas, :ticket_amount

    add_column :cinemas, :regular_price, :decimal, precision: 7, scale: 2, default: 0.00
    add_column :cinemas, :concession_price, :decimal, precision: 7, scale: 2, default: 0.00
    add_column :cinemas, :elderly_price, :decimal, precision: 7, scale: 2, default: 0.00
    add_column :cinemas, :disability_price, :decimal, precision: 7, scale: 2, default: 0.00
  end
end
