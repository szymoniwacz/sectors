# frozen_string_literal: true

class CreateSectors < ActiveRecord::Migration[7.1]
  def change
    create_table :sectors do |t|
      t.string :name
      t.integer :parent_id

      t.timestamps
    end
  end
end
