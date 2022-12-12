# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]
  acts_as_paranoid

  # relationship
  has_many :movies, dependent: :destroy
  has_many :orders, dependent: :destroy

  enum role: { user: 0, staff: 1, admin: 2 }

  def self.from_omniauth_fb(auth)
    # Case 1: Find existing user by facebook uid
    user = User.find_by(fb_uid: auth.uid)
    if user
      user.fb_token = auth.credentials.token
      # user.fb_raw_data = auth
      user.save!
      return user
    end

    # Case 2: Find existing user by email
    existing_user = User.find_by(email: auth.info.email)
    if existing_user
      existing_user.fb_uid = auth.uid
      existing_user.fb_token = auth.credentials.token
      # existing_user.fb_raw_data = auth
      existing_user.save!
      return existing_user
    end

    # Case 3: Create new password
    user = User.new
    user.fb_uid = auth.uid
    user.fb_token = auth.credentials.token
    user.email = auth.info.email
    user.password = Devise.friendly_token[0, 20]
    # user.fb_raw_data = auth
    user.save!
    user
  end

    def self.create_from_provider_data(provider_data)
      where(email: provider_data.info.email).first_or_create do |user|
        user.email = provider_data.info.email
        user.password = Devise.friendly_token[0, 20]
        user.name = provider_data.info.last_name
        user.provider = provider_data.provider
        user.uid = provider_data.uid
      end
  end
end
