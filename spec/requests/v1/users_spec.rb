# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'V1::Users API', type: :request do
  let!(:sector1) { Sector.create!(name: 'Sector 1') }
  let!(:sector2) { Sector.create!(name: 'Sector 2') }

  let(:valid_attributes) do
    { name: 'John Doe', agree_to_terms: true, sector_ids: [sector1.id, sector2.id] }
  end

  it 'creates a new user' do
    post '/api/v1/users', params: valid_attributes
    expect(response).to be_successful
  end

  it 'returns the current user' do
    post '/api/v1/users', params: valid_attributes
    get '/api/v1/users/me'
    expect(response).to be_successful
  end
end
