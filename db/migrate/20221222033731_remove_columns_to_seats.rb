class RemoveColumnsToSeats < ActiveRecord::Migration[6.1]
  def change
    remove_column :seats, :seat_list_users
    remove_column :seats, :category
  end
end
