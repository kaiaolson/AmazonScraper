class ProductsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
  end

  def create
    service = Products::CreateProduct.new(params: product_params)
    if service.call
      render json: Product.last
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
