
export enum Sender {
  Boy = 'boy',
  Girl = 'girl',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
