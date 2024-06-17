# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'V1::Sectors API', type: :request do
  it 'returns all sectors' do
    get '/api/v1/sectors'
    expect(response).to be_successful
  end
end
