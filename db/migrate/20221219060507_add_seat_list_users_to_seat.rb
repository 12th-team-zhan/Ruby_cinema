class AddSeatListUsersToSeat < ActiveRecord::Migration[6.1]
  def change
    add_column :seats, :seat_list_users, :text, array: true, default: []
  end
end
