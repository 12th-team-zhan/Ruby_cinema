# frozen_string_literal: true

class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :eng_name
      t.integer :duration
      t.integer :film_rating, default: 0, null: false
      t.string :director
      t.string :actor
      t.date :debut_date
      t.text :description
      t.datetime :deleted_at
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
