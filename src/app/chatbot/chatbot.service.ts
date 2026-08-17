import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface ChatMessageContent {
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: ChatMessageContent[];
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  readonly apiUrl = 'https://8fxksr8bh7.execute-api.us-east-2.amazonaws.com/Prod/resume-chatbot';

  private readonly _messages$ = new BehaviorSubject<ChatMessage[]>([]);
  readonly messages$: Observable<ChatMessage[]> = this._messages$.asObservable();

  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  private readonly _error$ = new BehaviorSubject<string | null>(null);
  readonly error$: Observable<string | null> = this._error$.asObservable();

  constructor(private http: HttpClient) {}

  get messages(): ChatMessage[] {
    return this._messages$.value;
  }

  get isLoading(): boolean {
    return this._isLoading$.value;
  }

  get error(): string | null {
    return this._error$.value;
  }

  sendMessage(messageText: string): Observable<ChatResponse> {
    const trimmedMessage = messageText ? messageText.trim() : '';
    if (!trimmedMessage) {
      return throwError(new Error('Message cannot be empty'));
    }

    const historyToSend = [...this._messages$.value];
    const userMessage: ChatMessage = {
      role: 'user',
      content: [{ text: trimmedMessage }]
    };

    // Append user message to conversation history
    this._messages$.next([...this._messages$.value, userMessage]);
    this._error$.next(null);
    this._isLoading$.next(true);

    const payload: ChatRequest = {
      message: trimmedMessage,
      history: historyToSend
    };

    return this.http.post<ChatResponse>(this.apiUrl, payload).pipe(
      tap((response: ChatResponse) => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: [{ text: response.reply }]
        };
        this._messages$.next([...this._messages$.value, assistantMessage]);
        this._isLoading$.next(false);
      }),
      catchError((err) => {
        const errorMessage =
          err?.error?.message || err?.message || 'Failed to send message. Please try again.';
        this._error$.next(errorMessage);
        this._isLoading$.next(false);
        return throwError(err);
      }),
      finalize(() => {
        this._isLoading$.next(false);
      })
    );
  }

  clearHistory(): void {
    this._messages$.next([]);
    this._error$.next(null);
  }

  clearError(): void {
    this._error$.next(null);
  }

  addMessage(message: ChatMessage): void {
    this._messages$.next([...this._messages$.value, message]);
  }
}
