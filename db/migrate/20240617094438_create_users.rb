# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.boolean :agree_to_terms

      t.timestamps
    end
  end
end
