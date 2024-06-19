# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.3.3'

# Use Rails
gem 'rails', '~> 7.1.3', '>= 7.1.3.4'

# Asset pipeline
gem 'sprockets-rails'

# Use PostgreSQL
gem 'pg', '~> 1.1'

# Use Puma web server
gem 'puma', '>= 5.0'

# Use JavaScript with ESM import maps
gem 'importmap-rails'

# Hotwire's SPA-like page accelerator
gem 'turbo-rails'

# Hotwire's modest JavaScript framework
gem 'stimulus-rails'

# Build JSON APIs with ease
gem 'jbuilder'

# Use Redis adapter to run Action Cable in production
gem 'redis', '>= 4.0.1'

# Use tzinfo-data for Windows and JRuby platforms
gem 'tzinfo-data', platforms: %i[windows jruby]

# Reduces boot times through caching
gem 'bootsnap', require: false

# Use dotenv for environment variables
gem 'dotenv-rails'

# Use Grape for building APIs
gem 'grape', '2.1.0'
gem 'grape-entity', '1.0.1'

# Use React with Rails
gem 'react-rails', '3.2.1'

# Use Webpacker
gem 'webpacker', '5.4.4'

group :development, :test do
  # Debugging tools
  gem 'debug', platforms: %i[mri windows]
  gem 'pry-rails'
  gem 'rspec-rails', '6.1.2'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :development do
  # Use web-console for debugging
  gem 'web-console'
end

group :test do
  # System testing
  gem 'capybara'
  gem 'selenium-webdriver'
end
