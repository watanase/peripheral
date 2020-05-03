require 'rails_helper'

feature 'post', type: :feature do
  let(:user) { create(:user) }

  scenario 'ユーザー情報が更新されていること' do
    # ログイン前には投稿ボタンがない
    visit root_path
    expect(page).to have_no_content('投稿する')

    # ログイン処理
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    expect(page).to have_content('投稿する')

    # ポストの投稿
    expect {
      click_link('投稿する')
      expect(current_path).to eq new_post_path
      fill_in 'image', with: 'https://s.eximg.jp/expub/feed/Papimami/2016/Papimami_83279/Papimami_83279_1.png'
      fill_in 'title', with: 'フィーチャスペックのテスト'
      fill_in 'content', with: 'フィーチャスペックのテスト'
      find('input[type="submit"]').click
    }.to change(Tweet, :count).by(1)
  end
end