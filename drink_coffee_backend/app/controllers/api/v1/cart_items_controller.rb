class Api::V1::CartItemsController < ApplicationController
  before_action :set_cart_item, only: [:update, :destroy]
  
  def index
    cart_items = current_user.cart_items.includes(:coffee)
    render json: cart_items.map { |item|
      {
        id: item.id,
        coffee: {
          id: item.coffee.id,
          name: item.coffee.name,
          description: item.coffee.description,
          price: item.coffee.price,
          image_url: item.coffee.image_url
        },
        quantity: item.quantity,
        total_price: item.total_price
      }
    }
  end
  
  def create
    coffee = Coffee.find(params[:coffee_id])
    cart_item = current_user.cart_items.find_by(coffee: coffee)
    
    if cart_item
      cart_item.quantity += params[:quantity].to_i
      if cart_item.save
        render json: { message: 'Cart updated successfully', cart_item: format_cart_item(cart_item) }
      else
        render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
      end
    else
      cart_item = current_user.cart_items.build(
        coffee: coffee,
        quantity: params[:quantity]
      )
      
      if cart_item.save
        render json: { message: 'Item added to cart', cart_item: format_cart_item(cart_item) }, status: :created
      else
        render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
  
  def update
    if @cart_item.update(quantity: params[:quantity])
      render json: { message: 'Cart item updated', cart_item: format_cart_item(@cart_item) }
    else
      render json: { errors: @cart_item.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @cart_item.destroy
    render json: { message: 'Item removed from cart' }
  end
  
  private
  
  def set_cart_item
    @cart_item = current_user.cart_items.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Cart item not found' }, status: :not_found
  end
  
  def format_cart_item(item)
    {
      id: item.id,
      coffee: {
        id: item.coffee.id,
        name: item.coffee.name,
        description: item.coffee.description,
        price: item.coffee.price,
        image_url: item.coffee.image_url
      },
      quantity: item.quantity,
      total_price: item.total_price
    }
  end
end

