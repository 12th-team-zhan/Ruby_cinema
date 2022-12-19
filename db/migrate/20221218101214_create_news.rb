# frozen_string_literal: true

class CreateNews < ActiveRecord::Migration[6.1]
  def change
    create_table :news do |t|
      t.string :title
      t.text :article
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :edit_user_id

      t.timestamps
    end
  end
end
