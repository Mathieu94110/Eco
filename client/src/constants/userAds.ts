import type { userAdsConfigInterface } from "@/shared/interfaces";

export const userAdsConfig: userAdsConfigInterface[] = [
  {
    key: "title",
    title: "Titre",
  },
  {
    key: "image",
    title: "Image",
  },
  {
    key: "created_at",
    title: "Date",
  },
  {
    key: "description",
    title: "Description",
  },
  {
    key: "category",
    title: "Catégorie",
  },
  {
    key: "price",
    title: "Prix",
  },
  {
    key: "actions",
    title: "Actions",
  },
];

export const userAdsCategories: ReadonlyArray<string> = [
  "Informatique",
  "Téléphones, tablettes",
  "Électro",
  "Rangements",
  "Vetements",
  "Cosmétiques",
  "Vidéo, son",
  "Auto, moto",
  "Autres",
];
