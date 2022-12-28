# frozen_string_literal: true

class ChangeOrder < ActiveRecord::Migration[6.1]
  def change
    add_reference :tickets, :order, index: true
    rename_column :tickets, :seat_list, :seat
    remove_column :cinemas, :regular_price
    remove_column :cinemas, :concession_price
    remove_column :cinemas, :elderly_price
    remove_column :cinemas, :disability_price
    remove_column :orders, :amount
    add_column :cinemas, :regular_price, :integer, default: 0
    add_column :cinemas, :concession_price, :integer, default: 0
    add_column :cinemas, :elderly_price, :integer, default: 0
    add_column :cinemas, :disability_price, :integer, default: 0
    add_column :orders, :amount, :integer, default: 0
  end
end
