class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.decimal :amount
      t.string :serial
      t.integer :status, default: 0
      t.integer :payment_method, default: 0
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
