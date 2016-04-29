class RenameUrlColumnInProducts < ActiveRecord::Migration
  def change
    rename_column :products, :url, :product_url
  end
end
