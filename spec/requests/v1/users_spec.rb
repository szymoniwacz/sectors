# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'V1::Users API', type: :request do
  let!(:sector1) { Sector.create!(name: 'Sector 1') }
  let!(:sector2) { Sector.create!(name: 'Sector 2') }

  let(:valid_attributes) do
    { name: 'John Doe', agree_to_terms: true, sector_ids: [sector1.id, sector2.id] }
  end

  let(:invalid_attributes) do
    { name: '', agree_to_terms: true, sector_ids: [sector1.id, sector2.id] }
  end

  describe 'POST /api/v1/users' do
    context 'with valid params' do
      it 'creates a new user' do
        post '/api/v1/users', params: valid_attributes
        expect(response).to be_successful
      end
    end

    context 'with invalid params' do
      it 'returns validation error' do
        post '/api/v1/users', params: invalid_attributes
        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)['error']['message']).to eq('Validation failed')
        expect(JSON.parse(response.body)['error']['details']).to include("Name can't be blank")
      end
    end
  end

  describe 'GET /api/v1/users/me' do
    it 'returns the current user' do
      post '/api/v1/users', params: valid_attributes
      get '/api/v1/users/me'
      expect(response).to be_successful
    end
  end

  describe 'POST /api/v1/users/logout' do
    it 'logs out the user' do
      post '/api/v1/users', params: valid_attributes
      post '/api/v1/users/logout'
      expect(response.status).to eq(204)
    end
  end
end
