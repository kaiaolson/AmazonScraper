require 'open-uri'

class Products::ScrapeProductDescription

  include Virtus.model

  attribute :product_url, String

  def call
    doc = Nokogiri::HTML(open(product_url).read)
    doc.css('#productDescription p').each do |description|
      return description.content
    end
  end

end
