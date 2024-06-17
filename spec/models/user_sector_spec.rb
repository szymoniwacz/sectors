# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSector, type: :model do
  describe 'associations' do
    it 'belongs to a user' do
      association = described_class.reflect_on_association(:user)
      expect(association.macro).to eq :belongs_to
    end

    it 'belongs to a sector' do
      association = described_class.reflect_on_association(:sector)
      expect(association.macro).to eq :belongs_to
    end
  end
end
