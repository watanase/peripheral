Rails.application.routes.draw do
  devise_for :users
  root "posts#index"
  resources :users, only: [:edit, :show]
  resources :relationships, only: [:create, :destroy]
  resources :posts do
    resources :favorites, only: [:create, :destroy]
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
  end
end
