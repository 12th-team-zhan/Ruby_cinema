# frozen_string_literal: true

class AddMaxRowColumnToCinemas < ActiveRecord::Migration[6.1]
  def change
    add_column(:cinemas, :max_row, :integer, default: 1)
    add_column(:cinemas, :max_column, :integer, default: 1)
  end
end
