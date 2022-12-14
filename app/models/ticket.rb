# frozen_string_literal: true

class Ticket < ApplicationRecord
  before_validation :generate_serial
  acts_as_paranoid

  belongs_to :showtime
  belongs_to :order

  enum status: { unuses: 0, used: 1, no_avail: 2 }
  enum category: { regular_ticket: 0, concession_ticket: 1, elderly_ticket: 2, disability_ticket: 3 }

  validates :serial, presence: true, uniqueness: true

  scope :includes_byorder_id, ->(orderid) {includes(showtime: [:movie,{ cinema: :theater }]).where(order_id: orderid).limit(1).references(:showtime).first
  }

  private

  def generate_serial
    self.serial = SecureRandom.alphanumeric(10) if serial.nil?
  end
end
