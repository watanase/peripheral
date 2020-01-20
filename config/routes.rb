Rails.application.routes.draw do
  devise_for :users
  root "posts#index"
  resources :users, only: [:edit, :show]
  resources :posts, only: [:new, :create, :edit, :show, :update] do
    resources :comments, only: [:create]
  end
end
