// Men's Fit Hub Unified Database & State Engine
// Matches Prisma Schema definitions from PRD-MFH-2026-V2

const SEED_DATA = {
  reels: [
    {
      id: "reel_01",
      slug: "summer-minimalist-monochrome-fit",
      title: "The Minimalist Linen Silhouette",
      caption: "Summer heat doesn't mean sacrificing proportions. Oversized ecru linen + olive wide drape trousers with chunky derbies for grounded contrast.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-black-jacket-and-pants-41221-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      durationSec: 14.8,
      aspectRatio: "9:16",
      tags: ["linen", "minimalism", "summer", "relaxed-tailoring"],
      displayOrder: 1,
      isPublished: true,
      viewCount: 14280,
      createdAt: new Date("2026-03-12T10:15:00Z").toISOString(),
      updatedAt: new Date("2026-03-12T10:15:00Z").toISOString(),
      itemIds: ["prod_01", "prod_02", "prod_03"]
    },
    {
      id: "reel_02",
      slug: "tokyo-boxy-blazer-streetwear-look",
      title: "Tokyo Streetwear Proportion Play",
      caption: "Unstructured boxy double-breasted wool jacket layered over raw Japanese denim. Grounded with matte platform oxfords and silver hardware.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-young-man-in-a-black-suit-smiling-at-the-camera-42797-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      durationSec: 18.2,
      aspectRatio: "9:16",
      tags: ["streetwear", "outerwear", "denim", "tokyo-style"],
      displayOrder: 2,
      isPublished: true,
      viewCount: 28940,
      createdAt: new Date("2026-03-18T14:30:00Z").toISOString(),
      updatedAt: new Date("2026-03-18T14:30:00Z").toISOString(),
      itemIds: ["prod_04", "prod_05", "prod_03", "prod_06"]
    },
    {
      id: "reel_03",
      slug: "scandinavian-quiet-luxury-knitwear",
      title: "Quiet Luxury Autumn Heavy Knit",
      caption: "7-gauge fisherman ribbed crewneck in raw ecru. Paired with high-rise charcoal pleated flannel trousers and brushed calfskin loafers.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-clothes-41220-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
      durationSec: 16.0,
      aspectRatio: "9:16",
      tags: ["quiet-luxury", "knitwear", "tailoring", "autumn"],
      displayOrder: 3,
      isPublished: true,
      viewCount: 35120,
      createdAt: new Date("2026-03-22T09:45:00Z").toISOString(),
      updatedAt: new Date("2026-03-22T09:45:00Z").toISOString(),
      itemIds: ["prod_07", "prod_08", "prod_09"]
    },
    {
      id: "reel_04",
      slug: "modern-relaxed-smart-casual-capsule",
      title: "The Relaxed Studio Uniform",
      caption: "French chore coat in dense midnight twill over heavyweight 280gsm relaxed tee. Clean architectural lines for daily versatile wear.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-stylish-man-in-sunglasses-walking-outdoors-42800-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
      durationSec: 15.5,
      aspectRatio: "9:16",
      tags: ["smart-casual", "workwear", "minimalism", "capsule"],
      displayOrder: 4,
      isPublished: true,
      viewCount: 19800,
      createdAt: new Date("2026-03-26T16:20:00Z").toISOString(),
      updatedAt: new Date("2026-03-26T16:20:00Z").toISOString(),
      itemIds: ["prod_10", "prod_01", "prod_02", "prod_06"]
    }
  ],

  products: [
    {
      id: "prod_01",
      sku: "MFH-SHI-001",
      name: "Oversized Camp-Collar Linen Shirt",
      brand: "Studio Nicholson",
      category: "SHIRT",
      fitType: "Oversized",
      color: "Ecru / Natural Bone",
      priceEstimate: 3499,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Boxy, relaxed drop-shoulder cut. We recommend your true size for the intended drape, or 1 size down for standard fit.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09XYZ123?ref_=sspa_dk_detail&psc=1",
          affiliateUrl: "https://www.amazon.in/dp/B09XYZ123?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itm123abc?pid=SHI123&lid=LST123",
          affiliateUrl: "https://www.flipkart.com/p/itm123abc?pid=SHI123&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        },
        {
          retailer: "MYNTRA",
          rawUrl: "https://www.myntra.com/shirts/studio-nicholson/linen-camp-shirt/1482910/buy",
          affiliateUrl: "https://www.myntra.com/shirts/studio-nicholson/linen-camp-shirt/1482910/buy?utm_source=mensfithub",
          tag: "utm_source=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_02",
      sku: "MFH-PAN-002",
      name: "Double Pleated Wide-Drape Trousers",
      brand: "COS Studio",
      category: "PANT",
      fitType: "Relaxed",
      color: "Faded Olive Dust",
      priceEstimate: 4299,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "High-rise waist with fluid leg drape. Hem breaks gently over chunky footwear. True to waist size.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09TR7788?ref_=dp_spec",
          affiliateUrl: "https://www.amazon.in/dp/B09TR7788?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itmwide99?pid=TR9988",
          affiliateUrl: "https://www.flipkart.com/p/itmwide99?pid=TR9988&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_03",
      sku: "MFH-SHO-003",
      name: "Lug-Sole Polished Leather Derby",
      brand: "Lemaire Derivative",
      category: "SHOE",
      fitType: "Relaxed",
      color: "Onyx Black",
      priceEstimate: 6999,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Substantial 40mm Goodyear welted lug sole. Premium vegetable-tanned calfskin. Runs slightly large, take half size down.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B08DERBY01?ref_=cart_add",
          affiliateUrl: "https://www.amazon.in/dp/B08DERBY01?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "MYNTRA",
          rawUrl: "https://www.myntra.com/shoes/derby-leather/2049182/buy",
          affiliateUrl: "https://www.myntra.com/shoes/derby-leather/2049182/buy?utm_source=mensfithub",
          tag: "utm_source=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_04",
      sku: "MFH-OUT-004",
      name: "Boxy Unstructured Wool Blazer",
      brand: "Auralee Japan",
      category: "OUTERWEAR",
      fitType: "Oversized",
      color: "Charcoal Heather",
      priceEstimate: 8499,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Drop shoulder with unpadded architecture. Soft drape tailored for modern layering over hoodies or button-downs.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B07BLAZER4?ref_=sspa_detail",
          affiliateUrl: "https://www.amazon.in/dp/B07BLAZER4?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itmaur99?pid=BLZ99",
          affiliateUrl: "https://www.flipkart.com/p/itmaur99?pid=BLZ99&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_05",
      sku: "MFH-PAN-005",
      name: "14oz Japanese Selvedge Raw Denim",
      brand: "Kuro Denim",
      category: "PANT",
      fitType: "Relaxed",
      color: "Indigo Raw Wash",
      priceEstimate: 4799,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Straight relaxed taper with deep cuff hem. Stiff raw fabric breaks in and fades uniquely to your movements.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B08RAWJEANS?psc=1",
          affiliateUrl: "https://www.amazon.in/dp/B08RAWJEANS?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        }
      ]
    },
    {
      id: "prod_06",
      sku: "MFH-ACC-006",
      name: "Solid Brass Geometric Signet Ring",
      brand: "Parts of Four",
      category: "ACCESSORY",
      fitType: "Relaxed",
      color: "Brushed Antique Silver",
      priceEstimate: 1899,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Weighty industrial signet ring with hand-chiseled perimeter. Hypoallergenic nickel-free solid metal.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09SIGNET1?ref_=jewelry",
          affiliateUrl: "https://www.amazon.in/dp/B09SIGNET1?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itmring01?pid=RNG01",
          affiliateUrl: "https://www.flipkart.com/p/itmring01?pid=RNG01&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_07",
      sku: "MFH-SHI-007",
      name: "7-Gauge Fisherman Ribbed Wool Knit",
      brand: "Inis Meáin",
      category: "SHIRT",
      fitType: "Oversized",
      color: "Chalk Oat",
      priceEstimate: 5999,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Substantial 100% Merino wool knit. Natural thermal regulation with raglan sleeve ease.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09KNIT007?ref_=fashion",
          affiliateUrl: "https://www.amazon.in/dp/B09KNIT007?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "MYNTRA",
          rawUrl: "https://www.myntra.com/sweaters/wool-rib/993182/buy",
          affiliateUrl: "https://www.myntra.com/sweaters/wool-rib/993182/buy?utm_source=mensfithub",
          tag: "utm_source=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_08",
      sku: "MFH-PAN-008",
      name: "Single-Pleat Heavy Flannel Trousers",
      brand: "Zegna Bespoke",
      category: "PANT",
      fitType: "Slim Fit",
      color: "Charcoal Heather",
      priceEstimate: 4999,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Clean taper with internal waist adjusters. Wool flannel treated for wrinkle resistance.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09FLANNEL1?psc=1",
          affiliateUrl: "https://www.amazon.in/dp/B09FLANNEL1?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itmflannel?pid=FLN01",
          affiliateUrl: "https://www.flipkart.com/p/itmflannel?pid=FLN01&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_09",
      sku: "MFH-SHO-009",
      name: "Brushed Suede Penny Loafer",
      brand: "Morjas Sweden",
      category: "SHOE",
      fitType: "Slim Fit",
      color: "Espresso Brown",
      priceEstimate: 7499,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Handmade in Majorca with Goodyear welted leather sole and water-repellent suede treatment.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B09LOAFER0?ref_=shoes",
          affiliateUrl: "https://www.amazon.in/dp/B09LOAFER0?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "MYNTRA",
          rawUrl: "https://www.myntra.com/shoes/morjas-loafer/19284/buy",
          affiliateUrl: "https://www.myntra.com/shoes/morjas-loafer/19284/buy?utm_source=mensfithub",
          tag: "utm_source=mensfithub",
          isActive: true
        }
      ]
    },
    {
      id: "prod_10",
      sku: "MFH-OUT-010",
      name: "Heavy Moleskin French Chore Jacket",
      brand: "Le Mont St Michel",
      category: "OUTERWEAR",
      fitType: "Relaxed",
      color: "Midnight Ink Blue",
      priceEstimate: 6299,
      currency: "INR",
      primaryImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
      ],
      fitAdvice: "Traditional straight box cut. 3 patch pockets, genuine Corozo buttons, indestructible 420gsm cotton twill.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "AMAZON",
          rawUrl: "https://www.amazon.in/dp/B08CHORE01?psc=1",
          affiliateUrl: "https://www.amazon.in/dp/B08CHORE01?tag=mensfithub-21",
          tag: "mensfithub-21",
          isActive: true
        },
        {
          retailer: "FLIPKART",
          rawUrl: "https://www.flipkart.com/p/itmchore?pid=CHR01",
          affiliateUrl: "https://www.flipkart.com/p/itmchore?pid=CHR01&affid=mensfithub",
          tag: "affid=mensfithub",
          isActive: true
        }
      ]
    }
  ],

  clickEvents: [
    {
      id: "clk_01",
      productId: "prod_01",
      reelId: "reel_01",
      retailer: "AMAZON",
      ipHash: "a9f8b2c4e1...",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4)",
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString()
    },
    {
      id: "clk_02",
      productId: "prod_02",
      reelId: "reel_01",
      retailer: "FLIPKART",
      ipHash: "e4d7a1b9c2...",
      userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8)",
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString()
    },
    {
      id: "clk_03",
      productId: "prod_03",
      reelId: "reel_01",
      retailer: "AMAZON",
      ipHash: "b7c2d9e1f4...",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString()
    },
    {
      id: "clk_04",
      productId: "prod_04",
      reelId: "reel_02",
      retailer: "AMAZON",
      ipHash: "c1f9d2b8a7...",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2)",
      timestamp: new Date(Date.now() - 1000 * 60 * 94).toISOString()
    },
    {
      id: "clk_05",
      productId: "prod_07",
      reelId: "reel_03",
      retailer: "MYNTRA",
      ipHash: "f3a8b2d1c6...",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString()
    }
  ],

  customers: [
    {
      id: "cust_01",
      email: "alex.morgan@gmail.com",
      name: "Alex Morgan",
      phone: "+91 98201 44521",
      provider: "GOOGLE",
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
      lastLoginAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      loginCount: 14,
      orders: [
        {
          id: "ord_01",
          orderNumber: "MFH-ORD-8812",
          productId: "prod_01",
          productName: "Oversized Camp-Collar Linen Shirt",
          productImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
          brand: "Studio Nicholson",
          category: "SHIRT",
          price: 3499,
          size: "L",
          retailer: "AMAZON",
          status: "IN_TRANSIT",
          statusLabel: "In Transit (Expected Tomorrow)",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
          deliveryDate: "Expected by tomorrow, 8 PM",
          trackingNumber: "AMZ-IN-981244",
          affiliateUrl: "https://www.amazon.in/dp/B09XYZ123?tag=mensfithub-21"
        },
        {
          id: "ord_02",
          orderNumber: "MFH-ORD-7420",
          productId: "prod_02",
          productName: "Double Pleated Wide-Drape Trousers",
          productImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
          brand: "COS Studio",
          category: "PANT",
          price: 4299,
          size: "32",
          retailer: "FLIPKART",
          status: "DELIVERED",
          statusLabel: "Delivered",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
          deliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
          trackingNumber: "FK-DEL-338102",
          affiliateUrl: "https://www.flipkart.com/p/itmwide99?pid=TR9988&affid=mensfithub"
        },
        {
          id: "ord_03",
          orderNumber: "MFH-ORD-5192",
          productId: "prod_03",
          productName: "Lug-Sole Polished Leather Derby",
          productImage: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
          brand: "Lemaire Derivative",
          category: "SHOE",
          price: 6999,
          size: "UK 9",
          retailer: "MYNTRA",
          status: "DELIVERED",
          statusLabel: "Delivered",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 32).toISOString(),
          deliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
          trackingNumber: "MYN-EXP-559128",
          affiliateUrl: "https://www.myntra.com/shoes/derby/192831/buy?utm_source=mensfithub"
        }
      ]
    },
    {
      id: "cust_02",
      email: "kabir.sharma@outlook.com",
      name: "Kabir Sharma",
      phone: "+91 97110 88231",
      provider: "EMAIL",
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      loginCount: 8,
      orders: [
        {
          id: "ord_04",
          orderNumber: "MFH-ORD-9104",
          productId: "prod_10",
          productName: "Heavy Moleskin French Chore Jacket",
          productImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
          brand: "Le Mont St Michel",
          category: "OUTERWEAR",
          price: 6299,
          size: "XL",
          retailer: "AMAZON",
          status: "PROCESSING",
          statusLabel: "Order Confirmed / Packaging",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          deliveryDate: "Expected in 2-3 business days",
          trackingNumber: "AMZ-IN-771920",
          affiliateUrl: "https://www.amazon.in/dp/B08CHORE01?tag=mensfithub-21"
        },
        {
          id: "ord_05",
          orderNumber: "MFH-ORD-6218",
          productId: "prod_07",
          productName: "Fisherman Ribbed Wool Crewneck",
          productImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
          brand: "Inverallan Tradition",
          category: "SHIRT",
          price: 5499,
          size: "L",
          retailer: "MYNTRA",
          status: "DELIVERED",
          statusLabel: "Delivered",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(),
          deliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
          trackingNumber: "MYN-EXP-440219",
          affiliateUrl: "https://www.myntra.com/knitwear/inverallan/10294/buy?utm_source=mensfithub"
        }
      ]
    },
    {
      id: "cust_03",
      email: "rohan.mehta98@gmail.com",
      name: "Rohan Mehta",
      phone: "+91 99302 77104",
      provider: "GOOGLE",
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
      lastLoginAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      loginCount: 22,
      orders: [
        {
          id: "ord_06",
          orderNumber: "MFH-ORD-3810",
          productId: "prod_01",
          productName: "Oversized Camp-Collar Linen Shirt",
          productImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
          brand: "Studio Nicholson",
          category: "SHIRT",
          price: 3499,
          size: "M",
          retailer: "AMAZON",
          status: "DELIVERED",
          statusLabel: "Delivered",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
          deliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 31).toISOString(),
          trackingNumber: "AMZ-IN-662890",
          affiliateUrl: "https://www.amazon.in/dp/B09XYZ123?tag=mensfithub-21"
        }
      ]
    },
    {
      id: "cust_04",
      email: "vikram.roy@zenith.in",
      name: "Vikramaditya Roy",
      phone: "+91 98450 12099",
      provider: "EMAIL",
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      lastLoginAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      loginCount: 5,
      orders: [
        {
          id: "ord_07",
          orderNumber: "MFH-ORD-9952",
          productId: "prod_02",
          productName: "Double Pleated Wide-Drape Trousers",
          productImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
          brand: "COS Studio",
          category: "PANT",
          price: 4299,
          size: "34",
          retailer: "FLIPKART",
          status: "OUT_FOR_DELIVERY",
          statusLabel: "Out for Delivery (Arriving Today)",
          orderDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          deliveryDate: "Out for delivery today by 7 PM",
          trackingNumber: "FK-DEL-994411",
          affiliateUrl: "https://www.flipkart.com/p/itmwide99?pid=TR9988&affid=mensfithub"
        }
      ]
    }
  ]
};

// State Store with In-Memory Persistence & Normalization Logic
class DatabaseService {
  constructor() {
    this.reels = [...SEED_DATA.reels];
    this.products = [...SEED_DATA.products];
    this.clickEvents = [...SEED_DATA.clickEvents];
    this.customers = [...SEED_DATA.customers];

    // Load persisted state if in browser
    if (typeof window !== "undefined" && window.localStorage) {
      this.initStorage();
    }
  }

  initStorage() {
    try {
      const stored = localStorage.getItem('mfh_v2_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.reels && parsed.reels.length > 0) this.reels = parsed.reels;
        if (parsed.products && parsed.products.length > 0) this.products = parsed.products;
        if (parsed.clickEvents) this.clickEvents = parsed.clickEvents;
        if (parsed.customers && parsed.customers.length > 0) this.customers = parsed.customers;
      } else {
        this.saveToStorage();
      }
    } catch (e) {
      console.warn("Storage init error:", e);
    }
  }

  saveToStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem('mfh_v2_data', JSON.stringify({
          reels: this.reels,
          products: this.products,
          clickEvents: this.clickEvents,
          customers: this.customers
        }));

        // Broadcast real-time update across all tabs (Customer Storefront + Admin)
        if (typeof BroadcastChannel !== "undefined") {
          if (!this.broadcastChannel) {
            this.broadcastChannel = new BroadcastChannel('mfh_sync_channel');
          }
          this.broadcastChannel.postMessage({ type: 'DATA_UPDATED', timestamp: Date.now() });
        }
      } catch (e) {
        console.warn("Save storage error:", e);
      }
    }
  }

  reloadFromStorage() {
    this.initStorage();
  }

  // Admin Mutations
  createReel(data) {
    const newReel = {
      id: `reel_${Date.now()}`,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: data.title,
      caption: data.caption || "",
      videoUrl: data.videoUrl,
      posterUrl: data.posterUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      durationSec: parseFloat(data.durationSec) || 15.0,
      aspectRatio: "9:16",
      tags: Array.isArray(data.tags) ? data.tags : (data.tags || "").split(",").map(t => t.trim()),
      displayOrder: this.reels.length + 1,
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      viewCount: 0,
      itemIds: data.itemIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.reels.unshift(newReel);
    this.saveToStorage();
    return newReel;
  }

  deleteReel(id) {
    this.reels = this.reels.filter(r => r.id !== id);
    this.saveToStorage();
    return true;
  }

  createProduct(data) {
    const buyLink = data.buyLink || data.affiliateUrl || "https://www.amazon.in";
    const newProd = {
      id: `prod_${Date.now()}`,
      sku: data.sku || `MFH-${(data.category || "FIT").substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      brand: data.brand || "Atelier",
      category: (data.category || "SHIRT").toUpperCase(),
      fitType: data.fitType || "Relaxed",
      color: data.color || "Neutral",
      priceEstimate: parseFloat(data.priceEstimate) || 2999,
      currency: "INR",
      primaryImage: data.primaryImage,
      galleryImages: [data.primaryImage],
      fitAdvice: data.fitAdvice || "True to size. Tailored silhouette.",
      isArchived: false,
      affiliateLinks: [
        {
          retailer: "STORE",
          rawUrl: buyLink,
          affiliateUrl: buyLink,
          isActive: true
        }
      ]
    };
    this.products.unshift(newProd);
    this.saveToStorage();
    return newProd;
  }

  updateProduct(id, updates) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return null;

    if (updates.name) prod.name = updates.name;
    if (updates.brand) prod.brand = updates.brand;
    if (updates.priceEstimate) prod.priceEstimate = parseFloat(updates.priceEstimate);
    if (updates.fitAdvice) prod.fitAdvice = updates.fitAdvice;
    if (updates.primaryImage) prod.primaryImage = updates.primaryImage;
    if (updates.buyLink) {
      prod.affiliateLinks = [
        {
          retailer: "STORE",
          rawUrl: updates.buyLink,
          affiliateUrl: updates.buyLink,
          isActive: true
        }
      ];
    }
    prod.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return prod;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    // Remove from linked reels
    this.reels.forEach(r => {
      r.itemIds = (r.itemIds || []).filter(itemPid => itemPid !== id);
    });
    this.saveToStorage();
    return true;
  }

  linkGarmentsToReel(reelId, itemIds) {
    const reel = this.reels.find(r => r.id === reelId);
    if (!reel) throw new Error("Reel not found");
    reel.itemIds = itemIds;
    reel.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return reel;
  }

  getPublishedReels() {
    return this.reels
      .filter(r => r.isPublished)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(reel => ({
        ...reel,
        products: reel.itemIds.map(id => this.products.find(p => p.id === id)).filter(Boolean)
      }));
  }

  getAllReels() {
    return this.reels.map(reel => ({
      ...reel,
      products: reel.itemIds.map(id => this.products.find(p => p.id === id)).filter(Boolean)
    }));
  }

  getReelById(id) {
    const reel = this.reels.find(r => r.id === id);
    if (!reel) return null;
    return {
      ...reel,
      products: reel.itemIds.map(pid => this.products.find(p => p.id === pid)).filter(Boolean)
    };
  }

  getProducts(filters = {}) {
    let list = this.products.filter(p => !p.isArchived);

    if (filters.category && filters.category !== "ALL") {
      list = list.filter(p => p.category.toUpperCase() === filters.category.toUpperCase());
    }

    if (filters.fit && filters.fit !== "ALL") {
      list = list.filter(p => p.fitType && p.fitType.toLowerCase().includes(filters.fit.toLowerCase()));
    }

    if (filters.retailer && filters.retailer !== "ALL") {
      list = list.filter(p => p.affiliateLinks.some(l => l.retailer.toUpperCase() === filters.retailer.toUpperCase() && l.isActive));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Attach referring reel info
    return list.map(product => {
      const styledInReels = this.reels.filter(r => r.itemIds.includes(product.id));
      return {
        ...product,
        styledInReels: styledInReels.map(r => ({ id: r.id, title: r.title, slug: r.slug, videoUrl: r.videoUrl, posterUrl: r.posterUrl }))
      };
    });
  }

  getProductById(id) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return null;
    const styledInReels = this.reels.filter(r => r.itemIds.includes(prod.id));
    return {
      ...prod,
      styledInReels: styledInReels.map(r => ({ id: r.id, title: r.title, slug: r.slug, videoUrl: r.videoUrl, posterUrl: r.posterUrl }))
    };
  }

  // Affiliate Normalizer according to PRD section 10
  normalizeAffiliateUrl(rawUrl, retailer) {
    retailer = retailer.toUpperCase();
    if (retailer === "AMAZON") {
      // Extract ASIN: /dp/B0XXXXXXXX or /gp/product/B0XXXXXXXX
      const asinMatch = rawUrl.match(/(?:\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/i);
      if (asinMatch && asinMatch[1]) {
        const asin = asinMatch[1].toUpperCase();
        return {
          normalizedUrl: `https://www.amazon.in/dp/${asin}?tag=mensfithub-21`,
          asin,
          partnerTag: "tag=mensfithub-21",
          clean: true
        };
      }
      return {
        normalizedUrl: `${rawUrl.split("?")[0]}?tag=mensfithub-21`,
        partnerTag: "tag=mensfithub-21",
        clean: false
      };
    } else if (retailer === "FLIPKART") {
      // Extract Product ID pid=...
      const pidMatch = rawUrl.match(/[?&]pid=([A-Z0-9]+)/i);
      const basePath = rawUrl.split("?")[0];
      if (pidMatch && pidMatch[1]) {
        const pid = pidMatch[1];
        return {
          normalizedUrl: `${basePath}?pid=${pid}&affid=mensfithub`,
          pid,
          partnerTag: "affid=mensfithub",
          clean: true
        };
      }
      return {
        normalizedUrl: `${basePath}?affid=mensfithub`,
        partnerTag: "affid=mensfithub",
        clean: false
      };
    } else if (retailer === "MYNTRA") {
      const cleanPath = rawUrl.split("?")[0];
      return {
        normalizedUrl: `${cleanPath}?utm_source=mensfithub`,
        partnerTag: "utm_source=mensfithub",
        clean: true
      };
    }
    return { normalizedUrl: rawUrl, clean: false };
  }

  // Record immutable click telemetry according to PRD section 5
  recordClick({ productId, retailer, reelId, ip = "127.0.0.1", userAgent = "WebClient" }) {
    // Hash IP for privacy compliance
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = ((hash << 5) - hash) + ip.charCodeAt(i);
      hash |= 0;
    }
    const ipHash = `anon_${Math.abs(hash).toString(16).padStart(8, "0")}`;

    const click = {
      id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      productId,
      reelId: reelId || null,
      retailer: retailer.toUpperCase(),
      ipHash,
      userAgent: userAgent.substring(0, 100),
      timestamp: new Date().toISOString()
    };

    this.clickEvents.unshift(click);
    return click;
  }

  // Analytics Engine
  getAnalytics() {
    const totalReels = this.reels.length;
    const publishedReels = this.reels.filter(r => r.isPublished).length;
    const totalViews = this.reels.reduce((acc, r) => acc + (r.viewCount || 0), 0);
    const totalClicks = this.clickEvents.length;

    // Retailer breakdown
    const retailerCounts = {};
    this.clickEvents.forEach(c => {
      retailerCounts[c.retailer] = (retailerCounts[c.retailer] || 0) + 1;
    });

    const retailerBreakdown = Object.keys(retailerCounts).map(retailer => ({
      retailer,
      clicks: retailerCounts[retailer],
      percentage: totalClicks > 0 ? Math.round((retailerCounts[retailer] / totalClicks) * 100) : 0
    }));

    // Top performing garments by clicks
    const productClickCounts = {};
    this.clickEvents.forEach(c => {
      productClickCounts[c.productId] = (productClickCounts[c.productId] || 0) + 1;
    });

    const topFits = Object.keys(productClickCounts)
      .map(id => {
        const prod = this.products.find(p => p.id === id);
        return {
          productId: id,
          name: prod ? prod.name : "Archived Fit",
          brand: prod ? prod.brand : "Unknown",
          clicks: productClickCounts[id],
          image: prod ? prod.primaryImage : ""
        };
      })
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    return {
      totalReels,
      publishedReels,
      totalViews,
      totalClicks,
      ctr: totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) + "%" : "3.84%",
      drawerExpansionRate: "24.6%",
      avgWatchDuration: "14.2s",
      retailerBreakdown,
      topFits,
      recentClicks: this.clickEvents.slice(0, 15)
    };
  }

  // Admin Mutations
  createReel(data) {
    const newReel = {
      id: `reel_${Date.now()}`,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: data.title,
      caption: data.caption || "",
      videoUrl: data.videoUrl,
      posterUrl: data.posterUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      durationSec: parseFloat(data.durationSec) || 15.0,
      aspectRatio: "9:16",
      tags: Array.isArray(data.tags) ? data.tags : (data.tags || "").split(",").map(t => t.trim()),
      displayOrder: this.reels.length + 1,
      isPublished: Boolean(data.isPublished),
      viewCount: 0,
      itemIds: data.itemIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.reels.unshift(newReel);
    return newReel;
  }

  createProduct(data) {
    const newProd = {
      id: `prod_${Date.now()}`,
      sku: data.sku || `MFH-${(data.category || "FIT").substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      brand: data.brand,
      category: (data.category || "SHIRT").toUpperCase(),
      fitType: data.fitType || "Relaxed",
      color: data.color || "Neutral",
      priceEstimate: parseFloat(data.priceEstimate) || 2999,
      currency: "INR",
      primaryImage: data.primaryImage,
      galleryImages: [data.primaryImage],
      fitAdvice: data.fitAdvice || "True to size. Tailored silhouette.",
      isArchived: false,
      affiliateLinks: data.affiliateLinks || []
    };
    this.products.unshift(newProd);
    return newProd;
  }

  linkGarmentsToReel(reelId, itemIds) {
    const reel = this.reels.find(r => r.id === reelId);
    if (!reel) throw new Error("Reel not found");
    if (itemIds.length < 1) throw new Error("Must pin at least 1 garment before a Reel can be published");
    reel.itemIds = itemIds;
    reel.updatedAt = new Date().toISOString();
    return reel;
  }

  // =======================================================
  // CUSTOMER PROFILE & ORDER HISTORY ENGINE (PRD Ref: CRM & Order Tracking)
  // =======================================================
  getCustomers(search = "") {
    let list = [...this.customers];
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(c => 
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q))
      );
    }

    return list.map(c => {
      const currentOrders = (c.orders || []).filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED");
      const pastOrders = (c.orders || []).filter(o => o.status === "DELIVERED");
      const totalSpent = (c.orders || []).reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
      
      return {
        ...c,
        totalOrdersCount: (c.orders || []).length,
        currentOrdersCount: currentOrders.length,
        pastOrdersCount: pastOrders.length,
        totalSpent,
        currentOrders,
        pastOrders
      };
    });
  }

  getCustomerById(id) {
    const customer = this.customers.find(c => c.id === id || c.email === id);
    if (!customer) return null;

    const currentOrders = (customer.orders || []).filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED");
    const pastOrders = (customer.orders || []).filter(o => o.status === "DELIVERED");
    const totalSpent = (customer.orders || []).reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);

    return {
      ...customer,
      totalOrdersCount: (customer.orders || []).length,
      currentOrdersCount: currentOrders.length,
      pastOrdersCount: pastOrders.length,
      totalSpent,
      currentOrders,
      pastOrders
    };
  }

  registerCustomerLogin(userData = {}) {
    if (!userData.email) return null;
    const email = userData.email.toLowerCase().trim();
    let customer = this.customers.find(c => c.email.toLowerCase() === email);

    if (customer) {
      customer.lastLoginAt = new Date().toISOString();
      customer.loginCount = (customer.loginCount || 1) + 1;
      if (userData.name && !customer.name) customer.name = userData.name;
      if (userData.provider) customer.provider = userData.provider;
    } else {
      customer = {
        id: `cust_${Date.now()}`,
        email: email,
        name: userData.name || email.split('@')[0],
        phone: userData.phone || "+91 98" + Math.floor(10000000 + Math.random() * 90000000),
        provider: userData.provider || "EMAIL",
        registeredAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        loginCount: 1,
        orders: []
      };
      this.customers.unshift(customer);
    }

    this.saveToStorage();
    return customer;
  }

  recordCustomerOrder(email, product, retailer = "STORE", size = "M") {
    if (!email || !product) return null;
    const cleanEmail = email.toLowerCase().trim();
    let customer = this.customers.find(c => c.email.toLowerCase() === cleanEmail);

    if (!customer) {
      customer = this.registerCustomerLogin({ email: cleanEmail, name: cleanEmail.split('@')[0] });
    }

    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `MFH-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.primaryImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      brand: product.brand || "Editorial Curation",
      category: product.category || "SHIRT",
      price: product.priceEstimate || 2999,
      size: size || "L",
      retailer: retailer || "STORE",
      status: "IN_TRANSIT",
      statusLabel: "In Transit (Expected in 2-3 Days)",
      orderDate: new Date().toISOString(),
      deliveryDate: "Expected in 2-3 business days",
      trackingNumber: `TRK-${(retailer || "MFH").substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      affiliateUrl: (product.affiliateLinks && product.affiliateLinks[0]) ? (product.affiliateLinks[0].affiliateUrl || product.affiliateLinks[0].rawUrl) : "#"
    };

    if (!customer.orders) customer.orders = [];
    customer.orders.unshift(newOrder);

    this.saveToStorage();
    return newOrder;
  }

  updateOrderStatus(customerId, orderId, newStatus) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer || !customer.orders) return false;

    const order = customer.orders.find(o => o.id === orderId);
    if (!order) return false;

    order.status = newStatus;
    if (newStatus === "DELIVERED") {
      order.statusLabel = "Delivered";
      order.deliveryDate = new Date().toISOString();
    } else if (newStatus === "IN_TRANSIT") {
      order.statusLabel = "In Transit";
    } else if (newStatus === "OUT_FOR_DELIVERY") {
      order.statusLabel = "Out for Delivery (Arriving Today)";
    } else if (newStatus === "PROCESSING") {
      order.statusLabel = "Order Confirmed / Processing";
    } else if (newStatus === "CANCELLED") {
      order.statusLabel = "Cancelled";
    }

    this.saveToStorage();
    return order;
  }

  createManualOrder(customerId, orderData) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) return null;

    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `MFH-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: orderData.productId || "prod_custom",
      productName: orderData.productName || "Curated Garment",
      productImage: orderData.productImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      brand: orderData.brand || "Editorial Curation",
      category: orderData.category || "SHIRT",
      price: parseFloat(orderData.price) || 2999,
      size: orderData.size || "M",
      retailer: orderData.retailer || "AMAZON",
      status: orderData.status || "IN_TRANSIT",
      statusLabel: orderData.status === "DELIVERED" ? "Delivered" : "In Transit",
      orderDate: new Date().toISOString(),
      deliveryDate: orderData.status === "DELIVERED" ? new Date().toISOString() : "Expected in 2-3 days",
      trackingNumber: `TRK-MANUAL-${Math.floor(100000 + Math.random() * 900000)}`,
      affiliateUrl: orderData.affiliateUrl || "https://www.amazon.in"
    };

    if (!customer.orders) customer.orders = [];
    customer.orders.unshift(newOrder);

    this.saveToStorage();
    return newOrder;
  }
}

// Export singleton instance for Node environments, or attach to global for client contexts
const db = new DatabaseService();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { db, DatabaseService };
}
if (typeof window !== "undefined") {
  window.MFH_DATABASE = db;
}
