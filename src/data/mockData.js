export const INITIAL_CARRIERS = [
  {
    id: "carr-101",
    name: "Apex Freightways LLC",
    mcNumber: "MC-849201",
    dotNumber: "DOT-3184920",
    primaryDriver: "Marcus Vance",
    phone: "(312) 555-0184",
    email: "dispatch@apexfreight.com",
    rating: 4.95,
    status: "on_route", // available | on_route | maintenance
    equipment: ["53' Dry Van", "53' Reefer"],
    baseCity: "Chicago, IL",
    activeLoadsCount: 2,
    completedLoadsCount: 342,
    onTimeRate: "99.1%",
    insuranceVerified: true,
    insuranceExpiry: "2027-06-30",
    fleetSize: 18,
    avatarBg: "#0284c7",
    drivers: [
      { name: "Marcus Vance", phone: "(312) 555-0184", truckNumber: "TRK-108", status: "Driving Load LD-8942" },
      { name: "Carlos Mendez", phone: "(312) 555-0199", truckNumber: "TRK-114", status: "Driving Load LD-9021" },
      { name: "Jake Reynolds", phone: "(312) 555-0205", truckNumber: "TRK-102", status: "Available" }
    ],
    notes: "Top tier reliability. Preferred carrier for high-value Midwest to Southeast corridors."
  },
  {
    id: "carr-102",
    name: "BlueSky Transport & Logistics",
    mcNumber: "MC-923841",
    dotNumber: "DOT-3891042",
    primaryDriver: "Elena Rostova",
    phone: "(404) 555-0192",
    email: "operations@blueskytransport.com",
    rating: 4.88,
    status: "available",
    equipment: ["53' Reefer", "53' Dry Van"],
    baseCity: "Atlanta, GA",
    activeLoadsCount: 1,
    completedLoadsCount: 219,
    onTimeRate: "98.4%",
    insuranceVerified: true,
    insuranceExpiry: "2027-03-15",
    fleetSize: 12,
    avatarBg: "#0ea5e9",
    drivers: [
      { name: "Elena Rostova", phone: "(404) 555-0192", truckNumber: "TRK-304", status: "In Transit Load LD-8950" },
      { name: "Derek Hall", phone: "(404) 555-0211", truckNumber: "TRK-309", status: "Available in Dallas, TX" }
    ],
    notes: "Specialized in temperature-controlled reefer cargo with continuous satellite temp monitoring."
  },
  {
    id: "carr-103",
    name: "RoadRunner Hauling Express",
    mcNumber: "MC-771923",
    dotNumber: "DOT-2940182",
    primaryDriver: "Darnell Jenkins",
    phone: "(214) 555-0143",
    email: "dispatch@roadrunnerhauling.net",
    rating: 4.82,
    status: "on_route",
    equipment: ["53' Dry Van", "Flatbed"],
    baseCity: "Dallas, TX",
    activeLoadsCount: 1,
    completedLoadsCount: 184,
    onTimeRate: "97.6%",
    insuranceVerified: true,
    insuranceExpiry: "2026-11-20",
    fleetSize: 8,
    avatarBg: "#0284c7",
    drivers: [
      { name: "Darnell Jenkins", phone: "(214) 555-0143", truckNumber: "TRK-412", status: "Driving Load LD-9033" },
      { name: "Sammy Ortiz", phone: "(214) 555-0148", truckNumber: "TRK-415", status: "Available" }
    ],
    notes: "Great response time. Experienced cross-country team drivers."
  },
  {
    id: "carr-104",
    name: "Titan Heavy Freight Corp",
    mcNumber: "MC-659102",
    dotNumber: "DOT-1830491",
    primaryDriver: "Mateo Silva",
    phone: "(614) 555-0167",
    email: "loads@titanheavyfreight.com",
    rating: 4.91,
    status: "available",
    equipment: ["Flatbed", "Step Deck", "53' Dry Van"],
    baseCity: "Columbus, OH",
    activeLoadsCount: 0,
    completedLoadsCount: 410,
    onTimeRate: "99.3%",
    insuranceVerified: true,
    insuranceExpiry: "2027-08-10",
    fleetSize: 22,
    avatarBg: "#0369a1",
    drivers: [
      { name: "Mateo Silva", phone: "(614) 555-0167", truckNumber: "TRK-501", status: "Available in Columbus" },
      { name: "Leon Walker", phone: "(614) 555-0178", truckNumber: "TRK-508", status: "Available in Indianapolis" }
    ],
    notes: "Heavy haul, machinery, industrial materials and oversized flatbed specialist."
  },
  {
    id: "carr-105",
    name: "Silverline Express Line",
    mcNumber: "MC-981240",
    dotNumber: "DOT-4019284",
    primaryDriver: "Sarah Mitchell",
    phone: "(615) 555-0118",
    email: "dispatch@silverlineexpress.com",
    rating: 4.79,
    status: "available",
    equipment: ["Box Truck", "53' Dry Van"],
    baseCity: "Nashville, TN",
    activeLoadsCount: 0,
    completedLoadsCount: 96,
    onTimeRate: "96.8%",
    insuranceVerified: true,
    insuranceExpiry: "2026-12-31",
    fleetSize: 6,
    avatarBg: "#38bdf8",
    drivers: [
      { name: "Sarah Mitchell", phone: "(615) 555-0118", truckNumber: "TRK-602", status: "Available" }
    ],
    notes: "Fast expedited regional runs, regional distribution and box truck appointments."
  }
];

export const INITIAL_ORDERS = [
  {
    id: "LD-8942",
    customer: "Apex Retail Distribution",
    origin: {
      city: "Chicago",
      state: "IL",
      address: "1420 S Logistics Blvd, Dock 4",
      pickupDate: "2026-09-24 08:30 AM"
    },
    destination: {
      city: "Atlanta",
      state: "GA",
      address: "890 Freight Parkway, Bay 12",
      deliveryDate: "2026-09-25 04:00 PM"
    },
    status: "in_transit", // unassigned | assigned | in_transit | delivered | delayed
    cargo: "Consumer Electronics & Displays",
    weight: "38,500 lbs",
    equipment: "53' Dry Van",
    miles: 715,
    rate: 2450,
    priority: "high",
    carrierId: "carr-101",
    carrierName: "Apex Freightways LLC",
    driverName: "Marcus Vance",
    driverPhone: "(312) 555-0184",
    lastUpdate: "14 mins ago",
    etaStatus: "On Schedule (ETA: Sep 25, 3:45 PM)",
    liveLocation: "I-65 South, near Louisville, KY",
    temperature: null,
    notes: "Seal #883921. Driver must call receiver 2 hrs prior to arrival."
  },
  {
    id: "LD-8950",
    customer: "FreshHarvest Organics",
    origin: {
      city: "Salinas",
      state: "CA",
      address: "410 Produce Valley Way, Gate B",
      pickupDate: "2026-09-24 06:00 AM"
    },
    destination: {
      city: "Denver",
      state: "CO",
      address: "1200 Cold Storage Blvd, Unit 3",
      deliveryDate: "2026-09-26 11:00 AM"
    },
    status: "in_transit",
    cargo: "Fresh Organic Strawberries & Greens",
    weight: "41,200 lbs",
    equipment: "53' Reefer",
    miles: 1180,
    rate: 3850,
    priority: "critical",
    carrierId: "carr-102",
    carrierName: "BlueSky Transport & Logistics",
    driverName: "Elena Rostova",
    driverPhone: "(404) 555-0192",
    lastUpdate: "35 mins ago",
    etaStatus: "On Schedule (ETA: Sep 26, 10:30 AM)",
    liveLocation: "I-80 East, Salt Lake City bypass",
    temperature: "Continuous 34°F Pre-cooled",
    notes: "Strict cold chain compliance required. Reefer log download at receiver."
  },
  {
    id: "LD-9021",
    customer: "Midwest Automotive Systems",
    origin: {
      city: "Detroit",
      state: "MI",
      address: "3200 Assembly Row, Gate 7",
      pickupDate: "2026-09-24 10:00 AM"
    },
    destination: {
      city: "Nashville",
      state: "TN",
      address: "450 Industrial Loop, Dock 1A",
      deliveryDate: "2026-09-25 01:00 PM"
    },
    status: "assigned",
    cargo: "Powertrain Engine Castings",
    weight: "43,000 lbs",
    equipment: "53' Dry Van",
    miles: 520,
    rate: 1950,
    priority: "normal",
    carrierId: "carr-101",
    carrierName: "Apex Freightways LLC",
    driverName: "Carlos Mendez",
    driverPhone: "(312) 555-0199",
    lastUpdate: "1 hour ago",
    etaStatus: "Driver dispatched to shipper dock",
    liveLocation: "Staging at Detroit Terminal",
    temperature: null,
    notes: "Requires clean wooden floor trailer and straps."
  },
  {
    id: "LD-9033",
    customer: "Lone Star Industrial Supply",
    origin: {
      city: "Houston",
      state: "TX",
      address: "7100 Petrochem Blvd, Gate 4",
      pickupDate: "2026-09-24 07:00 AM"
    },
    destination: {
      city: "Kansas City",
      state: "MO",
      address: "2400 Railhead Rd, Suite 100",
      deliveryDate: "2026-09-25 09:30 AM"
    },
    status: "delayed",
    cargo: "Industrial Pipe & Valves",
    weight: "36,000 lbs",
    equipment: "Flatbed",
    miles: 745,
    rate: 2600,
    priority: "high",
    carrierId: "carr-103",
    carrierName: "RoadRunner Hauling Express",
    driverName: "Darnell Jenkins",
    driverPhone: "(214) 555-0143",
    lastUpdate: "8 mins ago",
    etaStatus: "Delayed +45m (ETA: Sep 25, 10:15 AM - Heavy Rain & Roadwork)",
    liveLocation: "US-75 North, Atoka, OK",
    temperature: null,
    notes: "Driver updated delivery window due to flash flooding delay on US-75."
  },
  {
    id: "LD-9105",
    customer: "Global Pharma Health",
    origin: {
      city: "Philadelphia",
      state: "PA",
      address: "500 BioPark Way, Dock 2",
      pickupDate: "2026-09-25 08:00 AM"
    },
    destination: {
      city: "Charlotte",
      state: "NC",
      address: "880 Medical Center Dr",
      deliveryDate: "2026-09-25 08:00 PM"
    },
    status: "unassigned",
    cargo: "Medical Vaccines & Cryo Kits",
    weight: "18,400 lbs",
    equipment: "53' Reefer",
    miles: 450,
    rate: 2150,
    priority: "critical",
    carrierId: null,
    carrierName: null,
    driverName: null,
    driverPhone: null,
    lastUpdate: "Just now",
    etaStatus: "Awaiting Carrier Assignment",
    liveLocation: null,
    temperature: "36°F - 38°F Certified",
    notes: "High value cargo. Requires team driver or high-security tracking."
  },
  {
    id: "LD-9109",
    customer: "Pioneer Steel Works",
    origin: {
      city: "Cleveland",
      state: "OH",
      address: "1800 Steelmill Rd, Yard 3",
      pickupDate: "2026-09-25 10:00 AM"
    },
    destination: {
      city: "Milwaukee",
      state: "WI",
      address: "920 Harbor View Dr, Crane Bay",
      deliveryDate: "2026-09-26 09:00 AM"
    },
    status: "unassigned",
    cargo: "Coiled Steel Sheets & Beams",
    weight: "44,500 lbs",
    equipment: "Flatbed",
    miles: 435,
    rate: 1800,
    priority: "normal",
    carrierId: null,
    carrierName: null,
    driverName: null,
    driverPhone: null,
    lastUpdate: "22 mins ago",
    etaStatus: "Ready for Dispatch Assignment",
    liveLocation: null,
    temperature: null,
    notes: "Coil racks, 4-inch chains and tarps required."
  },
  {
    id: "LD-9114",
    customer: "SunState Beverage Group",
    origin: {
      city: "Orlando",
      state: "FL",
      address: "620 Bottling Way, Dock 11",
      pickupDate: "2026-09-25 11:30 AM"
    },
    destination: {
      city: "Savannah",
      state: "GA",
      address: "310 Port Commerce Way",
      deliveryDate: "2026-09-25 07:30 PM"
    },
    status: "unassigned",
    cargo: "Bottled Natural Spring Water (Palletized)",
    weight: "42,000 lbs",
    equipment: "53' Dry Van",
    miles: 280,
    rate: 1250,
    priority: "normal",
    carrierId: null,
    carrierName: null,
    driverName: null,
    driverPhone: null,
    lastUpdate: "40 mins ago",
    etaStatus: "Unassigned - Load Posted",
    liveLocation: null,
    temperature: null,
    notes: "Drop and hook available at receiver."
  },
  {
    id: "LD-9120",
    customer: "Cascade Home Goods",
    origin: {
      city: "Seattle",
      state: "WA",
      address: "900 Puget Sound Way",
      pickupDate: "2026-09-26 09:00 AM"
    },
    destination: {
      city: "Portland",
      state: "OR",
      address: "150 Columbia River Blvd",
      deliveryDate: "2026-09-26 02:30 PM"
    },
    status: "unassigned",
    cargo: "Furniture & Decor Items",
    weight: "22,000 lbs",
    equipment: "Box Truck",
    miles: 175,
    rate: 950,
    priority: "normal",
    carrierId: null,
    carrierName: null,
    driverName: null,
    driverPhone: null,
    lastUpdate: "50 mins ago",
    etaStatus: "Unassigned - Short Haul",
    liveLocation: null,
    temperature: null,
    notes: "Liftgate required at destination."
  },
  {
    id: "LD-8890",
    customer: "Continental Foods Network",
    origin: {
      city: "Indianapolis",
      state: "IN",
      address: "2100 Logistics Dr",
      pickupDate: "2026-09-22 07:00 AM"
    },
    destination: {
      city: "Columbus",
      state: "OH",
      address: "700 Outerbelt Blvd",
      deliveryDate: "2026-09-22 03:00 PM"
    },
    status: "delivered",
    cargo: "Dry Packaged Goods & Cereal",
    weight: "39,000 lbs",
    equipment: "53' Dry Van",
    miles: 175,
    rate: 1100,
    priority: "normal",
    carrierId: "carr-101",
    carrierName: "Apex Freightways LLC",
    driverName: "Marcus Vance",
    driverPhone: "(312) 555-0184",
    lastUpdate: "Delivered Sep 22",
    etaStatus: "Completed On Time (POD Signed)",
    liveLocation: "Delivered & Inspected",
    temperature: null,
    notes: "Signed BOL #77124 filed in archive."
  }
];
