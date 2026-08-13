export type PostKind = "achievement" | "activity" | "announcement";

export type Post = {
  id: string;
  kind: PostKind;
  audience: string;
  childName?: string;
  time: string;
  publishedBy: string;
  body: string;
  likes: number;
  comments: number;
  photoCaption?: string;
};

export const POSTS: Post[] = [
  {
    id: "post-1",
    kind: "achievement",
    audience: "familia de Mateo",
    childName: "Mateo",
    time: "14:20",
    publishedBy: "publicado por vos",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-2",
    kind: "activity",
    audience: "familia de Mateo",
    childName: "Mateo",
    time: "09:40",
    publishedBy: "publicado por vos",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    likes: 5,
    comments: 2,
    photoCaption: "Foto · pintando con témperas",
  },
  {
    id: "post-3",
    kind: "announcement",
    audience: "toda la sala",
    time: "07:50",
    publishedBy: "publicado por vos",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];