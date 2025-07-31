Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post 'register', to: 'auth#register'
      post 'login', to: 'auth#login'
      delete 'logout', to: 'auth#logout'
      
      # Coffee routes
      resources :coffees, only: [:index]
      
      # Cart routes
      resources :cart_items, only: [:index, :create, :update, :destroy]
      
      # Order routes
      resources :orders, only: [:index, :create]
    end
  end

  # Defines the root path route ("/")
  root "api/v1/coffees#index"
end

