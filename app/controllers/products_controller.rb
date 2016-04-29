class ProductsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
  end

  def create
    @product = Product.new product_params
    if @product.save
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def show
    @product = Product.find params[:id]
  end

  def index
  end

  private

  def product_params
    params.require(:product).permit(:product_url)
  end
end
