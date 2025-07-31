class CartItem < ApplicationRecord
  belongs_to :user
  belongs_to :coffee
  
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :user_id, uniqueness: { scope: :coffee_id }
  
  def total_price
    quantity * coffee.price
  end
end

