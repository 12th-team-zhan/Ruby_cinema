class RemoveOrderIdToTicket < ActiveRecord::Migration[6.1]
  def change
    remove_column(:tickets, :order_id)
  end
end
