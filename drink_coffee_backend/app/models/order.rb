class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, dependent: :destroy
  
  validates :total, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true, inclusion: { in: %w[pending processing completed cancelled] }
  
  before_validation :set_default_status, on: :create
  
  private
  
  def set_default_status
    self.status ||= 'pending'
  end
end

