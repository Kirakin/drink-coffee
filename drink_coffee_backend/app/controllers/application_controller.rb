class ApplicationController < ActionController::API
  before_action :authenticate_user, except: []
  
  private
  
  def authenticate_user
    # Skip authentication for specific actions
    return if skip_authentication?
    
    token = request.headers['Authorization']&.split(' ')&.last
    
    if token.blank?
      render json: { error: 'No token provided' }, status: :unauthorized
      return
    end
    
    begin
      decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })
      user_id = decoded_token[0]['user_id']
      @current_user = User.find(user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
  
  def skip_authentication?
    false
  end
  
  def current_user
    @current_user
  end
  
  def generate_token(user)
    payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
  end
end

