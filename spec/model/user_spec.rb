require 'rails_helper'

describe User do
  describe '#create' do
    it 'name、email，password、password_confirmationがあれば登録できる' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'nameがなければ登録できない' do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include('を入力してください')
    end

    it 'emailがなければ登録できない' do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include('を入力してください')
    end

    it 'passwordがなければ登録できない' do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include('を入力してください')
    end

    it 'passwordとpassword_confirmationが違うと登録できない' do
      user = build(:user, password_confirmation: '')
      user.valid?
      expect(user.errors[:password_confirmation]).to include('とパスワードの入力が一致しません')
    end

    it 'nameが１１文字以上だと登録できない' do
      user = build(:user, name: '12345678901')
      user.valid?
      expect(user.errors[:name]).to include('は10文字以内で入力してください')
    end

    it 'nameが１０文字以下だと登録できる' do
      user = build(:user, name: '123457')
      expect(user).to be_valid
    end

    it '登録済みのemailでは登録できない' do
      user = create(:user, email: 'p@p')
      another_user = build(:user, email: 'p@p')
      another_user.valid?
      expect(another_user.errors[:email]).to include('はすでに存在します')
    end

    it 'passwordが５文字以下だと登録できない' do
      user = build(:user, password: '12345', password_confirmation: '12345')
      user.valid?
      expect(user.errors[:password]).to include('は6文字以上で入力してください')
    end

    it 'passwordが６文字以↑だと登録できる' do
      user = build(:user, password: '123456', password_confirmation: '123456')
      expect(user).to be_valid
    end
  end
end
