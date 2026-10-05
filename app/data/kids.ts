export type KidAvatar = "blue" | "pink" | "green" | "yellow" | "purple";

export type ParentAvatar = "purple" | "blue";

export type KidBadge = "peanut" | "lactose" | "linkParent";

export type ParentStatus = "active" | "pending";

export interface ParentLink {
  name: string;
  role: string;
  status: ParentStatus;
  avatar: ParentAvatar;
}

export interface Kid {
  id: string;
  name: string;
  initial: string;
  age: number;
  badge?: KidBadge;
  avatar: KidAvatar;
  birthDate: string;
  classroom: string;
  enrolled: string;
  allergyNotes?: string;
  parents: ParentLink[];
}

export const KIDS: Kid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    age: 3,
    badge: "peanut",
    avatar: "blue",
    birthDate: "12 mar 2022",
    classroom: "Soles",
    enrolled: "feb 2025",
    allergyNotes:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        name: "Lucía Fernández",
        role: "Mamá",
        status: "active",
        avatar: "purple",
      },
      {
        name: "Diego Fernández",
        role: "Papá",
        status: "pending",
        avatar: "blue",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initial: "S",
    age: 2,
    avatar: "pink",
    birthDate: "27 jul 2023",
    classroom: "Soles",
    enrolled: "mar 2025",
    parents: [
      {
        name: "Carla Méndez",
        role: "Mamá",
        status: "active",
        avatar: "purple",
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initial: "B",
    age: 3,
    avatar: "green",
    birthDate: "5 ene 2022",
    classroom: "Soles",
    enrolled: "ago 2024",
    parents: [
      {
        name: "Paula Ruiz",
        role: "Mamá",
        status: "active",
        avatar: "purple",
      },
      {
        name: "Andrés Ruiz",
        role: "Papá",
        status: "active",
        avatar: "blue",
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initial: "V",
    age: 2,
    badge: "linkParent",
    avatar: "yellow",
    birthDate: "18 set 2023",
    classroom: "Soles",
    enrolled: "jun 2025",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initial: "T",
    age: 3,
    badge: "lactose",
    avatar: "purple",
    birthDate: "30 nov 2022",
    classroom: "Soles",
    enrolled: "feb 2025",
    allergyNotes:
      "Alergia a la lactosa. Sustituir lácteos por bebidas vegetales en las comidas.",
    parents: [
      {
        name: "Marta Díaz",
        role: "Mamá",
        status: "active",
        avatar: "purple",
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initial: "E",
    age: 2,
    avatar: "pink",
    birthDate: "9 may 2023",
    classroom: "Soles",
    enrolled: "abr 2025",
    parents: [
      {
        name: "Nicolás Castro",
        role: "Papá",
        status: "pending",
        avatar: "blue",
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initial: "L",
    age: 3,
    avatar: "blue",
    birthDate: "21 feb 2022",
    classroom: "Soles",
    enrolled: "ago 2024",
    parents: [
      {
        name: "Sofía Romero",
        role: "Mamá",
        status: "active",
        avatar: "purple",
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initial: "O",
    age: 2,
    avatar: "green",
    birthDate: "14 ago 2023",
    classroom: "Soles",
    enrolled: "may 2025",
    parents: [
      {
        name: "Javier Vega",
        role: "Papá",
        status: "active",
        avatar: "blue",
      },
    ],
  },
];
