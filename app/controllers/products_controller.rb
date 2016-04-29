class ProductsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    @product = Product.new
  end

  def create
    service = Products::CreateProduct.new(params: product_params)
    if service.call
      @product = Product.last
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def show
    @product = Product.find params[:id]
  end

  def index
    @products = Product.all
    respond_to do |format|
      format.html {render}
      format.json {render json: @products}
    end
  end

  private

  def product_params
    params.require(:product).permit(:product_url)
  end
end
