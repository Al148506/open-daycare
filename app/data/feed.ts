export type PostType = "achievement" | "activity" | "announcement";

export interface Child {
  name: string;
  initial: string;
  family: string;
}

export interface Post {
  id: string;
  type: PostType;
  child?: Child;
  title: string;
  time: string;
  author: string;
  audience: string;
  body: string;
  photo?: { label: string };
  reactions: number;
  comments: number;
  own: boolean;
}

export const CLASSROOM = {
  name: "Sala Soles",
  shortName: "Soles",
  childCount: 12,
};

export const TEACHER = {
  name: "Caro Giménez",
  firstName: "Caro",
  role: "Maestra",
};

const mateo: Child = {
  name: "Mateo",
  initial: "M",
  family: "familia de Mateo",
};

export const POSTS: Post[] = [
  {
    id: "logro-orinal",
    type: "achievement",
    child: mateo,
    title: "Mateo",
    time: "14:20",
    author: "publicado por vos",
    audience: mateo.family,
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    reactions: 3,
    comments: 1,
    own: true,
  },
  {
    id: "actividad-temperas",
    type: "activity",
    child: mateo,
    title: "Mateo",
    time: "09:40",
    author: "publicado por vos",
    audience: mateo.family,
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { label: "Foto · pintando con témperas" },
    reactions: 5,
    comments: 2,
    own: true,
  },
  {
    id: "anuncio-parque",
    type: "announcement",
    title: "Anuncio general",
    time: "07:50",
    author: "publicado por vos",
    audience: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    reactions: 8,
    comments: 0,
    own: true,
  },
];