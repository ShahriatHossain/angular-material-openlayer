var faker = require('faker');

var database = { datasources: [] };

database.datasources.push({
    id: 1,
    entity_name: 'account',
    display_name: 'Account',
    title: 'account_name',
    address_composite: 'address_composite',
    city: 'city',
    country: 'country',
    email: 'email',
    latitude: 'latitude',
    longitude: 'longitude',
    postcode: 'postcode',
    state: 'state',
    street1: 'street1',
    street2: 'street2',
    street3: 'street3',
    active: true,
});

database.datasources.push({
    id: 2,
    entity_name: 'contact',
    display_name: 'Contact',
    title: 'full_name',
    address_composite: 'address_composite',
    city: 'city',
    country: 'country',
    email: 'email',
    latitude: 'latitude',
    longitude: 'longitude',
    postcode: 'postcode',
    state: 'state',
    street1: 'street1',
    street2: 'street2',
    street3: 'street3',
    active: true,
});



console.log(JSON.stringify(database));