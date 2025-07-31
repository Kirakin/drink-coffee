class User < ApplicationRecord
  has_secure_password
  
  has_many :cart_items, dependent: :destroy
  has_many :orders, dependent: :destroy
  
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end

