Rails.application.routes.draw do
  devise_for :users
  root "posts#index"
  resources :posts, only: [:new, :create, :edit, :show, :update]
  resources :users, only: [:edit, :show]
end
