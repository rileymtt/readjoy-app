type TWalletSignature = string | null;

type TUserInformation = {
  id: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  gender: boolean;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  createdAt: Date;
  updatedAt: Date;
  walletAddress: string;
  totalView?: number | null;
  email?: string;
  point: number;
  level: number;
  isAlive?: boolean;
  balance: number;
  articles: TArticle[];
};

type TNotification = {
  avatar: string;
  message: string;
  link: string;
  time: any;
  id: number;
  unread: number;
};

type TUserInitialState = {
  information: TUserInformation | null;
  loading: boolean;
};
