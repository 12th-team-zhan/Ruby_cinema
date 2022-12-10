# frozen_string_literal: true

class Theater < ApplicationRecord
  acts_as_paranoid

  # validates
  validates :name, presence: true
  validates :address, presence: true
  validates :phone, presence: true
  has_one_attached :exterior_img
end
