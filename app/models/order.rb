# frozen_string_literal: true

class Order < ApplicationRecord
  extend FriendlyId

  acts_as_paranoid
  belongs_to :user
  has_many :tickets
  friendly_id :serial, :use => [:slugged, :finders]

  enum status: { pending: 0, paid: 1, cancel: 2 }
  enum payment_method: { credit_card: 0, remittance: 1, cash: 2 }

  before_validation :generate_serial

  validates :serial, presence: true, uniqueness: true
  validates :amount, presence: true

  private

  def generate_serial
    self.serial = SecureRandom.alphanumeric(10) if serial.nil?
  end

  def should_generate_new_friendly_id?
    slug.blank? || serial_changed?
  end
end
