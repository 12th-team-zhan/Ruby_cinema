class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :seat_list
      t.integer :status
      t.string :serial
      t.integer :category
      t.datetime :deleted_at
      t.integer :showtime_id
      t.integer :order_id

      t.timestamps
    end
  end
end
