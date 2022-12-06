class CreateTheaters < ActiveRecord::Migration[6.1]
  def change
    create_table :theaters do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :theaters, :deleted_at
  end
end
