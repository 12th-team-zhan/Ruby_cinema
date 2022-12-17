# frozen_string_literal: true

class CreateShowtimes < ActiveRecord::Migration[6.1]
  def change
    create_table :showtimes do |t|
      t.datetime :started_at
      t.datetime :end_at
      t.datetime :deleted_at
      t.integer :movie_id
      t.integer :cinema_id

      t.timestamps
    end
    add_index :showtimes, :deleted_at
  end
end
