type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type TBook = {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};
