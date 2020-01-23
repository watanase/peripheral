Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root "posts#index"
  resources :users, only: [:edit, :show]
  resources :relationships, only: [:create, :destroy]
  resources :posts do
    collection do
      get 'search'
    end
    resources :favorites, only: [:create, :destroy]
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
  end
end
