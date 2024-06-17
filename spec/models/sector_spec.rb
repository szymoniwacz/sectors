# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Sector, type: :model do
  describe 'associations' do
    it 'has many user_sectors' do
      association = described_class.reflect_on_association(:user_sectors)
      expect(association.macro).to eq :has_many
    end

    it 'has many users through user_sectors' do
      association = described_class.reflect_on_association(:users)
      expect(association.macro).to eq :has_many
      expect(association.options[:through]).to eq :user_sectors
    end

    it 'belongs to parent sector' do
      association = described_class.reflect_on_association(:parent)
      expect(association.macro).to eq :belongs_to
      expect(association.options[:class_name]).to eq 'Sector'
    end

    it 'has many children sectors' do
      association = described_class.reflect_on_association(:children)
      expect(association.macro).to eq :has_many
      expect(association.options[:class_name]).to eq 'Sector'
      expect(association.options[:foreign_key]).to eq :parent_id
    end
  end
end
