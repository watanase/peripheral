Rails.application.routes.draw do
  get 'favorites/create'
  get 'favorites/destroy'
  devise_for :users
  root "posts#index"
  resources :users, only: [:edit, :show] 
  resources :posts do
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
    resources :favorites, only: [:create, :destroy]
  end
end
