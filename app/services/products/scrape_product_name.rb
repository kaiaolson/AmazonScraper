require 'open-uri'

class Products::ScrapeProductName

  include Virtus.model

  attribute :product_url, String

  def call
    doc = Nokogiri::HTML(open(product_url).read)
    doc.css('span#productTitle').each do |title|
      return title.content
    end
  end

end
