class Api::V1::AuthController < ApplicationController
  def skip_authentication?
    %w[register login].include?(action_name)
  end
  
  def register
    user = User.new(user_params)
    
    if user.save
      token = generate_token(user)
      render json: {
        message: 'User created successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token: token
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def login
    user = User.find_by(username: params[:username])
    
    if user&.authenticate(params[:password])
      token = generate_token(user)
      render json: {
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token: token
      }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
  
  def logout
    render json: { message: 'Logged out successfully' }
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end

