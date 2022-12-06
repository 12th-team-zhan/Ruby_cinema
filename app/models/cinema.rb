class Cinema < ApplicationRecord
    validates :name, presence: true
    
    acts_as_paranoid
end
