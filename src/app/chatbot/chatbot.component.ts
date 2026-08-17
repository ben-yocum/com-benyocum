import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { ChatbotService, ChatMessage } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef<HTMLDivElement>;

  userInput: string = '';
  readonly messages$: Observable<ChatMessage[]> = this.chatbotService.messages$;
  readonly isLoading$: Observable<boolean> = this.chatbotService.isLoading$;
  readonly error$: Observable<string | null> = this.chatbotService.error$;

  private shouldScrollToBottom = false;

  constructor(public chatbotService: ChatbotService) {}

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage(): void {
    const trimmedInput = this.userInput.trim();
    if (!trimmedInput || this.chatbotService.isLoading) {
      return;
    }

    this.userInput = '';
    this.shouldScrollToBottom = true;

    this.chatbotService.sendMessage(trimmedInput).subscribe({
      next: () => {
        this.shouldScrollToBottom = true;
      },
      error: () => {
        this.shouldScrollToBottom = true;
      }
    });
  }

  clearHistory(): void {
    this.chatbotService.clearHistory();
  }

  dismissError(): void {
    this.chatbotService.clearError();
  }

  retryLastMessage(): void {
    const messages = this.chatbotService.messages;
    if (messages.length === 0) return;

    // Find the last user message to retry
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        const text = messages[i].content.map(c => c.text).join('\n');
        this.chatbotService.clearError();
        this.shouldScrollToBottom = true;
        this.chatbotService.sendMessage(text).subscribe({
          next: () => {
            this.shouldScrollToBottom = true;
          },
          error: () => {
            this.shouldScrollToBottom = true;
          }
        });
        break;
      }
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch {
      // Ignore scroll failures
    }
  }
}
