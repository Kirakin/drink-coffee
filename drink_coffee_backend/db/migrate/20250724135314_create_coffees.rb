class CreateCoffees < ActiveRecord::Migration[7.1]
  def change
    create_table :coffees do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.string :image_url

      t.timestamps
    end
  end
end
