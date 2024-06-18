# frozen_string_literal: true

# Clear existing sectors
UserSector.delete_all
Sector.delete_all

# Define sectors and sub-sectors
sectors = [
  { name: 'Manufacturing', children: [
    { name: 'Construction materials' },
    { name: 'Electronics and Optics' },
    { name: 'Food and Beverage', children: [
      { name: 'Bakery & confectionery products' },
      { name: 'Beverages' },
      { name: 'Fish & fish products' },
      { name: 'Meat & meat products' },
      { name: 'Milk & dairy products' },
      { name: 'Other' },
      { name: 'Sweets & snack food' }
    ] },
    { name: 'Furniture', children: [
      { name: 'Bathroom/sauna' },
      { name: 'Bedroom' },
      { name: 'Children’s room' },
      { name: 'Kitchen' },
      { name: 'Living room' },
      { name: 'Office' },
      { name: 'Other (Furniture)' },
      { name: 'Outdoor' },
      { name: 'Project furniture' }
    ] },
    { name: 'Machinery', children: [
      { name: 'Machinery components' },
      { name: 'Machinery equipment/tools' },
      { name: 'Manufacture of machinery' },
      { name: 'Maritime', children: [
        { name: 'Aluminium and steel workboats' },
        { name: 'Boat/Yacht building' },
        { name: 'Ship repair and conversion' }
      ] },
      { name: 'Metal structures' },
      { name: 'Other' },
      { name: 'Repair and maintenance service' }
    ] },
    { name: 'Metalworking', children: [
      { name: 'Construction of metal structures' },
      { name: 'Houses and buildings' },
      { name: 'Metal products' },
      { name: 'Metal works', children: [
        { name: 'CNC-machining' },
        { name: 'Forgings, Fasteners' },
        { name: 'Gas, Plasma, Laser cutting' },
        { name: 'MIG, TIG, Aluminum welding' }
      ] }
    ] },
    { name: 'Plastic and Rubber', children: [
      { name: 'Packaging' },
      { name: 'Plastic goods' },
      { name: 'Plastic processing technology', children: [
        { name: 'Blowing' },
        { name: 'Moulding' },
        { name: 'Plastics welding and processing' }
      ] },
      { name: 'Plastic profiles' }
    ] },
    { name: 'Printing', children: [
      { name: 'Advertising' },
      { name: 'Book/Periodicals printing' },
      { name: 'Labelling and packaging printing' }
    ] },
    { name: 'Textile and Clothing', children: [
      { name: 'Clothing' },
      { name: 'Textile' }
    ] },
    { name: 'Wood', children: [
      { name: 'Other (Wood)' },
      { name: 'Wooden building materials' },
      { name: 'Wooden houses' }
    ] }
  ] },
  { name: 'Other', children: [
    { name: 'Creative industries' },
    { name: 'Energy technology' },
    { name: 'Environment' }
  ] },
  { name: 'Service', children: [
    { name: 'Business services' },
    { name: 'Engineering' },
    { name: 'Information Technology and Telecommunications', children: [
      { name: 'Data processing, Web portals, E-marketing' },
      { name: 'Programming, Consultancy' },
      { name: 'Software, Hardware' },
      { name: 'Telecommunications' }
    ] },
    { name: 'Tourism' },
    { name: 'Translation services' },
    { name: 'Transport and Logistics', children: [
      { name: 'Air' },
      { name: 'Rail' },
      { name: 'Road' },
      { name: 'Water' }
    ] }
  ] }
]

def create_sectors(sectors, parent = nil)
  sectors.each do |sector_data|
    children = sector_data.delete(:children)
    sector = Sector.create!(sector_data.merge(parent:))
    create_sectors(children, sector) if children
  end
end

# Create all sectors
create_sectors(sectors)

puts 'Sectors seeded successfully!'
