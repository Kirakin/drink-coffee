class Api::V1::CoffeesController < ApplicationController
  def skip_authentication?
    action_name == 'index'
  end
  
  def index
    coffees = Coffee.all
    render json: coffees.map { |coffee|
      {
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        price: coffee.price,
        image_url: coffee.image_url
      }
    }
  end
end

