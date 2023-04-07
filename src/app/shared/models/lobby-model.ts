
export interface LobbyModel {
    gameState?: object;
    uniqueId?: string;
    lobbyName: string;
    lobbyPassword: string;
    users: {
      name: string;
      userId: string;
      admin: boolean;
    }[];
    timestamp: number;
  }
  