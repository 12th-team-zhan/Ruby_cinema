class Theater < ApplicationRecord
  acts_as_paranoid

  #validates
  validates :name, presence: true
  validates :address, presence: true
  validates :phone, presence: true
end
