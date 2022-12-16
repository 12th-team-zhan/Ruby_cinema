class CreateMovieTheaters < ActiveRecord::Migration[6.1]
  def change
    create_table :movie_theaters do |t|
      t.belongs_to :movie, null: false, foreign_key: true
      t.belongs_to :theater, null: false, foreign_key: true

      t.timestamps
    end
  end
end
