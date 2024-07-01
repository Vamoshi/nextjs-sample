const amenitiesFields = [
  {
    id: "amenity_wifi",
    value: "Wifi",
  },
  {
    id: "amenity_kitchen",
    value: "Full Kitchen",
  },
  {
    id: "amenity_washer_dryer",
    value: "Washer & Dryer",
  },
  {
    id: "amenity_free_parking",
    value: "Free Parking",
  },
  {
    id: "amenity_pool",
    value: "Swimming Pool",
  },
  {
    id: "amenity_hot_tub",
    value: "Hot Tub",
  },
  {
    id: "amenity_24_7_security",
    value: "24/7 Security",
  },
  {
    id: "amenity_wheelchair_accessible",
    value: "Wheelchair Accessible",
  },
  {
    id: "amenity_elevator_access",
    value: "Elevator Access",
  },
  {
    id: "amenity_dishwasher",
    value: "Dishwasher",
  },
  {
    id: "amenity_gym_fitness_center",
    value: "Gym/Fitness Center",
  },
  {
    id: "amenity_air_conditioning",
    value: "Air Conditioning",
  },
  {
    id: "amenity_balcony_patio",
    value: "Balcony/Patio",
  },
  {
    id: "amenity_smart_tv",
    value: "Smart TV",
  },
  {
    id: "amenity_coffee_maker",
    value: "Coffee Maker",
  },
];

const ratesFields = [
  {
    id: "weekly_rate",
    name: "rates.weekly",
    label: "Weekly",
  },
  {
    id: "monthly_rate",
    name: "rates.monthly",
    label: "Monthly",
  },
  {
    id: "nightly_rate",
    name: "rates.nightly",
    label: "Nightly",
  },
];

const propertyTypeFields = [
  { value: "Apartment" },
  { value: "Condo" },
  { value: "House" },
  { value: "Cabin Or Cottage" },
  { value: "Room" },
  { value: "Studio" },
  { value: "Other" },
];

const locationFields = [
  {
    id: "street",
    name: "location.street",
    placeholder: "Street",
  },
  {
    id: "city",
    name: "location.city",
    placeholder: "City",
  },
  {
    id: "state",
    name: "location.state",
    placeholder: "State",
  },
  {
    id: "zipcode",
    name: "location.zipcode",
    placeholder: "Zipcode",
  },
];

const sellerInfoFields = [
  {
    id: "seller_name",
    placeholder: "Name",
    type: "text",
    name: "seller_info.name",
  },
  {
    id: "seller_email",
    placeholder: "Email address",
    type: "email",
    name: "seller_info.email",
  },
  {
    id: "seller_phone",
    placeholder: "Phone",
    type: "tel",
    name: "seller_info.phone",
  },
];

const propertyDetailsFields = [
  {
    id: "beds",
    label: "Beds",
  },
  {
    id: "baths",
    label: "Baths",
  },
  {
    id: "square_feet",
    label: "Square Feet",
  },
];

export {
  amenitiesFields,
  ratesFields,
  propertyTypeFields,
  locationFields,
  sellerInfoFields,
  propertyDetailsFields,
};
