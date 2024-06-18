# frozen_string_literal: true

class AddConstraintsToUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :name, false
    change_column_default :users, :agree_to_terms, false
    change_column_null :users, :agree_to_terms, false
  end
end
