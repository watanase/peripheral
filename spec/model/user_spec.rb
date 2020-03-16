require 'rails_helper'

describe User do
  describe '#create' do
    context '登録できる場合' do
      it 'name、email，password、password_confirmationがあれば登録できる' do
        user = build(:user)
        expect(user).to be_valid
      end

      it 'nameが10文字以下だと登録できる' do
        num = 'n' * 10
        user = build(:user, name: num)
        expect(user).to be_valid
      end

      it 'passwordが6文字以上だと登録できる' do
        num = 'n' * 6
        user = build(:user, password: num, password_confirmation: num)
        expect(user).to be_valid
      end

      it 'profileが100文字以内だと登録できる' do
        num = 'n' * 100
        user = build(:user, profile: num)
        expect(user).to be_valid
      end
    end

    context '登録できない場合' do
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
        expect(
          user.errors[:password_confirmation]
        ).to include('とパスワードの入力が一致しません')
      end

      it 'nameが11文字以上だと登録できない' do
        num = 'n' * 11
        user = build(:user, name: num)
        user.valid?
        expect(user.errors[:name]).to include('は10文字以内で入力してください')
      end

      it '登録済みのemailでは登録できない' do
        user = create(:user)
        another_user = build(:user, email: user.email)
        another_user.valid?
        expect(another_user.errors[:email]).to include('はすでに存在します')
      end

      it 'passwordが5文字以下だと登録できない' do
        num = 'n' * 5
        user = build(:user, password: num, password_confirmation: num)
        user.valid?
        expect(user.errors[:password]).to include('は6文字以上で入力してください')
      end

      it 'profileが101文字以上だと登録できない' do
        num = 'n' * 101
        user = build(:user, profile: num)
        user.valid?
        expect(user.errors[:profile]).to include('は100文字以内で入力してください')
      end
    end
  end
end
