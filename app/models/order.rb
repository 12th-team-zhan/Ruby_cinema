class Order < ApplicationRecord
  belongs_to :user
  # has_many :tickets

  enum status: { pending: 0, paid: 1, cancel: 2 }
  enum payment_method: { credit_card: 0, remittance: 1, cash: 2 }

  before_validation :generate_serial

  validates :serial, presence: true, uniqueness: true

  private
    def generate_serial
      self.serial = SecureRandom.alphanumeric(10)
    end
end
