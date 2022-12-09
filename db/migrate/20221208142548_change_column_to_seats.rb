# frozen_string_literal: true

class ChangeColumnToSeats < ActiveRecord::Migration[6.1]
  def change
    remove_column :seats, :row
    remove_column :seats, :number
    add_column :seats, :seat_list, :text, array: true, default: []
  end
end
