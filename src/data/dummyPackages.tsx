// We'll use placeholder images from placehold.co

export interface Package {
    id: number;
    name: string;
    duration: string;
    region: string;
    price: string;
    imageUrl: string;
  }
  
  export const dummyPackages: Package[] = [
    {
      id: 1,
      name: 'Goa Beach Vibes',
      duration: '4D/3N',
      region: 'India',
      price: '25,000/-',
      imageUrl: '/Goa_image.jpg',
    },
    {
      id: 2,
      name: 'Manali Snow Escape',
      duration: '5D/4N',
      region: 'India',
      price: '40,000/-',
      imageUrl: '/Manali_image.jpg',
    },
    {
      id: 3,
      name: 'Paris + Swiss Bliss',
      duration: '7D/6N',
      region: 'Europe',
      price: '90,000/-',
      imageUrl: '/Paris_Switzerland_image.jpg',
    },
    {
      id: 4,
      name: 'Bali Tropical Holiday',
      duration: '6D/5N',
      region: 'Asia',
      price: '35,000/-',
      imageUrl: '/Bali_image.jpg',
    },
    {
      id: 5,
      name: 'Dubai Luxury Getaway',
      duration: '5D/4N',
      region: 'Middle East',
      price: '65,000/-',
      imageUrl: '/Dubai_image.jpg',
    },
    {
      id: 6,
      name: 'Thailand Budget Fun',
      duration: '5D/4N',
      region: 'Asia',
      price: '30,000/-',
      imageUrl: '/Thailand_image.jpg',
    },
  ];
  