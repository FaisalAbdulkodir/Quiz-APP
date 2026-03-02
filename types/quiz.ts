export interface QuizItem {
  id: number;
  question: string;
  tipe: "BENAR" | "SALAH";
  answer: string | null;
}
