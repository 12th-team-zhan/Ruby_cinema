class ChangeNews < ActiveRecord::Migration[6.1]
  def change
    remove_column :news, :article
  end
end
