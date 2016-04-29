class Products::CreateProduct

  include Virtus.model

  attribute :params, Hash
  
  attribute :product, Product

  def call
    self.product  = Product.new(params)
    scrape_name = Products::ScrapeProductName.new(product_url: product.product_url)
    product.name = scrape_name.call
    product.save
  end

end
