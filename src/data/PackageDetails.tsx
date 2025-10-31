// This file holds the detailed information for each package.
// This keeps our component files clean!

export interface PackageDetail {
    id: number;
    description: string;
    gallery: string[];
    itinerary: {
      day: number;
      title: string;
      details: string;
    }[];
    inclusions: string[];
    exclusions: string[];
    testimonials: {
      name: string;
      quote: string;
    }[];
  }
  
  export const packageDetails: PackageDetail[] = [
    // --- Package 1: Goa ---
    {
      id: 1,
      description: "Get ready for the ultimate beach party! Our Goa Vibes package is all about sun, sand, and sea. Explore the vibrant nightlife, relax on pristine beaches, and soak in the unique Goan culture. This is the hassle-free beach escape you've been dreaming of.",
      gallery: [
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Goa+Beach+1',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Goa+Market',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Goa+Nightlife',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Goa+Sunset',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Goa', details: 'Arrive at Goa Airport/Station, transfer to your hotel. Evening free to explore the famous Calangute beach.' },
        { day: 2, title: 'North Goa Sightseeing', details: 'Visit Fort Aguada, Candolim Beach, Baga Beach, and the Anjuna flea market.' },
        { day: 3, title: 'South Goa & Culture', details: 'Explore Old Goa churches (Basilica of Bom Jesus), Mangeshi Temple, and a relaxing evening boat cruise on the Mandovi River.' },
        { day: 4, title: 'Departure', details: 'After breakfast, check out from the hotel and transfer to the airport/station for your departure.' },
      ],
      inclusions: ['Accommodation in 3-star hotel', 'Daily Breakfast', 'Airport Transfers (Shared)', 'Full-day North & South Goa sightseeing'],
      exclusions: ['Flights/Train tickets', 'Lunch & Dinner', 'Water sports charges', 'Personal expenses'],
      testimonials: [
        { name: 'Rohan & Priya', quote: 'Amazing trip! The beaches were beautiful and everything was perfectly organized. That sunset cruise was magical!' },
      ],
    },
    // --- Package 2: Manali ---
    {
      id: 2,
      description: "Escape the heat and dive into a snowy paradise. Our Manali Snow Escape takes you through breathtaking valleys, high-altitude passes, and charming mountain villages. Perfect for adventure lovers and romance seekers alike!",
      gallery: [
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Manali+Valley',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Solang+Valley',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Hadimba+Temple',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Rohtang+Pass',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Manali', details: 'Arrive in Manali, check into your hotel. Day at leisure to explore Mall Road.' },
        { day: 2, title: 'Manali Local Sightseeing', details: 'Visit Hadimba Devi Temple, Manu Temple, Vashisht Village and Hot Water Springs.' },
        { day: 3, title: 'Solang Valley Adventure', details: 'Full day excursion to Solang Valley for adventure activities like paragliding, zorbing, and skiing (seasonal).' },
        { day: 4, title: 'Kullu & Naggar Castle', details: 'Visit the famous Kullu Shawl factory and explore the historic Naggar Castle.' },
        { day: 5, title: 'Departure', details: 'After breakfast, check out and depart from Manali with wonderful memories.' },
      ],
      inclusions: ['Accommodation in cozy hotel', 'Daily Breakfast & Dinner', 'All transfers by private car', 'Solang Valley excursion'],
      exclusions: ['Bus/Flight tickets', 'Lunch', 'Adventure activity costs', 'Rohtang Pass permit'],
      testimonials: [
        { name: 'Aakash', quote: 'Unbelievable views! Solang Valley was the highlight. Our driver was great and the hotel was very comfortable.' },
      ],
    },
    // --- Package 3: Paris & Swiss ---
    {
      id: 3,
      description: "Experience the romance of Paris and the stunning beauty of the Swiss Alps in one unforgettable trip. From the Eiffel Tower to scenic train rides in Switzerland, this package is pure magic.",
      gallery: [
        'https://placehold.co/600x400/F4C542/333333?text=Eiffel+Tower',
        'https://placehold.co/600x400/F4C542/333333?text=Louvre',
        'https://placehold.co/600x400/F4C542/333333?text=Swiss+Alps',
        'https://placehold.co/600x400/F4C542/333333?text=Lucerne',
      ],
      itinerary: [
        { day: 1, title: 'Bonjour Paris!', details: 'Arrive in Paris, transfer to your hotel. Evening at leisure.' },
        { day: 2, title: 'Paris City Tour', details: 'Visit the Eiffel Tower, Notre Dame Cathedral, Champs-Élysées, and the Arc de Triomphe.' },
        { day: 3, title: 'Art & Culture', details: 'Explore the Louvre Museum. In the evening, enjoy a romantic Seine River cruise.' },
        { day: 4, title: 'Train to Switzerland', details: 'Take a high-speed train to Lucerne, Switzerland. Check into your hotel by the lake.' },
        { day: 5, title: 'Mount Titlis', details: 'Full day excursion to the stunning Mount Titlis, including the rotating cable car.' },
        { day: 6, title: 'Lucerne & Zurich', details: 'Explore Lucerne\'s Chapel Bridge in the morning. Transfer to Zurich for a city tour.' },
        { day: 7, title: 'Departure', details: 'After breakfast, transfer to Zurich Airport for your flight home.' },
      ],
      inclusions: ['Accommodation in 4-star hotels', 'Daily Breakfast', 'Paris City Tour', 'Seine River Cruise', 'Train tickets (Paris to Lucerne)', 'Mount Titlis Excursion'],
      exclusions: ['International Flights', 'Visa fees', 'Lunches & Dinners', 'Personal expenses'],
      testimonials: [
        { name: 'Aditi & Vikram', quote: 'The perfect honeymoon. Paris was a dream and the Swiss Alps took our breath away. 10/10!' },
      ],
    },
    // --- Package 4: Bali ---
    {
      id: 4,
      description: "Discover the 'Island of the Gods'. Our Bali Tropical Holiday is a perfect blend of stunning beaches, lush green rice terraces, ancient temples, and vibrant culture. A paradise for relaxation and exploration.",
      gallery: [
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Bali+Temple',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Rice+Terrace',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Kuta+Beach',
        'https://placehold.co/600x400/00AFAA/FFFFFF?text=Ubud+Monkeys',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Bali', details: 'Arrive at Denpasar Airport, transfer to your hotel in Kuta.' },
        { day: 2, title: 'Water Sports & Uluwatu', details: 'Enjoy water sports at Tanjung Benoa. In the evening, visit the stunning Uluwatu Temple for a Kecak dance and sunset.' },
        { day: 3, title: 'Ubud & Rice Terraces', details: 'Transfer to Ubud. Visit the Sacred Monkey Forest, Ubud Royal Palace, and the Tegalalang Rice Terraces.' },
        { day: 4, title: 'Kintamani Volcano Tour', details: 'Full-day tour to see the majestic Mount Batur volcano and Lake Batur. Visit a local coffee plantation.' },
        { day: 5, title: 'Tanah Lot & Relaxation', details: 'Day at leisure for shopping or relaxing. Evening visit to the iconic Tanah Lot Temple for sunset.' },
        { day: 6, title: 'Departure', details: 'After breakfast, transfer to the airport for your flight home.' },
      ],
      inclusions: ['Accommodation in 4-star hotels/villas', 'Daily Breakfast', 'All transfers', 'Kintamani Volcano Tour', 'Uluwatu & Tanah Lot Temple visits'],
      exclusions: ['International Flights', 'Visa on Arrival', 'Lunches & Dinners', 'Water sports fees'],
      testimonials: [
        { name: 'The Sharma Family', quote: 'Bali is beautiful! The kids loved the Monkey Forest and we loved the temples. A great family vacation.' },
      ],
    },
    // --- Package 5: Dubai ---
    {
      id: 5,
      description: "Experience the city of superlatives! From the world's tallest building to lavish shopping malls and thrilling desert safaris, our Dubai Luxury Getaway is an adventure in modern extravagance.",
      gallery: [
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Burj+Khalifa',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Desert+Safari',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=The+Palm',
        'https://placehold.co/600x400/FF7A59/FFFFFF?text=Dubai+Mall',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Dubai', details: 'Arrive at Dubai International Airport, transfer to your hotel. Evening Dhow Cruise with dinner.' },
        { day: 2, title: 'Dubai City Tour', details: 'Half-day city tour. Visit Dubai Museum, Jumeirah Mosque, Burj Al Arab (photo stop), and The Palm Jumeirah.' },
        { day: 3, title: 'Burj Khalifa & Shopping', details: 'Morning free for shopping at the Dubai Mall. Afternoon visit to the top of Burj Khalifa.' },
        { day: 4, title: 'Desert Safari', details: 'Afternoon Desert Safari with dune bashing, camel riding, BBQ dinner, and a belly dance show.' },
        { day: 5, title: 'Departure', details: 'After breakfast, transfer to the airport for your flight home.' },
      ],
      inclusions: ['Accommodation in 4-star hotel', 'Daily Breakfast', 'Dhow Cruise with Dinner', 'Desert Safari with BBQ Dinner', 'Burj Khalifa tickets (124th floor)'],
      exclusions: ['International Flights', 'Visa fees', 'Lunches', 'Tourism Dirham Tax (paid to hotel)'],
      testimonials: [
        { name: 'Sneha & Raj', quote: 'Dubai was just... wow! The desert safari was a blast and the view from the Burj Khalifa is something I\'ll never forget.' },
      ],
    },
    // --- Package 6: Thailand ---
    {
      id: 6,
      description: "Fun, affordable, and unforgettable! Our Thailand Budget Fun package is the perfect way to experience the best of Thailand, from Bangkok's bustling temples to the stunning beaches of Pattaya.",
      gallery: [
        'https://placehold.co/600x400/F4C542/333333?text=Bangkok+Temples',
        'https://placehold.co/600x400/F4C542/333333?text=Pattaya+Beach',
        'https://placehold.co/600x400/F4C542/333333?text=Floating+Market',
        'https://placehold.co/600x400/F4C542/333333?text=Thai+Street+Food',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Bangkok', details: 'Arrive in Bangkok, transfer to your hotel in Pattaya.' },
        { day: 2, title: 'Coral Island Tour (Pattaya)', details: 'Full day at Coral Island. Enjoy swimming, snorkeling, and relaxing on the white sandy beach.' },
        { day: 3, title: 'Transfer to Bangkok', details: 'Transfer back to Bangkok. Evening free for shopping at MBK Center or Asiatique.' },
        { day: 4, title: 'Bangkok Temple Tour', details: 'Visit the Grand Palace, Wat Pho (Reclining Buddha), and Wat Traimit (Golden Buddha).' },
        { day: 5, title: 'Departure', details: 'After breakfast, transfer to the airport for your flight home.' },
      ],
      inclusions: ['Accommodation in 3-star hotels', 'Daily Breakfast', 'Airport Transfers', 'Coral Island Tour with Lunch', 'Bangkok Temple Tour'],
      exclusions: ['International Flights', 'Visa on Arrival', 'Lunches & Dinners', 'Personal expenses'],
      testimonials: [
        { name: 'Karan & Friends', quote: 'Best budget trip ever! We had so much fun at Coral Island and the temples in Bangkok were incredible.' },
      ],
    },
  ];
  