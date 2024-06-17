# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it 'has many user_sectors' do
      association = described_class.reflect_on_association(:user_sectors)
      expect(association.macro).to eq :has_many
    end

    it 'has many sectors through user_sectors' do
      association = described_class.reflect_on_association(:sectors)
      expect(association.macro).to eq :has_many
      expect(association.options[:through]).to eq :user_sectors
    end
  end

  describe 'validations' do
    it 'validates presence of name' do
      user = User.new(name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'validates inclusion of agree_to_terms in [true, false]' do
      valid_user = User.new(agree_to_terms: true)
      invalid_user = User.new(agree_to_terms: nil)

      valid_user.valid?
      invalid_user.valid?

      expect(valid_user.errors[:agree_to_terms]).to be_empty
      expect(invalid_user.errors[:agree_to_terms]).to include('is not included in the list')
    end
  end
end
