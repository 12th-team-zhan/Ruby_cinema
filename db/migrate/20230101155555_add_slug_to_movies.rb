class AddSlugToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :slug, :string
    add_index :movies, :slug, unique: true
    add_column :theaters, :slug, :string
    add_index :theaters, :slug, unique: true
    add_column :news, :slug, :string
    add_index :news, :slug, unique: true
  end
end
