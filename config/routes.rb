Rails.application.routes.draw do
  resources :products, only: [:new, :create, :show, :index]
  root "products#new"
end
