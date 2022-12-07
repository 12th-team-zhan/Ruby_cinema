# frozen_string_literal: true

class AddNameSoftdeleteRoleInUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :deleted_at, :datetime
    add_index :users, :deleted_at
    add_column :users, :role, :integer, default: 0
  end
end
