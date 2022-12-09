class AddCategoryToSeats < ActiveRecord::Migration[6.1]
  def change
    add_column :seats, :category, :integer, default: 0
  end
end
