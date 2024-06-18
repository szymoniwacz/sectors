# frozen_string_literal: true

class AddTranslationKeyToSectors < ActiveRecord::Migration[7.1]
  def change
    add_column :sectors, :translation_key, :string
  end
end
