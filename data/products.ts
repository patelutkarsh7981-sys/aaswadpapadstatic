export type ProductCategory =
  | "Papad"
  | "Coin Papad"
  | "Mathiya"
  | "Chorafali"
  | "Khichiya Papad"
  | "Rice Papad"
  | "Flat Khichiya Papad";

export type ProductSegment = "Papad" | "Coin Papad" | "Rice Papad / Khichiya Papad" | "Mathiya" | "Chorafali";
export type RicePapadSegment = "7 Inch" | "5 Inch" | "3 Inch" | "Flat";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  weight: string[];
  image: string;
  ingredients?: string[];
  nutrition?: Record<string, string>;
  featured: boolean;
};

export function getProductImageAlt(product: Product) {
  return `Aaswad ${product.name.toLowerCase()} product pack`;
}

const papadIngredients = ["Traditional papad blend", "Spices as per variant"];
const khichiyaIngredients = ["Rice flour blend", "Spices as per variant"];
const ricePapadIngredients = ["Rice flour", "Spices as per variant"];
const mathiyaIngredients = [
  "Math dal flour",
  "Udad dal flour",
  "Sugar",
  "Iodized salt",
  "Chilli powder",
  "Ajwain",
  "Vanaspati",
  "Asafoetida"
];

export const products: Product[] = [
  {
    id: "papad-single-mari",
    slug: "single-mari-papad",
    name: "Single Mari Papad",
    category: "Papad",
    description: "A pepper-flavored papad in a 500GM pack.",
    weight: ["500GM"],
    image: "/products/clean/single-mari-papad-500.png",
    ingredients: papadIngredients,
    featured: true
  },
  {
    id: "papad-double-mari",
    slug: "double-mari-papad",
    name: "Double Mari Papad",
    category: "Papad",
    description: "A bold papad for those who enjoy a stronger pepper flavour.",
    weight: ["500GM"],
    image: "/products/clean/double-mari-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "papad-jeera-mari",
    slug: "jeera-mari-papad",
    name: "Jeera Mari Papad",
    category: "Papad",
    description: "A thin, crispy papad with cumin and pepper seasoning for everyday meals and snacks.",
    weight: ["500GM"],
    image: "/products/clean/jeera-mari-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "papad-garlic-mari",
    slug: "garlic-mari-papad",
    name: "Garlic Mari Papad",
    category: "Papad",
    description: "A crispy papad seasoned with garlic and pepper seasoning.",
    weight: ["500GM"],
    image: "/products/clean/garlic-mari-papad.png",
    ingredients: papadIngredients,
    featured: true
  },
  {
    id: "papad-single-mari-200",
    slug: "single-mari-papad-200gm",
    name: "Single Mari Papad 200GM",
    category: "Papad",
    description: "A 200GM pack of pepper-flavored papad with a crispy, traditional taste.",
    weight: ["200GM"],
    image: "/products/clean/single-mari-papad-200.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "papad-puri",
    slug: "puri-papad",
    name: "Puri Papad",
    category: "Papad",
    description: "Classic Aaswad papad with a light, crispy texture and traditional seasoning.",
    weight: ["500GM"],
    image: "/products/clean/puri-papad.png",
    ingredients: papadIngredients,
    featured: true
  },
  {
    id: "mathiya-regular",
    slug: "regular-mathiya",
    name: "Regular Mathiya",
    category: "Mathiya",
    description: "Traditional mathiya made with a balanced blend of dal flours and spices.",
    weight: ["500GM"],
    image: "/products/clean/regular-mathiya.png",
    ingredients: mathiyaIngredients,
    nutrition: {
      "Calories per 100g": "360 Kcal",
      "Total Fat": "2g",
      Sodium: "1190mg",
      "Total Carbohydrate": "64g",
      "Dietary Fiber": "5g",
      "Total Sugars": "23g",
      "Added Sugar": "21g",
      Protein: "21g",
      Iron: "7.8mg"
    },
    featured: true
  },
  {
    id: "mathiya-green-chilli",
    slug: "green-chilli-mathiya",
    name: "Green Chilli Mathiya",
    category: "Mathiya",
    description: "Traditional mathiya with green chilli seasoning and a lively, spicy flavor.",
    weight: ["500GM"],
    image: "/products/clean/green-chilli-mathiya.png",
    ingredients: mathiyaIngredients,
    nutrition: {
      "Calories per 100g": "360 Kcal",
      Protein: "21g",
      "Total Carbohydrate": "64g"
    },
    featured: false
  },
  {
    id: "chorafali",
    slug: "chorafali",
    name: "Chorafali",
    category: "Chorafali",
    description: "A festive traditional snack with a light, airy crunch and classic flavor.",
    weight: ["500GM"],
    image: "/products/clean/chorafali.png",
    ingredients: ["Traditional chorafali blend", "Spices"],
    featured: true
  },
  {
    id: "khichiya-green-chilli",
    slug: "green-chilli-khichiya-papad",
    name: "Green Chilli Khichiya Papad",
    category: "Khichiya Papad",
    description: "7-inch khichiya papad with green chilli seasoning and a crispy snack texture.",
    weight: ["500GM"],
    image: "/products/clean/green-chilli-rice-papad.png",
    ingredients: khichiyaIngredients,
    featured: false
  },
  {
    id: "khichiya-jeera",
    slug: "jeera-khichiya-papad",
    name: "Jeera Khichiya Papad",
    category: "Khichiya Papad",
    description: "7-inch khichiya papad with jeera seasoning from Aaswad's signature range.",
    weight: ["500GM"],
    image: "/products/clean/jeera-rice-papad.png",
    ingredients: khichiyaIngredients,
    featured: true
  },
  {
    id: "khichiya-red-chilli",
    slug: "red-chilli-khichiya-papad",
    name: "Red Chilli Khichiya Papad",
    category: "Khichiya Papad",
    description: "7-inch khichiya papad with red chilli flavor and a warm spice note.",
    weight: ["500GM"],
    image: "/products/clean/red-chilli-rice-papad.png",
    ingredients: khichiyaIngredients,
    featured: false
  },
  {
    id: "rice-5-three-in-one",
    slug: "5-inch-3-in-1-rice-papad",
    name: "5 Inch 3 In 1 Rice Papad",
    category: "Rice Papad",
    description: "A mixed 5-inch khichiya rice papad pack featuring three classic flavors.",
    weight: ["250GM", "500GM"],
    image: "/products/clean/5-inch-3-in-1-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: true
  },
  {
    id: "rice-5-green",
    slug: "5-inch-green-chilli-rice-papad",
    name: "5 Inch Green Chilli Rice Papad",
    category: "Rice Papad",
    description: "5-inch green chilli rice papad available in 250GM and 500GM packs.",
    weight: ["250GM", "500GM"],
    image: "/products/clean/5-inch-green-chilli-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: false
  },
  {
    id: "rice-5-jeera",
    slug: "5-inch-jeera-rice-papad",
    name: "5 Inch Jeera Rice Papad",
    category: "Rice Papad",
    description: "5-inch jeera rice papad with classic cumin flavor.",
    weight: ["250GM", "500GM"],
    image: "/products/clean/5-inch-jeera-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: false
  },
  {
    id: "rice-5-red",
    slug: "5-inch-red-chilli-rice-papad",
    name: "5 Inch Red Chilli Rice Papad",
    category: "Rice Papad",
    description: "5-inch red chilli rice papad with a spicy, crispy texture.",
    weight: ["250GM", "500GM"],
    image: "/products/clean/5-inch-red-chilli-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: false
  },
  {
    id: "rice-3-green",
    slug: "3-inch-green-chilli-rice-papad",
    name: "3 Inch Green Chilli Rice Papad",
    category: "Rice Papad",
    description: "3-inch rice papad with green chilli flavor from Aaswad's signature range.",
    weight: ["500GM"],
    image: "/products/clean/3-inch-green-chilli-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: true
  },
  {
    id: "rice-3-jeera",
    slug: "3-inch-jeera-rice-papad",
    name: "3 Inch Jeera Rice Papad",
    category: "Rice Papad",
    description: "3-inch rice papad with jeera seasoning and a crispy, compact shape.",
    weight: ["500GM"],
    image: "/products/clean/3-inch-jeera-rice-papad.png",
    ingredients: ricePapadIngredients,
    featured: false
  },
  {
    id: "rice-3-red",
    slug: "3-inch-red-chilli-rice-papad",
    name: "3 Inch Red Chilli Rice Papad",
    category: "Rice Papad",
    description: "3-inch rice papad with red chilli flavor.",
    weight: ["500GM"],
    image: "/products/clean/3-inch-red-chilli-rice-papad-v3.png",
    ingredients: ricePapadIngredients,
    featured: false
  },
  {
    id: "coin-green-chilli-papad",
    slug: "coin-green-chilli-papad",
    name: "Green Chilli Coin Papad",
    category: "Coin Papad",
    description: "Small, crispy coin papads with a fresh green chilli flavour.",
    weight: ["500GM"],
    image: "/products/clean/coin-green-chilli-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "coin-jeera-papad",
    slug: "coin-jeera-papad",
    name: "Jeera Coin Papad",
    category: "Coin Papad",
    description: "Small, crispy coin papads seasoned with aromatic cumin.",
    weight: ["500GM"],
    image: "/products/clean/coin-jeera-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "coin-red-chilli-papad",
    slug: "coin-red-chilli-papad",
    name: "Red Chilli Coin Papad",
    category: "Coin Papad",
    description: "Small, crispy coin papads with a lively red chilli flavour.",
    weight: ["500GM"],
    image: "/products/clean/coin-red-chilli-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "coin-ajwain-papad",
    slug: "coin-ajwain-papad",
    name: "Ajwain Coin Papad",
    category: "Coin Papad",
    description: "Small, crispy coin papads with the warm flavour of ajwain.",
    weight: ["500GM"],
    image: "/products/clean/coin-ajwain-papad.png",
    ingredients: papadIngredients,
    featured: false
  },
  {
    id: "flat-khichiya",
    slug: "flat-khichiya-papad",
    name: "Flat Khichiya Papad",
    category: "Flat Khichiya Papad",
    description: "A flat khichiya papad pack featuring jeera, ajwain, green chilli, and red chilli flavors.",
    weight: ["500GM"],
    image: "/products/clean/flat-khichiya-papad.png",
    ingredients: khichiyaIngredients,
    featured: true
  }
];

export const categories: ProductCategory[] = [
  "Papad",
  "Coin Papad",
  "Mathiya",
  "Chorafali",
  "Khichiya Papad",
  "Rice Papad",
  "Flat Khichiya Papad"
];

export const productSegments: Array<{ name: ProductSegment; categories: ProductCategory[] }> = [
  { name: "Papad", categories: ["Papad"] },
  { name: "Coin Papad", categories: ["Coin Papad"] },
  { name: "Rice Papad / Khichiya Papad", categories: ["Rice Papad", "Khichiya Papad", "Flat Khichiya Papad"] },
  { name: "Mathiya", categories: ["Mathiya"] },
  { name: "Chorafali", categories: ["Chorafali"] }
];

export function segmentToSlug(segment: ProductSegment) {
  return segment.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-");
}

export function getSegmentForProduct(product: Product) {
  return productSegments.find((segment) => segment.categories.includes(product.category));
}

export const ricePapadSegments: RicePapadSegment[] = ["7 Inch", "5 Inch", "3 Inch", "Flat"];

export function getRicePapadSegmentForProduct(product: Product): RicePapadSegment | undefined {
  if (product.category === "Flat Khichiya Papad") return "Flat";
  if (product.category === "Khichiya Papad") return "7 Inch";
  if (product.name.startsWith("5 Inch")) return "5 Inch";
  if (product.name.startsWith("3 Inch")) return "3 Inch";
  return undefined;
}

function getFlavorOrder(product: Product) {
  const name = product.name.toLowerCase();
  if (name.includes("plain")) return 0;
  if (name.includes("green chilli")) return 1;
  if (name.includes("jeera")) return 2;
  if (name.includes("red chilli")) return 3;
  if (name.includes("ajwain")) return 4;
  return 5;
}

export function sortRicePapadProducts(productList: Product[]) {
  return [...productList].sort((first, second) => {
    const segmentDelta = ricePapadSegments.indexOf(getRicePapadSegmentForProduct(first) ?? "Flat") - ricePapadSegments.indexOf(getRicePapadSegmentForProduct(second) ?? "Flat");
    if (segmentDelta !== 0) return segmentDelta;

    const flavorDelta = getFlavorOrder(first) - getFlavorOrder(second);
    if (flavorDelta !== 0) return flavorDelta;

    return first.name.localeCompare(second.name);
  });
}

export const manufacturer = {
  name: "Aaswad Papad",
  address: "Mota Pore Road, Junaraopura, Nadiad - 387001, Dist. Kheda, Gujarat",
  phone: "9898011344",
  displayPhone: "+91 98980 11344",
  email: "aswadpapad@gmail.com",
  website: "www.aaswadpapad.com",
  mapsQuery: "Aaswad Papad, Mota Pore Road, Junaraopura, Nadiad 387001, Kheda, Gujarat"
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
}
