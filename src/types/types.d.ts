type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
};

type Hair = {
  color: string;
  type: string;
};

type Address = {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type Company = {
  address: Address2;
  department: string;
  name: string;
  title: string;
};

type Address2 = {
  address: string;
  city: string;
  coordinates: Coordinates2;
  postalCode: string;
  state: string;
};

type Coordinates2 = {
  lat: number;
  lng: number;
};
