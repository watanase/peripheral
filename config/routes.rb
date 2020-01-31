Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root "posts#index"
  resources :users, only: [:edit, :show] do
    resource :relationships, only: [:create, :destroy]
    member do
      get :follows, :followers, :favorite, :posts
    end
  end

  resources :posts do
    collection do
      get 'search'
    end
    resources :favorites, only: [:create, :destroy]
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
  end
end
