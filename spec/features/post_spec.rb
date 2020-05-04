require 'rails_helper'

feature 'post', type: :feature do
  let(:user) { create(:user) }

  scenario 'ユーザー情報が更新されていること' do
    visit root_path
    expect(page).to have_no_content('新規投稿')

    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    click_on('ログインする')
    expect(current_path).to eq root_path
    expect(page).to have_content('新規投稿')

    expect do
      click_link('新規投稿')
      expect(current_path).to eq new_post_path
      find('input[type="file"]').click
      attach_file 'src', Rails.root.join('app/assets/images/paper.jpg')
      fill_in 'title', with: 'フィーチャスペックのテスト'
      fill_in 'content', with: 'フィーチャスペックのテスト'
      find('input[type="submit"]').click
    end.to change(Post, :count).by(1)
  end
end
