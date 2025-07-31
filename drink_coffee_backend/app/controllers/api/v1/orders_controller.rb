class Api::V1::OrdersController < ApplicationController
  def index
    orders = current_user.orders.includes(order_items: :coffee).order(created_at: :desc)
    render json: orders.map { |order|
      {
        id: order.id,
        total: order.total,
        status: order.status,
        created_at: order.created_at,
        items: order.order_items.map { |item|
          {
            id: item.id,
            coffee: {
              id: item.coffee.id,
              name: item.coffee.name,
              image_url: item.coffee.image_url
            },
            quantity: item.quantity,
            price: item.price,
            total_price: item.total_price
          }
        }
      }
    }
  end
  
  def create
    cart_items = current_user.cart_items.includes(:coffee)
    
    if cart_items.empty?
      render json: { error: 'Cart is empty' }, status: :unprocessable_entity
      return
    end
    
    total = cart_items.sum(&:total_price)
    
    ActiveRecord::Base.transaction do
      order = current_user.orders.create!(
        total: total,
        status: 'pending'
      )
      
      cart_items.each do |cart_item|
        order.order_items.create!(
          coffee: cart_item.coffee,
          quantity: cart_item.quantity,
          price: cart_item.coffee.price
        )
      end
      
      # Clear the cart
      current_user.cart_items.destroy_all
      
      render json: {
        message: 'Order placed successfully',
        order: {
          id: order.id,
          total: order.total,
          status: order.status,
          created_at: order.created_at
        }
      }, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: 'Failed to create order', details: e.message }, status: :unprocessable_entity
  end
end

