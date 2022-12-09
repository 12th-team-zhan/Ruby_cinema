class ChangeCategoryToSeats < ActiveRecord::Migration[6.1]
  def change
    change_column :seats, :category, :string, default: "added"
  end
end
