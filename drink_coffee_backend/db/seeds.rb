# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create coffee items
coffees = [
  {
    name: "Espresso",
    description: "A concentrated coffee served in small, strong shots and is the base for many coffee drinks.",
    price: 2.50,
    image_url: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop"
  },
  {
    name: "Americano",
    description: "Espresso shots topped with hot water to produce a light layer of crema.",
    price: 3.00,
    image_url: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=300&h=300&fit=crop"
  },
  {
    name: "Latte",
    description: "Espresso with steamed milk and a small amount of milk foam.",
    price: 4.50,
    image_url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=300&fit=crop"
  },
  {
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and milk foam.",
    price: 4.00,
    image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop"
  },
  {
    name: "Macchiato",
    description: "Espresso with a dollop of steamed milk foam.",
    price: 3.75,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
  },
  {
    name: "Mocha",
    description: "Espresso with chocolate syrup, steamed milk, and whipped cream.",
    price: 5.00,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
  }
]

coffees.each do |coffee_attrs|
  Coffee.find_or_create_by(name: coffee_attrs[:name]) do |coffee|
    coffee.description = coffee_attrs[:description]
    coffee.price = coffee_attrs[:price]
    coffee.image_url = coffee_attrs[:image_url]
  end
end

puts "Created #{Coffee.count} coffee items"

