class RemoveTicketAmountToCinemas < ActiveRecord::Migration[6.1]
  def change
    remove_column :cinemas, :ticket_amount
  end
end
